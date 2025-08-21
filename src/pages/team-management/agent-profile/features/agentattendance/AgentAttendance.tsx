// // import AttendanceCardSections from "./AttendanceCardSections"
// // import AttendanceSummary from "./AttendanceSummary"

// // const AgentAttendance = () => {
// //   return (
// //      <div className="flex flex-col gap-y-4">
// //       <AttendanceCardSections />
// //       <AttendanceSummary/>
// //     </div>
// //   )
// // }

// // export default AgentAttendance


// //secondary
// // import attendanceData from "../../../../../../data/attendance/attendanceData.json";
// // import AttendanceCardSections from "./AttendanceCardSections";
// // import AttendanceSummary from "./AttendanceSummary";

// // const AgentAttendance = ({ agentData }: { agentData: any }) => {
// //   // Find matching attendance record
// //   const agentAttendance = attendanceData.find(
// //     (record) => record.id === agentData.agentId
// //   );
// //   if (!agentAttendance) {
// //     return <p>No attendance data available for {agentData.name}</p>;
// //   }

// //   return (
// //     <div className="flex flex-col gap-y-4">
// //       <AttendanceCardSections attendance={agentAttendance} />
// //       <AttendanceSummary agentId={agentData.agentId} />
// //     </div>
// //   );
// // };

// // export default AgentAttendance;


// //third 
// import attendanceData from "../../../../../../data/attendance/attendanceData.json";
// import AttendanceCardSections from "./AttendanceCardSections";
// import AttendanceSummary from "./AttendanceSummary";

// interface AgentAttendanceProps {
//   agentData: any;
// }

// const parseTime = (timeStr: string) => {
//   if (!timeStr || timeStr.includes("—")) return null;
//   const [time, modifier] = timeStr.trim().split(" ");
//   let [hours, minutes] = time.split(":").map(Number);

//   if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12;
//   if (modifier.toLowerCase() === "am" && hours === 12) hours = 0;

//   return hours * 60 + minutes;
// };

// const AgentAttendance: React.FC<AgentAttendanceProps> = ({ agentData }) => {
//   // Filter all records for this agent
//   const records = attendanceData.filter((r) => r.id === agentData.agentId);

//   if (records.length === 0) {
//     return <p>No attendance data for {agentData.name}</p>;
//   }

//   const totalWorkingDays = 26;
//   let presentDays = 0;
//   let lateCheckIns = 0;
//   let overtimeDays = 0;
//   let totalMinutes = 0;

//   records.forEach((r) => {
//     const checkIn = parseTime(r.checkInTime);
//     const checkOut = parseTime(r.checkOutTime);

//     if (checkIn && checkOut) {
//       presentDays++;
//       totalMinutes += checkOut - checkIn;

//       if (checkIn > 10 * 60) lateCheckIns++; // after 10:00 AM
//       if (checkOut > 22 * 60) overtimeDays++; // after 10:00 PM
//     }
//   });

//   const daysAbsent = totalWorkingDays - presentDays;
//   const avgHrsPerDay =
//     presentDays > 0 ? (totalMinutes / presentDays / 60).toFixed(1) : "0";

//   const summary = {
//     totalWorkingDays,
//     presentDays,
//     lateCheckIns,
//     avgHrsPerDay,
//     daysAbsent,
//     overtimeDays,
//   };

//   return (
//     <div className="flex flex-col gap-y-4">
//       <AttendanceCardSections summary={summary} />
//       <AttendanceSummary records={records} />
//     </div>
//   );
// };

// export default AgentAttendance;




// Enhanced AgentAttendance.tsx for individual agent view



import React, { useMemo } from "react";
import { AttendanceCalculator } from "../../../../../components/types/attendanceCalculations";
import type { AttendanceSummary } from "../../../../../components/types/attendanceCalculations";
import type { AttendanceRecord } from "../../../../../components/types/attendanceCalculations";
import type { TableColumn } from "../../../../../components/ui/Table/DataTable";
import DataTable from "../../../../../components/ui/Table/DataTable";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
import { FiClock } from "react-icons/fi";

interface AgentAttendanceProps {
  agentData: any; // The selected agent data
}

const AgentAttendance: React.FC<AgentAttendanceProps> = ({ agentData }) => {
  // Calculate attendance summary and records
  const attendanceSummary: AttendanceSummary = useMemo(() => {
    return AttendanceCalculator.calculateAttendanceSummary(agentData);
  }, [agentData]);

  const attendanceRecords: AttendanceRecord[] = useMemo(() => {
    return AttendanceCalculator.getAttendanceRecords(agentData);
  }, [agentData]);

  // Summary cards data
  const attendanceSummaryData = [
    { 
      title: "Total Working Days", 
      value: attendanceSummary.totalWorkingDays 
    },
    { 
      title: "Present Days", 
      value: attendanceSummary.presentDays 
    },
    { 
      title: "Late Check-Ins", 
      value: attendanceSummary.lateCheckIns 
    },
    { 
      title: "Avg. Daily Work Hours", 
      value: attendanceSummary.avgDailyHours.toString(), 
      suffix: " hrs" 
    },
    { 
      title: "Days Absent", 
      value: attendanceSummary.absentDays 
    },
    { 
      title: "Total Overtime Days", 
      value: attendanceSummary.totalOvertimeDays 
    },
  ];

  // Table columns for attendance records
  const columns: TableColumn<AttendanceRecord>[] = [
    {
      key: "date",
      label: "Date",
      width: "150px",
      className: "text-center font-medium",
      sortable: true,
      render: (value: string) => (
        <div className="flex justify-center">
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: "checkInTime",
      label: "Check-In Time",
      className: "text-center font-medium",
      render: (value: string, row: AttendanceRecord) => (
        <div className="flex items-center justify-center space-x-2">
          <span className={row.status === 'absent' ? 'text-gray-400' : ''}>{value}</span>
          {row.lateLogin && value !== '—' && (
            <FiClock className="w-4 h-4 text-orange-500" title="Late Login" />
          )}
        </div>
      ),
    },
    {
      key: "checkOutTime",
      label: "Check-Out Time",
      className: "text-center font-medium",
      render: (value: string, row: AttendanceRecord) => (
        <div className="flex justify-center">
          <span className={row.status === 'absent' ? 'text-gray-400' : ''}>{value}</span>
        </div>
      ),
    },
    {
      key: "totalHours",
      label: "Total Hours",
      className: "text-center font-medium",
      render: (value: number) => (
        <div className="flex justify-center">
          <span>{value > 0 ? `${value.toFixed(1)}h` : '—'}</span>
        </div>
      ),
    },
    {
      key: "overtime",
      label: "Overtime",
      className: "text-center font-medium",
      render: (value: number) => (
        <div className="flex justify-center">
          <span className={value > 0 ? 'text-blue-600 font-semibold' : ''}>
            {value > 0 ? `${value.toFixed(1)}h` : '—'}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      className: "text-center font-medium",
      render: (value: string) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'present':
              return 'text-green-600 bg-green-50';
            case 'late':
              return 'text-orange-600 bg-orange-50';
            case 'absent':
              return 'text-red-600 bg-red-50';
            default:
              return 'text-gray-600 bg-gray-50';
          }
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(value)}`}>
            {value}
          </span>
        );
      }
    }
  ];

  return (
    <div className="flex flex-col gap-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {attendanceSummaryData.map((item, idx) => (
          <SummaryCard
            key={idx}
            title={item.title}
            value={item.value}
            suffix={item.suffix}
          />
        ))}
      </div>

      {/* Attendance Details Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Attendance Details - {agentData.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Daily attendance records for the current period
          </p>
        </div>
        
        <DataTable
          data={attendanceRecords}
          columns={columns}
          sortable={true}
          pagination={true}
          pageSize={10}
          className="shadow-sm"
          emptyMessage="No attendance data found."
          getRowId={(row) => row.id}
        />
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Attendance Rate:</span>
              <span className="font-semibold text-green-600">
                {((attendanceSummary.presentDays / attendanceSummary.totalWorkingDays) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Punctuality Rate:</span>
              <span className="font-semibold text-blue-600">
                {attendanceSummary.presentDays > 0 ? 
                  (((attendanceSummary.presentDays - attendanceSummary.lateCheckIns) / attendanceSummary.presentDays) * 100).toFixed(1) 
                  : 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Overtime:</span>
              <span className="font-semibold text-purple-600">
                {attendanceSummary.totalOvertimeHours.toFixed(1)} hours
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Status:</span>
              <span className={`font-semibold px-2 py-1 rounded text-sm ${
                attendanceSummary.currentStatus === 'On-Road' || attendanceSummary.currentStatus === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : attendanceSummary.currentStatus === 'Inactive' 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {attendanceSummary.currentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Today's Activity:</span>
              <span className="font-semibold text-gray-800">
                {attendanceSummary.todayCheckInOut}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Hours/Day:</span>
              <span className="font-semibold text-blue-600">
                {attendanceSummary.avgDailyHours} hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAttendance;

