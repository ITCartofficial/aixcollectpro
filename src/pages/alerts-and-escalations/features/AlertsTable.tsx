import { useState, useEffect, useRef } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Badge from "../../../components/ui/Table/Badge";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import { RxDotsVertical } from "react-icons/rx";

// ============================================
// INTERFACE DEFINITIONS
// ============================================
interface AlertData {
    id: string;
    alert_type: string;
    description: string;
    risk_level: 'High' | 'Medium' | 'Low';
    suggestion: string;
    raised_by: string;
    timestamp: string;
    status: 'Pending' | 'Resolved' | 'Escalated';
}

interface PopupPosition {
    top: number;
    left: number;
}

const AlertsTable: React.FC = () => {
    const [alertsData, setAlertsData] = useState<AlertData[]>([]);
    const [filteredData, setFilteredData] = useState<AlertData[]>([]);
    const [selectedAlertType, setSelectedAlertType] = useState<string[]>([]);
    const [selectedRiskLabel, setSelectedRiskLabel] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedRaisedBy, setSelectedRaisedBy] = useState<string>('');
    const [selectedLastUpdated, setSelectedLastUpdated] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<AlertData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Popup related state
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedAlert, setSelectedAlert] = useState<AlertData | null>(null);
    const [popupPosition, setPopupPosition] = useState<PopupPosition>({ top: 0, left: 0 });
    const popupRef = useRef<HTMLDivElement>(null);

    // ============================================
    // DATA LOADING
    // ============================================
    useEffect(() => {
        const loadAlertsData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/data/alerts-escalations/alertsEscalation.json');

                if (!response.ok) {
                    throw new Error('Failed to load alerts data');
                }

                const data: AlertData[] = await response.json();
                setAlertsData(data);
                setFilteredData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error loading alerts data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadAlertsData();
    }, []);

    // ============================================
    // POPUP MANAGEMENT
    // ============================================
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    // ============================================
    // FILTER OPTIONS CONFIGURATION
    // ============================================
    const alertTypeOptions = [
        { label: 'All Alert Types', value: '' },
        ...Array.from(new Set(alertsData.map(alert => alert.alert_type).filter(alertType => alertType && alertType.trim() !== ''))).map(alertType => ({
            label: alertType,
            value: alertType
        }))
    ];

    const riskLabelOptions = [
        { label: 'All Risk Levels', value: '' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    const lastUpdatedOptions = [
        { label: 'All Times', value: '' },
        { label: 'Last Hour', value: 'last_hour' },
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'This Week', value: 'this_week' }
    ];

    const statusOptions = [
        { label: 'All Statuses', value: '' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Resolved', value: 'Resolved' },
        { label: 'Escalated', value: 'Escalated' },
    ];

    const raisedByOptions = [
        { label: 'All Users', value: '' },
        ...Array.from(new Set(alertsData.map(alert => alert.raised_by).filter(raisedBy => raisedBy && raisedBy.trim() !== ''))).map(raisedBy => ({
            label: raisedBy,
            value: raisedBy
        }))
    ];

    // ============================================
    // FILTER UTILITY FUNCTIONS
    // ============================================

    // Helper function to apply date-based filtering
    const applyLastUpdatedFilter = (data: AlertData[], filter: string) => {
        const now = new Date();

        switch (filter) {
            case 'last_hour':
                return data.filter(alert => {
                    const alertDate = new Date(alert.timestamp);
                    const diffInHours = (now.getTime() - alertDate.getTime()) / (1000 * 60 * 60);
                    return diffInHours <= 1;
                });
            case 'today':
                return data.filter(alert => {
                    const alertDate = new Date(alert.timestamp);
                    return alertDate.toDateString() === now.toDateString();
                });
            case 'yesterday':
                return data.filter(alert => {
                    const alertDate = new Date(alert.timestamp);
                    const yesterday = new Date(now);
                    yesterday.setDate(yesterday.getDate() - 1);
                    return alertDate.toDateString() === yesterday.toDateString();
                });
            case 'this_week':
                return data.filter(alert => {
                    const alertDate = new Date(alert.timestamp);
                    const startOfWeek = new Date(now);
                    startOfWeek.setDate(now.getDate() - now.getDay());
                    return alertDate >= startOfWeek;
                });
            default:
                return data;
        }
    };

    // Helper function to apply status filtering
    const applyStatusFilter = (data: AlertData[], filter: string) => {
        if (!filter || filter === '') {
            return data;
        }
        return data.filter(alert => alert.status === filter);
    };

    // Helper function to apply raised by filtering
    const applyRaisedByFilter = (data: AlertData[], filter: string) => {
        if (!filter || filter === '') {
            return data;
        }
        return data.filter(alert => alert.raised_by === filter);
    };

    // ============================================
    // MAIN FILTER APPLICATION LOGIC
    // ============================================

    // Core function to apply all filters and search
    const applyAllFilters = () => {
        let filtered = [...alertsData]; // Create a copy to avoid mutation

        // Apply search filter first - searches across multiple fields
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(alert =>
                // Search by Alert ID
                (alert.id && alert.id.toLowerCase().includes(query)) ||
                // Search by Alert Type
                (alert.alert_type && alert.alert_type.toLowerCase().includes(query))
            );
        }

        // Apply alert type filter
        if (selectedAlertType.length > 0 && !selectedAlertType.includes('')) {
            filtered = filtered.filter(alert => selectedAlertType.includes(alert.alert_type));
        }

        // Apply risk level filter
        if (selectedRiskLabel && selectedRiskLabel !== '') {
            filtered = filtered.filter(alert => alert.risk_level === selectedRiskLabel);
        }

        // Apply date/time filter
        if (selectedLastUpdated && selectedLastUpdated !== '') {
            filtered = applyLastUpdatedFilter(filtered, selectedLastUpdated);
        }

        // Apply status filter
        if (selectedStatus && selectedStatus !== '') {
            filtered = applyStatusFilter(filtered, selectedStatus);
        }

        // Apply raised by filter
        if (selectedRaisedBy && selectedRaisedBy !== '') {
            filtered = applyRaisedByFilter(filtered, selectedRaisedBy);
        }

        setFilteredData(filtered);
    };

    // ============================================
    // FILTER EFFECTS - Auto-apply when dependencies change
    // ============================================
    useEffect(() => {
        if (alertsData.length > 0) {
            applyAllFilters();
        }
    }, [alertsData, selectedAlertType, selectedRiskLabel, selectedLastUpdated, selectedStatus, selectedRaisedBy, searchQuery]);

    // ============================================
    // EVENT HANDLERS
    // ============================================

    // Handle search input changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle alert type filter changes
    const handleAlertTypeChange = (value: string | string[]) => {
        const alertTypeValues = Array.isArray(value) ? value : [value];

        if (alertTypeValues.includes('')) {
            setSelectedAlertType([]);
        } else {
            setSelectedAlertType(alertTypeValues);
        }
    };

    // Handle risk level filter changes
    const handleRiskLabelChange = (value: string | string[]) => {
        const riskLabelValue = Array.isArray(value) ? value[0] : value;
        setSelectedRiskLabel(riskLabelValue);
    };

    // Handle status filter
    const handleStatusChange = (value: string | string[]) => {
        const statusValue = Array.isArray(value) ? value[0] : value;
        setSelectedStatus(statusValue);
    };

    // Handle raised by filter
    const handleRaisedByChange = (value: string | string[]) => {
        const raisedByValue = Array.isArray(value) ? value[0] : value;
        setSelectedRaisedBy(raisedByValue);
    };

    // Handle date/time filter changes
    const handleLastUpdatedChange = (value: string | string[]) => {
        const lastUpdatedValue = Array.isArray(value) ? value[0] : value;
        setSelectedLastUpdated(lastUpdatedValue);
    };

    // Handle row selection changes
    const handleSelectionChange = (selected: AlertData[]) => {
        setSelectedRows(selected);
    };

    // Handle 3-dot menu click
    const handleViewTask = (alert: AlertData, event: React.MouseEvent) => {
        event.stopPropagation();

        // Calculate popup position
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;

        setPopupPosition({
            top: rect.bottom + scrollY + 5,
            left: rect.left + scrollX - 150 // Adjust to position popup to the left of the button
        });

        setSelectedAlert(alert);
        setShowPopup(true);
    };


    const handleResolveAlert = () => {
        console.log('Resolve Alert:', selectedAlert);
        setShowPopup(false);
        // Add your resolve logic here
    };

    const handleEscalateAlert = () => {
        console.log('Escalate Alert:', selectedAlert);
        setShowPopup(false);
        // Add your escalate logic here
    };

    // ============================================
    // TABLE COLUMN CONFIGURATION
    // ============================================
    const columns: TableColumn<AlertData>[] = [
        {
            key: 'id',
            label: 'Alert ID',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'alert_type',
            label: 'Type',
            sortable: false,
            width: '200px',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'description',
            label: 'Description',
            sortable: false,
            width: '300px',
            className: 'text-left',
            render: (value) => (
                <span className="font-medium" title={value}>
                    {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                </span>
            )
        },
        {
            key: 'risk_level',
            label: 'Risk Level',
            sortable: false,
            width: '120px',
            className: 'text-center',
            render: (value) => {
                const getVariant = (status: string) => {
                    switch (status) {
                        case 'Low': return 'success';
                        case 'High': return 'danger';
                        case 'Medium': return 'warning';
                        default: return 'info';
                    }
                };
                return <Badge variant={getVariant(value)}>{value}</Badge>;
            }
        },
        {
            key: 'suggestion',
            label: 'Suggestion',
            sortable: false,
            width: '300px',
            className: 'text-left',
            render: (value) => (
                <span className="font-medium" title={value}>
                    {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                </span>
            )
        },
        {
            key: 'raised_by',
            label: 'Raised By',
            sortable: false,
            width: '130px',
            render: (value) => (
                <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'timestamp',
            label: 'Timestamp',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'status',
            label: 'Status',
            sortable: false,
            width: '120px',
            className: 'text-center',
            render: (value) => {
                const getVariant = (status: string) => {
                    switch (status) {
                        case 'Resolved': return 'success';
                        case 'Escalated': return 'danger';
                        case 'Pending': return 'warning';
                        default: return 'info';
                    }
                };
                return <Badge variant={getVariant(value)}>{value}</Badge>;
            }
        },
        {
            key: 'id',
            label: '',
            sortable: false,
            width: '0px',
            className: 'text-center',
            render: (_, row) => (
                <button
                    className="text-black px-3 py-1 text-sm flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded"
                    onClick={(e) => handleViewTask(row, e)}
                >
                    <RxDotsVertical className="w-4 h-4" />
                </button>
            )
        }
    ];

    // ============================================
    // LOADING STATE RENDER
    // ============================================
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // ============================================
    // ERROR STATE RENDER
    // ============================================
    if (error) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ============================================
    // MAIN COMPONENT RENDER
    // ============================================
    return (
        <div className="mt-4 bg-white rounded-lg p-6 relative">
            {/* ============================================ */}
            {/* FILTERS AND SEARCH SECTION */}
            {/* ============================================ */}
            <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>

                    {/* Date/Time Filter Dropdown */}
                    <Dropdown
                        options={lastUpdatedOptions}
                        value={selectedLastUpdated}
                        onChange={handleLastUpdatedChange}
                        placeholder="Select Date"
                        className="min-w-36"
                    />

                    {/* Alert Type Filter Dropdown */}
                    <Dropdown
                        options={alertTypeOptions}
                        value={selectedAlertType}
                        onChange={handleAlertTypeChange}
                        placeholder="Alert Type"
                        className="min-w-48"
                        multiSelect={true}
                    />

                    {/* Risk Level Filter Dropdown */}
                    <Dropdown
                        options={riskLabelOptions}
                        value={selectedRiskLabel}
                        onChange={handleRiskLabelChange}
                        placeholder="Risk Level"
                        className="min-w-36"
                    />

                    {/* Status Filter Dropdown */}
                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Status"
                        className="min-w-36"
                    />

                    {/* Raised By Filter Dropdown */}
                    <Dropdown
                        options={raisedByOptions}
                        value={selectedRaisedBy}
                        onChange={handleRaisedByChange}
                        placeholder="Raised By"
                        className="min-w-40"
                    />

                    {/* Search Bar */}
                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search by ID or type..."
                            onSearch={handleSearch}
                            className="w-64"
                        />
                    </div>
                </div>
            </div>

            {/* ============================================ */}
            {/* SELECTED ITEMS DISPLAY SECTION */}
            {/* ============================================ */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} alert{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* DATA TABLE SECTION */}
            {/* ============================================ */}
            <div className="bg-white rounded-lg shadow-sm">
                <DataTable
                    data={filteredData}
                    columns={columns}
                    selectable={true}
                    selectedRows={selectedRows}
                    onSelectionChange={handleSelectionChange}
                    sortable={true}
                    pagination={true}
                    pageSize={10}
                    className="shadow-sm"
                    emptyMessage="No alerts found"
                    getRowId={(row) => row.id}
                />
            </div>

            {/* ============================================ */}
            {/* POPUP MENU */}
            {/* ============================================ */}
            {showPopup && selectedAlert && (
                <div
                    ref={popupRef}
                    className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[180px]"
                    style={{
                        top: popupPosition.top,
                        left: popupPosition.left,
                    }}>
                    <div className="py-1">
                        <button
                            onClick={handleEscalateAlert}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer"
                        >
                            <span>Escalate</span>
                        </button>

                        {selectedAlert.status === 'Pending' && (
                            <button
                                onClick={handleResolveAlert}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 cursor-pointer">
                                <span>Mark as Resolved</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Backdrop for popup */}
            {showPopup && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default AlertsTable;