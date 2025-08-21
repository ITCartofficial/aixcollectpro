import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
const KPICardSections: React.FC = () => {
  const kpiSummaryData = [
    { title: "Team Size", value: "₹3,80,000" },
    { title: "Tasks Managed", value: "₹3,80,000" },
    { title: "Avg. Response Time", value: 77.9, suffix: "%" },
    { title: "Documents Reviewed", value: 52 },
    { title: "Issue Logs Reviewed", value: 68.2, suffix: "%" },
    { title: "Reassignments Made", value: 83, suffix: "%" },
    { title: "Active team memeber", value: 40, suffix: " hrs" },
    { title: "Pending Agent Justifications", value: 4.5 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiSummaryData.map((item, id) => (
        <SummaryCard
          key={id}
          title={item.title}
          value={item.value}
          suffix={item.suffix}
        />
      ))}
    </div>
  );
};

export default KPICardSections;
