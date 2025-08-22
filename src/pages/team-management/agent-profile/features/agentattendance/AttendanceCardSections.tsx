// import React from "react";
// import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

// const AttendanceCardSections: React.FC = () => {
//   const attendanceSummaryData = [
//     { title: "Total Working Days", value: 26 },
//     { title: "Present Days", value: 9 },
//     { title: "Late Check-Ins", value: 3 },
//     { title: "Avg. Daily Work Hours", value: "8.3", suffix: " hrs" },
//     { title: "Days Absent", value: 0 },
//     { title: "Total Overtime Days", value: 4 },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {attendanceSummaryData.map((item, idx) => (
//         <SummaryCard
//           key={idx}
//           title={item.title}
//           value={item.value}
//           suffix={item.suffix}
//         />
//       ))}
//     </div>
//   );
// };

// export default AttendanceCardSections;




//secondary

// import React from "react";
// import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

// interface AttendanceCardSectionsProps {
//   agentData?: any; // The selected agent data passed from the profile
// }

// const AttendanceCardSections: React.FC<AttendanceCardSectionsProps> = ({ agentData }) => {
//   // Default values or calculate from agentData
//   const getAttendanceSummary = () => {
//     if (!agentData) {
//       return [
//         { title: "Total Working Days", value: 27 },
//         { title: "Present Days", value: 9 },
//         { title: "Late Check-Ins", value: 3 },
//         { title: "Avg. Daily Work Hours", value: "8.3", suffix: " hrs" },
//         { title: "Days Absent", value: 0 },
//         { title: "Total Overtime Days", value: 4 },
//       ];
//     }

//     // Calculate values from agentData
//     const totalWorkingDays = agentData.totalworkingdays || 26;
//     const presentDays = agentData.presentDays || 0;
//     const lateCheckIns = agentData.lateCheckIns || 0;
//     const avgHrsPerDay = agentData.avgHrsPerDay || 0;
//     const daysAbsent = agentData.daysAbsent || 0;
//     const totalOvertimeDays = agentData.totalOvertimeDays || 0;

//     return [
//       { title: "Total Working Days", value: totalWorkingDays },
//       { title: "Present Days", value: presentDays },
//       { title: "Late Check-Ins", value: lateCheckIns },
//       { title: "Avg. Daily Work Hours", value: avgHrsPerDay.toString(), suffix: " hrs" },
//       { title: "Days Absent", value: daysAbsent },
//       { title: "Total Overtime Days", value: totalOvertimeDays },
//     ];
//   };

//   const attendanceSummaryData = getAttendanceSummary();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {attendanceSummaryData.map((item, idx) => (
//         <SummaryCard
//           key={idx}
//           title={item.title}
//           value={item.value}
//           suffix={item.suffix}
//         />
//       ))}
//     </div>
//   );
// };

// export default AttendanceCardSections;

//third


import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

interface AttendanceCardSectionsProps {
  agentData?: any; // The selected agent data passed from the profile
}

const AttendanceCardSections: React.FC<AttendanceCardSectionsProps> = ({ agentData }) => {
  // Helper function to check if check-in time is after 9:00 AM
  const isLateLogin = (checkInTime: string): boolean => {
    try {
      // Parse the time string (e.g., "09:30 AM", "08:45 AM")
      const timeMatch = checkInTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!timeMatch) return false;
      
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const period = timeMatch[3].toUpperCase();
      
      // Convert to 24-hour format
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
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

  // Default values or calculate from agentData
  const getAttendanceSummary = () => {
    if (!agentData) {
      // Default values when no agent is selected
      return [
        { title: "Total Working Days", value: 26 },
        { title: "Present Days", value: 9 },
        { title: "Late Check-Ins", value: 3 },
        { title: "Avg. Daily Work Hours", value: "8.3", suffix: " hrs" },
        { title: "Days Absent", value: 0 },
        { title: "Total Overtime Days", value: 4 },
      ];
    }

    // Calculate values from agentData
    const totalWorkingDays = agentData.totalworkingdays || 26;
    const presentDays = agentData.presentDays || 0;
    const avgHrsPerDay = agentData.avgHrsPerDay || 0;
    const daysAbsent = agentData.daysAbsent || 0;
    const totalOvertimeDays = agentData.totalOvertimeDays || 0;
    
    // Calculate late check-ins based on actual check-in time vs 9:00 AM
    let calculatedLateCheckIns = 0;
    if (agentData.checkInTime) {
      calculatedLateCheckIns = isLateLogin(agentData.checkInTime) ? agentData.lateCheckIns || 1 : 0;
    } else {
      calculatedLateCheckIns = agentData.lateCheckIns || 0;
    }

    return [
      { title: "Total Working Days", value: totalWorkingDays },
      { title: "Present Days", value: presentDays },
      { title: "Late Check-Ins", value: calculatedLateCheckIns },
      { title: "Avg. Daily Work Hours", value: avgHrsPerDay.toString(), suffix: " hrs" },
      { title: "Days Absent", value: daysAbsent },
      { title: "Total Overtime Days", value: totalOvertimeDays },
    ];
  };

  const attendanceSummaryData = getAttendanceSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {attendanceSummaryData.map((item, idx) => (
        <SummaryCard
          key={idx}
          title={item.title}
          value={item.value}
          suffix={item.suffix}
        />
      ))}
    </div>
  );
};

export default AttendanceCardSections;