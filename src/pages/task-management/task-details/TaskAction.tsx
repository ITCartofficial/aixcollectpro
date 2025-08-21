
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";
import type { TableColumn } from "../../../components/ui/Table/ExpandableTable";
import Avatar from "../../../components/ui/Table/Avatar";
import DataTable from "../../../components/ui/Table/DataTable";

interface FieldAgentsTask {
    id: string;
    // taskId: string;
    borrowerName: string;
    // location: string;
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
            notes: string;
        };
    };
}


const TaskAction: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const fieldTask: FieldAgentsTask[] = Array.isArray(fieldAgentTaskData)
        ? (fieldAgentTaskData as any[]).map((task: any) => ({
            ...task,
            id: task.taskId || task.id,
        }))
        : [];

    const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showPopup]);




    const clearSelection = useCallback(() => {
        setSelectedRows([]);
    }, []);

    const getStatusVariant = useCallback(
        (status: string): "success" | "warning" | "danger" | "info" | "secondary" => {
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
        (status: string): "success" | "warning" | "danger" | "info" | "secondary" => {
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


    const columns: TableColumn<FieldAgentsTask>[] = useMemo(
        () => [
            {
                key: "dueDate",
                label: "Due Date",
                sortable: true,
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },

            {
                key: "taskType",
                label: "Task Type",
                sortable: true,
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
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
                key: "expandedDetails", // use a valid key from FieldAgentsTask
                label: "Notes",
                sortable: false,
                render: (_: any, row: FieldAgentsTask) => (
                    <span className="text-sm font-normal">
                        {row.expandedDetails?.taskDetails?.notes ?? "—"}
                    </span>
                ),
            }

        ],
        [getStatusVariant, getCollectionStatusVariant]
    );

    return (
        <div className=" bg-white h-max rounded-lg">
            {/* Filters and Search */}
            <div className="flex flex-wrap items-center gap-4">
                {/* <span className="text-sm font-medium text-gray-700">Filter by:</span> */}
                <div className="ml-auto">
                </div>
            </div>

            {/* Selected Items Display */}
            {selectedRows.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">
                            {selectedRows.length} task{selectedRows.length > 1 ? "s" : ""} selected
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
                data={fieldTask}
                columns={columns}
                selectable={true}
                selectedRows={selectedRows}
                // onSelectionChange={handleSelectionChange}
                sortable={true}
                pagination={false}
                pageSize={5}
                className="shadow-sm"
                emptyMessage="No agent response efficiency data found."
                getRowId={row => row.id}
            />
        </div>
    );
};

export default TaskAction;