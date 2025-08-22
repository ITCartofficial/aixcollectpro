import { useState, useMemo, useCallback } from "react";
import DataTable, {
  type TableColumn,
} from "../../../../../components/ui/Table/DataTable";
import Avatar from "../../../../../components/ui/Table/Avatar";
import rawData from "../../../../../../data/task-management/fieldAgentsTask.json";
import { FaStar } from "react-icons/fa";
import type { FieldAgentsTask } from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes";

interface agenttaskfeedbackProps {
  agentData: any;
}

const AgentTaskFeedback: React.FC<agenttaskfeedbackProps> = ({ agentData }) => {
  
  const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);
  const fieldAgentTaskData = rawData as FieldAgentsTask[];

  const agentSpecificData = useMemo(() => {
    if (!agentData || !agentData.name) {
      return fieldAgentTaskData;
    }
    return fieldAgentTaskData.filter((task) => task.agent === agentData.name);
  }, [agentData, fieldAgentTaskData]);

  const handleSelectionChange = (selected: FieldAgentsTask[]) => {
    setSelectedRows(selected);
  };

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={i < rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
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
        label: "Borrower Name",
        sortable: true,
        render: (value: string, row: FieldAgentsTask) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.avatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
        ),
      },
      {
        key: "confirmationStatus",
        label: "Confirmation Status",
        render: (value: string) => (
          <span className="text-sm font-normal">
            {value && value.trim() ? value : "No show"}
          </span>
        ),
      },
      {
        key: "rating",
        label: "Rating",
        render: (value?: number) =>
          value != null && value > 0 ? (
            renderStars(value)
          ) : (
            <span className="text-gray-400">NA</span>
          ),
      },
      {
        key: "comments",
        label: "Comments",
        render: (value?: string) => (
          <span
            className={`text-sm font-normal ${
              !value?.trim() ? "text-gray-400" : ""
            }`}
          >
            {value && value.trim() ? value : "NA"}
          </span>
        ),
      },
      {
        key: "submittedDate",
        label: "Submitted Date",
        sortable: true,
        render: (value?: string) => (
          <span
            className={`text-sm font-normal ${
              !value?.trim() ? "text-gray-400" : ""
            }`}
          >
            {value && value.trim() ? value : "NA"}
          </span>
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
    ],
    []
  );

  return (
    <div className="bg-white h-max rounded-lg">
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
        data={agentSpecificData}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        sortable={true}
        pagination={true}
        pageSize={5}
        className="shadow-sm"
        emptyMessage={
          agentData 
            ? `No task feedback found for ${agentData.name}` 
            : "No tasks found for this agent"
        }
        getRowId={(row) => row.taskId}
      />
    </div>
  );
};

export default AgentTaskFeedback;