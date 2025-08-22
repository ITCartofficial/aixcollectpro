import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import agentIssuesData from "../../../../../aixcollectpro/data/agent-profile/agentIssuesData.json";
import { RxDotsVertical } from "react-icons/rx";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Badge from "../../../components/ui/Table/Badge";
import DataTable from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";

// INTERFACE DEFINITIONS
interface AgentIssueData {
  id: string;
  category: string;
  notes: string;
  date: string;
  status: "Pending" | "Justified" | "Partially";
  agent_name: string;
  priority: "High" | "Medium" | "Low";
  created_by: string;
  location: string;
  loggedBy: string;
  avatar: string;
}

interface FilterState {
  agent: string[];
  status: string;
  category: string[];
  priority: string;
  location: string[];
  dateRange: string;
  searchQuery: string;
}

const IssueLoggedTable = () => {
  const issuesData: AgentIssueData[] = agentIssuesData as AgentIssueData[];
  const [filteredData, setFilteredData] = useState<AgentIssueData[]>([]);
  const [selectedRows, setSelectedRows] = useState<AgentIssueData[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // FILTER STATE
  const [filters, setFilters] = useState<FilterState>({
    agent: [""],
    status: "",
    category: [""],
    priority: "",
    location: [""],
    dateRange: "",
    searchQuery: "",
  });

  // FILTER OPTIONS
  const filterOptions = useMemo(
    () => ({
      agent: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            issuesData.map((issue) => issue.agent_name).filter((agent) => agent)
          )
        ).map((agent) => ({ label: agent, value: agent })),
      ],
      status: [
        { label: "All", value: "" },
        { label: "Pending", value: "Pending" },
        { label: "Justified", value: "Justified" },
        { label: "Partially", value: "Partially" },
      ],
      category: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            issuesData
              .map((issue) => issue.category)
              .filter((category) => category)
          )
        ).map((category) => ({ label: category, value: category })),
      ],
      priority: [
        { label: "All", value: "" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ],
      location: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            issuesData
              .map((issue) => issue.location)
              .filter((location) => location)
          )
        ).map((location) => ({ label: location, value: location })),
      ],
      dateRange: [
        { label: "All", value: "" },
        { label: "Today", value: "today" },
        { label: "This Week", value: "this_week" },
        { label: "This Month", value: "this_month" },
      ],
    }),
    [issuesData]
  );

  // FILTER HANDLER
  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string | string[]) => {
      // For multi-select filters (agent, category, location)
      if (
        filterType === "agent" ||
        filterType === "category" ||
        filterType === "location"
      ) {
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

  // SEARCH HANDLER
  const handleSearch = useCallback(
    (query: string) => {
      handleFilterChange("searchQuery", query);
    },
    [handleFilterChange]
  );

  // DATE FILTER LOGIC
  const isWithinDateRange = useCallback(
    (dateString: string, range: string): boolean => {
      if (!range) return true;

      const itemDate = new Date(dateString);
      const now = new Date();

      switch (range) {
        case "today":
          return itemDate.toDateString() === now.toDateString();
        case "this_week":
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          return itemDate >= weekStart;
        case "this_month":
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        default:
          return true;
      }
    },
    []
  );

  // MAIN FILTER APPLICATION LOGIC
  const applyAllFilters = useCallback(() => {
    let filtered = [...issuesData];

    // Apply agent filter (multi-select)
    if (filters.agent.length > 0 && !filters.agent.includes("")) {
      filtered = filtered.filter((issue) =>
        filters.agent.some((agent) =>
          issue.agent_name.toLowerCase().includes(agent.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((issue) => issue.status === filters.status);
    }

    // Apply category filter (multi-select)
    if (filters.category.length > 0 && !filters.category.includes("")) {
      filtered = filtered.filter((issue) =>
        filters.category.some((category) =>
          issue.category.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(
        (issue) => issue.priority === filters.priority
      );
    }

    // Apply location filter (multi-select)
    if (filters.location.length > 0 && !filters.location.includes("")) {
      filtered = filtered.filter((issue) =>
        filters.location.some((location) =>
          issue.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (filters.dateRange) {
      filtered = filtered.filter((issue) =>
        isWithinDateRange(issue.date, filters.dateRange)
      );
    }

    // Apply search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (issue) =>
          issue.id.toLowerCase().includes(query) ||
          issue.agent_name.toLowerCase().includes(query) ||
          issue.category.toLowerCase().includes(query) ||
          issue.notes.toLowerCase().includes(query) ||
          issue.location.toLowerCase().includes(query)
      );
    }

    setFilteredData(filtered);
  }, [issuesData, filters, isWithinDateRange]);

  // FILTER EFFECTS
  useEffect(() => {
    if (issuesData.length > 0) {
      applyAllFilters();
    }
  }, [issuesData, applyAllFilters]);

  // CLICK OUTSIDE HANDLER
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

  // Handle row selection changes
  const handleSelectionChange = (selected: AgentIssueData[]) => {
    setSelectedRows(selected);
  };

  // TABLE COLUMN CONFIGURATION
  const columns: TableColumn<AgentIssueData>[] = [
    {
      key: "id",
      label: "Issue ID",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "agent_name",
      label: "Logged By",
      width: "120px",
      className: "text-center",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      sortable: false,
      width: "180px",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "notes",
      label: "Notes (Agent Input)",
      sortable: false,
      width: "300px",
      className: "text-left",
      render: (value) => (
        <span className="font-medium" title={value}>
          {value.length > 60 ? `${value.substring(0, 60)}...` : value}
        </span>
      ),
    },
    {
      key: "date",
      label: "Dates",
      sortable: true,
      width: "140px",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: false,
      width: "120px",
      className: "text-center",
      render: (value) => {
        const getVariant = (status: string) => {
          switch (status) {
            case "Justified":
              return "success";
            case "Pending":
              return "warning";
            case "Partially":
              return "info";
            default:
              return "info";
          }
        };
        return <Badge variant={getVariant(value)}>{value}</Badge>;
      },
    },
    {
      key: "id",
      label: "",
      sortable: false,
      width: "30px",
      className: "text-right",
      render: () => (
        <button className="text-black px-3 py-1 text-sm flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded">
          <RxDotsVertical className="w-4 h-4" />
        </button>
      ),
    },
  ];

  // MAIN COMPONENT RENDER
  return (
    <div className="mt-4 bg-white rounded-lg relative">
      {/* FILTERS AND SEARCH SECTION */}
      <div className="flex flex-wrap items-center gap-4 p-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>

        <Dropdown
          options={filterOptions.agent}
          value={filters.agent}
          onChange={(value) => handleFilterChange("agent", value)}
          placeholder="Category"
          className="w-44"
          multiSelect={true}
          searchable={true}
        />

        <Dropdown
          options={filterOptions.status}
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          placeholder="Logged By"
          className="w-32"
        />

        <Dropdown
          options={filterOptions.category}
          value={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
          placeholder="Logged Dated"
          className="w-40"
          multiSelect={true}
          searchable={true}
        />
        <div className="ml-auto">
          <SearchBar
            placeholder="Search issues..."
            onSearch={handleSearch}
            className="w-56"
          />
        </div>
      </div>

      {/* SELECTED ITEMS DISPLAY SECTION */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 mx-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} issue{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      {/* DATA TABLE SECTION */}
      <div className="bg-white rounded-lg shadow-sm">
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
          emptyMessage="No issues found matching the current filters"
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
};

export default IssueLoggedTable;
