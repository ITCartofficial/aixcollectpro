import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

const KRICardSections: React.FC = () => {
  const kriSummaryData = [
    { title: "High Cash Handling", value: "₹82,000" },
    { title: "PTP Break Rate", value: 31, suffix: "%" },
    { title: "Complaint Rate", value: "3.31/100" },
    { title: "Agent Absenteeism", value: "1 Day" },
    { title: "Discrepancy Reports", value: "2 Flagged" },
    { title: "Unauthorized Visits", value: 0 },
    { title: "Delayed Deposit Cases", value: 21, suffix: " hrs" },
    { title: "Drop-off Rate", value: 14, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kriSummaryData.map((item, idx) => (
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

export default KRICardSections;
