import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";
import leaveRequestTableData from "../../../../data/attendance/leaveRequestData.json"

// INTERFACE DEFINITIONS
interface LeaveRequestData {
    id: string;
    name: string;
    role: string;
    leaveFromTo: string;
    days: number;
    leaveType: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    notes: string;
    avatar?: string;
}

// Interface for the raw JSON data
interface RawLeaveRequestData {
    id: number;
    name: string;
    role: string;
    leaveFromTo: string;
    days: number;
    leaveType: string;
    status: string;
    notes: string;
    avatar: string;
}

interface LeaveRequestTableProps {
    onTabChange?: (tab: 'attendance' | 'leaveRequest') => void;
    activeTab?: 'attendance' | 'leaveRequest';
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({ onTabChange, activeTab = 'leaveRequest' }) => {
    // Transform raw JSON data to match our interface
    const transformData = (rawData: RawLeaveRequestData[]): LeaveRequestData[] => {
        return rawData.map(item => ({
            ...item,
            id: String(item.id), // Convert number to string
            status: item.status as 'Approved' | 'Pending' | 'Rejected', // Type assertion for status
            avatar: item.avatar || undefined // Handle optional avatar
        }));
    };

    // Fixed: Use useState for leaveRequestData to enable state updates
    const [leaveRequestData, setLeaveRequestData] = useState<LeaveRequestData[]>(
        transformData(leaveRequestTableData as RawLeaveRequestData[])
    );
    const [filteredData, setFilteredData] = useState<LeaveRequestData[]>([]);
    const [selectedRole, setSelectedRole] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<LeaveRequestData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // ACTION HANDLERS
    const handleApprove = (id: string) => {
        const updateStatus = (data: LeaveRequestData[]) =>
            data.map(item => item.id === id ? { ...item, status: 'Approved' as const } : item);

        // Fixed: Update the main data state
        setLeaveRequestData(prev => updateStatus(prev));
    };

    const handleReject = (id: string) => {
        const updateStatus = (data: LeaveRequestData[]) =>
            data.map(item => item.id === id ? { ...item, status: 'Rejected' as const } : item);

        // Fixed: Update the main data state
        setLeaveRequestData(prev => updateStatus(prev));
    };

    // FILTER OPTIONS CONFIGURATION
    const roleOptions = [
        { label: 'All Role', value: '' },
        ...Array.from(new Set(leaveRequestData.map(request => request.role).filter(role => role && role.trim() !== ''))).map(role => ({
            label: role,
            value: role
        }))
    ];

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Rejected', value: 'Rejected' },
    ];

    // Helper function to apply status filtering
    const applyStatusFilter = (data: LeaveRequestData[], filter: string) => {
        if (!filter || filter === '') {
            return data;
        }
        return data.filter(leaves => leaves.status === filter);
    };

    // Core function to apply all filters and search
    const applyAllFilters = () => {
        let filtered = [...leaveRequestData]; // Create a copy to avoid mutation

        // Apply search filter first - searches across multiple fields
        if (searchQuery && searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(leaves =>
                // Search by Agent ID
                (leaves.id && leaves.id.toLowerCase().includes(query)) ||
                // Search by Agent Name
                (leaves.name && leaves.name.toLowerCase().includes(query))
            );
        }

        // Apply role filter
        if (selectedRole.length > 0 && !selectedRole.includes('')) {
            filtered = filtered.filter(request => selectedRole.includes(request.role));
        }

        // Apply status filter
        if (selectedStatus && selectedStatus !== '') {
            filtered = applyStatusFilter(filtered, selectedStatus);
        }

        setFilteredData(filtered);
    };

    // FILTER EFFECTS - Auto-apply when dependencies change
    useEffect(() => {
        if (leaveRequestData.length > 0) {
            applyAllFilters();
        }
    }, [leaveRequestData, selectedRole, selectedStatus, searchQuery]);

    // Handle search input changes
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle role filter changes
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
    const handleSelectionChange = (selected: LeaveRequestData[]) => {
        setSelectedRows(selected);
    };

    // Handle tab change
    const handleTabChange = (tab: 'attendance' | 'leaveRequest') => {
        if (onTabChange) {
            onTabChange(tab);
        }
        // Reset filters when switching tabs
        setSelectedRole([]);
        setSelectedStatus('');
        setSearchQuery('');
        setSelectedRows([]);
    };

    // TABLE COLUMN CONFIGURATION
    const columns: TableColumn<LeaveRequestData>[] = [
        {
            key: 'id',
            label: 'Agent Id',
            sortable: true,
            width: '150px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            width: '300px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-neutral-700">{value}</span>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            width: '130px',
            className: 'text-left',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'leaveFromTo',
            label: 'Leave From - To',
            sortable: true,
            width: '180px',
            headerAlign:"center",
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'days',
            label: 'Days',
            sortable: false,
            width: '100px',
            headerAlign:"center",
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'leaveType',
            label: 'Leave Type',
            sortable: false,
            width: '150px',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'notes',
            label: 'Notes',
            sortable: false,
            width: '200px',
            render: (value) => (
                <span className="font-medium" title={value}>
                    {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                </span>
            )
        },
        {
            key: 'id',
            label: 'Actions',
            sortable: false,
            width: '180px',
            className: 'text-center',
            render: (_, row) => {
                // Show approved badge if status is approved
                if (row.status === 'Approved') {
                    return (
                        <div className="flex items-center justify-start">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0C9D61] text-white">
                                <IoCheckmarkOutline className="w-4 h-4" />
                                Approved
                            </span>
                        </div>
                    );
                }

                // Show rejected badge if status is rejected
                if (row.status === 'Rejected') {
                    return (
                        <div className="flex items-center justify-start">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#EC2D30] text-white">
                                <IoClose className="w-4 h-4" />
                                Rejected
                            </span>
                        </div>
                    );
                }

                // Show action buttons only for pending status
                return (
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            onClick={() => handleReject(row.id)}
                            className="inline-flex items-center px-2 py-1 border border-red-500 text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer">
                            <IoClose className="w-4 h-4" />
                            <span>Reject</span>
                        </button>
                        <button
                            onClick={() => handleApprove(row.id)}
                            className="inline-flex items-center px-2 py-1 border border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-colors cursor-pointer">
                            <IoCheckmarkOutline className="w-4 h-4" />
                            <span>Approve</span>
                        </button>
                    </div>
                );
            }
        }
    ];

    // MAIN COMPONENT RENDER
    return (
        <div className="mt-4 bg-white rounded-lg p-6 relative">
            {/* FILTERS AND SEARCH SECTION */}
            <div className="bg-white p-4 rounded-lg mb-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Tab Navigation */}
                    <div className="flex border-b border-neutral-200">
                        <button
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'attendance'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                                }`}
                            onClick={() => handleTabChange('attendance')}
                        >
                            Attendance
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'leaveRequest'
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                                }`}
                            onClick={() => handleTabChange('leaveRequest')}
                        >
                            Leave Request
                        </button>
                    </div>

                    <span className="text-sm font-medium text-neutral-700">Filter by:</span>

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
                        placeholder="Status"
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
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700">
                            {selectedRows.length} item{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-primary-700 hover:text-primary-700 cursor-pointer"
                        >
                            Clear selection
                        </button>
                    </div>
                </div>
            )}

            {/* DATA TABLE SECTION */}
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
                    emptyMessage="No leave requests found"
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
};

export default LeaveRequestTable;