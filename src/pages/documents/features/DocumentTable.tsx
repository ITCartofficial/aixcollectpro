// import { useState, useEffect } from "react";
// import type { TableColumn } from "../../../components/ui/Table/DataTable";
// import Avatar from "../../../components/ui/Table/Avatar";
// import Badge from "../../../components/ui/Table/Badge";
// import { FaEye } from "react-icons/fa";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";
// import DataTable from "../../../components/ui/Table/DataTable";

// interface DocVerificationTask {
//     taskId: string;
//     borrowerName: string;
//     docType: string;
//     status: 'Verified' | 'Rejected' | 'Pending' | 'Flagged';
//     uploadedBy: string;
//     lastUpdated: string;
//     avatar?: string;
// }

// const DocumentVerificationTaskTable: React.FC = () => {
//     const [docVerificationTask, setDocVerificationTask] = useState<DocVerificationTask[]>([]);
//     const [filteredData, setFilteredData] = useState<DocVerificationTask[]>([]);
//     const [selectedDocType, setSelectedDocType] = useState<string[]>([]);
//     const [selectedStatus, setSelectedStatus] = useState<string>('');
//     const [selectedLastUpdated, setSelectedLastUpdated] = useState<string>('');
//     const [selectedRows, setSelectedRows] = useState<DocVerificationTask[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Load document verification task data from JSON file
//     useEffect(() => {
//         const loadDocVerificationTask = async () => {
//             try {
//                 setIsLoading(true);
//                 const response = await fetch('../../../../data/document/documentVerificationTask.json');

//                 if (!response.ok) {
//                     throw new Error('Failed to load document verification task data');
//                 }

//                 const data: DocVerificationTask[] = await response.json();
//                 setDocVerificationTask(data);
//                 setFilteredData(data);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An error occurred');
//                 console.error('Error loading document verification task data:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadDocVerificationTask();
//     }, []);

//     // Filter options (computed based on loaded data)
//     const docTypeOptions = [
//         { label: 'All Documents', value: '' },
//         ...Array.from(new Set(docVerificationTask.map(task => task.docType).filter(docType => docType && docType.trim() !== ''))).map(docType => ({
//             label: docType,
//             value: docType
//         }))
//     ];

//     const statusOptions = [
//         { label: 'All Status', value: '' },
//         { label: 'Verified', value: 'Verified' },
//         { label: 'Rejected', value: 'Rejected' },
//         { label: 'Pending', value: 'Pending' },
//         { label: 'Flagged', value: 'Flagged' }
//     ];

//     const lastUpdatedOptions = [
//         { label: 'All Times', value: '' },
//         { label: 'Last Hour', value: 'last_hour' },
//         { label: 'Today', value: 'today' },
//         { label: 'This Week', value: 'this_week' }
//     ];

//     // Handle search
//     const handleSearch = (query: string) => {
//         let filtered = docVerificationTask;

//         if (query && query.trim() !== '') {
//             filtered = filtered.filter(task =>
//                 (task.borrowerName && task.borrowerName.toLowerCase().includes(query.toLowerCase())) ||
//                 (task.docType && task.docType.toLowerCase().includes(query.toLowerCase())) ||
//                 (task.uploadedBy && task.uploadedBy.toLowerCase().includes(query.toLowerCase())) ||
//                 (task.taskId && task.taskId.toLowerCase().includes(query.toLowerCase()))
//             );
//         }

//         // Apply filters
//         if (selectedDocType.length > 0) {
//             filtered = filtered.filter(task => task.docType && selectedDocType.includes(task.docType));
//         }

//         if (selectedStatus) {
//             filtered = filtered.filter(task => task.status === selectedStatus);
//         }

//         // Apply last updated filter
//         if (selectedLastUpdated) {
//             filtered = applyLastUpdatedFilter(filtered, selectedLastUpdated);
//         }

//         setFilteredData(filtered);
//     };

//     // Helper function to apply last updated filter
//     const applyLastUpdatedFilter = (data: DocVerificationTask[], filter: string) => {
//         const now = new Date();

//         switch (filter) {
//             case 'last_hour':
//                 return data.filter(task => {
//                     const taskDate = new Date(task.lastUpdated);
//                     const diffInHours = (now.getTime() - taskDate.getTime()) / (1000 * 60 * 60);
//                     return diffInHours <= 1;
//                 });
//             case 'today':
//                 return data.filter(task => {
//                     const taskDate = new Date(task.lastUpdated);
//                     return taskDate.toDateString() === now.toDateString();
//                 });
//             case 'this_week':
//                 return data.filter(task => {
//                     const taskDate = new Date(task.lastUpdated);
//                     const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//                     return taskDate >= startOfWeek;
//                 });
//             default:
//                 return data;
//         }
//     };

//     // Handle filter changes
//     const handleDocTypeChange = (value: string | string[]) => {
//         // If 'All Documents' is selected, clear all selections
//         if (Array.isArray(value) && value.includes('')) {
//             setSelectedDocType([]);
//             applyFilters([], selectedStatus, selectedLastUpdated);
//         } else {
//             const docTypeValues = Array.isArray(value) ? value : [value];
//             setSelectedDocType(docTypeValues);
//             applyFilters(docTypeValues, selectedStatus, selectedLastUpdated);
//         }
//     };

//     const handleStatusChange = (value: string | string[]) => {
//         const statusValue = Array.isArray(value) ? value[0] : value;
//         setSelectedStatus(statusValue);
//         applyFilters(selectedDocType, statusValue, selectedLastUpdated);
//     };

//     const handleLastUpdatedChange = (value: string | string[]) => {
//         const lastUpdatedValue = Array.isArray(value) ? value[0] : value;
//         setSelectedLastUpdated(lastUpdatedValue);
//         applyFilters(selectedDocType, selectedStatus, lastUpdatedValue);
//     };

//     const applyFilters = (docType: string[], status: string, lastUpdated: string) => {
//         let filtered = docVerificationTask;

//         // Handle doc type filter
//         if (docType.length > 0) {
//             filtered = filtered.filter(task => task.docType && docType.includes(task.docType));
//         }

//         // Handle status filter
//         if (status) {
//             filtered = filtered.filter(task => task.status === status);
//         }

//         // Handle last updated filter
//         if (lastUpdated) {
//             filtered = applyLastUpdatedFilter(filtered, lastUpdated);
//         }

//         setFilteredData(filtered);
//     };

//     const handleSelectionChange = (selected: DocVerificationTask[]) => {
//         setSelectedRows(selected);
//     };

//     const handleViewTask = (task: DocVerificationTask) => {
//         console.log('Viewing task:', task);
//         // Add your view logic here
//     };

//     // Table columns configuration
//     const columns: TableColumn<DocVerificationTask>[] = [
//         {
//             key: 'taskId',
//             label: 'Task Id',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'borrowerName',
//             label: 'Borrower Name',
//             sortable: true,
//             width: '200px',
//             render: (value, row) => (
//                 <div className="flex items-center space-x-3">
//                     <Avatar name={value} image={row.avatar} size="md" />
//                     <span className="font-medium text-gray-900">{value}</span>
//                 </div>
//             )
//         },
//         {
//             key: 'docType',
//             label: 'Doc Type',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'status',
//             label: 'Status',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => {
//                 const getVariant = (status: string) => {
//                     switch (status) {
//                         case 'Verified': return 'success';
//                         case 'Rejected': return 'danger';
//                         case 'Pending': return 'warning';
//                         case 'Flagged': return 'info';
//                         default: return 'info';
//                     }
//                 };
//                 return <Badge variant={getVariant(value)}>{value}</Badge>;
//             }
//         },
//         {
//             key: 'uploadedBy',
//             label: 'Uploaded By',
//             sortable: true,
//             width: '130px',
//             render: (value, row) => (
//                 <div className="flex items-center space-x-3">
//                     <Avatar name={value} image={row.avatar} size="md" />
//                     <span className="font-medium text-gray-900">{value}</span>
//                 </div>
//             )
//         },
//         {
//             key: 'lastUpdated',
//             label: 'Last Updated',
//             sortable: true,
//             width: '160px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'taskId',
//             label: 'Action',
//             sortable: false,
//             width: '100px',
//             className: 'text-center',
//             render: (_, row) => (
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleViewTask(row);
//                     }}
//                 >
//                     <FaEye className="w-4 h-4" />
//                     <span>View</span>
//                 </button>
//             )
//         }
//     ];

//     // Loading state
//     if (isLoading) {
//         return (
//             <div className="p-6 bg-gray-50 min-h-screen">
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//                 </div>
//             </div>
//         );
//     }

//     // Error state
//     if (error) {
//         return (
//             <div className="p-6 bg-gray-50 min-h-screen">
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <div className="flex">
//                         <div className="ml-3">
//                             <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
//                             <div className="mt-2 text-sm text-red-700">
//                                 <p>{error}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="mt-4 bg-white min-h-screen rounded-lg p-6">
//             {/* Filters and Search */}
//             <div className="bg-white p-4 rounded-lg">
//                 <div className="flex flex-wrap items-center gap-4">
//                     <span className="text-sm font-medium text-gray-700">Filter by:</span>

//                     <Dropdown
//                         options={docTypeOptions}
//                         value={selectedDocType}
//                         onChange={handleDocTypeChange}
//                         placeholder="Select Doc Type"
//                         className="min-w-48"
//                         multiSelect={true}
//                     />

//                     <Dropdown
//                         options={statusOptions}
//                         value={selectedStatus}
//                         onChange={handleStatusChange}
//                         placeholder="Select Status"
//                         className="min-w-48"
//                     />

//                     <Dropdown
//                         options={lastUpdatedOptions}
//                         value={selectedLastUpdated}
//                         onChange={handleLastUpdatedChange}
//                         placeholder="Select Time"
//                         className="min-w-48"
//                     />

//                     <div className="ml-auto">
//                         <SearchBar
//                             placeholder="Search tasks..."
//                             onSearch={handleSearch}
//                             className="w-64"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Selected Items Display */}
//             {selectedRows.length > 0 && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                     <div className="flex items-center justify-between">
//                         <span className="text-sm font-medium text-blue-900">
//                             {selectedRows.length} task{selectedRows.length > 1 ? 's' : ''} selected
//                         </span>
//                         <button
//                             onClick={() => setSelectedRows([])}
//                             className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
//                         >
//                             Clear selection
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Table */}
//             <DataTable
//                 data={filteredData}
//                 columns={columns}
//                 selectable={true}
//                 selectedRows={selectedRows}
//                 onSelectionChange={handleSelectionChange}
//                 sortable={true}
//                 pagination={true}
//                 pageSize={10}
//                 className="shadow-sm"
//                 emptyMessage="No document verification tasks found"
//                 getRowId={(row) => row.taskId}
//             />
//         </div>
//     );
// };

// export default DocumentVerificationTaskTable;












import { useState } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
// Import the static JSON data
import documentVerificationTaskData from "../../../../data/document/documentVerificationTask.json";

interface DocVerificationTask {
    taskId: string;
    borrowerName: string;
    docType: string;
    status: 'Verified' | 'Rejected' | 'Pending' | 'Flagged';
    uploadedBy: string;
    lastUpdated: string;
    avatar?: string;
}

const DocumentVerificationTaskTable: React.FC = () => {
    // Use imported data directly
    const docVerificationTask: DocVerificationTask[] = documentVerificationTaskData as DocVerificationTask[];
    const [filteredData, setFilteredData] = useState<DocVerificationTask[]>(docVerificationTask);
    const [selectedDocType, setSelectedDocType] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedLastUpdated, setSelectedLastUpdated] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<DocVerificationTask[]>([]);

    // Filter options (computed based on loaded data)
    const docTypeOptions = [
        { label: 'All Documents', value: '' },
        ...Array.from(new Set(docVerificationTask.map(task => task.docType).filter(docType => docType && docType.trim() !== ''))).map(docType => ({
            label: docType,
            value: docType
        }))
    ];

    const statusOptions = [
        { label: 'All Status', value: '' },
        { label: 'Verified', value: 'Verified' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Flagged', value: 'Flagged' }
    ];

    const lastUpdatedOptions = [
        { label: 'All Times', value: '' },
        { label: 'Last Hour', value: 'last_hour' },
        { label: 'Today', value: 'today' },
        { label: 'This Week', value: 'this_week' }
    ];

    // Handle search
    const handleSearch = (query: string) => {
        let filtered = docVerificationTask;

        if (query && query.trim() !== '') {
            filtered = filtered.filter(task =>
                (task.borrowerName && task.borrowerName.toLowerCase().includes(query.toLowerCase())) ||
                (task.docType && task.docType.toLowerCase().includes(query.toLowerCase())) ||
                (task.uploadedBy && task.uploadedBy.toLowerCase().includes(query.toLowerCase())) ||
                (task.taskId && task.taskId.toLowerCase().includes(query.toLowerCase()))
            );
        }

        // Apply filters
        if (selectedDocType.length > 0) {
            filtered = filtered.filter(task => task.docType && selectedDocType.includes(task.docType));
        }

        if (selectedStatus) {
            filtered = filtered.filter(task => task.status === selectedStatus);
        }

        // Apply last updated filter
        if (selectedLastUpdated) {
            filtered = applyLastUpdatedFilter(filtered, selectedLastUpdated);
        }

        setFilteredData(filtered);
    };

    // Helper function to apply last updated filter
    const applyLastUpdatedFilter = (data: DocVerificationTask[], filter: string) => {
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
    };

    // Handle filter changes
    const handleDocTypeChange = (value: string | string[]) => {
        // If 'All Documents' is selected, clear all selections
        if (Array.isArray(value) && value.includes('')) {
            setSelectedDocType([]);
            applyFilters([], selectedStatus, selectedLastUpdated);
        } else {
            const docTypeValues = Array.isArray(value) ? value : [value];
            setSelectedDocType(docTypeValues);
            applyFilters(docTypeValues, selectedStatus, selectedLastUpdated);
        }
    };

    const handleStatusChange = (value: string | string[]) => {
        const statusValue = Array.isArray(value) ? value[0] : value;
        setSelectedStatus(statusValue);
        applyFilters(selectedDocType, statusValue, selectedLastUpdated);
    };

    const handleLastUpdatedChange = (value: string | string[]) => {
        const lastUpdatedValue = Array.isArray(value) ? value[0] : value;
        setSelectedLastUpdated(lastUpdatedValue);
        applyFilters(selectedDocType, selectedStatus, lastUpdatedValue);
    };

    const applyFilters = (docType: string[], status: string, lastUpdated: string) => {
        let filtered = docVerificationTask;

        // Handle doc type filter
        if (docType.length > 0) {
            filtered = filtered.filter(task => task.docType && docType.includes(task.docType));
        }

        // Handle status filter
        if (status) {
            filtered = filtered.filter(task => task.status === status);
        }

        // Handle last updated filter
        if (lastUpdated) {
            filtered = applyLastUpdatedFilter(filtered, lastUpdated);
        }

        setFilteredData(filtered);
    };

    const handleSelectionChange = (selected: DocVerificationTask[]) => {
        setSelectedRows(selected);
    };

    const handleViewTask = (task: DocVerificationTask) => {
        console.log('Viewing task:', task);
        // Add your view logic here
    };

    // Table columns configuration
    const columns: TableColumn<DocVerificationTask>[] = [
        {
            key: 'taskId',
            label: 'Task Id',
            sortable: true,
            width: '120px',
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
                    <span className="font-medium text-neutral-700">{value}</span>
                </div>
            )
        },
        {
            key: 'docType',
            label: 'Doc Type',
            sortable: true,
            width: '120px',
            headerAlign: 'center',
            className: 'text-center',
            render: (value) => <span className="font-medium">{value}</span>
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: '120px',
            headerAlign:'center',
            className: 'text-center',
            render: (value) => {
                const getVariant = (status: string) => {
                    switch (status) {
                        case 'Verified': return 'success';
                        case 'Rejected': return 'danger';
                        case 'Pending': return 'warning';
                        case 'Flagged': return 'info';
                        default: return 'info';
                    }
                };
                return <Badge variant={getVariant(value)}>{value}</Badge>;
            }
        },
        {
            key: 'uploadedBy',
            label: 'Uploaded By',
            sortable: true,
            width: '130px',
            render: (value, row) => (
                <div className="flex items-center space-x-3">
                    <Avatar name={value} image={row.avatar} size="md" />
                    <span className="font-medium text-neutral-700">{value}</span>
                </div>
            )
        },
        {
            key: 'lastUpdated',
            label: 'Last Updated',
            sortable: true,
            headerAlign: 'center',
            className:"text-center",
            width: '160px',
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
                    className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewTask(row);
                    }}>
                    <FaEye className="w-4 h-4" />
                    <span>View</span>
                </button>
            )
        }
    ];


    return (
        <div className="mt-4 bg-white rounded-lg p-6">
            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-neutral-700">Filter by:</span>

                    <Dropdown
                        options={docTypeOptions}
                        value={selectedDocType}
                        onChange={handleDocTypeChange}
                        placeholder="Select Doc Type"
                        className="min-w-48"
                        multiSelect={true}/>

                    <Dropdown
                        options={statusOptions}
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="Select Status"
                        className="min-w-48"/>

                    <Dropdown
                        options={lastUpdatedOptions}
                        value={selectedLastUpdated}
                        onChange={handleLastUpdatedChange}
                        placeholder="Select Time"
                        className="min-w-48"/>

                    <div className="ml-auto">
                        <SearchBar
                            placeholder="Search tasks..."
                            onSearch={handleSearch}
                            className="w-64"
                        />
                    </div>
                </div>
            </div>

            {/* Selected Items Display */}
            {selectedRows.length > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700">
                            {selectedRows.length} task{selectedRows.length > 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={() => setSelectedRows([])}
                            className="text-sm text-primary-700 hover:text-primary-700 cursor-pointer">
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
                emptyMessage="No document verification tasks found"
                getRowId={(row) => row.taskId}
            />
        </div>
    );
};

export default DocumentVerificationTaskTable;