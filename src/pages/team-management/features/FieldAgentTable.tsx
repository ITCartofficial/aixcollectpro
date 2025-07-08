import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown"; // Assuming this is your custom Dropdown
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";

interface FieldAgent {
    id: string;
    name: string;
    totalVisits: number;
    paidVisits: number;
    amountCollected: number;
    location: string;
    status: 'On Road' | 'In Active' | 'On Leave';
    lastSynced: string;
    avatar?: string;
}

// Main Field Agents Component
const FieldAgentsTable: React.FC = () => {
    const [fieldAgentsData, setFieldAgentsData] = useState<FieldAgent[]>([]);
    const [filteredData, setFilteredData] = useState<FieldAgent[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string[]>([]); // Changed to string[]
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedLastSynced, setSelectedLastSynced] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<FieldAgent[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Load field agents data from JSON file
    useEffect(() => {
        const loadFieldAgentsData = async () => {
            try {
                setIsLoading(true);
                // Replace with the actual path to your JSON file
                const response = await fetch('/data/team-management/fieldAgentData.json');

                if (!response.ok) {
                    throw new Error('Failed to load field agents data');
                }

                const data: FieldAgent[] = await response.json();
                setFieldAgentsData(data);
                setFilteredData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error loading field agents data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadFieldAgentsData();
    }, []);

    // Filter options (computed based on loaded data)
    const locationOptions = [
        { label: 'All Locations', value: '' },
        ...Array.from(new Set(fieldAgentsData.map(agent => agent.location))).map(location => ({
            label: location,
            value: location
        }))
    ];

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'On Road', value: 'On Road' },
        { label: 'In Active', value: 'In Active' },
        { label: 'On Leave', value: 'On Leave' }
    ];

    const lastSyncedOptions = [
        { label: 'All Times', value: '' },
        { label: 'Last Hour', value: 'last_hour' },
        { label: 'Today', value: 'today' },
        { label: 'This Week', value: 'this_week' }
    ];

    // Handle search
    const handleSearch = (query: string) => {
        let filtered = fieldAgentsData;

        if (query) {
            filtered = filtered.filter(agent =>
                agent.name.toLowerCase().includes(query.toLowerCase()) ||
                agent.location.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Apply filters
        // If selectedLocation is an array, check if agent.location is included in it
        if (selectedLocation.length > 0) {
            filtered = filtered.filter(agent => selectedLocation.includes(agent.location));
        }

        if (selectedStatus) {
            filtered = filtered.filter(agent => agent.status === selectedStatus);
        }

        setFilteredData(filtered);
    };

    // Handle filter changes
    const handleLocationChange = (value: string | string[]) => {
        // If 'All Locations' is selected, clear all selections
        if (Array.isArray(value) && value.includes('')) {
            setSelectedLocation([]);
            applyFilters([], selectedStatus, selectedLastSynced);
        } else {
            const locationValues = Array.isArray(value) ? value : [value];
            setSelectedLocation(locationValues);
            applyFilters(locationValues, selectedStatus, selectedLastSynced);
        }
    };

    const handleStatusChange = (value: string | string[]) => {
        const statusValue = Array.isArray(value) ? value[0] : value;
        setSelectedStatus(statusValue);
        applyFilters(selectedLocation, statusValue, selectedLastSynced);
    };

    const handleLastSyncedChange = (value: string | string[]) => {
        const lastSyncedValue = Array.isArray(value) ? value[0] : value;
        setSelectedLastSynced(lastSyncedValue);
        applyFilters(selectedLocation, selectedStatus, lastSyncedValue);
    };

    const applyFilters = (location: string | string[], status: string, lastSynced: string) => {
        let filtered = fieldAgentsData;

        // Handle location filter (now supports array)
        if (Array.isArray(location) && location.length > 0) {
            filtered = filtered.filter(agent => location.includes(agent.location));
        } else if (typeof location === 'string' && location) { // For single select if it were used elsewhere
            filtered = filtered.filter(agent => agent.location === location);
        }


        if (status) {
            filtered = filtered.filter(agent => agent.status === status);
        }

        if (lastSynced) {
            console.log('Filtering by lastSynced:', lastSynced);
            // Add your last synced filtering logic here
        }

        setFilteredData(filtered);
    };

    const handleSelectionChange = (selected: FieldAgent[]) => {
        setSelectedRows(selected);
    };

    const handleViewAgent = (agent: FieldAgent) => {
        console.log('Viewing agent:', agent);
    };

    // Table columns configuration
    const columns: TableColumn<FieldAgent>[] = [
        {
            key: 'name',
            label: 'Agent Name',
            sortable: true,
            width: '200px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'totalVisits',
            label: 'Total Visits',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'paidVisits',
            label: 'Paid Visits',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'amountCollected',
            label: 'Amount Collected',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">₹{value.toLocaleString()}</span>
        },
        {
            key: 'location',
            label: 'Location',
            sortable: true,
            width: '150px',
            className:"text-center",
            render: (value) => <span className="text-gray-700">{value}</span>
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => {
                const variant = value === 'On Road' ? 'success' : value === 'In Active' ? 'danger' : 'info';
                return <Badge variant={variant}>{value}</Badge>;
            }
        },
        {
            key: 'lastSynced',
            label: 'Last Synced',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="text-gray-600">{value}</span>
        },
        {
            key: 'id',
            label: 'Action',
            sortable: false,
            width: '100px',
            className: 'text-center',
            render: (_, row) => (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewAgent(row);
                    }}
                >
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                </button>
            )
        }
    ];

    // Loading state
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // Error state
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

    return (
        <div className="mt-4 bg-white min-h-screen rounded-lg p-6">
            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>

                    <Dropdown
                        options={locationOptions}
                        value={selectedLocation} // Pass array value
                        onChange={handleLocationChange}
                        placeholder="Select Location"
                        className="min-w-48"
                        multiSelect={true} // Enable multi-select
                    />

                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        className="min-w-48"
                    />

                    <Dropdown
                        options={lastSyncedOptions}
                        value={selectedLastSynced}
                        onChange={handleLastSyncedChange}
                        placeholder="Select Time"
                        className="min-w-48"
                    />

                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search agents..."
                            onSearch={handleSearch}
                            className="w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Selected Items Display */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} agent{selectedRows.length > 1 ? 's' : ''} selected
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

            {/* Table */}
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
                emptyMessage="No field agents found"
                getRowId={(row) => row.id}
            />
        </div>
    );
};

export default FieldAgentsTable;
