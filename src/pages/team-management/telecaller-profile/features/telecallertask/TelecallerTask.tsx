import { useState } from "react";
import { FaEye } from "react-icons/fa";
import telecallersTableData from "../../../../../../data/team-management/telecallersData.json";
import { useNavigate } from "react-router-dom";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Avatar from "../../../../../components/ui/Table/Avatar";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable from "../../../../../components/ui/Table/DataTable";
import { RxDotsVertical } from "react-icons/rx";

interface Telecallers {
  id: string;
  name: string;
  callsMade: number;
  paidCases: number;
  amountCollected: number;
  language: string; // This remains a string, e.g., "Hindi, English"
  status: "Active" | "Inactive" | "On Leave";
  lastSynced: string;
  avatar?: string;
}

// Main Telecallers Component
const TelecallerTask: React.FC = () => {
  const telecallersData: Telecallers[] = telecallersTableData as Telecallers[];
  const [selectedRows, setSelectedRows] = useState<Telecallers[]>([]);
  const navigate = useNavigate();

  const handleSelectionChange = (selected: Telecallers[]) => {
    setSelectedRows(selected);
  };

  const handleViewAgent = (agent: Telecallers) => {
    navigate(`/team-management/telecaller-profile/${agent.id}`);
  };

  // Table columns configuration
  const columns: TableColumn<Telecallers>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      width: "200px",
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <Avatar name={value} image={row.avatar} size="md" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "callsMade",
      label: "Calls Made",
      sortable: true,
      width: "120px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "paidCases",
      label: "Paid Cases",
      sortable: true,
      width: "120px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "amountCollected",
      label: "Amount Collected",
      sortable: true,
      width: "160px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => (
        <span className="font-medium">₹{value.toLocaleString()}</span>
      ),
    },
    {
      key: "language",
      label: "Language",
      sortable: true,
      width: "150px",
      className: "text-left",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: "status",
      label: "Status",
      width: "120px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => {
        const variant =
          value === "Active"
            ? "success"
            : value === "Inactive"
            ? "danger"
            : "info";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      key: "lastSynced",
      label: "Last Synced",
      sortable: true,
      width: "120px",
      headerAlign: "center",
      className: "text-center",
      render: (value) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "id",
      label: "Action",
      sortable: false,
      width: "100px",
      className: "text-center",
      render: (_, row) => (
        <button
          className="bg-primary-700 hover:bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent row selection if DataTable also has row click
            handleViewAgent(row);
          }}
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      ),
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

  return (
    <div className=" bg-white rounded-lg p-6">
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

      {/* DataTable Component */}
      <DataTable
        data={telecallersData}
        columns={columns}
        selectable={true}
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        sortable={true}
        pagination={true}
        pageSize={10}
        className="shadow-sm"
        emptyMessage="No telecallers found"
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default TelecallerTask;
