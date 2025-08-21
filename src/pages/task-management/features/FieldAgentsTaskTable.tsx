import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";
import ExpandableTable from "../../../components/ui/Table/ExpandableTable";
import type { TableColumn } from "../../../components/ui/Table/ExpandableTable";
import Badge from "../../../components/ui/Table/Badge";
import Avatar from "../../../components/ui/Table/Avatar";
import ExpandedRowContent, { type RecentActivityItem } from "../../../components/ui/Table/ExpandedRowContent";
import PopupMenu, { type PopupPosition } from "../../../components/ui/Table/PopupMenu";
import ModelsContainer from "./ModelsContainer";// <-- Import your ModelsContainer

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
    status: string;
    agent: string[];
    collectionStatus: string;
    taskType: string;
    dateRange: string;
    location: string[];
    searchQuery: string;
}

// --- Dropdown Options ---
const cityOptions = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Delhi", value: "Delhi" },
    { label: "Bengaluru", value: "Bengaluru" },
    { label: "Chennai", value: "Chennai" },
];
const stateOptions = [
    { label: "Maharashtra", value: "Maharashtra" },
    { label: "Karnataka", value: "Karnataka" },
    { label: "Tamil Nadu", value: "Tamil Nadu" },
    { label: "Delhi", value: "Delhi" },
];
const flagReasons = [
    { label: "Needs Escalation", value: "escalation" },
    { label: "Supervisor Attention", value: "supervisor" },
    { label: "Others", value: "others" },
];
const notesCategories = [
    { label: "Others", value: "others" },
    { label: "Progress Update", value: "progress" },
    { label: "Borrower Remark", value: "borrower" },
];

const popupMenuItems = [
    { label: "Mark as Complete", action: "mark_complete" },
    { label: "Reassign Task", action: "reassign" },
    { label: "Reschedule Visit", action: "reschedule" },
    { label: "Update Location", action: "update_location" },
    { label: "Edit Task", action: "edit" },
    { label: "Flag Task", action: "flag" },
    { label: "Add Notes", action: "add_notes" },
    { label: "Open in New Tab", action: "open_new_tab" },
    { label: "Delete Task", action: "delete" },
    { label: "Share Task Link", action: "share" },
];

const FieldAgentTaskTable: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<FieldAgentsTask | null>(null);
    const [popupPosition, setPopupPosition] = useState<PopupPosition>({ top: 0, left: 0 });
    const popupRef = useRef<HTMLDivElement>(null);

    // Modal logic is moved to ModelsContainer!
    const [activeModal, setActiveModal] = useState<
        | "reassign"
        | "reschedule"
        | "updateLocation"
        | "flag"
        | "addNotes"
        | "edit"
        | null
    >(null);

    // Pass selected task to modal
    // const [setModalTask] = useState<FieldAgentsTask | null>(null);

    // Handle popup actions to open ModelsContainer modal
    const handlePopupAction = useCallback(
        (action: string) => {
            if (!selectedTask) return;
            if (
                ["reassign", "reschedule", "update_location", "flag", "add_notes", "edit"].includes(action)
            ) {
                let modalKey: typeof activeModal = null;
                switch (action) {
                    case "reassign":
                        modalKey = "reassign";
                        break;
                    case "reschedule":
                        modalKey = "reschedule";
                        break;
                    case "update_location":
                        modalKey = "updateLocation";
                        break;
                    case "flag":
                        modalKey = "flag";
                        break;
                    case "add_notes":
                        modalKey = "addNotes";
                        break;
                    case "edit":
                        modalKey = "edit";
                        break;
                    default:
                        break;
                }
                setActiveModal(modalKey);
                // setModalTask(selectedTask);
                setShowPopup(false);
            }
            // ... other actions
        },
        [selectedTask]
    );

    const [filters, setFilters] = useState<FilterState>({
        status: "",
        agent: [""],
        collectionStatus: "",
        taskType: "",
        dateRange: "",
        location: [""],
        searchQuery: "",
    });

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

    const fieldTask: FieldAgentsTask[] = Array.isArray(fieldAgentTaskData)
        ? (fieldAgentTaskData as any[]).map((task: any) => ({
            ...task,
            id: task.taskId || task.id,
        }))
        : [];

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
                    new Set(fieldTask.map((task) => task.agent).filter((agent) => agent && agent !== "Unassigned"))
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
                ...Array.from(new Set(fieldTask.map((task) => task.location).filter((location) => location))).map(
                    (location) => ({ label: location, value: location })
                ),
            ],
        }),
        [fieldTask]
    );

    // Multi-select filter handler for agent & location
    const handleFilterChange = useCallback((filterType: keyof FilterState, value: string | string[]) => {
        if (filterType === "agent" || filterType === "location") {
            let arr = Array.isArray(value) ? value : [value];
            if (arr.includes("")) {
                arr = [""];
            } else {
                arr = arr.filter(val => val !== "");
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
    }, []);

    // Filtering logic
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

    const handleSearch = useCallback(
        (query: string) => {
            handleFilterChange("searchQuery", query);
        },
        [handleFilterChange]
    );

    const handleSelectionChange = useCallback((selected: FieldAgentsTask[]) => {
        setSelectedRows(selected);
    }, []);

    const handleRowAction = useCallback((action: string, task: FieldAgentsTask) => {
        if (action === "view") {
            console.log("Viewing task:", task);
        }
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedRows([]);
    }, []);

    const handleMenuClick = useCallback((task: FieldAgentsTask, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const popupWidth = 200;
        const leftPosition =
            rect.right + scrollX - popupWidth > 0 ? rect.right + scrollX - popupWidth : rect.left + scrollX;
        setPopupPosition({
            top: rect.bottom + scrollY + 5,
            left: leftPosition,
        });
        setSelectedTask(task);
        setShowPopup(true);
    }, []);

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setSelectedTask(null);
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

    const expandedRowRenderer = useCallback(
        (row: FieldAgentsTask) => (
            <ExpandedRowContent<FieldAgentsTask>
                row={row}
                getTaskDetails={(r) => r.expandedDetails?.taskDetails || {}}
                getLoanInformation={(r) => r.expandedDetails?.loanInformation || {}}
                getRecentActivity={(r) => r.expandedDetails?.recentActivity || []}
                onMenuClick={handleMenuClick}
            />
        ),
        [handleMenuClick]
    );

    const columns: TableColumn<FieldAgentsTask>[] = useMemo(
        () => [
            {
                key: "taskId",
                label: "Task ID",
                sortable: true,
                width: "120px",
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
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
                className: 'text-left',
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },
            {
                key: "taskType",
                label: "Task Type",
                sortable: true,
                headerAlign: 'center',
                className: 'text-center',
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },
            {
                key: "status",
                label: "Status",
                sortable: true,
                headerAlign: 'center',
                className: 'text-center',
                render: (value: string) => <Badge variant={getStatusVariant(value)}>{value}</Badge>,
            },
            {
                key: "collectionStatus",
                label: "Collection Status",
                className: 'text-center',
                sortable: true,
                render: (value: string) => <Badge variant={getCollectionStatusVariant(value)}>{value}</Badge>,
            },
            {
                key: "dueDate",
                label: "Due Date",
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
                key: "lastUpdated",
                label: "Last Updated",
                sortable: true,
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },
        ],
        [getStatusVariant, getCollectionStatusVariant]
    );

    return (
        <div className="mt-4 bg-white h-max rounded-lg p-4">
            {/* Filters and Search */}
            <div className="flex flex-wrap items-center gap-4 p-4">
                <span className="text-sm font-medium text-neutral-700 ">Filter by:</span>
                <Dropdown
                    options={filterOptions.status}
                    value={filters.status}
                    onChange={(value) => handleFilterChange("status", value)}
                    placeholder="Status"
                    className="w-32"
                />
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
                <div className="bg-primary-50 border border-neutral-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary-700">
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

            <ExpandableTable
                data={filteredData}
                columns={columns}
                expandedRowRenderer={expandedRowRenderer}
                onRowAction={handleRowAction}
                selectedRows={selectedRows}
                onSelectionChange={handleSelectionChange}
                pageSize={10}
                enableSelection={true}
                enableExpansion={true}
                sortable={true}
                pagination={true}
                getRowId={(row) => row.id}
                emptyMessage="No field agent tasks found."
            />

            {/* Popup Menu */}
            <PopupMenu
                isVisible={showPopup}
                position={popupPosition}
                onClose={closePopup}
                onAction={handlePopupAction}
                popupRef={popupRef}
                menuItems={popupMenuItems}
            />

            {/* ModelsContainer for all modals */}
            <ModelsContainer
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                // modalTask={modalTask}
                cityOptions={cityOptions}
                stateOptions={stateOptions}
                flagReasons={flagReasons}
                notesCategories={notesCategories}
                // You can pass more props as needed!
            />
        </div>
    );
};

export default FieldAgentTaskTable;