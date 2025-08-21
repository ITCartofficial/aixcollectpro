// import { useState, useMemo, useCallback, useRef, useEffect } from "react";
// import Badge from "../../../../../components/ui/Table/Badge";
// import DataTable, {
//   type TableColumn,
// } from "../../../../../components/ui/Table/DataTable";
// import Avatar from "../../../../../components/ui/Table/Avatar";
// import fieldAgentTaskData from "../../../../../../data/task-management/fieldAgentsTask.json";

// // Create a flexible version of RecentActivityItem for JSON data
// interface FlexibleRecentActivityItem {
//   type: string;
//   date: string;
//   description: string;
//   status: string;
// }

// interface AgentTaskTabProps {
//   agentData: {
//     agent: string;
//   };
// }

// interface FieldAgentsTask {
//   taskId: string;
//   borrowerName: string;
//   location: string;
//   docType?: string;
//   taskType: string;
//   status: string; // Changed from union type to string for flexibility
//   collectionStatus: string; // Changed from union type to string for flexibility
//   dueDate: string;
//   agent: string;
//   agentId?: string; // Added optional property that seems to exist in JSON
//   uploadedBy?: string;
//   lastUpdated: string;
//   confirmationStatus?: string; // Added optional property that seems to exist in JSON
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
//     recentActivity: Array<FlexibleRecentActivityItem>;
//   };
// }

// const AgentTaskTab: React.FC<AgentTaskTabProps> = ({ agentData }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const popupRef = useRef<HTMLDivElement>(null);
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
//       switch (status.toLowerCase()) {
//         case "completed":
//           return "success";
//         case "flagged":
//           return "danger";
//         case "pending":
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
//       switch (status.toLowerCase()) {
//         case "paid":
//         case "ptp":
//         case "ptpd":
//           return "success";
//         case "id":
//           return "info";
//         case "tnc":
//           return "warning";
//         case "fi":
//           return "danger";
//         case "no update":
//           return "secondary";
//         default:
//           return "secondary";
//       }
//     },
//     []
//   );

//   // Filter the tasks based on the agent passed in props and cast to our interface
//   const filteredData = useMemo(() => {
//     return fieldAgentTaskData.filter((task) => task.agent === agentData.agent) as FieldAgentsTask[];
//   }, [agentData.agent]);

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
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "taskType",
//         label: "Task Type",
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//       {
//         key: "status",
//         label: "Status",
//         render: (value: string) => (
//           <Badge variant={getStatusVariant(value)}>{value}</Badge>
//         ),
//       },
//       {
//         key: "collectionStatus",
//         label: "Collection Status",
//         align: "center",
//         render: (value: string) => (
//           <Badge variant={getCollectionStatusVariant(value)}>{value}</Badge>
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
//       {
//         key: "lastUpdated",
//         label: "Last Updated",
//         sortable: true,
//         render: (value: string) => (
//           <span className="text-sm font-normal">{value}</span>
//         ),
//       },
//     ],
//     [getStatusVariant, getCollectionStatusVariant]
//   );

//   return (
//     <div className="mt-4 bg-white h-max rounded-lg p-4">
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
//         pageSize={5}
//         className="shadow-sm"
//         emptyMessage="No tasks found for this agent"
//         getRowId={(row) => row.taskId} // Changed from row.agent to row.taskId for unique identification
//       />
//     </div>
//   );
// };

// export default AgentTaskTab;


import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable, {
  type TableColumn,
} from "../../../../../components/ui/Table/DataTable";
import Avatar from "../../../../../components/ui/Table/Avatar";
import fieldAgentTaskData from "../../../../../../data/task-management/fieldAgentsTask.json";

// Create a flexible version of RecentActivityItem for JSON data
interface FlexibleRecentActivityItem {
  type: string;
  date: string;
  description: string;
  status: string;
}

interface AgentTaskTabProps {
  agentData: {
    name: string; // Changed from 'agent' to 'name' to match fieldAgentData structure
    agentId: string;
  };
}

interface FieldAgentsTask {
  taskId: string;
  borrowerName: string;
  location: string;
  docType?: string;
  taskType: string;
  status: string; // Changed from union type to string for flexibility
  collectionStatus: string; // Changed from union type to string for flexibility
  dueDate: string;
  agent: string;
  agentId?: string; // Added optional property that seems to exist in JSON
  uploadedBy?: string;
  lastUpdated: string;
  confirmationStatus?: string; // Added optional property that seems to exist in JSON
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
    recentActivity: Array<FlexibleRecentActivityItem>;
  };
}

const AgentTaskTab: React.FC<AgentTaskTabProps> = ({ agentData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
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
      switch (status.toLowerCase()) {
        case "completed":
          return "success";
        case "flagged":
          return "danger";
        case "pending":
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
      switch (status.toLowerCase()) {
        case "paid":
        case "ptp":
        case "ptpd":
          return "success";
        case "id":
          return "info";
        case "tnc":
          return "warning";
        case "fi":
          return "danger";
        case "no update":
          return "secondary";
        default:
          return "secondary";
      }
    },
    []
  );

  // Filter the tasks based on the agent name from agentData
  const filteredData = useMemo(() => {
    console.log("Filtering tasks for agent:", agentData.name);
    console.log("Available tasks:", fieldAgentTaskData.map(task => ({ taskId: task.taskId, agent: task.agent })));
    
    const filtered = fieldAgentTaskData.filter((task) => task.agent === agentData.name) as FieldAgentsTask[];
    console.log("Filtered tasks:", filtered);
    
    return filtered;
  }, [agentData.name]);

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
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "taskType",
        label: "Task Type",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (value: string) => (
          <Badge variant={getStatusVariant(value)}>{value}</Badge>
        ),
      },
      {
        key: "collectionStatus",
        label: "Collection Status",
        align: "center",
        render: (value: string) => (
          <Badge variant={getCollectionStatusVariant(value)}>{value}</Badge>
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
      {
        key: "lastUpdated",
        label: "Last Updated",
        sortable: true,
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
    ],
    [getStatusVariant, getCollectionStatusVariant]
  );

  return (
    <div className="-mt-4 bg-white h-max rounded-lg p-4">
      {selectedRows.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} task{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={clearSelection}
              className="text-sm text-primary-700 hover:text-primary-700 cursor-pointer transition-colors duration-200"
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
        pageSize={5}
        className="shadow-sm"
        emptyMessage="No tasks found for this agent"
        getRowId={(row) => row.taskId}
      />
    </div>
  );
};

export default AgentTaskTab;







