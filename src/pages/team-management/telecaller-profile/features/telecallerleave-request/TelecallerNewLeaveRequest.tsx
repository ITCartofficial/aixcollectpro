import leaveRequests from "../../../../../../data/settings/userLeaveRequests.json";
import { RxDotsVertical } from "react-icons/rx";
import { useState } from "react";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import Badge from "../../../../../components/ui/Table/Badge";
import DataTable from "../../../../../components/ui/Table/DataTable";

interface LeaveRequests {
  id: string;
  leaveStartDate: string;
  leaveEndDate: string;
  days: number;
  leaveType:
    | "Sick Leave"
    | "Casual Leave"
    | "Earned Leave"
    | "Unpaid Leave"
    | "Comp Offs"
    | "Maternity Leave"
    | "Paternity Leave";
  notes: string;
  status: "Approved" | "Rejected" | "Pending";
}

const getStatusVariant = (
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
};

const columns: TableColumn<LeaveRequests>[] = [
  {
    key: "leaveStartDate",
    label: "Leave From - To",
    width: "200px",
    className: "text-left font-medium",
    render: (_value: string, row: LeaveRequests) => (
      <div className="text-sm font-medium">
        {row.leaveStartDate} - {row.leaveEndDate}
      </div>
    ),
  },
  {
    key: "leaveType",
    label: "Leave Type",
    className: "text-center font-medium",
    headerAlign: "center",
    render: (value: string) => (
      <div className="text-sm text-gray-700">{value}</div>
    ),
  },
  {
    key: "days",
    label: "Days",
    width: "120px",
    className: "text-center font-medium",
    headerAlign: "center",
    render: (value: number) => (
      <div className="text-sm text-gray-700">{value}</div>
    ),
  },
  {
    key: "notes",
    label: "Notes",
    className: "text-center font-medium",
    headerAlign: "center",
    render: (value: string) => (
      <div className="text-sm text-gray-700">{value}</div>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "120px",
    className: "text-center font-medium",
    render: (value: string) => (
      <Badge variant={getStatusVariant(value)}>{value}</Badge>
    ),
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

const TelecallerNewLeaveRequest: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<LeaveRequests[]>([]);

  // Handle row selection changes
  const handleSelectionChange = (selected: LeaveRequests[]) => {
    setSelectedRows(selected);
  };

  // Process data with proper type casting and filter to show only pending requests
  const data: LeaveRequests[] = leaveRequests
    .filter((item) => item.status === "Pending")
    .map((item, index) => ({
      ...item,
      id: `leaveRequest-${index}`,
      days: typeof item.days === "string" ? parseInt(item.days) : item.days, // Convert string to number if needed
      leaveType: item.leaveType as
        | "Sick Leave"
        | "Casual Leave"
        | "Earned Leave"
        | "Unpaid Leave"
        | "Comp Offs"
        | "Maternity Leave"
        | "Paternity Leave",
      status: item.status as "Approved" | "Rejected" | "Pending",
    }));

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-regular font-semibold text-neutral-700 pb-4">
        New Leave Request
      </h2>
      {/* SELECTED ITEMS DISPLAY SECTION */}
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} request{selectedRows.length > 1 ? "s" : ""}{" "}
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
      <DataTable
        data={data}
        columns={columns}
        sortable={false}
        pageSize={5}
        pagination={true}
        selectable={true}
        className="shadow-sm"
        rowClassName="h-16"
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        headerClassName="h-12 bg-gray-50"
        emptyMessage="No pending leave requests found."
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default TelecallerNewLeaveRequest;
