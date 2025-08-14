import { useState } from "react";
import { FaEye } from "react-icons/fa";
import teamOverviewData from "../../../../../../data/team-management/supervisorTeamOverviewData.json";
import { useNavigate } from "react-router-dom";
import { RxDotsVertical } from "react-icons/rx";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Badge from "../../../../../components/ui/Table/Badge";
import Dropdown from "../../../../../components/common/Dropdown";
import SearchBar from "../../../../../components/common/Searchbar";
import DataTable from "../../../../../components/ui/Table/DataTable";

interface TeamAgent {
  id: string;
  agentId: string;
  name: string;
  initials: string;
  role: "Field Agent" | "Telecaller";
  taskDone: number;
  paidTask: number;
  amountCollected: number;
  status: "Active" | "Inactive" | "On-Road" | "On Leave";
  lastSynced: string;
  avatar?: string;
  avatarColor?: string;
}

// Main Team Overview Component
const SupervisorTeamOverview: React.FC = () => {
  const teamData: TeamAgent[] = teamOverviewData as TeamAgent[];

  // Initialize filteredData with the original data
  const [filteredData, setFilteredData] = useState<TeamAgent[]>(teamData);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<TeamAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Filter options
  const roleOptions = [
    { label: "All Roles", value: "" },
    { label: "Field Agent", value: "Field Agent" },
    { label: "Telecaller", value: "Telecaller" },
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "On-Road", value: "On-Road" },
    { label: "On Leave", value: "On Leave" },
  ];

  const dateOptions = [
    { label: "Select Date", value: "" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
  ];

  // Unified function to apply all filters
  const applyAllFilters = (
    query: string = searchQuery,
    role: string = selectedRole,
    status: string = selectedStatus,
    date: string = selectedDate
  ) => {
    let filtered = teamData;

    // Apply search filter
    if (query) {
      filtered = filtered.filter((agent) =>
        agent.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply role filter
    if (role) {
      filtered = filtered.filter((agent) => agent.role === role);
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((agent) => agent.status === status);
    }

    // Apply date filter (placeholder logic)
    if (date) {
      console.log("Filtering by date:", date);
      // Add your date filtering logic here
    }

    setFilteredData(filtered);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyAllFilters(query, selectedRole, selectedStatus, selectedDate);
  };

  // Handle filter changes
  const handleRoleChange = (value: string | string[]) => {
    const roleValue = Array.isArray(value) ? value[0] : value;
    setSelectedRole(roleValue);
    applyAllFilters(searchQuery, roleValue, selectedStatus, selectedDate);
  };

  const handleStatusChange = (value: string | string[]) => {
    const statusValue = Array.isArray(value) ? value[0] : value;
    setSelectedStatus(statusValue);
    applyAllFilters(searchQuery, selectedRole, statusValue, selectedDate);
  };

  const handleDateChange = (value: string | string[]) => {
    const dateValue = Array.isArray(value) ? value[0] : value;
    setSelectedDate(dateValue);
    applyAllFilters(searchQuery, selectedRole, selectedStatus, dateValue);
  };

  const handleSelectionChange = (selected: TeamAgent[]) => {
    setSelectedRows(selected);
  };

  const handleViewAgent = (agent: TeamAgent) => {
    navigate(`/team-management/agent-profile/${agent.agentId}`);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Table columns configuration
  const columns: TableColumn<TeamAgent>[] = [
    {
      key: 'name',
      label: 'Agent Name',
      sortable: true,
      width: '200px',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${row.avatarColor || 'bg-gray-500'}`}>
            {row.initials}
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      width: '120px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'taskDone',
      label: 'Task Done',
      sortable: true,
      width: '100px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'paidTask',
      label: 'Paid Task',
      sortable: true,
      width: '100px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'amountCollected',
      label: 'Amount Collected',
      sortable: true,
      width: '150px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{formatCurrency(value)}</span>
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => {
        let variant: 'success' | 'danger' | 'info' | 'warning';
        switch (value) {
          case 'Active':
            variant = 'success';
            break;
          case 'On-Road':
            variant = 'success';
            break;
          case 'Inactive':
            variant = 'danger';
            break;
          case 'On Leave':
            variant = 'info';
            break;
          default:
            variant = 'info';
        }
        return <Badge variant={variant}>{value}</Badge>;
      }
    },
    {
      key: 'lastSynced',
      label: 'Last Synced',
      sortable: true,
      width: '120px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="text-gray-600">{value}</span>
    },
    {
      key: 'id',
      label: 'Action',
      sortable: false,
      width: '100px',
      className: 'text-center',
      render: (_, row) => (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewAgent(row);
          }}
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    },
    {
      key: "id",
      label: "",
      sortable: false,
      width: "50px",
      className: "text-center",
      render: () => (
        <button className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer">
          <RxDotsVertical className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className=" bg-white rounded-lg">
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>

          <Dropdown
            options={roleOptions}
            value={selectedRole}
            onChange={handleRoleChange}
            placeholder="Role"
            className="min-w-40"
          />

          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            placeholder="Status"
            className="min-w-40"
          />

          <Dropdown
            options={dateOptions}
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Select Date"
            className="min-w-48"
          />

          <div className="ml-auto">
            <SearchBar
              placeholder="Search"
              onSearch={handleSearch}
              className="w-64"
            />
          </div>
        </div>
      </div>

      {/* Selected Items Display */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} agent{selectedRows.length > 1 ? "s" : ""}{" "}
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

      {/* Table */}
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
        emptyMessage="No team members found"
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default SupervisorTeamOverview;