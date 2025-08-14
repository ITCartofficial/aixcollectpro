import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

const AttendanceCardSections: React.FC = () => {
  const attendanceSummaryData = [
    { title: "Total Working Days", value: 26 },
    { title: "Present Days", value: 9 },
    { title: "Late Check-Ins", value: 3 },
    { title: "Avg. Daily Work Hours", value: "8.3", suffix: " hrs" },
  ];

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