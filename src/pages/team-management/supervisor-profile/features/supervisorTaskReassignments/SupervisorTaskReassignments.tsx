import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable, {
  type TableColumn,
} from "../../../../../components/ui/Table/DataTable";
import Avatar from "../../../../../components/ui/Table/Avatar";
import supervisorTaskReassignmentsData from "../../../../../../data/team-management/supervisorTaskReassignments.json";

// Create a flexible version of RecentActivityItem for JSON data
interface FlexibleRecentActivityItem {
  type: string;
  date: string;
  description: string;
  status: string;
}

interface SupervisorTaskReassignmentsProps {
  supervisorData?: {
    supervisor?: string;
  };
}

interface SupervisorTaskReassignment {
  taskId: string;
  borrowerName: string;
  taskType: string;
  oldAgent: string;
  status: string;
  collectionStatus: string;
  dueDate: string;
  newAgent: string;
  lastUpdated: string;
  avatar?: string;
  oldAgentAvatar?: string;
  newAgentAvatar?: string;
  reassignedBy?: string;
  reassignedDate?: string;
  reason?: string;
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

const SupervisorTaskReassignments: React.FC<SupervisorTaskReassignmentsProps> = ({ 
  supervisorData 
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<SupervisorTaskReassignment[]>([]);

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

  const handleSelectionChange = useCallback((selected: SupervisorTaskReassignment[]) => {
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

  // Use all data if no supervisor filter is provided, or filter by supervisor
  const filteredData = useMemo(() => {
    if (supervisorData?.supervisor) {
      return supervisorTaskReassignmentsData.filter(
        (task) => task.reassignedBy === supervisorData.supervisor
      ) as SupervisorTaskReassignment[];
    }
    return supervisorTaskReassignmentsData as SupervisorTaskReassignment[];
  }, [supervisorData?.supervisor]);

  const columns: TableColumn<SupervisorTaskReassignment>[] = useMemo(
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
        label: "Borrower Name",
        sortable: true,
        render: (value: string, row: SupervisorTaskReassignment) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.avatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
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
        key: "oldAgent",
        label: "Old Agent",
        sortable: true,
        render: (value: string, row: SupervisorTaskReassignment) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.oldAgentAvatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
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
        key: "newAgent",
        label: "New Agent",
        sortable: true,
        render: (value: string, row: SupervisorTaskReassignment) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.newAgentAvatar} size="sm" />
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
    <div className="mt-4 bg-white h-max rounded-lg p-4">
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} task reassignment{selectedRows.length > 1 ? "s" : ""}{" "}
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
        emptyMessage="No task reassignments found"
        getRowId={(row) => row.taskId}
      />
    </div>
  );
};

export default SupervisorTaskReassignments;