import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";

// Import the enhanced JSON data
import fieldAgentTaskData from "../../../../data/task-management/fieldAgentsTask.json";
import ExpandableTable from "../../../components/ui/Table/ExpandableTable";
import type { TableColumn } from "../../../components/ui/Table/ExpandableTable";
import Badge from "../../../components/ui/Table/Badge";
import Avatar from "../../../components/ui/Table/Avatar";
import ExpandedRowContent, { type RecentActivityItem } from "../../../components/ui/Table/ExpandedRowContent";
import PopupMenu, { type PopupPosition } from "../../../components/ui/Table/PopupMenu";


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
    agent: string;
    collectionStatus: string;
    taskType: string;
    dateRange: string;
    location: string;
    searchQuery: string;
}

// Popup Menu items config, can be shared for other tables
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
    // Popup related state
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<FieldAgentsTask | null>(null);
    const [popupPosition, setPopupPosition] = useState<PopupPosition>({ top: 0, left: 0 });
    const popupRef = useRef<HTMLDivElement>(null);

    // Transform the data to include id field for ExpandableTable compatibility
    const fieldTask: FieldAgentsTask[] = Array.isArray(fieldAgentTaskData)
        ? (fieldAgentTaskData as any[]).map((task: any) => ({
              ...task,
              id: task.taskId || task.id,
          }))
        : [];

    const [filters, setFilters] = useState<FilterState>({
        status: "",
        agent: "",
        collectionStatus: "",
        taskType: "",
        dateRange: "",
        location: "",
        searchQuery: "",
    });

    const [selectedRows, setSelectedRows] = useState<FieldAgentsTask[]>([]);

    // Close popup when clicking outside
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

    // Memoized filter options
    const filterOptions = useMemo(
        () => ({
            status: [
                { label: "All Status", value: "" },
                { label: "Completed", value: "Completed" },
                { label: "Pending", value: "Pending" },
                { label: "Flagged", value: "Flagged" },
            ],
            agent: [
                { label: "All Agents", value: "" },
                ...Array.from(
                    new Set(fieldTask.map((task) => task.agent).filter((agent) => agent && agent !== "Unassigned"))
                ).map((agent) => ({ label: agent, value: agent })),
            ],
            collectionStatus: [
                { label: "All Collection Status", value: "" },
                { label: "PTP", value: "PTP" },
                { label: "Paid", value: "Paid" },
                { label: "ID", value: "ID" },
                { label: "PTPD", value: "PTPD" },
                { label: "TNC", value: "TNC" },
                { label: "FI", value: "FI" },
                { label: "No Update", value: "No Update" },
            ],
            taskType: [
                { label: "All Task Types", value: "" },
                { label: "Collection", value: "Collection" },
                { label: "KYC", value: "KYC" },
            ],
            dateRange: [
                { label: "All Dates", value: "" },
                { label: "Today", value: "today" },
                { label: "This Week", value: "this_week" },
                { label: "This Month", value: "this_month" },
            ],
            location: [
                { label: "All Locations", value: "" },
                ...Array.from(new Set(fieldTask.map((task) => task.location).filter((location) => location))).map(
                    (location) => ({ label: location, value: location })
                ),
            ],
        }),
        [fieldTask]
    );

    // Memoized filtered data
    const filteredData = useMemo(() => {
        let filtered = fieldTask;

        // Apply search filter
        if (filters.searchQuery && filters.searchQuery.trim() !== "") {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
                (task) =>
                    task.taskId?.toLowerCase().includes(query) ||
                    task.borrowerName?.toLowerCase().includes(query) ||
                    task.agent?.toLowerCase().includes(query)
            );
        }

        // Apply all filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value && key !== "searchQuery") {
                filtered = filtered.filter((task) => {
                    const taskValue = task[key as keyof FieldAgentsTask];
                    return taskValue === value;
                });
            }
        });

        return filtered;
    }, [fieldTask, filters]);

    // Filter handlers
    const handleFilterChange = useCallback((filterType: keyof FilterState, value: string | string[]) => {
        const filterValue = Array.isArray(value) ? value[0] : value;
        setFilters((prev) => ({
            ...prev,
            [filterType]: filterValue,
        }));
    }, []);

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

    // Handle 3-dot menu click
    const handleMenuClick = useCallback((task: FieldAgentsTask, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        // Calculate popup position
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;

        // Calculate position to ensure popup stays within viewport
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

    // Handle popup actions
    const handlePopupAction = useCallback(
        (action: string) => {
            if (!selectedTask) return;

            console.log(`Action: ${action} for task:`, selectedTask.taskId);

            // Actual implementation for each action goes here
        },
        [selectedTask]
    );

    const closePopup = useCallback(() => {
        setShowPopup(false);
        setSelectedTask(null);
    }, []);

    // Badge variant functions
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

    // Expanded row renderer (pass mapping functions to generic ExpandedRowContent)
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

    // Define table columns
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
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },
            {
                key: "taskType",
                label: "Task Type",
                sortable: true,
                render: (value: string) => <span className="text-sm font-normal">{value}</span>,
            },
            {
                key: "status",
                label: "Status",
                sortable: true,
                render: (value: string) => <Badge variant={getStatusVariant(value)}>{value}</Badge>,
            },
            {
                key: "collectionStatus",
                label: "Collection Status",
                align: "center",
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
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
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
                    className="w-40"
                />
                <Dropdown
                    options={filterOptions.collectionStatus}
                    value={filters.collectionStatus}
                    onChange={(value) => handleFilterChange("collectionStatus", value)}
                    placeholder="Collection Status"
                    className="w-48"
                />
                <Dropdown
                    options={filterOptions.taskType}
                    value={filters.taskType}
                    onChange={(value) => handleFilterChange("taskType", value)}
                    placeholder="Task Type"
                    className="w-40"
                />
                <Dropdown
                    options={filterOptions.location}
                    value={filters.location}
                    onChange={(value) => handleFilterChange("location", value)}
                    placeholder="Location"
                    className="w-40"
                />
                <div className="ml-auto">
                    <SearchBar
                        placeholder="Search by Task ID, Borrower Name, or Agent..."
                        onSearch={handleSearch}
                        className="w-64"
                    />
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
                            className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer transition-colors duration-200"
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
        </div>
    );
};

export default FieldAgentTaskTable;













