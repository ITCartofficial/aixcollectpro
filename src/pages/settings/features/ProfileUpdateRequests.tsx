import { useState, useMemo, useCallback } from "react";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import type { TableColumn } from "../../../components/ui/Table/ExpandableTable";
import Badge from "../../../components/ui/Table/Badge";
import Avatar from "../../../components/ui/Table/Avatar";
interface ProfileUpdateRequest {
  id: string;
  requestId: string;
  name: string;
  role: "Supervisor" | "Telecaller" | "Agent";
  requestType: "Mobile Number" | "Email" | "Address" | "Name";
  oldInfo: string;
  newInfo: string;
  dateRequested: string;
  status: "Pending" | "Approved" | "Rejected";
  avatar?: string;
  requestedBy?: string;
}

interface FilterState {
  role: string[];
  requestType: string;
  status: string;
  dateRange: string;
  requestBy: string[];
  searchQuery: string;
}

import profileUpdateRequestsData from "../../../../data/profileupdaterequestsData/profileupdaterequestsdata.json";
import DataTable from "../../../components/ui/Table/DataTable";


const ProfileUpdateRequests: React.FC = () => {
  const profileUpdateData: ProfileUpdateRequest[] = Array.isArray(
    profileUpdateRequestsData
  )
    ? (profileUpdateRequestsData as any[]).map((request: any) => ({
        ...request,
        id: request.requestId || request.id,
      }))
    : [];

  const [filters, setFilters] = useState<FilterState>({
    role: [""],
    requestType: "",
    status: "",
    dateRange: "",
    requestBy: [""],
    searchQuery: "",
  });

  const [selectedRows, setSelectedRows] = useState<ProfileUpdateRequest[]>([]);

  const filterOptions = useMemo(
    () => ({
      role: [
        { label: "All", value: "" },
        { label: "Supervisor", value: "Supervisor" },
        { label: "Telecaller", value: "Telecaller" },
        { label: "Agent", value: "Agent" },
      ],
      requestType: [
        { label: "All", value: "" },
        { label: "Mobile Number", value: "Mobile Number" },
        { label: "Email", value: "Email" },
        { label: "Address", value: "Address" },
        { label: "Name", value: "Name" },
      ],
      status: [
        { label: "All", value: "" },
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
      ],
      dateRange: [
        { label: "All", value: "" },
        { label: "Today", value: "today" },
        { label: "This Week", value: "this_week" },
        { label: "This Month", value: "this_month" },
      ],
      requestBy: [
        { label: "All", value: "" },
        ...Array.from(
          new Set(
            profileUpdateData.map((req) => req.name).filter((name) => name)
          )
        ).map((name) => ({ label: name, value: name })),
      ],
    }),
    [profileUpdateData]
  );

  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string | string[]) => {
      if (filterType === "role" || filterType === "requestBy") {
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

  const filteredData = useMemo(() => {
    let filtered = profileUpdateData;

    // Search
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.requestId?.toLowerCase().includes(query) ||
          request.name?.toLowerCase().includes(query) ||
          request.role?.toLowerCase().includes(query) ||
          request.requestType?.toLowerCase().includes(query)
      );
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== "searchQuery") {
        if (key === "role" || key === "requestBy") {
          const arr = value as string[];
          if (arr.length > 0 && !arr.includes("")) {
            if (key === "requestBy") {
              filtered = filtered.filter((request) =>
                arr.includes(request.name)
              );
            } else {
              filtered = filtered.filter((request) =>
                arr.includes(
                  request[key as keyof ProfileUpdateRequest] as string
                )
              );
            }
          }
        } else {
          filtered = filtered.filter((request) => {
            const requestValue = request[key as keyof ProfileUpdateRequest];
            return requestValue === value;
          });
        }
      }
    });

    return filtered;
  }, [filters]);

  const handleSearch = useCallback(
    (query: string) => {
      handleFilterChange("searchQuery", query);
    },
    [handleFilterChange]
  );

  const handleSelectionChange = useCallback(
    (selected: ProfileUpdateRequest[]) => {
      setSelectedRows(selected);
    },
    []
  );

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);


  const getStatusVariant = useCallback(
    (
      status: string
    ): "success" | "warning" | "danger" | "info" | "secondary" => {
      switch (status) {
        case "Approved":
          return "success";
        case "Rejected":
          return "danger";
        case "Pending":
          return "warning";
        default:
          return "info";
      }
    },
    []
  );

  const handleApprove = useCallback(
    (request: ProfileUpdateRequest, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("Approving request:", request.requestId);
    },
    []
  );

  const handleReject = useCallback(
    (request: ProfileUpdateRequest, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("Rejecting request:", request.requestId);
    },
    []
  );

  const columns: TableColumn<ProfileUpdateRequest>[] = useMemo(
    () => [
      {
        key: "requestId",
        label: "Request ID",
        sortable: true,
        width: "140px",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "name",
        label: "Name",
        sortable: true,
        render: (value: string, row: ProfileUpdateRequest) => (
          <div className="flex items-center space-x-2">
            <Avatar name={value} image={row.avatar} size="sm" />
            <span className="text-sm font-normal">{value}</span>
          </div>
        ),
      },
      {
        key: "role",
        label: "Role",
        sortable: true,
        className: "text-left",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "requestType",
        label: "Request Type",
        sortable: true,
        headerAlign: "center",
        className: "text-center",
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "oldInfo",
        label: "Old Info",
        sortable: false,
        render: (value: string) => (
          <span className="text-sm font-normal text-gray-600">{value}</span>
        ),
      },
      {
        key: "newInfo",
        label: "New Info",
        sortable: false,
        render: (value: string) => (
          <span className="text-sm font-normal text-blue-600">{value}</span>
        ),
      },
      {
        key: "dateRequested",
        label: "Date Requested",
        sortable: true,
        render: (value: string) => (
          <span className="text-sm font-normal">{value}</span>
        ),
      },
      {
        key: "status",
        label: "Action",
        sortable: false,
        headerAlign: "center",
        className: "text-center",
        render: (value: string, row: ProfileUpdateRequest) => {
          if (value === "Pending") {
            return (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={(e) => handleReject(row, e)}
                  className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors duration-200"
                >
                  ✕ Reject
                </button>
                <button
                  onClick={(e) => handleApprove(row, e)}
                  className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors duration-200"
                >
                  ✓ Approve
                </button>
              </div>
            );
          }
          return <Badge variant={getStatusVariant(value)}>{value}</Badge>;
        },
      },
    ],
    [getStatusVariant, handleApprove, handleReject]
  );

  return (
    <div className="mt-4 bg-white h-max rounded-lg p-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4 p-4">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={filterOptions.role}
          value={filters.role}
          onChange={(value) => handleFilterChange("role", value)}
          placeholder="Role"
          className="w-32"
          multiSelect={true}
        />
        <Dropdown
          options={filterOptions.requestType}
          value={filters.requestType}
          onChange={(value) => handleFilterChange("requestType", value)}
          placeholder="Request Type"
          className="w-40"
        />
        <Dropdown
          options={filterOptions.status}
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
          placeholder="Status"
          className="w-32"
        />
        <Dropdown
          options={filterOptions.dateRange}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="Date Range"
          className="w-36"
        />
        <Dropdown
          options={filterOptions.requestBy}
          value={filters.requestBy}
          onChange={(value) => handleFilterChange("requestBy", value)}
          placeholder="Request by"
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
              {selectedRows.length} request{selectedRows.length > 1 ? "s" : ""}{" "}
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
        pageSize={5}
        className="shadow-sm"
        emptyMessage="No profile update requests found."
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default ProfileUpdateRequests;
