import { useState, useEffect } from "react";
import agentIssuesData from "../../../../../../data/agent-profile/agentIssuesData.json";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable from "../../../../../components/ui/Table/DataTable";
import { RxDotsVertical } from "react-icons/rx";

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
}

const AgentIssueLogged = () => {
  const issuesData: AgentIssueData[] = agentIssuesData as AgentIssueData[];
  const [filteredData, setFilteredData] = useState<AgentIssueData[]>([]);
  const [selectedRows, setSelectedRows] = useState<AgentIssueData[]>([]);

  // MAIN FILTER APPLICATION LOGIC
  // Core function to apply all filters and search
  const applyAllFilters = () => {
    let filtered = [...issuesData]; // Create a copy to avoid mutation
    setFilteredData(filtered);
  };
  // FILTER EFFECTS - Auto-apply when dependencies change
  useEffect(() => {
    if (issuesData.length > 0) {
      applyAllFilters();
    }
  }, [issuesData]);

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
        <button className="text-neutral-700 px-3 py-1 text-sm flex items-center space-x-1 cursor-pointer hover:bg-neutral-100 rounded">
          <RxDotsVertical className="w-4 h-4" />
        </button>
      ),
    },
  ];

  // MAIN COMPONENT RENDER
  return (
    <div className="mt-4 bg-white rounded-lg relative">
      {/* SELECTED ITEMS DISPLAY SECTION */}
      {selectedRows.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} issue{selectedRows.length > 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-sm text-primary-700 hover:text-primary-700 cursor-pointer"
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
          emptyMessage="No issues found"
          getRowId={(row) => row.id}
        />
      </div>
    </div>
  );
};

export default AgentIssueLogged;
