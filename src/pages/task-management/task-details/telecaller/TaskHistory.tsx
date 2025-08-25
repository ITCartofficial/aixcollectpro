import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import fieldAgentTaskData from "../../../../../data/task-management/telecallersTaskData.json";
// import ExpandableTable from "../../../components/ui/Table/ExpandableTable";
import DataTable from "../../../../components/ui/Table/DataTable";
import type { TableColumn } from "../../../../components/ui/Table/ExpandableTable";
import Badge from "../../../../components/ui/Table/Badge";

interface TaskHistoryProps {
  taskId?: string;
  taskData?: any;
}
interface TaskHistory {
  id: string;
  taskId:string;
  status: "Completed" | "Pending" | "Flagged";
  dueDate: string;
  collectionStatus: "PTP" | "Paid" | "ID" | "PTPD" | "TNC" | "FI" | "No Update";
  agent: string;
  uploadedBy?: string;
  lastUpdated: string;
  avatar?: string;
  agentAvatar?: string;
  AddedDate: string;
  Notes: string;
  keyActionTaken: string;
  actionTakes: string;
  expandedDetails: {
    taskDetails: {
      notes: string;
    };
  };
}

const TaskHistory: React.FC<TaskHistoryProps> = ({ taskId, taskData }) => {
  console.log("I am task history",taskId)
  console.log("I am task history",taskData)
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const allTasks: TaskHistory[] = Array.isArray(fieldAgentTaskData)
    ? (fieldAgentTaskData as any[]).map((task: any) => ({
        ...task,
        id: task.taskId || task.id,
      }))
    : [];
  const data = useMemo(() => {
    if (taskId) {
      return allTasks.filter(
        (task) => task.taskId === taskId || task.id === taskId
      );
    }
    if (taskData) {
      return [taskData];
    }
    return allTasks;
  }, [taskId, taskData, allTasks]);

  const [selectedRows, setSelectedRows] = useState<TaskHistory[]>([]);

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

  const columns: TableColumn<TaskHistory>[] = useMemo(
    () => [
      {
        key: "dueDate",
        label: "Due Date",
        sortable: true,
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "collectionStatus",
        label: "Collection Status",
        align: "center",
        sortable: true,
        render: (value: string) => (
          <Badge variant={getCollectionStatusVariant(value)}>{value}</Badge>
        ),
      },
      {
        key: "actionTakes",
        label: "Action Takes",
        className: "text-left font-medium",
        render: (value) => <span className="font-medium">{value}</span>,
      },
      {
        key: "expandedDetails",
        label: "Notes",
        sortable: false,
        render: (_: any, row: TaskHistory) => (
          <span className="text-sm font-normal">
            {row.expandedDetails?.taskDetails?.notes ?? "—"}
          </span>
        ),
      },
    ],
    [getStatusVariant, getCollectionStatusVariant]
  );

  return (
    <div className="mt-4 bg-white h-max rounded-lg ">
      <div className="flex flex-wrap items-center gap-4 "></div>
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
        data={data}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        sortable={true}
        pagination={false}
        pageSize={5}
        className="shadow-sm"
        emptyMessage="No agent response efficiency data found."
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default TaskHistory;
