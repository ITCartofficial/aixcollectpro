import React, { useState } from "react";
import userAttendanceSummary from "../../../../../../data/settings/userAttendanceSummary.json";
import { RxDotsVertical } from "react-icons/rx";
import { FiClock } from "react-icons/fi";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import DataTable from "../../../../../components/ui/Table/DataTable";
import { FaEye } from "react-icons/fa";

interface AttendanceSummary {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  totalHours: string;
  lateLogin: boolean;
  verificationLog: string;
}

const columns: TableColumn<AttendanceSummary>[] = [
  {
    key: "date",
    label: "Date",
    width: "150px",
    className: "text-center font-medium",
    sortable: true,
    render: (value: string) => (
      <div className="flex justify-center" style={{ textAlign: "center" }}>
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "checkInTime",
    label: "Check-In Time",
    className: "text-center font-medium",
    render: (value: string, row: AttendanceSummary) => (
      <div
        className="flex items-center justify-center space-x-2"
        style={{ textAlign: "center" }}
      >
        <span>{value}</span>
        {row.lateLogin && (
          <FiClock className="w-4 h-4 text-orange-500" title="Late Login" />
        )}
      </div>
    ),
  },
  {
    key: "checkOutTime",
    label: "Check-Out Time",
    className: "text-center font-medium",
    render: (value: string) => (
      <div className="flex justify-center" style={{ textAlign: "center" }}>
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "totalHours",
    label: "Total Hours",
    className: "text-center font-medium",
    render: (value: string) => (
      <div className="flex justify-center" style={{ textAlign: "center" }}>
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: "lateLogin",
    label: "Late Login",
    className: "text-left font-medium flex items-center",
    render: (value: boolean) => (
      <span
        className={`${
          value ? "text-orange-600" : "text-green-600"
        } font-medium text-center`}
        style={{ display: "inline-block", minWidth: "40px" }}
      >
        {value ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "verificationLog",
    label: "Verification Log",
    className: "text-center font-medium",
    render: () => (
      <div className="flex justify-center">
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaEye className="w-4 h-4" />
          <span>View</span>
        </button>
      </div>
    ),
  },
  {
    key: "id",
    label: "",
    sortable: false,
    width: "50px",
    className: "text-right",
    render: () => (
      <button className="text-neutral-700 px-2 py-1 text-sm flex items-center cursor-pointer hover:bg-neutral-100 rounded">
        <RxDotsVertical className="w-4 h-4" />
      </button>
    ),
  },
];

const AttendanceSummary: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);

  const data: AttendanceSummary[] = userAttendanceSummary.map(
    (item, index) => ({
      ...item,
      id: `attendance-${index}`,
      verificationLog: "View Log",
    })
  );

  const handleSelectionChange = (selected: AttendanceSummary[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="bg-white rounded-lg">
      {selectedRows.length > 0 && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} record{selectedRows.length > 1 ? "s" : ""}{" "}
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
      <DataTable
        data={data}
        columns={columns}
        sortable={false}
        pageSize={10}
        pagination={true}
        selectable={false}
        className="shadow-sm mx-auto"
        rowClassName="h-12"
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        headerClassName="h-12 bg-gray-50 text-center"
        emptyMessage="No attendance data found."
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default AttendanceSummary;
