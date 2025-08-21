// import React, { useState } from "react";
// import userAttendanceSummary from "../../../../../../data/settings/userAttendanceSummary.json";
// import { RxDotsVertical } from "react-icons/rx";
// import { FiClock } from "react-icons/fi";
// import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
// import DataTable from "../../../../../components/ui/Table/DataTable";
// import { FaEye } from "react-icons/fa";

// interface AttendanceSummary {
//   id: string;
//   date: string;
//   checkInTime: string;
//   checkOutTime: string;
//   totalHours: string;
//   lateLogin: boolean;
//   verificationLog: string;
// }

// const columns: TableColumn<AttendanceSummary>[] = [
//   {
//     key: "date",
//     label: "Date",
//     width: "150px",
//     className: "text-center font-medium",
//     sortable: true,
//     render: (value: string) => (
//       <div className="flex justify-center" style={{ textAlign: "center" }}>
//         <span>{value}</span>
//       </div>
//     ),
//   },
//   {
//     key: "checkInTime",
//     label: "Check-In Time",
//     className: "text-center font-medium",
//     render: (value: string, row: AttendanceSummary) => (
//       <div
//         className="flex items-center justify-center space-x-2"
//         style={{ textAlign: "center" }}
//       >
//         <span>{value}</span>
//         {row.lateLogin && (
//           <FiClock className="w-4 h-4 text-orange-500" title="Late Login" />
//         )}
//       </div>
//     ),
//   },
//   {
//     key: "checkOutTime",
//     label: "Check-Out Time",
//     className: "text-center font-medium",
//     render: (value: string) => (
//       <div className="flex justify-center" style={{ textAlign: "center" }}>
//         <span>{value}</span>
//       </div>
//     ),
//   },
//   {
//     key: "totalHours",
//     label: "Total Hours",
//     className: "text-center font-medium",
//     render: (value: string) => (
//       <div className="flex justify-center" style={{ textAlign: "center" }}>
//         <span>{value}</span>
//       </div>
//     ),
//   },
//   {
//     key: "lateLogin",
//     label: "Late Login",
//     className: "text-left font-medium flex items-center",
//     render: (value: boolean) => (
//       <span
//         className={`${
//           value ? "text-orange-600" : "text-green-600"
//         } font-medium text-center`}
//         style={{ display: "inline-block", minWidth: "40px" }}
//       >
//         {value ? "Yes" : "No"}
//       </span>
//     ),
//   },
//   {
//     key: "verificationLog",
//     label: "Verification Log",
//     className: "text-center font-medium",
//     render: () => (
//       <div className="flex justify-center">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         >
//           <FaEye className="w-4 h-4" />
//           <span>View</span>
//         </button>
//       </div>
//     ),
//   },
//   {
//     key: "id",
//     label: "",
//     sortable: false,
//     width: "50px",
//     className: "text-right",
//     render: () => (
//       <button className="text-black px-2 py-1 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded">
//         <RxDotsVertical className="w-4 h-4" />
//       </button>
//     ),
//   },
// ];

// const AttendanceSummary: React.FC = () => {
//   const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);

//   const data: AttendanceSummary[] = userAttendanceSummary.map(
//     (item, index) => ({
//       ...item,
//       id: `attendance-${index}`,
//       verificationLog: "View Log",
//     })
//   );

//   const handleSelectionChange = (selected: AttendanceSummary[]) => {
//     setSelectedRows(selected);
//   };

//   return (
//     <div className="bg-white rounded-lg">
//       {selectedRows.length > 0 && (
//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 mt-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-blue-900">
//               {selectedRows.length} record{selectedRows.length > 1 ? "s" : ""}{" "}
//               selected
//             </span>
//             <button
//               onClick={() => setSelectedRows([])}
//               className="text-sm text-blue-700 hover:text-blue-900 cursor-pointer"
//             >
//               Clear selection
//             </button>
//           </div>
//         </div>
//       )}
//       <DataTable
//         data={data}
//         columns={columns}
//         sortable={false}
//         pageSize={10}
//         pagination={true}
//         selectable={false}
//         className="shadow-sm mx-auto"
//         rowClassName="h-12"
//         selectedRows={selectedRows}
//         onSelectionChange={handleSelectionChange}
//         headerClassName="h-12 bg-gray-50 text-center"
//         emptyMessage="No attendance data found."
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// };

// export default AttendanceSummary;


//secondary

// import React, { useState } from "react";
// import attendanceData from "../../../../../../data/attendance/attendanceData.json";
// import { RxDotsVertical } from "react-icons/rx";
// import { FiClock } from "react-icons/fi";
// import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
// import DataTable from "../../../../../components/ui/Table/DataTable";
// import { FaEye } from "react-icons/fa";

// interface AttendanceSummaryProps {
//   agentId: string;
// }

// interface AttendanceRow {
//   id: string;
//   date: string;
//   checkInTime: string;
//   checkOutTime: string;
//   totalHours: string;
//   lateLogin: boolean;
//   verificationLog: string;
// }

// const columns: TableColumn<AttendanceRow>[] = [
//   { key: "date", label: "Date", width: "150px", className: "text-center font-medium" },
//   {
//     key: "checkInTime",
//     label: "Check-In Time",
//     className: "text-center font-medium",
//     render: (value: string, row: AttendanceRow) => (
//       <div className="flex items-center justify-center space-x-2">
//         <span>{value}</span>
//         {row.lateLogin && <FiClock className="w-4 h-4 text-orange-500" title="Late Login" />}
//       </div>
//     ),
//   },
//   { key: "checkOutTime", label: "Check-Out Time", className: "text-center font-medium" },
//   { key: "totalHours", label: "Total Hours", className: "text-center font-medium" },
//   {
//     key: "lateLogin",
//     label: "Late Login",
//     className: "text-center font-medium",
//     render: (value: boolean) => (
//       <span className={value ? "text-orange-600" : "text-green-600"}>
//         {value ? "Yes" : "No"}
//       </span>
//     ),
//   },
//   {
//     key: "verificationLog",
//     label: "Verification Log",
//     className: "text-center font-medium",
//     render: () => (
//       <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer">
//         <FaEye className="w-4 h-4" />
//         <span>View</span>
//       </button>
//     ),
//   },
//   {
//     key: "id",
//     label: "",
//     width: "50px",
//     className: "text-right",
//     render: () => (
//       <button className="text-black px-2 py-1 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded">
//         <RxDotsVertical className="w-4 h-4" />
//       </button>
//     ),
//   },
// ];

// const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ agentId }) => {
//   const [selectedRows, setSelectedRows] = useState<AttendanceRow[]>([]);

//   // Filter attendance data for this agent
//   const data: AttendanceRow[] = attendanceData
//     .filter((record) => record.id === agentId)
//     .map((item, index) => ({
//       id: `attendance-${index}`,
//       date: item.date,
//       checkInTime: item.checkInTime,
//       checkOutTime: item.checkOutTime,
//       totalHours: item.totalHours || `${item.avgHrsPerDay} hrs`,
//       lateLogin: item.lateLogin === "yes",
//       verificationLog: "View Log",
//     }));

//   return (
//     <div className="bg-white rounded-lg">
//       <DataTable
//         data={data}
//         columns={columns}
//         sortable={false}
//         pageSize={10}
//         pagination={true}
//         selectable={false}
//         className="shadow-sm mx-auto"
//         rowClassName="h-12"
//         selectedRows={selectedRows}
//         onSelectionChange={setSelectedRows}
//         headerClassName="h-12 bg-gray-50 text-center"
//         emptyMessage="No attendance data found."
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// };

// export default AttendanceSummary;






import React from "react";
import { RxDotsVertical } from "react-icons/rx";
import { FiClock } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import DataTable from "../../../../../components/ui/Table/DataTable";

interface AttendanceSummaryProps {
  records: any[];
}

interface AttendanceRow {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  totalHours: string;
  lateLogin: boolean;
}

const columns: TableColumn<AttendanceRow>[] = [
  { key: "date", label: "Date", className: "text-center font-medium" },
  {
    key: "checkInTime",
    label: "Check-In Time",
    className: "text-center",
    render: (value: string, row: AttendanceRow) => (
      <div className="flex items-center justify-center space-x-2">
        <span>{value}</span>
        {row.lateLogin && <FiClock className="w-4 h-4 text-orange-500" />}
      </div>
    ),
  },
  { key: "checkOutTime", label: "Check-Out Time", className: "text-center" },
  { key: "totalHours", label: "Total Hours", className: "text-center" },
  {
    key: "lateLogin",
    label: "Late Login",
    render: (v) => (
      <span className={v ? "text-orange-600" : "text-green-600"}>
        {v ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "id",
    label: "Action",
    render: () => (
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
        <FaEye className="w-4 h-4" />
        <span>View</span>
      </button>
    ),
  },
  {
    key: "id",
    label: "",
    render: () => (
      <button className="px-2 py-1">
        <RxDotsVertical className="w-4 h-4 text-gray-600" />
      </button>
    ),
  },
];

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ records }) => {
  const rows: AttendanceRow[] = records.map((r, idx) => {
    const totalHours = r.totalHours || `${r.avgHrsPerDay} hrs`;
    return {
      id: `row-${idx}`,
      date: r.date,
      checkInTime: r.checkInTime,
      checkOutTime: r.checkOutTime,
      totalHours,
      lateLogin: r.lateLogin === "yes",
    };
  });

  return (
    <div className="bg-white rounded-lg">
      <DataTable
        data={rows}
        columns={columns}
        pageSize={10}
        pagination={true}
        selectable={false}
        emptyMessage="No attendance data found."
      />
    </div>
  );
};

export default AttendanceSummary;
