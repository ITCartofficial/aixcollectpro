// import { useState, useMemo, useCallback, useRef, useEffect } from "react";
// import Dropdown from "../../../components/common/Dropdown";
// import SearchBar from "../../../components/common/Searchbar";

// import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";
// import Avatar from "../../../components/ui/Table/Avatar";
// import DataTable, { type TableColumn } from "../../ui/Table/DataTable";
// import type { RecentActivityItem } from "../../ui/Table/ExpandedRowContent";
// import DateRangePickerInput from "../../ui/Input/DateRangePickerInput";
// import OutlineButton from "../../ui/Buttons/OutlineButton";
// import PrimaryButton from "../../ui/Buttons/PrimaryButton";

// interface FieldAgentsTask {
//   id: string;
//   taskId: string;
//   borrowerName: string;
//   location: string;
//   docType?: string;
//   taskType: "Collection" | "KYC";
//   status: "Completed" | "Pending" | "Flagged";
//   collectionStatus: "PTP" | "Paid" | "ID" | "PTPD" | "TNC" | "FI" | "No Update";
//   dueDate: string;
//   agent: string;
//   uploadedBy?: string;
//   lastUpdated: string;
//   avatar?: string;
//   agentAvatar?: string;
//   expandedDetails: {
//     taskDetails: {
//       recommendedTime: string;
//       notes: string;
//       amount: string;
//     };
//     loanInformation: {
//       loanCategory: string;
//       loanAmount: string;
//       loanNumber: string;
//       bankName: string;
//       netAmount: string;
//       dueDate: string;
//       pos: string;
//       tos: string;
//     };
//     recentActivity: Array<RecentActivityItem>;
//   };
// }

// interface FilterState {
//   agent: string[]; // <-- Multi-select
//   collectionStatus: string;
//   taskType: string;
//   dateRange: string;
//   location: string[]; // <-- Multi-select
//   searchQuery: string;
// }

// const AIEditFieldAgentTable: React.FC = () => {
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const popupRef = useRef<HTMLDivElement>(null);

//   const fieldTask: FieldAgentsTask[] = Array.isArray(fieldAgentTaskData)
//     ? (fieldAgentTaskData as any[]).map((task: any) => ({
//         ...task,
//         id: task.taskId || task.id,
//       }))
//     : [];

//   const [filters, setFilters] = useState<FilterState>({
//     agent: [""], // default: All
//     collectionStatus: "",
//     taskType: "",
//     dateRange: "",
//     location: [""], // default: All
//     searchQuery: "",
//   });

//   const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node)
//       ) {
//         setShowPopup(false);
//       }
//     };

//     if (showPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () =>
//         document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [showPopup]);

//   const filterOptions = useMemo(
//     () => ({
//       status: [
//         { label: "All", value: "" },
//         { label: "Completed", value: "Completed" },
//         { label: "Pending", value: "Pending" },
//         { label: "Flagged", value: "Flagged" },
//       ],
//       agent: [
//         { label: "All", value: "" },
//         ...Array.from(
//           new Set(
//             fieldTask
//               .map((task) => task.agent)
//               .filter((agent) => agent && agent !== "Unassigned")
//           )
//         ).map((agent) => ({ label: agent, value: agent })),
//       ],
//       collectionStatus: [
//         { label: "All", value: "" },
//         { label: "PTP", value: "PTP" },
//         { label: "Paid", value: "Paid" },
//         { label: "ID", value: "ID" },
//         { label: "PTPD", value: "PTPD" },
//         { label: "TNC", value: "TNC" },
//         { label: "FI", value: "FI" },
//         { label: "No Update", value: "No Update" },
//       ],
//       taskType: [
//         { label: "All", value: "" },
//         { label: "Collection", value: "Collection" },
//         { label: "KYC", value: "KYC" },
//       ],
//       dateRange: [
//         { label: "All", value: "" },
//         { label: "Today", value: "today" },
//         { label: "This Week", value: "this_week" },
//         { label: "This Month", value: "this_month" },
//       ],
//       location: [
//         { label: "All", value: "" },
//         ...Array.from(
//           new Set(
//             fieldTask
//               .map((task) => task.location)
//               .filter((location) => location)
//           )
//         ).map((location) => ({ label: location, value: location })),
//       ],
//     }),
//     [fieldTask]
//   );

//   // --- Multi-select filter handler for agent & location ---
//   const handleFilterChange = useCallback(
//     (filterType: keyof FilterState, value: string | string[]) => {
//       // For agent/location, handle multi-select and "All" option
//       if (filterType === "agent" || filterType === "location") {
//         let arr = Array.isArray(value) ? value : [value];
//         if (arr.includes("")) {
//           arr = [""];
//         } else {
//           arr = arr.filter((val) => val !== "");
//         }
//         setFilters((prev) => ({
//           ...prev,
//           [filterType]: arr,
//         }));
//       } else {
//         setFilters((prev) => ({
//           ...prev,
//           [filterType]: value,
//         }));
//       }
//     },
//     []
//   );

//   // --- Filtering logic ---
//   const filteredData = useMemo(() => {
//     let filtered = fieldTask;

//     // Search
//     if (filters.searchQuery && filters.searchQuery.trim() !== "") {
//       const query = filters.searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (task) =>
//           task.taskId?.toLowerCase().includes(query) ||
//           task.borrowerName?.toLowerCase().includes(query) ||
//           task.agent?.toLowerCase().includes(query)
//       );
//     }
//     // Filters
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value && key !== "searchQuery") {
//         if (key === "agent" || key === "location") {
//           const arr = value as string[];
//           if (arr.length > 0 && !arr.includes("")) {
//             filtered = filtered.filter((task) =>
//               arr.includes(task[key as keyof FieldAgentsTask] as string)
//             );
//           }
//         } else {
//           filtered = filtered.filter((task) => {
//             const taskValue = task[key as keyof FieldAgentsTask];
//             return taskValue === value;
//           });
//         }
//       }
//     });

//     return filtered;
//   }, [fieldTask, filters]);

//   // Other unchanged handlers...
//   const handleSearch = useCallback(
//     (query: string) => {
//       handleFilterChange("searchQuery", query);
//     },
//     [handleFilterChange]
//   );

//   const handleSelectionChange = useCallback((selected: FieldAgentsTask[]) => {
//     setSelectedRows(selected);
//   }, []);

//   const clearSelection = useCallback(() => {
//     setSelectedRows([]);
//   }, []);

//   const getStatusVariant = useCallback(
//     (
//       status: string
//     ): "success" | "warning" | "danger" | "info" | "secondary" => {
//       switch (status) {
//         case "Completed":
//           return "success";
//         case "Flagged":
//           return "danger";
//         case "Pending":
//           return "warning";
//         default:
//           return "info";
//       }
//     },
//     []
//   );

//   const getCollectionStatusVariant = useCallback(
//     (
//       status: string
//     ): "success" | "warning" | "danger" | "info" | "secondary" => {
//       switch (status) {
//         case "Paid":
//         case "PTP":
//         case "PTPD":
//           return "success";
//         case "ID":
//           return "info";
//         case "TNC":
//           return "warning";
//         case "FI":
//           return "danger";
//         case "No Update":
//           return "secondary";
//         default:
//           return "secondary";
//       }
//     },
//     []
//   );
//   const handleCancel = () => {};
//   const handleUploadAndAssign = () => {};
//   const columns: TableColumn<FieldAgentsTask>[] = useMemo(
//     () => [
//       {
//         key: "taskId",
//         label: "Task ID",
//         sortable: true,
//         width: "120px",
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "borrowerName",
//         label: "Borrower",
//         sortable: true,
//         render: (value: string, row: FieldAgentsTask) => (
//           <div className="flex items-center space-x-2">
//             <Avatar name={value} image={row.avatar} size="sm" />
//             <span className="text-sm font-normal">{value}</span>
//           </div>
//         ),
//       },
//       {
//         key: "location",
//         label: "Location",
//         sortable: true,
//         className: "text-left",
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "taskType",
//         label: "Task Type",
//         sortable: true,
//         headerAlign: "center",
//         className: "text-center",
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "dueDate",
//         label: "Due Date",
//         sortable: true,
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "agent",
//         label: "Agent",
//         sortable: true,
//         render: (value: string, row: FieldAgentsTask) => (
//           <div className="flex items-center space-x-2">
//             <Avatar name={value} image={row.agentAvatar} size="sm" />
//             <span className="text-sm font-normal">{value}</span>
//           </div>
//         ),
//       },
//     ],
//     [getStatusVariant, getCollectionStatusVariant]
//   );

//   return (
//     <div className="mt-4 bg-white h-max rounded-lg p-4">
//       {/* Filters and Search */}
//       <div className="flex flex-wrap items-center gap-4 p-4">
//         <span className="text-sm font-medium text-gray-700">Filter by:</span>
//         <Dropdown
//           options={filterOptions.agent}
//           value={filters.agent}
//           onChange={(value) => handleFilterChange("agent", value)}
//           placeholder="Agent"
//           className="w-44"
//           multiSelect={true}
//           searchable={true}
//         />
//         <Dropdown
//           options={filterOptions.collectionStatus}
//           value={filters.collectionStatus}
//           onChange={(value) => handleFilterChange("collectionStatus", value)}
//           placeholder="Collection Status"
//           className="w-40"
//         />
//         <Dropdown
//           options={filterOptions.taskType}
//           value={filters.taskType}
//           onChange={(value) => handleFilterChange("taskType", value)}
//           placeholder="Task Type"
//           className="w-30"
//         />
//         <DateRangePickerInput />
//         <Dropdown
//           options={filterOptions.location}
//           value={filters.location}
//           onChange={(value) => handleFilterChange("location", value)}
//           placeholder="Location"
//           className="w-40"
//           multiSelect={true}
//           searchable={true}
//         />
//         <div className="ml-auto">
//           <SearchBar
//             placeholder="Search"
//             onSearch={handleSearch}
//             className="w-56"
//           />
//         </div>
//       </div>

//       {/* Selected Items Display */}
//       {selectedRows.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-blue-900">
//               {selectedRows.length} task{selectedRows.length > 1 ? "s" : ""}{" "}
//               selected
//             </span>
//             <button
//               onClick={clearSelection}
//               className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer transition-colors duration-200"
//             >
//               Clear selection
//             </button>
//           </div>
//         </div>
//       )}
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
//         emptyMessage="No telecallers found"
//         getRowId={(row) => row.id}
//       />

//       <div className="flex justify-end gap-3 mt-4">
//         <OutlineButton text="Cancel" onClick={handleCancel} />
//         <PrimaryButton
//           text="Update"
//           onClick={handleUploadAndAssign}
//           className="bg-blue-600 hover:bg-blue-700 text-white"
//         />
//       </div>
//     </div>
//   );
// };

// export default AIEditFieldAgentTable;



import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";

import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";
import Avatar from "../../../components/ui/Table/Avatar";
import DataTable, { type TableColumn } from "../../ui/Table/DataTable";
import type { RecentActivityItem } from "../../ui/Table/ExpandedRowContent";
import DateRangePickerInput from "../../ui/Input/DateRangePickerInput";
import OutlineButton from "../../ui/Buttons/OutlineButton";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";

interface FieldAgentsTask {
  id: string;
  taskId: string;
  borrowerName: string;
  location: string;
  docType?: string;
  taskType: "Collection" | "KYC";
  status: "Completed" | "Pending" | "Flagged";
  collectionStatus: "PTP" | "Paid" | "ID" | "PTPD" | "TNC" | "FI" | "No Update";
  dueDate: string;
  agent: string;
  uploadedBy?: string;
  lastUpdated: string;
  avatar?: string;
  agentAvatar?: string;
  expandedDetails: {
    taskDetails: {
      recommendedTime: string;
      notes: string;
      amount: string;
    };
    loanInformation: {
      loanCategory: string;
      loanAmount: string;
      loanNumber: string;
      bankName: string;
      netAmount: string;
      dueDate: string;
      pos: string;
      tos: string;
    };
    recentActivity: Array<RecentActivityItem>;
  };
}

interface FilterState {
  agent: string[]; // <-- Multi-select
  collectionStatus: string;
  taskType: string;
  dateRange: string;
  location: string[]; // <-- Multi-select
  searchQuery: string;
}

interface AIEditFieldAgentTableProps {
  onCancel?: () => void; // Callback to go back to UploadAIComponent
  onUpdate?: (updatedData: any) => void; // Callback to update data and go back
}

const AIEditFieldAgentTable: React.FC<AIEditFieldAgentTableProps> = ({
  onCancel,
  onUpdate
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const fieldTask: FieldAgentsTask[] = Array.isArray(fieldAgentTaskData)
    ? (fieldAgentTaskData as any[]).map((task: any) => ({
        ...task,
        id: task.taskId || task.id,
      }))
    : [];

  const [filters, setFilters] = useState<FilterState>({
    agent: [""], // default: All
    collectionStatus: "",
    taskType: "",
    dateRange: "",
    location: [""], // default: All
    searchQuery: "",
  });

  const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPopup]);

  const filterOptions = useMemo(
    () => ({
      status: [
        { label: "All", value: "" },
        { label: "Completed", value: "Completed" },
        { label: "Pending", value: "Pending" },
        { label: "Flagged", value: "Flagged" },
      ],
      agent: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            fieldTask
              .map((task) => task.agent)
              .filter((agent) => agent && agent !== "Unassigned")
          )
        ).map((agent) => ({ label: agent, value: agent })),
      ],
      collectionStatus: [
        { label: "All", value: "" },
        { label: "PTP", value: "PTP" },
        { label: "Paid", value: "Paid" },
        { label: "ID", value: "ID" },
        { label: "PTPD", value: "PTPD" },
        { label: "TNC", value: "TNC" },
        { label: "FI", value: "FI" },
        { label: "No Update", value: "No Update" },
      ],
      taskType: [
        { label: "All", value: "" },
        { label: "Collection", value: "Collection" },
        { label: "KYC", value: "KYC" },
      ],
      dateRange: [
        { label: "All", value: "" },
        { label: "Today", value: "today" },
        { label: "This Week", value: "this_week" },
        { label: "This Month", value: "this_month" },
      ],
      location: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            fieldTask
              .map((task) => task.location)
              .filter((location) => location)
          )
        ).map((location) => ({ label: location, value: location })),
      ],
    }),
    [fieldTask]
  );

  // --- Multi-select filter handler for agent & location ---
  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string | string[]) => {
      // For agent/location, handle multi-select and "All" option
      if (filterType === "agent" || filterType === "location") {
        let arr = Array.isArray(value) ? value : [value];
        if (arr.includes("")) {
          arr = [""];
        } else {
          arr = arr.filter((val) => val !== "");
        }
        setFilters((prev) => ({
          ...prev,
          [filterType]: arr,
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [filterType]: value,
        }));
      }
    },
    []
  );

  // --- Filtering logic ---
  const filteredData = useMemo(() => {
    let filtered = fieldTask;

    // Search
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.taskId?.toLowerCase().includes(query) ||
          task.borrowerName?.toLowerCase().includes(query) ||
          task.agent?.toLowerCase().includes(query)
      );
    }
    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "searchQuery") {
        if (key === "agent" || key === "location") {
          const arr = value as string[];
          if (arr.length > 0 && !arr.includes("")) {
            filtered = filtered.filter((task) =>
              arr.includes(task[key as keyof FieldAgentsTask] as string)
            );
          }
        } else {
          filtered = filtered.filter((task) => {
            const taskValue = task[key as keyof FieldAgentsTask];
            return taskValue === value;
          });
        }
      }
    });

    return filtered;
  }, [fieldTask, filters]);

  // Other unchanged handlers...
  const handleSearch = useCallback(
    (query: string) => {
      handleFilterChange("searchQuery", query);
    },
    [handleFilterChange]
  );

  const handleSelectionChange = useCallback((selected: FieldAgentsTask[]) => {
    setSelectedRows(selected);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  const getStatusVariant = useCallback(
    (
      status: string
    ): "success" | "warning" | "danger" | "info" | "secondary" => {
      switch (status) {
        case "Completed":
          return "success";
        case "Flagged":
          return "danger";
        case "Pending":
          return "warning";
        default:
          return "info";
      }
    },
    []
  );

  const getCollectionStatusVariant = useCallback(
    (
      status: string
    ): "success" | "warning" | "danger" | "info" | "secondary" => {
      switch (status) {
        case "Paid":
        case "PTP":
        case "PTPD":
          return "success";
        case "ID":
          return "info";
        case "TNC":
          return "warning";
        case "FI":
          return "danger";
        case "No Update":
          return "secondary";
        default:
          return "secondary";
      }
    },
    []
  );

  // Updated handlers
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleUploadAndAssign = () => {
    // Prepare the updated data to send back
    const updatedAssignmentData = {
      selectedRows,
      filters,
      filteredData,
      totalTasks: filteredData.length,
      // Add any other relevant data you want to pass back
      lastUpdated: new Date().toISOString(),
    };

    // Call the onUpdate callback with the updated data
    if (onUpdate) {
      onUpdate(updatedAssignmentData);
    }
  };

  const columns: TableColumn<FieldAgentsTask>[] = useMemo(
    () => [
      {
        key: "taskId",
        label: "Task ID",
        sortable: true,
        width: "120px",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "borrowerName",
        label: "Borrower",
        sortable: true,
        render: (value: string, row: FieldAgentsTask) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.avatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
        ),
      },
      {
        key: "location",
        label: "Location",
        sortable: true,
        className: "text-left",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "taskType",
        label: "Task Type",
        sortable: true,
        headerAlign: "center",
        className: "text-center",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "dueDate",
        label: "Due Date",
        sortable: true,
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "agent",
        label: "Agent",
        sortable: true,
        render: (value: string, row: FieldAgentsTask) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.agentAvatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
        ),
      },
    ],
    [getStatusVariant, getCollectionStatusVariant]
  );

  return (
    <div className="mt-4 bg-white h-max rounded-lg p-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 p-4">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={filterOptions.agent}
          value={filters.agent}
          onChange={(value) => handleFilterChange("agent", value)}
          placeholder="Agent"
          className="w-44"
          multiSelect={true}
          searchable={true}
        />
        <Dropdown
          options={filterOptions.collectionStatus}
          value={filters.collectionStatus}
          onChange={(value) => handleFilterChange("collectionStatus", value)}
          placeholder="Collection Status"
          className="w-40"
        />
        <Dropdown
          options={filterOptions.taskType}
          value={filters.taskType}
          onChange={(value) => handleFilterChange("taskType", value)}
          placeholder="Task Type"
          className="w-30"
        />
        <DateRangePickerInput />
        <Dropdown
          options={filterOptions.location}
          value={filters.location}
          onChange={(value) => handleFilterChange("location", value)}
          placeholder="Location"
          className="w-40"
          multiSelect={true}
          searchable={true}
        />
        <div className="ml-auto">
          <SearchBar
            placeholder="Search"
            onSearch={handleSearch}
            className="w-56"
          />
        </div>
      </div>

      {/* Selected Items Display */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} task{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
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
        emptyMessage="No telecallers found"
        getRowId={(row) => row.id}
      />

      <div className="flex justify-end gap-3 mt-4">
        <OutlineButton text="Cancel" onClick={handleCancel} />
        <PrimaryButton
          text="Update"
          onClick={handleUploadAndAssign}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>
    </div>
  );
};

export default AIEditFieldAgentTable;
