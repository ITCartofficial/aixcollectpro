import { useState, useEffect } from "react";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import Dropdown from "../../../components/common/Dropdown";
import SearchBar from "../../../components/common/Searchbar";
import DataTable from "../../../components/ui/Table/DataTable";
import telecallerCollectionData from "../../../../data/collection-matrics/telecallerCollectionData.json";
import { FaAward, FaEye } from "react-icons/fa";
import Avatar from "../../../components/ui/Table/Avatar";

// INTERFACE DEFINITIONS
interface TelecallerData {
  id: string;
  rank: number;
  agentName: string;
  initials: string;
  totalVisits: number;
  paid: number;
  collection: number;
  ptp: number;
  language: string[];
  lastVisit: string;
  avatar: string;
}

interface TelecallerCollectionTableProps {
  onTabChange?: (tab: 'fieldAgentCollection' | 'telecallerCollection') => void;
  activeTab?: 'fieldAgentCollection' | 'telecallerCollection';
}

const TelecallerCollectionTable: React.FC<TelecallerCollectionTableProps> = ({ onTabChange, activeTab = 'telecallerCollection' }) => {
  const [filteredData, setFilteredData] = useState<TelecallerData[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedRows, setSelectedRows] = useState<TelecallerData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allData: TelecallerData[] = telecallerCollectionData as TelecallerData[];

  // Language Dropdown Options
  const uniqueLanguages = Array.from(
    new Set(allData.flatMap(a => a.language))
  );
  const languageOptions = [
    { label: "All Language", value: "" },
    ...uniqueLanguages.map(lang => ({
      label: lang,
      value: lang
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
          item.language.some(lang => lang.toLowerCase().includes(q))
      );
    }

    // Language filter
    if (selectedLanguage) {
      data = data.filter(item => item.language.includes(selectedLanguage));
    }

    setFilteredData(data);
  }, [searchQuery, selectedLanguage, allData]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleLanguageChange = (value: string | string[]) => {
    setSelectedLanguage(Array.isArray(value) ? value[0] : value);
  };

  const handleSelectionChange = (rows: TelecallerData[]) => setSelectedRows(rows);

  const handleViewAgent = (agent: TelecallerData) => {
    // View logic here
    console.log("Viewing telecaller:", agent);
  };

  // Handle tab change
  const handleTabChange = (tab: 'fieldAgentCollection' | 'telecallerCollection') => {
    if (onTabChange) {
      onTabChange(tab);
    }
    // Reset filters when switching tabs
    setSelectedLanguage("");
    setSearchQuery('');
    setSelectedRows([]);
  };

  // Table Columns (from screenshot ![image2](image3))
  const columns: TableColumn<TelecallerData>[] = [
    {
      key: "rank",
      label: "Rank",
      sortable: true,
      width: "100px",
      className: "text-center",
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{value}</span>
          {row.rank === 1 && (
            <div className="flex items-center gap-1 bg-[#B8FAD8] rounded-full px-2 py-1">
              <FaAward className="w-3 h-3 text-[#10854C] rotate-180" />
              <span className="text-[#10854C] text-[10px] font-semibold">Top Performer</span>
            </div>
          )}
        </div>
      )
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
      width: "120px",
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
      key: "ptp",
      label: "PTP",
      sortable: true,
      width: "100px",
      className: "text-center",
      render: v => <span className="font-medium">{v}</span>
    },
    {
      key: "language",
      label: "Language",
      sortable: false,
      width: "140px",
      className: "text-center",
      render: v => (
        <span className="font-medium">
          {Array.isArray(v) ? v.join(", ") : v}
        </span>
      )
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
    <div className="mt-4 bg-white rounded-lg p-4">
      {/* FILTERS AND SEARCH SECTION */}
      <div className="bg-white p-4 rounded-lg flex flex-wrap items-center gap-4">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'fieldAgentCollection'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabChange('fieldAgentCollection')}>Field Agent Collection Table
          </button>
          <button className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${activeTab === 'telecallerCollection'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabChange('telecallerCollection')}>Telecaller Collection Table
          </button>
        </div>
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        <Dropdown
          options={languageOptions}
          value={selectedLanguage}
          onChange={handleLanguageChange}
          placeholder="Language"
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

export default TelecallerCollectionTable;