import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import fieldAgentCollectionData from "../../../../data/collection-matrics/fieldAgentCollectionData.json";
import { FaEye } from "react-icons/fa";
import TelecallerCollectionTable from "./TelecallerCollectionTable";
import Avatar from "../../../components/ui/Table/Avatar";

// INTERFACE DEFINITIONS
interface FieldAgentData {
  id: string;
  rank: number;
  agentName: string;
  initials: string;
  totalVisits: number;
  paid: number;
  collection: number;
  averageValue: number;
  collectionRate: string;
  location: string;
  lastVisit: string;
  status?: string;
  avatar: string;
}

const FieldAgentCollectionTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fieldAgentCollection');
  const [filteredData, setFilteredData] = useState<FieldAgentData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<FieldAgentData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allData: FieldAgentData[] = fieldAgentCollectionData as FieldAgentData[];

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
          item.agentName.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
      );
    }

    // Location filter
    if (selectedLocation) {
      data = data.filter(item => item.location === selectedLocation);
    }

    setFilteredData(data);
  }, [searchQuery, selectedLocation, allData]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleLocationChange = (value: string | string[]) => {
    setSelectedLocation(Array.isArray(value) ? value[0] : value);
  };

  const handleSelectionChange = (rows: FieldAgentData[]) => setSelectedRows(rows);

  const handleViewAgent = (agent: FieldAgentData) => {
    // View logic here
    console.log("Viewing agent:", agent);
  };


  // Handle tab change
  const handleTabChange = (tab: 'fieldAgentCollection' | 'telecallerCollection') => {
    setActiveTab(tab);
    // Reset filters when switching tabs
    setSelectedLocation("");
    setSearchQuery('');
    setSelectedRows([]);
  };

  // If telecaller collection tab is active, render TelecallerCollectionTable
  if (activeTab === 'telecallerCollection') {
    return <TelecallerCollectionTable onTabChange={handleTabChange} activeTab={activeTab} />;
  }


  const columns: TableColumn<FieldAgentData>[] = [
    {
      key: "rank",
      label: "Rank",
      sortable: true,
      width: "90px",
      className: "text-center",
      render: value => <span className="font-semibold">{value}</span>
    },
    {
      key: "agentName",
      label: "Agent Name",
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
      key: "totalVisits",
      label: "Total Visits",
      sortable: true,
      width: "110px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "paid",
      label: "Paid",
      sortable: true,
      width: "90px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "collection",
      label: "Collection",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: v => <span className="font-medium">₹{v.toLocaleString("en-IN")}</span>
    },
    {
      key: "averageValue",
      label: "Avg. Value",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: v => <span className="font-medium">₹{v.toLocaleString("en-IN")}</span>
    },
    {
      key: "collectionRate",
      label: "Collection Rate",
      sortable: true,
      width: "120px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      width: "140px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "lastVisit",
      label: "Last Visit",
      sortable: true,
      width: "100px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "id",
      label: "Action",
      sortable: false,
      width: "100px",
      className: "text-center",
      render: (_, row) => (
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            handleViewAgent(row);
          }}
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      {/* FILTERS AND SEARCH SECTION */}
      <div className="bg-white p-4 rounded-lg flex flex-wrap items-center gap-4">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'fieldAgentCollection'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            onClick={() => handleTabChange('fieldAgentCollection')}
          >
            Field Agent Collection Table
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'telecallerCollection'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            onClick={() => handleTabChange('telecallerCollection')}
          >
            Telecaller Collection Table
          </button>
        </div>
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={locationOptions}
          value={selectedLocation}
          onChange={handleLocationChange}
          placeholder="Location"
          className="min-w-48"
        />
        <div className="ml-auto">
          <SearchBar
            placeholder="Search by agent id, name or location..."
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
          emptyMessage="No collection records found"
          getRowId={row => row.id}
        />
      </div>
    </div>
  );
};

export default FieldAgentCollectionTable;
















