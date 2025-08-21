// import { useState } from "react";
// import type { TableColumn } from "../../../components/ui/Table/DataTable";
// import Avatar from "../../../components/ui/Table/Avatar";
// import Badge from "../../../components/ui/Table/Badge";
// import { FaEye } from "react-icons/fa";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";
// import DataTable from "../../../components/ui/Table/DataTable";
// import fieldAgentTableData from "../../../../data/team-management/fieldAgentData.json";
// import { useNavigate } from "react-router-dom";

// interface FieldAgent {
//   id: string;
//   agentId: string;
//   name: string;
//   totalVisits: number;
//   paidVisits: number;
//   amountCollected: number;
//   location: string;
//   status: "On Road" | "In Active" | "On Leave";
//   lastSynced: string;
//   avatar?: string;
// }

// // Main Field Agents Component
// const FieldAgentsTable: React.FC = () => {
//   const fieldAgentsData: FieldAgent[] = fieldAgentTableData as FieldAgent[];

//   console.log(fieldAgentTableData);

//   // Initialize filteredData with the original data so it shows before any filters are applied
//   const [filteredData, setFilteredData] =
//     useState<FieldAgent[]>(fieldAgentsData);
//   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [selectedLastSynced, setSelectedLastSynced] = useState<string>("");
//   const [selectedRows, setSelectedRows] = useState<FieldAgent[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>(""); // Add search query state
//   const navigate = useNavigate();

//   // Filter options (computed based on loaded data)
//   const locationOptions = [
//     { label: "All Locations", value: "" },
//     ...Array.from(new Set(fieldAgentsData.map((agent) => agent.location))).map(
//       (location) => ({
//         label: location,
//         value: location,
//       })
//     ),
//   ];

//   const statusOptions = [
//     { label: "All Status", value: "" },
//     { label: "On Road", value: "On Road" },
//     { label: "In Active", value: "In Active" },
//     { label: "On Leave", value: "On Leave" },
//   ];

//   const lastSyncedOptions = [
//     { label: "All Times", value: "" },
//     { label: "Last Hour", value: "last_hour" },
//     { label: "Today", value: "today" },
//     { label: "This Week", value: "this_week" },
//   ];

//   // Unified function to apply all filters
//   const applyAllFilters = (
//     query: string = searchQuery,
//     location: string[] = selectedLocation,
//     status: string = selectedStatus,
//     lastSynced: string = selectedLastSynced
//   ) => {
//     let filtered = fieldAgentsData;

//     // Apply search filter
//     if (query) {
//       filtered = filtered.filter(
//         (agent) =>
//           agent.name.toLowerCase().includes(query.toLowerCase()) ||
//           agent.location.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Apply location filter
//     if (location.length > 0) {
//       filtered = filtered.filter((agent) => location.includes(agent.location));
//     }

//     // Apply status filter
//     if (status) {
//       filtered = filtered.filter((agent) => agent.status === status);
//     }

//     // Apply last synced filter
//     if (lastSynced) {
//       console.log("Filtering by lastSynced:", lastSynced);
//       // Add your last synced filtering logic here
//     }

//     setFilteredData(filtered);
//   };

//   // Handle search
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     applyAllFilters(
//       query,
//       selectedLocation,
//       selectedStatus,
//       selectedLastSynced
//     );
//   };

//   // Handle filter changes
//   const handleLocationChange = (value: string | string[]) => {
//     let locationValues: string[];

//     // If 'All Locations' is selected, clear all selections
//     if (Array.isArray(value) && value.includes("")) {
//       locationValues = [];
//     } else {
//       locationValues = Array.isArray(value) ? value : [value];
//     }

//     setSelectedLocation(locationValues);
//     applyAllFilters(
//       searchQuery,
//       locationValues,
//       selectedStatus,
//       selectedLastSynced
//     );
//   };

//   const handleStatusChange = (value: string | string[]) => {
//     const statusValue = Array.isArray(value) ? value[0] : value;
//     setSelectedStatus(statusValue);
//     applyAllFilters(
//       searchQuery,
//       selectedLocation,
//       statusValue,
//       selectedLastSynced
//     );
//   };

//   const handleLastSyncedChange = (value: string | string[]) => {
//     const lastSyncedValue = Array.isArray(value) ? value[0] : value;
//     setSelectedLastSynced(lastSyncedValue);
//     applyAllFilters(
//       searchQuery,
//       selectedLocation,
//       selectedStatus,
//       lastSyncedValue
//     );
//   };

//   const handleSelectionChange = (selected: FieldAgent[]) => {
//     setSelectedRows(selected);
//   };

//   const handleViewAgent = (agent: FieldAgent) => {
//     navigate(`/team-management/agent-profile/${agent.agentId}`);
//   };

//   // Table columns configuration
//   const columns: TableColumn<FieldAgent>[] = [
//     {
//       key: "name",
//       label: "Agent Name",
//       sortable: true,
//       width: "200px",
//       render: (value, row) => (
//         <div className="flex items-center space-x-3">
//           <Avatar name={value} image={row.avatar} size="md" />
//           <span className="font-medium text-gray-900">{value}</span>
//         </div>
//       ),
//     },
//     {
//       key: "totalVisits",
//       label: "Total Visits",
//       sortable: true,
//       width: "120px",
//       className: "text-center",
//       render: (value) => <span className="font-medium">{value}</span>,
//     },
//     {
//       key: "paidVisits",
//       label: "Paid Visits",
//       sortable: true,
//       width: "120px",
//       className: "text-center",
//       render: (value) => <span className="font-medium">{value}</span>,
//     },
//     {
//       key: "amountCollected",
//       label: "Amount Collected",
//       sortable: true,
//       width: "160px",
//       className: "text-center",
//       render: (value) => (
//         <span className="font-medium">₹{value.toLocaleString()}</span>
//       ),
//     },
//     {
//       key: "location",
//       label: "Location",
//       sortable: true,
//       width: "150px",
//       headerAlign: "center",
//       className: "text-center",
//       render: (value) => <span className="text-gray-700">{value}</span>,
//     },
//     {
//       key: "status",
//       label: "Status",
//       sortable: true,
//       width: "120px",
//       className: "text-center",
//       headerAlign: "center",
//       render: (value) => {
//         const variant =
//           value === "On Road"
//             ? "success"
//             : value === "In Active"
//             ? "danger"
//             : "info";
//         return <Badge variant={variant}>{value}</Badge>;
//       },
//     },
//     {
//       key: "lastSynced",
//       label: "Last Synced",
//       sortable: true,
//       width: "120px",
//       className: "text-center",
//       render: (value) => <span className="text-gray-600">{value}</span>,
//     },
//     {
//       key: "id",
//       label: "Action",
//       sortable: false,
//       width: "100px",
//       className: "text-center",
//       render: (_, row) => (
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleViewAgent(row);
//           }}
//         >
//           <FaEye className="w-4 h-4" />
//           <span>View</span>
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-4 bg-white rounded-lg p-6">
//       {/* Filters and Search */}
//       <div className="bg-white p-4 rounded-lg">
//         <div className="flex flex-wrap items-center gap-4">
//           <span className="text-sm font-medium text-gray-700">Filter by:</span>

//           <Dropdown
//             options={locationOptions}
//             value={selectedLocation}
//             onChange={handleLocationChange}
//             placeholder="Select Location"
//             className="min-w-48"
//             multiSelect={true}
//             searchable={true}
//           />

//           <Dropdown
//             options={statusOptions}
//             value={selectedStatus}
//             onChange={handleStatusChange}
//             placeholder="Select Status"
//             className="min-w-48"
//           />

//           <Dropdown
//             options={lastSyncedOptions}
//             value={selectedLastSynced}
//             onChange={handleLastSyncedChange}
//             placeholder="Select Time"
//             className="min-w-48"
//           />

//           <div className="ml-auto">
//             <SearchBar
//               placeholder="Search agents..."
//               onSearch={handleSearch}
//               className="w-64"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Selected Items Display */}
//       {selectedRows.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-blue-900">
//               {selectedRows.length} agent{selectedRows.length > 1 ? "s" : ""}{" "}
//               selected
//             </span>
//             <button
//               onClick={() => setSelectedRows([])}
//               className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
//             >
//               Clear selection
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <DataTable
//         data={filteredData}
//         columns={columns}
//         selectable={true}
//         selectedRows={selectedRows}
//         onSelectionChange={handleSelectionChange}
//         sortable={true}
//         pagination={true}
//         pageSize={10}
//         className="shadow-sm"
//         emptyMessage="No field agents found"
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// };

// export default FieldAgentsTable;



import React, { useState } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye, FaCalendarAlt } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import fieldAgentTableData from "../../../../data/team-management/fieldAgentData.json";
import { useNavigate } from "react-router-dom";
import AttendanceTable from "../../attendance-and-leave/features/AttendanceTable";

interface FieldAgent {
  id: string;
  agentId: string;
  name: string;
  totalVisits: number;
  paidVisits: number;
  amountCollected: number;
  location: string;
  status: "On Road" | "In Active" | "On Leave" | "online";
  lastSynced: string;
  avatar?: string;
  role?: string;
}

const FieldAgentsTable: React.FC = () => {
  const fieldAgentsData: FieldAgent[] = fieldAgentTableData as FieldAgent[];
  const [filteredData, setFilteredData] = useState<FieldAgent[]>(fieldAgentsData);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedLastSynced, setSelectedLastSynced] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<FieldAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAttendanceView, setShowAttendanceView] = useState<boolean>(false);
  const [selectedAgentForAttendance, setSelectedAgentForAttendance] = useState<string | null>(null);
  const navigate = useNavigate();

  // Filter options
  const locationOptions = [
    { label: "All Locations", value: "" },
    ...Array.from(new Set(fieldAgentsData.map((agent) => agent.location))).map(
      (location) => ({
        label: location,
        value: location,
      })
    ),
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "On Road", value: "On Road" },
    { label: "In Active", value: "In Active" },
    { label: "On Leave", value: "On Leave" },
    { label: "Online", value: "online" },
  ];

  const lastSyncedOptions = [
    { label: "All Times", value: "" },
    { label: "Last Hour", value: "last_hour" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
  ];

  const applyAllFilters = (
    query: string = searchQuery,
    location: string[] = selectedLocation,
    status: string = selectedStatus,
    lastSynced: string = selectedLastSynced
  ) => {
    let filtered = fieldAgentsData;

    if (query) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query.toLowerCase()) ||
          agent.location.toLowerCase().includes(query.toLowerCase()) ||
          agent.agentId.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location.length > 0) {
      filtered = filtered.filter((agent) => location.includes(agent.location));
    }

    if (status) {
      filtered = filtered.filter((agent) => agent.status === status);
    }

    if (lastSynced) {
      // Add last synced filtering logic here
      console.log("Filtering by lastSynced:", lastSynced);
    }

    setFilteredData(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyAllFilters(query, selectedLocation, selectedStatus, selectedLastSynced);
  };

  const handleLocationChange = (value: string | string[]) => {
    let locationValues: string[];
    if (Array.isArray(value) && value.includes("")) {
      locationValues = [];
    } else {
      locationValues = Array.isArray(value) ? value : [value];
    }
    setSelectedLocation(locationValues);
    applyAllFilters(searchQuery, locationValues, selectedStatus, selectedLastSynced);
  };

  const handleStatusChange = (value: string | string[]) => {
    const statusValue = Array.isArray(value) ? value[0] : value;
    setSelectedStatus(statusValue);
    applyAllFilters(searchQuery, selectedLocation, statusValue, selectedLastSynced);
  };

  const handleLastSyncedChange = (value: string | string[]) => {
    const lastSyncedValue = Array.isArray(value) ? value[0] : value;
    setSelectedLastSynced(lastSyncedValue);
    applyAllFilters(searchQuery, selectedLocation, selectedStatus, lastSyncedValue);
  };

  const handleSelectionChange = (selected: FieldAgent[]) => {
    setSelectedRows(selected);
  };

  const handleViewAgent = (agent: FieldAgent) => {
    navigate(`/team-management/agent-profile/${agent.agentId}`);
  };

  const handleViewAttendance = (agent: FieldAgent) => {
    setSelectedAgentForAttendance(agent.agentId);
    setShowAttendanceView(true);
  };

  const handleBackToAgents = () => {
    setShowAttendanceView(false);
    setSelectedAgentForAttendance(null);
  };

  // If showing attendance view, render the attendance table
  if (showAttendanceView && selectedAgentForAttendance) {
    const selectedAgent = fieldAgentsData.find(agent => agent.agentId === selectedAgentForAttendance);
    return (
      <div className="mt-4 bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Attendance Details - {selectedAgent?.name}
            </h2>
            <p className="text-sm text-gray-600">Agent ID: {selectedAgentForAttendance}</p>
          </div>
          <button
            onClick={handleBackToAgents}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            ← Back to Agents
          </button>
        </div>
        <AttendanceTable 
          selectedAgentId={selectedAgentForAttendance}
          onViewAgent={handleBackToAgents}
        />
      </div>
    );
  }

  // Table columns with attendance action
  const columns: TableColumn<FieldAgent>[] = [
    {
      key: "name",
      label: "Agent Name",
      sortable: true,
      width: "200px",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "agentId",
      label: "Agent ID",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: (value) => <span className="font-medium text-sm">{value}</span>,
    },
    {
      key: "totalVisits",
      label: "Total Visits",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "paidVisits",
      label: "Paid Visits",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "amountCollected",
      label: "Amount Collected",
      sortable: true,
      width: "160px",
      className: "text-center",
      render: (value) => (
        <span className="font-medium">₹{value.toLocaleString()}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      width: "150px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      width: "120px",
      className: "text-center",
      headerAlign: "center",
      render: (value) => {
        const variant =
          value === "On Road" || value === "online"
            ? "success"
            : value === "In Active"
            ? "danger"
            : "info";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      key: "lastSynced",
      label: "Last Synced",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: (value) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "id",
      label: "Actions",
      sortable: false,
      width: "160px",
      className: "text-center",
      render: (_, row) => (
        <div className="flex space-x-2 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleViewAgent(row);
            }}
            title="View Agent Profile"
          >
            <FaEye className="w-4 h-4" />
            <span>View</span>
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleViewAttendance(row);
            }}
            title="View Attendance"
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>Attend</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 bg-white rounded-lg p-6">
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-neutral-700">Filter by:</span>

          <Dropdown
            options={locationOptions}
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Select Location"
            className="min-w-48"
            multiSelect={true}
            searchable={true}
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
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} agent{selectedRows.length > 1 ? "s" : ""} selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-sm text-primary-700 hover:text-primary-900 cursor-pointer"
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
