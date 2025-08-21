import { useState } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Avatar from "../../../components/ui/Table/Avatar";
import Badge from "../../../components/ui/Table/Badge";
import { FaEye } from "react-icons/fa";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import supervisorTableData from "../../../../data/team-management/supervisorData.json";
import { useNavigate } from "react-router-dom";
import { RxDotsVertical } from "react-icons/rx";

interface Supervisor {
  id: string;
  supervisorId: string;
  name: string;
  membersManaged: number;
  documentsReviewed: number;
  issueLogsReviewed: number;
  reassignmentsMade: number;
  status: "Active" | "Inactive" | "On Leave";
  lastSynced: string;
  avatar?: string;
}

// Main Supervisors Component
const SupervisorsTable: React.FC = () => {
  const supervisorsData: Supervisor[] = supervisorTableData as Supervisor[];

  // Initialize filteredData with the original data so it shows before any filters are applied
  const [filteredData, setFilteredData] = useState<Supervisor[]>(supervisorsData);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<Supervisor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Filter options
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "On Leave", value: "On Leave" },
  ];

  const languageOptions = [
    { label: "All Languages", value: "" },
    { label: "English", value: "English" },
    { label: "Hindi", value: "Hindi" },
    { label: "Kannada", value: "Kannada" },
    { label: "Tamil", value: "Tamil" },
  ];

  const dateOptions = [
    { label: "All Dates", value: "" },
    { label: "Today", value: "today" },
    { label: "This Week", value: "this_week" },
    { label: "This Month", value: "this_month" },
  ];

  // Unified function to apply all filters
  const applyAllFilters = (
    query: string = searchQuery,
    status: string = selectedStatus,
    language: string = selectedLanguage,
    date: string = selectedDate
  ) => {
    let filtered = supervisorsData;

    // Apply search filter
    if (query) {
      filtered = filtered.filter((supervisor) =>
        supervisor.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply status filter
    if (status) {
      filtered = filtered.filter((supervisor) => supervisor.status === status);
    }

    // Apply language filter (placeholder logic)
    if (language) {
      console.log("Filtering by language:", language);
      // Add your language filtering logic here
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
    applyAllFilters(query, selectedStatus, selectedLanguage, selectedDate);
  };

  // Handle filter changes
  const handleStatusChange = (value: string | string[]) => {
    const statusValue = Array.isArray(value) ? value[0] : value;
    setSelectedStatus(statusValue);
    applyAllFilters(searchQuery, statusValue, selectedLanguage, selectedDate);
  };

  const handleLanguageChange = (value: string | string[]) => {
    const languageValue = Array.isArray(value) ? value[0] : value;
    setSelectedLanguage(languageValue);
    applyAllFilters(searchQuery, selectedStatus, languageValue, selectedDate);
  };

  const handleDateChange = (value: string | string[]) => {
    const dateValue = Array.isArray(value) ? value[0] : value;
    setSelectedDate(dateValue);
    applyAllFilters(searchQuery, selectedStatus, selectedLanguage, dateValue);
  };

  const handleSelectionChange = (selected: Supervisor[]) => {
    setSelectedRows(selected);
  };

  const handleViewSupervisor = (supervisor: Supervisor) => {
    navigate(`/team-management/supervisor-profile/${supervisor.supervisorId}`);
  };

  // Table columns configuration
  const columns: TableColumn<Supervisor>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: '200px',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'membersManaged',
      label: 'Members Managed',
      sortable: true,
      width: '140px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'documentsReviewed',
      label: 'Documents Flagged',
      sortable: true,
      width: '160px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'issueLogsReviewed',
      label: 'Issue Logs Reviewed',
      sortable: true,
      width: '170px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'reassignmentsMade',
      label: 'Reassignments Made',
      sortable: true,
      width: '170px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '120px',
      className: 'text-center',
      headerAlign: 'center',
      render: (value) => {
        const variant = value === 'Active' ? 'success' : value === 'Inactive' ? 'danger' : 'info';
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
            handleViewSupervisor(row);
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
    <div className="mt-4 bg-white rounded-lg p-6">
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>

          <Dropdown
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            placeholder="Language"
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
              {selectedRows.length} supervisor{selectedRows.length > 1 ? "s" : ""}{" "}
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
        emptyMessage="No supervisors found"
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default SupervisorsTable;