import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
import type { FieldAgent } from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes";
interface KRICardSectionProps {
  telecaller?: FieldAgent;
}
const KRICardSections: React.FC<KRICardSectionProps> = ({telecaller}) => {
  const defaultKriData = [
    { title: "High Cash Handling", value: "₹32,000" },
    { title: "PTP Break Rate", value: 31, suffix: "%" },
    { title: "Complaint Rate", value: "3.31/100" },
    { title: "Agent Absenteeism", value: "1 Day" },
    { title: "Discrepancy Reports", value: "2 Flagged" },
    { title: "Unauthorized Visits", value: 0 },
    { title: "Delayed Deposit Cases", value: 21, suffix: " hrs" },
    { title: "Drop-off Rate", value: 14, suffix: "%" },
  ];
  const kriSummaryData = telecaller ? [
    { title: "High Cash Handling", value: telecaller.metrics.kri.highCashHandling },
    { title: "PTP Break Rate", value: telecaller.metrics.kri.ptpBreakRate },
    { title: "Complaint Rate", value: telecaller.metrics.kri.complaintRate },
    { title: "Agent Absenteeism", value: telecaller.metrics.kri.agentAbsenteeism },
    { title: "Discrepancy Reports", value: telecaller.metrics.kri.discrepancyReports },
    { title: "Unauthorized Visits", value: telecaller.metrics.kri.unauthorizedVisits },
    { title: "Delayed Deposit Cases", value: telecaller.metrics.kri.delayedDepositCases },
    { title: "Drop-off Rate", value: telecaller.metrics.kri.dropOffRate },
  ] : defaultKriData;


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
