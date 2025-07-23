import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa";

import agentActivityData from "../../../../data/dashboard/agentActivityFeed.json";
import type { TableColumn } from "../../../components/ui/Table/DataTable";
import DataTable from "../../../components/ui/Table/DataTable";

// Allowed types for visitActionType
type VisitActionType = "checked-in" | "updated" | "flagged" | "rescheduled" | "logged-issue";

// Type definition for a row
interface AgentActivityRow {
  id: string;
  lastSynced: string;
  agentName: string;
  agentInitials: string;
  agentColor: string;
  task: string;
  taskLocation: string;
  visitAction: string;
  visitActionType: VisitActionType;
  currentLocation: string;
}

// Badge color logic for Visit Action
const visitActionBadge = (type: VisitActionType, text: string) => {
  let color = "";
  switch (type) {
    case "checked-in":
      color = "bg-green-50 text-green-700 border border-green-100";
      break;
    case "updated":
      color = "bg-blue-50 text-blue-700 border border-blue-100";
      break;
    case "flagged":
      color = "bg-red-50 text-red-600 border border-red-100";
      break;
    case "rescheduled":
      color = "bg-emerald-50 text-emerald-700 border border-emerald-100";
      break;
    case "logged-issue":
      color = "bg-yellow-50 text-yellow-700 border border-yellow-200";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
  }
  return (
    <span className={`px-3 py-1 rounded-md font-medium text-xs ${color}`}>
      {text}
    </span>
  );
};

// Helper to validate/cast visitActionType
const allowedTypes: VisitActionType[] = [
  "checked-in",
  "updated",
  "flagged",
  "rescheduled",
  "logged-issue",
];

function toVisitActionType(value: string): VisitActionType {
  if (allowedTypes.includes(value as VisitActionType)) {
    return value as VisitActionType;
  }
  return "checked-in"; // fallback or handle as needed
}

const INITIAL_LOAD_COUNT = 5;

const AgentActivityFeedTable = () => {
  const [selectedRows, setSelectedRows] = useState<AgentActivityRow[]>([]);
  // Prepare all data from JSON, properly typed/cast
  const allRows: AgentActivityRow[] = (agentActivityData as any[]).map((row) => ({
    ...row,
    visitActionType: toVisitActionType(row.visitActionType),
  }));

  const [expanded, setExpanded] = useState(false);

  // Show all rows if expanded, otherwise show initial items
  const rows = expanded ? allRows : allRows.slice(0, INITIAL_LOAD_COUNT);

  // Table columns
  const columns: TableColumn<AgentActivityRow>[] = [
    {
      key: "lastSynced",
      label: "Last Synced",
      sortable: true,
      width: "120px",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "agentName",
      label: "Agent Name",
      sortable: true,
      width: "180px",
      render: (_v, row) => (
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold"
            style={{ background: row.agentColor }}
          >
            {row.agentInitials}
          </div>
          <span className="text-sm">{row.agentName}</span>
        </div>
      ),
    },
    {
      key: "task",
      label: "Task",
      sortable: true,
      width: "120px",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "taskLocation",
      label: "Task Location",
      sortable: true,
      width: "140px",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "visitAction",
      label: "Visit Action",
      sortable: false,
      width: "200px",
      render: (value, row) =>
        visitActionBadge(row.visitActionType, value),
    },
    {
      key: "currentLocation",
      label: "Current Location",
      sortable: false,
      width: "140px",
      render: (value) => <span className="text-sm">{value}</span>,
    },
    {
      key: "id",
      label: "Action",
      sortable: false,
      width: "150px",
      className: "text-right pr-6", // Align right
      render: (_v, row) => (
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-full font-medium text-sm"
            onClick={() => window.open(`/live-tracking/${row.id}`, "_blank")}
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            View Live Tracking
          </button>
        </div>
      ),
    },
  ];

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className= "w-full">
      <h3 className="pt-4 pb-4 text-sm font-medium text-gray-700">
        Agent Activity Feed
      </h3>
      <DataTable
        data={rows}
        columns={columns}
        loading={false}
        selectable={true}
        className="border-none"
        headerClassName="rounded-t-lg"
        rowClassName=""
        pagination={false}
        emptyMessage="No activity found"
        getRowId={row => row.id}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
      {/* View More / Show Less toggle button */}
      {allRows.length > INITIAL_LOAD_COUNT && (
        <div className="flex justify-center py-2">
          <button
            className="text-primary-700 text-sm font-medium flex items-center gap-1 cursor-pointer"
            onClick={handleToggle}
          >
            {expanded ? (
              <>
                Show Less <FaChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More <FaChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentActivityFeedTable;