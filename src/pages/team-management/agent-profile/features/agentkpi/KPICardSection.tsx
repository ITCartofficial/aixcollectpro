import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
const KPICardSection: React.FC = () => {
  const kpiSummaryData = [
    { title: "Total Assigned", value: "₹3,80,000" },
    { title: "Total Collected", value: "₹3,80,000" },
    { title: "Collection Rate", value: 77.9, suffix: "%" },
    { title: "Accounts resolved", value: 52 },
    { title: "PTP conversion Rate", value: 68.2, suffix: "%" },
    { title: "Visit CompletionRate", value: 83, suffix: "%" },
    { title: "Field Utilization Rate", value: 40, suffix: " hrs" },
    { title: "Customer Score", value: 4.5 },
    { title: "Avg. Collection per Visit", value: "₹4,345" },
    { title: "Success Rate", value: 83, suffix: "%" },
    { title: "Dispute Resolution TAT", value: "1.8 Days" },
    { title: "Pending Accounts", value: 18 },
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

export default KPICardSection;
