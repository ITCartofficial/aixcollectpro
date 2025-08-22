import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import type { PopupPosition } from "../../../../../components/ui/Table/PopupMenu";
import ExpandedRowContent from "../../../../../components/ui/Table/ExpandedRowContent";
import Badge from "../../../../../components/ui/Table/Badge";
import Avatar from "../../../../../components/ui/Table/Avatar";
import Dropdown from "../../../../../components/common/Dropdown";
import SearchBar from "../../../../../components/common/Searchbar";
import ExpandableTable, {
  type TableColumn,
} from "../../../../../components/ui/Table/ExpandableTable";
import telecallerTaskData from "../../../../../../data/task-management/telecallersTaskData.json";
import PopupMenu from "../../../../../components/ui/Table/PopupMenu";
import type { TelecallersTask } from "../../../../../components/types/telecaller/telecallerTypes";
interface TelecallerTaskProps {
  telecaller?: any;
}
interface FilterState {
  status: string;
  collectionStatus: string;
  taskType: string;
  dateRange: string;
  language: string;
  searchQuery: string;
}

const popupMenuItems = [
  { label: "Mark as Complete", action: "mark_complete" },
  { label: "Reassign Task", action: "reassign" },
  { label: "Edit Task", action: "edit" },
  { label: "Flag Task", action: "flag" },
  { label: "Add Notes", action: "add_notes" },
  { label: "Open in New Tab", action: "open_new_tab" },
  { label: "Delete Task", action: "delete" },
  { label: "Share Task Link", action: "share" },
];

const TelecallerTask: React.FC<TelecallerTaskProps> = ({ telecaller }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TelecallersTask | null>(
    null
  );
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    top: 0,
    left: 0,
  });
  const popupRef = useRef<HTMLDivElement>(null);

  // Filter tasks to only show tasks for the specific telecaller
  const telecallerTask: TelecallersTask[] = useMemo(() => {
    const allTasks = Array.isArray(telecallerTaskData)
      ? (telecallerTaskData as any[]).map((task: any) => ({
          ...task,
          id: task.taskId || task.id,
        }))
      : [];

    // If telecaller prop is provided, filter tasks by telecaller name
    if (telecaller && telecaller.name) {
      return allTasks.filter((task) => task.telecaller === telecaller.name);
    }

    // If no telecaller is provided, return all tasks
    return allTasks;
  }, [telecaller]);

  const [filters, setFilters] = useState<FilterState>({
    status: "",
    collectionStatus: "",
    taskType: "",
    dateRange: "",
    language: "",
    searchQuery: "",
  });

  const [selectedRows, setSelectedRows] = useState<TelecallersTask[]>([]);

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
      collectionStatus: [
        { label: "All", value: "" },
        { label: "PTP", value: "PTP" },
        { label: "Paid", value: "Paid" },
        { label: "TNC", value: "TNC" },
        { label: "PTPD", value: "PTPD" },
        { label: "YTC", value: "YTC" },
        { label: "SI", value: "SI" },
        { label: "NFI", value: "NFI" },
        { label: "No Update", value: "No Update" },
      ],
      taskType: [
        { label: "All", value: "" },
        { label: "New Calls", value: "New Calls" },
        { label: "Follow-up", value: "Follow-up" },
      ],
      dateRange: [
        { label: "All", value: "" },
        { label: "Today", value: "today" },
        { label: "This Week", value: "this_week" },
        { label: "This Month", value: "this_month" },
      ],
      language: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            telecallerTask.map((task) => task.language).filter((lang) => lang)
          )
        ).map((lang) => ({ label: lang, value: lang })),
      ],
    }),
    [telecallerTask]
  );

  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string | string[]) => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    },
    []
  );

  const filteredData = useMemo(() => {
    let filtered = telecallerTask;

    // Apply search filter
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.taskId?.toLowerCase().includes(query) ||
          task.borrowerName?.toLowerCase().includes(query) ||
          task.telecaller?.toLowerCase().includes(query)
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "searchQuery") {
        filtered = filtered.filter((task) => {
          const taskValue = task[key as keyof TelecallersTask];
          return taskValue === value;
        });
      }
    });

    return filtered;
  }, [telecallerTask, filters]);

  const handleSearch = useCallback(
    (query: string) => {
      handleFilterChange("searchQuery", query);
    },
    [handleFilterChange]
  );

  const handleSelectionChange = useCallback((selected: TelecallersTask[]) => {
    setSelectedRows(selected);
  }, []);

  const handleRowAction = useCallback(
    (action: string, task: TelecallersTask) => {
      if (action === "view") {
        console.log("Viewing task:", task);
      }
    },
    []
  );

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);

  const handleMenuClick = useCallback(
    (task: TelecallersTask, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const popupWidth = 200;
      const leftPosition =
        rect.right + scrollX - popupWidth > 0
          ? rect.right + scrollX - popupWidth
          : rect.left + scrollX;
      setPopupPosition({
        top: rect.bottom + scrollY + 5,
        left: leftPosition,
      });
      setSelectedTask(task);
      setShowPopup(true);
    },
    []
  );

  const handlePopupAction = useCallback(
    (action: string) => {
      if (!selectedTask) return;
      console.log(`Action: ${action} for task:`, selectedTask.taskId);
    },
    [selectedTask]
  );

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setSelectedTask(null);
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
        case "TNC":
          return "warning";
        case "FI":
          return "danger";
        case "No Update":
          return "secondary";
        case "NFI":
          return "danger";
        case "YTC":
          return "info";
        case "SI":
          return "info";
        default:
          return "secondary";
      }
    },
    []
  );

  const expandedRowRenderer = useCallback(
    (row: TelecallersTask) => (
      <ExpandedRowContent<TelecallersTask>
        row={row}
        getTaskDetails={(r) => r.expandedDetails?.taskDetails || {}}
        getLoanInformation={(r) => r.expandedDetails?.loanInformation || {}}
        getRecentActivity={(r) => r.expandedDetails?.recentActivity || []}
        onMenuClick={handleMenuClick}
      />
    ),
    [handleMenuClick]
  );

  const columns: TableColumn<TelecallersTask>[] = useMemo(
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
        render: (value: string, row: TelecallersTask) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.avatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
        ),
      },
      {
        key: "language",
        label: "Language",
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
        key: "lastCallTime",
        label: "Last Call Time",
        sortable: true,
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "telecaller",
        label: "Telecaller",
        sortable: true,
        render: (value: string, row: TelecallersTask) => (
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
    <div className=" bg-white h-max rounded-lg p-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 p-4">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={filterOptions.status}
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          placeholder="Status"
          className="w-28"
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
          options={filterOptions.language}
          value={filters.language}
          onChange={(value) => handleFilterChange("language", value)}
          placeholder="Language"
          className="w-30"
        />
        <div className="ml-auto">
          <SearchBar
            placeholder="Search tasks..."
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
        emptyMessage={
          telecaller
            ? `No tasks found for ${telecaller.name}.`
            : "No telecaller tasks found."
        }
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

export default TelecallerTask;
