import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import aiHighRiskTaskData from "../../../../data/ai-insights/aiHighRiskTaskData.json";
import Avatar from "../../../components/ui/Table/Avatar";

// INTERFACE DEFINITIONS
interface HighRiskTaskData {
  "taskId": string,
  "borrowerName": string,
  "initials": string,
  "riskType": string,
  "location": string,
  "assignedAgent": string,
  "agentInitials": string,
  "flagReason": string,
  "lastUpdate": string,
  "avatar": string
}

const AiHighRiskTaskTable: React.FC = () => {
  const [filteredData, setFilteredData] = useState<HighRiskTaskData[]>([]);
  const [selectedRiskType, setSelectedRiskType] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<HighRiskTaskData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allData: HighRiskTaskData[] = aiHighRiskTaskData as HighRiskTaskData[];

  // Location Dropdown Options
  const riskTypeOptions = [
    { label: "All", value: "" },
    ...Array.from(new Set(allData.map(a => a.riskType).filter(Boolean))).map(riskType => ({
      label: riskType,
      value: riskType
    }))
  ];

  // Location Dropdown Options
  const locationOptions = [
    { label: "All Location", value: "" },
    ...Array.from(new Set(allData.map(a => a.location).filter(Boolean))).map(loc => ({
      label: loc,
      value: loc
    }))
  ];

  // Filtering Logic
  useEffect(() => {
    let data = [...allData];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      data = data.filter(
        item =>
          item.assignedAgent.toLowerCase().includes(q) ||
          item.taskId.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    // Risk type filter
    if (selectedRiskType) {
      data = data.filter(item => item.riskType === selectedRiskType);
    }

    // Location filter
    if (selectedLocation) {
      data = data.filter(item => item.location === selectedLocation);
    }

    setFilteredData(data);
  }, [searchQuery, selectedRiskType, selectedLocation, allData]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleRiskTypeChange = (value: string | string[]) => {
    setSelectedRiskType(Array.isArray(value) ? value[0] : value);
  };

  const handleLocationChange = (value: string | string[]) => {
    setSelectedLocation(Array.isArray(value) ? value[0] : value);
  };

  const handleSelectionChange = (rows: HighRiskTaskData[]) => setSelectedRows(rows);


  const columns: TableColumn<HighRiskTaskData>[] = [
    {
      key: "taskId",
      label: "Rank",
      sortable: true,
      width: "100px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "borrowerName",
      label: "Borrower Name",
      sortable: true,
      width: "160px",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: "riskType",
      label: "Total Visits",
      width: "110px",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      width: "80px",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "assignedAgent",
      label: " Assigned Agent",
      sortable: true,
      width: "90px",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: "flagReason",
      label: "Flag Reason",
      width: "120px",
      render: v => <span className="font-medium">{v.toLocaleString("en-IN")}</span>
    },
    {
      key: "lastUpdate",
      label: "Last Update",
      sortable: true,
      width: "140px",
      headerAlign: 'center',
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      {/* FILTERS AND SEARCH SECTION */}
      <div className="bg-white py-4 px-1 rounded-lg flex flex-wrap items-center gap-4">
        <h2 className="text-base font-semibold text-neutral-700">AI High Risk Tasks</h2>
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={riskTypeOptions}
          value={selectedRiskType}
          onChange={handleRiskTypeChange}
          placeholder="Risk Type"
          className="min-w-48"
        />
        <Dropdown
          options={locationOptions}
          value={selectedLocation}
          onChange={handleLocationChange}
          placeholder="Location"
          className="min-w-48"
          multiSelect={true}
          searchable={true}
        />
        <div className="ml-auto">
          <SearchBar
            placeholder="Search"
            onSearch={handleSearch}
            className="w-64"
          />
        </div>
      </div>

      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} item{selectedRows.length > 1 ? "s" : ""} selected
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
      <div className="h-max bg-white rounded-lg shadow-sm">
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
          emptyMessage="No high risk task found."
          getRowId={row => row.taskId}
        />
      </div>
    </div>
  );
};

export default AiHighRiskTaskTable;
















