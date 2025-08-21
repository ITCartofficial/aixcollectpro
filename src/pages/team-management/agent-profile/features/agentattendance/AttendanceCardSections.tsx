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
import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

interface AttendanceCardSectionsProps {
  summary: {
    totalWorkingDays: number;
    presentDays: number;
    lateCheckIns: number;
    avgHrsPerDay: string | number;
    daysAbsent: number;
    overtimeDays: number;
  };
}

const AttendanceCardSections: React.FC<AttendanceCardSectionsProps> = ({ summary }) => {
  const data = [
    { title: "Total Working Days", value: summary.totalWorkingDays },
    { title: "Present Days", value: summary.presentDays },
    { title: "Late Check-Ins", value: summary.lateCheckIns },
    { title: "Avg. Daily Work Hours", value: summary.avgHrsPerDay, suffix: " hrs" },
    { title: "Days Absent", value: summary.daysAbsent },
    { title: "Total Overtime Days", value: summary.overtimeDays },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((item, idx) => (
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
