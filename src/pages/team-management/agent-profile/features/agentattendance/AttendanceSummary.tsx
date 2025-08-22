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

// import React, { useState, useMemo } from "react";
// import userAttendanceSummary from "../../../../../../data/settings/userAttendanceSummary.json";
// import attendanceData from "../../../../../../data/attendance/attendanceData.json";
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

// interface AttendanceSummaryProps {
//   agentData?: any;
// }

// const columns: TableColumn<AttendanceSummary>[] = [
//   {
//     key: "date",
//     label: "Date",
//     width: "150px",
//     className: "text-center font-medium",
//     headerAlign: "center",
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
//     headerAlign: "center",
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
//     headerAlign: "center",
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
//     headerAlign: "center",
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
//     headerAlign: "center",
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
//     headerAlign: "center",
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

// const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ agentData }) => {
//   const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);

//   const data: AttendanceSummary[] = useMemo(() => {
//     if (agentData && agentData.id) {
//       const agentAttendance = attendanceData.find(
//         (attendance: any) => attendance.id === agentData.id
//       );

//       if (agentAttendance) {
//         const attendanceRecords = [];
//         for (let i = 1; i <= agentAttendance.presentDays; i++) {
//           const date = new Date();
//           date.setDate(date.getDate() - (agentAttendance.presentDays - i));

//           attendanceRecords.push({
//             id: `attendance-${agentAttendance.id}-${i}`,
//             date: date.toLocaleDateString("en-GB", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             }),
//             checkInTime: agentAttendance.checkInTime || "09:00 AM",
//             checkOutTime: agentAttendance.checkOutTime || "06:00 PM",
//             totalHours: `${agentAttendance.avgHrsPerDay || 8} hrs`,
//             lateLogin:
//               agentAttendance.lateLogin === "yes" &&
//               i <= agentAttendance.lateCheckIns,
//             verificationLog: "View Log",
//           });
//         }

//         return attendanceRecords;
//       }
//     }

//     return userAttendanceSummary.map((item, index) => ({
//       ...item,
//       id: `attendance-default-${index}`,
//       verificationLog: "View Log",
//     }));
//   }, [agentData]);

//   const handleSelectionChange = (selected: AttendanceSummary[]) => {
//     setSelectedRows(selected);
//   };
//   return (
//     <div className="bg-white rounded-lg">
//       {/* Agent Info Header */}
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
//         emptyMessage={
//           agentData
//             ? `No attendance data found for ${agentData.name}.`
//             : "No attendance data found."
//         }
//         getRowId={(row) => row.id}
//       />
//     </div>
//   );
// };

// export default AttendanceSummary;

//third

import React, { useState, useMemo } from "react";
import userAttendanceSummary from "../../../../../../data/settings/userAttendanceSummary.json";
import attendanceData from "../../../../../../data/attendance/attendanceData.json";
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

interface AttendanceSummaryProps {
  agentData?: any; 
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1 cursor-pointer"
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
      <button className="text-black px-2 py-1 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded">
        <RxDotsVertical className="w-4 h-4" />
      </button>
    ),
  },
];

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ agentData }) => {
  const [selectedRows, setSelectedRows] = useState<AttendanceSummary[]>([]);

 
  const isLateLogin = (checkInTime: string): boolean => {
    try {
      // Parse the time string (e.g., "09:30 AM", "08:45 AM")
      const timeMatch = checkInTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!timeMatch) return false;

      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();

      // Convert to 24-hour format
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      // Convert to minutes since midnight for easy comparison
      const checkInMinutes = hours * 60 + minutes;
      const nineAMMinutes = 9 * 60; // 9:00 AM in minutes

      return checkInMinutes > nineAMMinutes;
    } catch (error) {
      return false;
    }
  };

  const data: AttendanceSummary[] = useMemo(() => {
    if (agentData && agentData.id) {
      // Find attendance record for the selected agent
      const agentAttendance = attendanceData.find(
        (attendance: any) => attendance.id === agentData.id
      );

      if (agentAttendance) {
        // Generate attendance records based on agent's data
        const attendanceRecords = [];

        // Create sample records based on agent's present days
        for (let i = 1; i <= agentAttendance.presentDays; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (agentAttendance.presentDays - i));

          const checkInTime = agentAttendance.checkInTime || "09:00 AM";

          const baseCheckIn = checkInTime;
          let actualCheckInTime = baseCheckIn;

          if (i <= agentAttendance.lateCheckIns) {
            const lateMinutes = Math.floor(Math.random() * 30) + 5; 
            const baseTime = new Date(`2000-01-01 ${baseCheckIn}`);
            baseTime.setMinutes(baseTime.getMinutes() + lateMinutes);
            actualCheckInTime = baseTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
          } else {
            const earlyMinutes = Math.floor(Math.random() * 15); // 0-15 minutes early
            const baseTime = new Date(`2000-01-01 09:00 AM`);
            baseTime.setMinutes(baseTime.getMinutes() - earlyMinutes);
            actualCheckInTime = baseTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
          }

          attendanceRecords.push({
            id: `attendance-${agentAttendance.id}-${i}`,
            date: date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            checkInTime: actualCheckInTime,
            checkOutTime: agentAttendance.checkOutTime || "06:00 PM",
            totalHours: `${agentAttendance.avgHrsPerDay || 8} hrs`,
            lateLogin: isLateLogin(actualCheckInTime),
            verificationLog: "View Log",
          });
        }

        return attendanceRecords;
      }
    }
    return userAttendanceSummary.map((item, index) => ({
      ...item,
      id: `attendance-default-${index}`,
      lateLogin: isLateLogin(item.checkInTime),
      verificationLog: "View Log",
    }));
  }, [agentData]);

  const handleSelectionChange = (selected: AttendanceSummary[]) => {
    setSelectedRows(selected);
  };

  return (
    <div className="bg-white rounded-lg">
      {selectedRows.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.length} record{selectedRows.length > 1 ? "s" : ""}{" "}
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
        pageSize={10}
        pagination={true}
        selectable={false}
        className="shadow-sm mx-auto"
        rowClassName="h-12"
        selectedRows={selectedRows}
        onSelectionChange={handleSelectionChange}
        headerClassName="h-12 bg-gray-50 text-center"
        emptyMessage={
          agentData
            ? `No attendance data found for ${agentData.name}.`
            : "No attendance data found."
        }
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default AttendanceSummary;
