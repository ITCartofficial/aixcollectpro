// Field Agent data loading from array


// import { useState } from "react";
// import type { TableColumn } from "../../../components/ui/Table/DataTable";
// import Avatar from "../../../components/ui/Table/Avatar";
// import Badge from "../../../components/ui/Table/Badge";
// import { FaEye } from "react-icons/fa";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";
// import DataTable from "../../../components/ui/Table/DataTable";

// interface FieldAgent {
//     id: string;
//     name: string;
//     totalVisits: number;
//     paidVisits: number;
//     amountCollected: number;
//     location: string;
//     status: 'On Road' | 'Inactive' | 'On Leave';
//     lastSynced: string;
//     avatar?: string;
// }

// // Sample Field Agent Data - EXPANDED for pagination testing
// const fieldAgentsData: FieldAgent[] = [
//     {
//         id: '1',
//         name: 'Rakesh Kumar',
//         totalVisits: 9,
//         paidVisits: 7,
//         amountCollected: 89000,
//         location: 'Koramangala',
//         status: 'On Road',
//         lastSynced: '10:22 AM',
//         avatar: ''
//     },
//     {
//         id: '2',
//         name: 'Ajay Singh',
//         totalVisits: 8,
//         paidVisits: 6,
//         amountCollected: 73500,
//         location: 'Indiranagar',
//         status: 'On Road',
//         lastSynced: '10:10 AM',
//         avatar: ''
//     },
//     {
//         id: '3',
//         name: 'Vinod Rao',
//         totalVisits: 7,
//         paidVisits: 5,
//         amountCollected: 69000,
//         location: 'Whitefield',
//         status: 'On Road',
//         lastSynced: '9:45 AM',
//         avatar: ''
//     },
//     {
//         id: '4',
//         name: 'Sameer Patil',
//         totalVisits: 10,
//         paidVisits: 8,
//         amountCollected: 92300,
//         location: 'Jayanagar',
//         status: 'Inactive',
//         lastSynced: '10:30 AM',
//         avatar: ''
//     },
//     {
//         id: '5',
//         name: 'Suresh Menon',
//         totalVisits: 6,
//         paidVisits: 4,
//         amountCollected: 55000,
//         location: 'Rajajinagar',
//         status: 'Inactive',
//         lastSynced: '10:12 AM',
//         avatar: ''
//     },
//     {
//         id: '6',
//         name: 'Arvind Desai',
//         totalVisits: 5,
//         paidVisits: 3,
//         amountCollected: 41800,
//         location: 'BTM Layout',
//         status: 'On Leave',
//         lastSynced: '9:50 AM',
//         avatar: ''
//     },
//     {
//         id: '7',
//         name: 'Pradeep Joshi',
//         totalVisits: 11,
//         paidVisits: 9,
//         amountCollected: 99700,
//         location: 'Malleshwaram',
//         status: 'On Road',
//         lastSynced: '10:35 AM',
//         avatar: ''
//     },
//     {
//         id: '8',
//         name: 'Harish Nayak',
//         totalVisits: 7,
//         paidVisits: 5,
//         amountCollected: 63000,
//         location: 'HSR Layout',
//         status: 'On Road',
//         lastSynced: '9:58 AM',
//         avatar: ''
//     },
//     {
//         id: '9',
//         name: 'Deepak Reddy',
//         totalVisits: 8,
//         paidVisits: 6,
//         amountCollected: 78500,
//         location: 'Marathahalli',
//         status: 'Inactive',
//         lastSynced: '10:20 AM',
//         avatar: ''
//     },
//     {
//         id: '10',
//         name: 'Nitin Babu',
//         totalVisits: 6,
//         paidVisits: 4,
//         amountCollected: 52400,
//         location: 'Yelahanka',
//         status: 'On Road',
//         lastSynced: '9:40 AM',
//         avatar: ''
//     },
//     // ADD MORE DATA FOR PAGINATION TESTING
//     {
//         id: '11',
//         name: 'Ravi Sharma',
//         totalVisits: 12,
//         paidVisits: 10,
//         amountCollected: 105000,
//         location: 'Koramangala',
//         status: 'On Road',
//         lastSynced: '10:45 AM',
//         avatar: ''
//     },
//     {
//         id: '12',
//         name: 'Manoj Gupta',
//         totalVisits: 9,
//         paidVisits: 7,
//         amountCollected: 84500,
//         location: 'Indiranagar',
//         status: 'On Road',
//         lastSynced: '10:25 AM',
//         avatar: ''
//     },
//     {
//         id: '13',
//         name: 'Kiran Patel',
//         totalVisits: 8,
//         paidVisits: 6,
//         amountCollected: 72000,
//         location: 'Whitefield',
//         status: 'Inactive',
//         lastSynced: '10:15 AM',
//         avatar: ''
//     },
//     {
//         id: '14',
//         name: 'Sanjay Kumar',
//         totalVisits: 10,
//         paidVisits: 8,
//         amountCollected: 95000,
//         location: 'Jayanagar',
//         status: 'On Road',
//         lastSynced: '10:40 AM',
//         avatar: ''
//     },
//     {
//         id: '15',
//         name: 'Vijay Singh',
//         totalVisits: 7,
//         paidVisits: 5,
//         amountCollected: 65000,
//         location: 'Rajajinagar',
//         status: 'On Leave',
//         lastSynced: '10:05 AM',
//         avatar: ''
//     }
// ];

// // Main Field Agents Component
// const FieldAgentsTable: React.FC = () => {
//     const [filteredData, setFilteredData] = useState<FieldAgent[]>(fieldAgentsData);
//     const [selectedLocation, setSelectedLocation] = useState<string>('');
//     const [selectedStatus, setSelectedStatus] = useState<string>('');
//     const [selectedLastSynced, setSelectedLastSynced] = useState<string>('');
//     const [selectedRows, setSelectedRows] = useState<FieldAgent[]>([]);



//     // Filter options
//     const locationOptions = [
//         { label: 'All Locations', value: '' },
//         ...Array.from(new Set(fieldAgentsData.map(agent => agent.location))).map(location => ({
//             label: location,
//             value: location
//         }))
//     ];

//     const statusOptions = [
//         { label: 'All Status', value: '' },
//         { label: 'On Road', value: 'On Road' },
//         { label: 'Inactive', value: 'Inactive' },
//         { label: 'On Leave', value: 'On Leave' }
//     ];

//     const lastSyncedOptions = [
//         { label: 'All Times', value: '' },
//         { label: 'Last Hour', value: 'last_hour' },
//         { label: 'Today', value: 'today' },
//         { label: 'This Week', value: 'this_week' }
//     ];

//     // Handle search
//     const handleSearch = (query: string) => {
//         let filtered = fieldAgentsData;

//         if (query) {
//             filtered = filtered.filter(agent =>
//                 agent.name.toLowerCase().includes(query.toLowerCase()) ||
//                 agent.location.toLowerCase().includes(query.toLowerCase())
//             );
//         }

//         // Apply filters
//         if (selectedLocation) {
//             filtered = filtered.filter(agent => agent.location === selectedLocation);
//         }

//         if (selectedStatus) {
//             filtered = filtered.filter(agent => agent.status === selectedStatus);
//         }

//         setFilteredData(filtered);
//     };

//     // Handle filter changes
//     const handleLocationChange = (value: string | string[]) => {
//         const locationValue = Array.isArray(value) ? value[0] : value;
//         setSelectedLocation(locationValue);
//         applyFilters(locationValue, selectedStatus, selectedLastSynced);
//     };

//     const handleStatusChange = (value: string | string[]) => {
//         const statusValue = Array.isArray(value) ? value[0] : value;
//         setSelectedStatus(statusValue);
//         applyFilters(selectedLocation, statusValue, selectedLastSynced);
//     };

//     const handleLastSyncedChange = (value: string | string[]) => {
//         const lastSyncedValue = Array.isArray(value) ? value[0] : value;
//         setSelectedLastSynced(lastSyncedValue);
//         applyFilters(selectedLocation, selectedStatus, lastSyncedValue);
//     };

//     const applyFilters = (location: string, status: string, lastSynced: string) => {
//         let filtered = fieldAgentsData;

//         if (location) {
//             filtered = filtered.filter(agent => agent.location === location);
//         }

//         if (status) {
//             filtered = filtered.filter(agent => agent.status === status);
//         }

//         if (lastSynced) {
//             console.log('Filtering by lastSynced:', lastSynced);
//         }

//         setFilteredData(filtered);
//     };

//     const handleSelectionChange = (selected: FieldAgent[]) => {
//         setSelectedRows(selected);
//         console.log('Selected agents:', selected);
//     };

//     // Table columns configuration
//     const columns: TableColumn<FieldAgent>[] = [
//         {
//             key: 'name',
//             label: 'Agent Name',
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
//             key: 'totalVisits',
//             label: 'Total Visits',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'paidVisits',
//             label: 'Paid Visits',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'amountCollected',
//             label: 'Amount Collected',
//             sortable: true,
//             width: '150px',
//             className: 'text-right',
//             render: (value) => <span className="font-medium">₹{value.toLocaleString()}</span>
//         },
//         {
//             key: 'location',
//             label: 'Location',
//             sortable: true,
//             width: '150px',
//             render: (value) => <span className="text-gray-700">{value}</span>
//         },
//         {
//             key: 'status',
//             label: 'Status',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => {
//                 const variant = value === 'On Road' ? 'success' : value === 'Inactive' ? 'danger' : 'info';
//                 return <Badge variant={variant}>{value}</Badge>;
//             }
//         },
//         {
//             key: 'lastSynced',
//             label: 'Last Synced',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="text-gray-600">{value}</span>
//         },
//         {
//             key: 'id',
//             label: 'Action',
//             sortable: false,
//             width: '100px',
//             className: 'text-center',
//             render: (_, row) => (
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center space-x-1"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleViewAgent(row);
//                     }}
//                 >
//                     <FaEye className="w-4 h-4" />
//                     <span>View</span>
//                 </button>
//             )
//         }
//     ];

//     const handleViewAgent = (agent: FieldAgent) => {
//         console.log('Viewing agent:', agent);
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-6">Field Agents</h1>



//                 {/* Filters and Search */}
//                 <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//                     <div className="flex flex-wrap items-center gap-4">
//                         <span className="text-sm font-medium text-gray-700">Filter by:</span>

//                         <Dropdown
//                             options={locationOptions}
//                             value={selectedLocation}
//                             onChange={handleLocationChange}
//                             placeholder="Select Location"
//                             className="min-w-48"
//                         />

//                         <Dropdown
//                             options={statusOptions}
//                             value={selectedStatus}
//                             onChange={handleStatusChange}
//                             placeholder="Select Status"
//                             className="min-w-48"
//                         />

//                         <Dropdown
//                             options={lastSyncedOptions}
//                             value={selectedLastSynced}
//                             onChange={handleLastSyncedChange}
//                             placeholder="Select Time"
//                             className="min-w-48"
//                         />

//                         <div className="ml-auto">
//                             <SearchBar
//                                 placeholder="Search agents..."
//                                 onSearch={handleSearch}
//                                 className="w-64"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Selected Items Display */}
//                 {selectedRows.length > 0 && (
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//                         <div className="flex items-center justify-between">
//                             <span className="text-sm font-medium text-blue-900">
//                                 {selectedRows.length} agent{selectedRows.length > 1 ? 's' : ''} selected
//                             </span>
//                             <button
//                                 onClick={() => setSelectedRows([])}
//                                 className="text-sm text-blue-700 hover:text-blue-900"
//                             >
//                                 Clear selection
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Table */}
//                 <DataTable
//                     data={filteredData}
//                     columns={columns}
//                     selectable={true}
//                     selectedRows={selectedRows}
//                     onSelectionChange={handleSelectionChange}
//                     sortable={true}
//                     pagination={true}
//                     pageSize={10}
//                     className="shadow-sm"
//                     emptyMessage="No field agents found"
//                     getRowId={(row) => row.id}
//                 />
//             </div>
//         </div>
//     );
// };

// export default FieldAgentsTable;




// ------------------------------------------------------------
// Telecaller data loading from external json file



// import { useState, useEffect } from "react";
// import type { TableColumn } from "../../../components/ui/Table/DataTable";
// import Avatar from "../../../components/ui/Table/Avatar";
// import Badge from "../../../components/ui/Table/Badge";
// import { FaEye } from "react-icons/fa";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";
// import DataTable from "../../../components/ui/Table/DataTable";

// interface Telecallers {
//     id: string;
//     name: string;
//     callsMade: number;
//     paidCases: number;
//     amountCollected: number;
//     language: string;
//     status: 'Active' | 'Inactive' | 'On Leave';
//     lastSynced: string;
//     avatar?: string;
// }

// // Main Telecallers Component
// const TelecallersTable: React.FC = () => {
//     const [telecallersData, setTelecallersData] = useState<Telecallers[]>([]);
//     const [filteredData, setFilteredData] = useState<Telecallers[]>([]);
//     const [selectedLanguage, setSelectedLanguage] = useState<string>('');
//     const [selectedStatus, setSelectedStatus] = useState<string>('');
//     const [selectedLastSynced, setSelectedLastSynced] = useState<string>('');
//     const [selectedRows, setSelectedRows] = useState<Telecallers[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // Load telecallers data from JSON file
//     useEffect(() => {
//         const loadTelecallersData = async () => {
//             try {
//                 setIsLoading(true);
//                 // Replace with the actual path to your JSON file
//                 const response = await fetch('/data/telecallersData.json');

//                 if (!response.ok) {
//                     throw new Error('Failed to load f telecallers data');
//                 }

//                 const data: Telecallers[] = await response.json();
//                 setTelecallersData(data);
//                 setFilteredData(data);
//             } catch (err) {
//                 setError(err instanceof Error ? err.message : 'An error occurred');
//                 console.error('Error loading telecallers data:', err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         loadTelecallersData();
//     }, []);

//     // Filter options (computed based on loaded data)
//     const languageOptions = [
//         { label: 'All Langauges', value: '' },
//         ...Array.from(new Set(telecallersData.map(agent => agent.language))).map(language => ({
//             label: language,
//             value: language
//         }))
//     ];

//     const statusOptions = [
//         { label: 'All Status', value: '' },
//         { label: 'Active', value: 'Active' },
//         { label: 'Inactive', value: 'Inactive' },
//         { label: 'On Leave', value: 'On Leave' }
//     ];

//     const lastSyncedOptions = [
//         { label: 'All Times', value: '' },
//         { label: 'Within Last 1 Hour', value: 'last_hour' },
//         { label: 'Today', value: 'today' },
//         { label: 'Yesterday', value: 'yesterday' },
//         { label: 'Past 3 Days', value: 'past_3_days' },
//         { label: 'Past Week', value: 'past_week' },
//         { label: 'Inactive (7+ Days)', value: 'inactive_7_days' }
//     ];

//     // Handle search
//     const handleSearch = (query: string) => {
//         let filtered = telecallersData;

//         if (query) {
//             filtered = filtered.filter(agent =>
//                 agent.name.toLowerCase().includes(query.toLowerCase()) ||
//                 agent.language.toLowerCase().includes(query.toLowerCase())
//             );
//         }

//         // Apply filters
//         if (selectedLanguage) {
//             filtered = filtered.filter(agent => agent.language === selectedLanguage);
//         }

//         if (selectedStatus) {
//             filtered = filtered.filter(agent => agent.status === selectedStatus);
//         }

//         setFilteredData(filtered);
//     };

//     // Handle filter changes
//     const handleLanguageChange = (value: string | string[]) => {
//         const locationValue = Array.isArray(value) ? value[0] : value;
//         setSelectedLanguage(locationValue);
//         applyFilters(locationValue, selectedStatus, selectedLastSynced);
//     };

//     const handleStatusChange = (value: string | string[]) => {
//         const statusValue = Array.isArray(value) ? value[0] : value;
//         setSelectedStatus(statusValue);
//         applyFilters(selectedLanguage, statusValue, selectedLastSynced);
//     };

//     const handleLastSyncedChange = (value: string | string[]) => {
//         const lastSyncedValue = Array.isArray(value) ? value[0] : value;
//         setSelectedLastSynced(lastSyncedValue);
//         applyFilters(selectedLanguage, selectedStatus, lastSyncedValue);
//     };

//     const applyFilters = (location: string, status: string, lastSynced: string) => {
//         let filtered = telecallersData;

//         if (location) {
//             filtered = filtered.filter(agent => agent.language === location);
//         }

//         if (status) {
//             filtered = filtered.filter(agent => agent.status === status);
//         }

//         if (lastSynced) {
//             console.log('Filtering by lastSynced:', lastSynced);
//             // Add your last synced filtering logic here
//         }

//         setFilteredData(filtered);
//     };

//     const handleSelectionChange = (selected: Telecallers[]) => {
//         setSelectedRows(selected);
//     };

//     const handleViewAgent = (agent: Telecallers) => {
//         console.log('Viewing agent:', agent);
//     };

//     // Table columns configuration
//     const columns: TableColumn<Telecallers>[] = [
//         {
//             key: 'name',
//             label: 'Name',
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
//             key: 'callsMade',
//             label: 'Calls Made',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'paidCases',
//             label: 'Paid Cases',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">{value}</span>
//         },
//         {
//             key: 'amountCollected',
//             label: 'Amount Collected',
//             sortable: true,
//             width: '160px',
//             className: 'text-center',
//             render: (value) => <span className="font-medium">₹{value.toLocaleString()}</span>
//         },
//         {
//             key: 'language',
//             label: 'Language',
//             sortable: true,
//             width: '150px',
//             className: "text-left",
//             render: (value) => <span className="text-gray-700">{value}</span>
//         },
//         {
//             key: 'status',
//             label: 'Status',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => {
//                 const variant = value === 'Active' ? 'success' : value === 'In Active' ? 'danger' : 'info';
//                 return <Badge variant={variant}>{value}</Badge>;
//             }
//         },
//         {
//             key: 'lastSynced',
//             label: 'Last Synced',
//             sortable: true,
//             width: '120px',
//             className: 'text-center',
//             render: (value) => <span className="text-gray-600">{value}</span>
//         },
//         {
//             key: 'id',
//             label: 'Action',
//             sortable: false,
//             width: '100px',
//             className: 'text-center',
//             render: (_, row) => (
//                 <button
//                     className="bg-primary-700 hover:bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         handleViewAgent(row);
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
//                         options={languageOptions}
//                         value={selectedLanguage}
//                         onChange={handleLanguageChange}
//                         placeholder="Select Location"
//                         className="min-w-48"
//                     />

//                     <Dropdown
//                         options={statusOptions}
//                         value={selectedStatus}
//                         onChange={handleStatusChange}
//                         placeholder="Select Status"
//                         className="min-w-48"
//                     />

//                     <Dropdown
//                         options={lastSyncedOptions}
//                         value={selectedLastSynced}
//                         onChange={handleLastSyncedChange}
//                         placeholder="Select Time"
//                         className="min-w-48"
//                     />

//                     <div className="ml-auto">
//                         <SearchBar
//                             placeholder="Search agents..."
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
//                             {selectedRows.length} agent{selectedRows.length > 1 ? 's' : ''} selected
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
//                 emptyMessage="No telecallers found"
//                 getRowId={(row) => row.id}
//             />
//         </div>
//     );
// };

// export default TelecallersTable;


















