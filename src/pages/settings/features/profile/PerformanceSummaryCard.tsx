import React from "react";
import SummaryCard from "../../../../components/ui/Card/SummaryCard";


const PerformanceSummaryCard: React.FC = () => {
  const summaryData = [
    { title: "Total Agents Managed", value: 28 },
    { title: "Avg. Task Closure Time", value: 1.5, suffix:"Hrs" },
    { title: "SLA Compliance Rate", value: 92, suffix: "%" },
    { title: "Escalations Handled", value: 7 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, idx) => (
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

export default PerformanceSummaryCard;
