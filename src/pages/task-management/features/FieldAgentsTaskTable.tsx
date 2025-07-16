import { useState, useMemo, useCallback } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
// Import the static JSON data
import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";

interface FieldAgentsTask {
    taskId: string;
    borrowerName: string;
    location: string;
    docType: string;
    taskType: 'Collection' | 'KYC';
    status: 'Completed' | 'Pending' | 'Flagged';
    collectionStatus: 'PTP' | 'Paid' | 'ID' | 'PTPD' | 'TNC' | 'FI';
    dueDate: string;
    agent: string;
    uploadedBy: string;
    lastUpdated: string;
    avatar?: string;
}

interface FilterState {
    status: string;
    collectionStatus: string;
    lastUpdated: string;
    searchQuery: string;
}

const FieldAgentTaskTable: React.FC = () => {
    // Use imported data directly
    const fieldTask: FieldAgentsTask[] = fieldAgentTaskData as FieldAgentsTask[];
    
    const [filters, setFilters] = useState<FilterState>({
        status: '',
        collectionStatus: '',
        lastUpdated: '',
        searchQuery: ''
    });
    
    const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);

    // Memoized filter options
    const filterOptions = useMemo(() => ({
        status: [
            { label: 'All Status', value: '' },
            { label: 'Completed', value: 'Completed' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Flagged', value: 'Flagged' }
        ],
        collectionStatus: [
            { label: 'All Collection Status', value: '' },
            { label: 'PTP', value: 'PTP' },
            { label: 'Paid', value: 'Paid' }, // Fixed typo: was 'PendinPaid'
            { label: 'ID', value: 'ID' },
            { label: 'PTPD', value: 'PTPD' },
            { label: 'TNC', value: 'TNC' },
            { label: 'FI', value: 'FI' },
            { label: 'No Update', value: 'No Update' },
        ],
        lastUpdated: [
            { label: 'All Times', value: '' },
            { label: 'Last Hour', value: 'last_hour' },
            { label: 'Today', value: 'today' },
            { label: 'This Week', value: 'this_week' }
        ]
    }), []);

    // Helper function to apply last updated filter
    const applyLastUpdatedFilter = useCallback((data: FieldAgentsTask[], filter: string) => {
        if (!filter) return data;

        const now = new Date();
        
        switch (filter) {
            case 'last_hour':
                return data.filter(task => {
                    const taskDate = new Date(task.lastUpdated);
                    const diffInHours = (now.getTime() - taskDate.getTime()) / (1000 * 60 * 60);
                    return diffInHours <= 1;
                });
            case 'today':
                return data.filter(task => {
                    const taskDate = new Date(task.lastUpdated);
                    return taskDate.toDateString() === now.toDateString();
                });
            case 'this_week':
                return data.filter(task => {
                    const taskDate = new Date(task.lastUpdated);
                    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    return taskDate >= startOfWeek;
                });
            default:
                return data;
        }
    }, []);

    // Memoized filtered data
    const filteredData = useMemo(() => {
        let filtered = fieldTask;

        // Apply search filter - Only search by taskId, borrowerName, and agent
        if (filters.searchQuery && filters.searchQuery.trim() !== '') {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(task =>
                task.taskId?.toLowerCase().includes(query) ||
                task.borrowerName?.toLowerCase().includes(query) ||
                task.agent?.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (filters.status) {
            filtered = filtered.filter(task => task.status === filters.status);
        }

        // Apply collection status filter (Fixed the bug here)
        if (filters.collectionStatus) {
            filtered = filtered.filter(task => task.collectionStatus === filters.collectionStatus);
        }

        // Apply last updated filter
        if (filters.lastUpdated) {
            filtered = applyLastUpdatedFilter(filtered, filters.lastUpdated);
        }

        return filtered;
    }, [fieldTask, filters, applyLastUpdatedFilter]);

    // Optimized filter handlers using useCallback
    const handleFilterChange = useCallback((filterType: keyof FilterState, value: string | string[]) => {
        const filterValue = Array.isArray(value) ? value[0] : value;
        setFilters(prev => ({
            ...prev,
            [filterType]: filterValue
        }));
    }, []);

    const handleStatusChange = useCallback((value: string | string[]) => {
        handleFilterChange('status', value);
    }, [handleFilterChange]);

    const handleCollectionStatusChange = useCallback((value: string | string[]) => {
        handleFilterChange('collectionStatus', value);
    }, [handleFilterChange]);

    const handleLastUpdatedChange = useCallback((value: string | string[]) => {
        handleFilterChange('lastUpdated', value);
    }, [handleFilterChange]);

    const handleSearch = useCallback((query: string) => {
        handleFilterChange('searchQuery', query);
    }, [handleFilterChange]);

    const handleSelectionChange = useCallback((selected: FieldAgentsTask[]) => {
        setSelectedRows(selected);
    }, []);

    const handleViewTask = useCallback((task: FieldAgentsTask) => {
        console.log('Viewing task:', task);
        // Add your view logic here
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedRows([]);
    }, []);

    // Memoized badge variant functions
    const getStatusVariant = useCallback((status: string) => {
        switch (status) {
            case 'Completed': return 'success';
            case 'Flagged': return 'danger';
            case 'Pending': return 'warning';
            default: return 'info';
        }
    }, []);

    const getCollectionStatusVariant = useCallback((status: string) => {
        switch (status) {
            case 'PTP':
            case 'Paid':
            case 'ID':
            case 'PTPD':
            case 'TNC':
            case 'FI':
                return 'success';
            default:
                return 'secondary';
        }
    }, []);

    // Memoized table columns configuration
    const columns: TableColumn<FieldAgentsTask>[] = useMemo(() => [
        {
            key: 'taskId',
            label: 'Task Id',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'borrowerName',
            label: 'Borrower Name',
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
            key: 'location',
            label: 'Location',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'taskType',
            label: 'Task Type',
            sortable: false,
            width: '120px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <Badge variant={getStatusVariant(value)}>{value}</Badge>
        },
        {
            key: 'collectionStatus',
            label: 'Collection Status',
            sortable: true,
            width: '120px',
            className: 'text-center',
            render: (value) => <Badge variant={getCollectionStatusVariant(value)}>{value}</Badge>
        },
        {
            key: 'dueDate',
            label: 'Due Date',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'agent',
            label: 'Agent',
            sortable: true,
            width: '130px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-gray-900">{value}</span>
                </div>
            )
        },
        {
            key: 'lastUpdated',
            label: 'Last Updated',
            sortable: true,
            width: '160px',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'taskId',
            label: 'Action',
            sortable: false,
            width: '100px',
            className: 'text-center',
            render: (_, row) => (
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer transition-colors duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewTask(row);
                    }}
                >
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                </button>
            )
        }
    ], [getStatusVariant, getCollectionStatusVariant, handleViewTask]);

    return (
        <div className="mt-4 bg-white min-h-screen rounded-lg p-6">
            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">Filter by:</span>
                    <Dropdown
                        options={filterOptions.status}
                        value={filters.status}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        className="min-w-48"
                    />
                    <Dropdown
                        options={filterOptions.collectionStatus}
                        value={filters.collectionStatus}
                        onChange={handleCollectionStatusChange}
                        placeholder="Select Collection Status"
                        className="min-w-48"
                    />
                    <Dropdown
                        options={filterOptions.lastUpdated}
                        value={filters.lastUpdated}
                        onChange={handleLastUpdatedChange}
                        placeholder="Select Time"
                        className="min-w-48"
                    />
                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search by Task ID, Borrower Name, or Agent..."
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
                            {selectedRows.length} task{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={clearSelection}
                            className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer transition-colors duration-200"
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
                emptyMessage="No field tasks found."
                getRowId={(row) => row.taskId}
            />
        </div>
    );
};

export default FieldAgentTaskTable;