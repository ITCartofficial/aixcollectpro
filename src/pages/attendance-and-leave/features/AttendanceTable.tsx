import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Badge from "../../../components/ui/Table/Badge";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import { FaEye } from "react-icons/fa";
import Avatar from "../../../components/ui/Table/Avatar";
import LeaveRequestTable from "./LeaveRequestTable";

// INTERFACE DEFINITIONS
interface AttendanceData {
    id: string;
    agentName: string;
    role: string;
    presentDays: string;
    lateCheckIns: number;
    avgHrsPerDay: number;
    overtimeDays: number;
    todayCheckInOut: string;
    currentStatus: 'Inactive' | 'On-Road' | 'Active' | 'Secondary' | 'Disabled';
    avatar?: string;
}

const AttendanceTable: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('attendance');
    const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);
    const [filteredData, setFilteredData] = useState<AttendanceData[]>([]);
    const [selectedRole, setSelectedRole] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<AttendanceData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // DATA LOADING
    useEffect(() => {
        const loadAttendanceData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/data/attendance/attendanceData.json');

                if (!response.ok) {
                    throw new Error('Failed to load alerts data');
                }

                const data: AttendanceData[] = await response.json();
                setAttendanceData(data);
                setFilteredData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error loading alerts data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadAttendanceData();
    }, []);

    // FILTER OPTIONS CONFIGURATION
    const roleOptions = [
        { label: 'All Role', value: '' },
        ...Array.from(new Set(attendanceData.map(alert => alert.role).filter(role => role && role.trim() !== ''))).map(role => ({
            label: role,
            value: role
        }))
    ];

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'On-Road', value: 'On-Road' },
        { label: 'Inactive', value: 'Inactive' },
        { label: 'Active', value: 'Active' },
        { label: 'Disabled', value: 'Disabled' },
    ];

    // Helper function to apply status filtering
    const applyStatusFilter = (data: AttendanceData[], filter: string) => {
        if (!filter || filter === '') {
            return data;
        }
        return data.filter(alert => alert.currentStatus === filter);
    };

    // Core function to apply all filters and search
    const applyAllFilters = () => {
        let filtered = [...attendanceData]; // Create a copy to avoid mutation

        // Apply search filter first - searches across multiple fields
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(attendance =>
                // Search by Agent ID
                (attendance.id && attendance.id.toLowerCase().includes(query)) ||
                // Search by Agent Name
                (attendance.agentName && attendance.agentName.toLowerCase().includes(query))
            );
        }

        // Apply role filter
        if (selectedRole.length > 0 && !selectedRole.includes('')) {
            filtered = filtered.filter(attendance => selectedRole.includes(attendance.role));
        }

        // Apply status filter
        if (selectedStatus && selectedStatus !== '') {
            filtered = applyStatusFilter(filtered, selectedStatus);
        }

        setFilteredData(filtered);
    };

    // FILTER EFFECTS - Auto-apply when dependencies change
    useEffect(() => {
        if (attendanceData.length > 0) {
            applyAllFilters();
        }
    }, [attendanceData, selectedRole, selectedStatus, searchQuery]);

    // Handle search input changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle alert type filter changes
    const handleRoleChange = (value: string | string[]) => {
        const roleValues = Array.isArray(value) ? value : [value];

        if (roleValues.includes('')) {
            setSelectedRole([]);
        } else {
            setSelectedRole(roleValues);
        }
    };

    // Handle status filter
    const handleStatusChange = (value: string | string[]) => {
        const statusValue = Array.isArray(value) ? value[0] : value;
        setSelectedStatus(statusValue);
    };

    // Handle row selection changes
    const handleSelectionChange = (selected: AttendanceData[]) => {
        setSelectedRows(selected);
    };

    const handleViewAttendance = (attendance: AttendanceData) => {
        console.log('Viewing agent:', attendance);
    };

    // Handle tab change
    const handleTabChange = (tab: 'attendance' | 'leaveRequest') => {
        setActiveTab(tab);
        // Reset filters when switching tabs
        setSelectedRole([]);
        setSelectedStatus('');
        setSearchQuery('');
        setSelectedRows([]);
    };

    // If Leave Request tab is active, render LeaveRequestTable
    if (activeTab === 'leaveRequest') {
        return <LeaveRequestTable onTabChange={handleTabChange} activeTab={activeTab} />;
    }

    // TABLE COLUMN CONFIGURATION
    const columns: TableColumn<AttendanceData>[] = [
        {
            key: 'id',
            label: 'Agent Id',
            sortable: true,
            width: '140px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'agentName',
            label: 'Name',
            sortable: true,
            width: '250px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            width: '120px',
            className: 'text-left',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'presentDays',
            label: 'Present Days',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'lateCheckIns',
            label: 'Late Check-ins',
            sortable: true,
            width: '170px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'avgHrsPerDay',
            label: 'Avg. Hrs/Day',
            sortable: true,
            width: '150px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'overtimeDays',
            label: 'Overtime Days',
            sortable: true,
            width: '170px',
            render: (value) => (
                <div className="flex items-center justify-center space-x-3">
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'todayCheckInOut',
            label: 'Today Check-In / Out',
            sortable: false,
            width: '180px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'currentStatus',
            label: 'Current Status',
            sortable: false,
            width: '170px',
            className: 'text-center',
            render: (value) => {
                const getVariant = (status: string) => {
                    switch (status) {
                        case 'On-Road': return 'info';
                        case 'Inactive': return 'danger';
                        case 'Active': return 'success';
                        case 'Disabled': return 'secondary';
                        default: return 'info';
                    }
                };
                return <Badge variant={getVariant(value)}>{value}</Badge>;
            }
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
                        handleViewAttendance(row);
                    }}
                >
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                </button>
            )
        }
    ];

    // LOADING STATE RENDER
    if (isLoading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    // ERROR STATE RENDER
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

    // MAIN COMPONENT RENDER
    return (
        <div className="mt-4 bg-white rounded-lg p-6 relative">
            {/* FILTERS AND SEARCH SECTION */}
            <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200">
                        <button
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                                activeTab === 'attendance'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => handleTabChange('attendance')}
                        >
                            Attendance
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                                activeTab === 'leaveRequest'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            onClick={() => handleTabChange('leaveRequest')}
                        >
                            Leave Request
                        </button>
                    </div>

                    <span className="text-sm font-medium text-gray-700">Filter by:</span>

                    {/* Role Filter Dropdown */}
                    <Dropdown
                        options={roleOptions}
                        value={selectedRole}
                        onChange={handleRoleChange}
                        placeholder="Role"
                        className="min-w-48"
                    />

                    {/* Status Filter Dropdown */}
                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Current Status"
                        className="min-w-48"
                    />

                    {/* Search Bar */}
                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search by agent id or name..."
                            onSearch={handleSearch}
                            className="w-64"
                        />
                    </div>
                </div>
            </div>

            {/* SELECTED ITEMS DISPLAY SECTION */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} item{selectedRows.length > 1 ? 's' : ''} selected
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

            {/* DATA TABLE SECTION */}
            <div className="h-max bg-white rounded-lg shadow-sm">
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
                    emptyMessage="No attendance records found"
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};

export default AttendanceTable;