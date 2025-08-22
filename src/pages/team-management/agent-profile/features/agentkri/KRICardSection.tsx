
import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
import type { FieldAgentKRI } from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes";


interface KRICardSectionProps {
  agentData?: FieldAgentKRI;
}

const KRICardSection: React.FC<KRICardSectionProps> = ({ agentData }) => {
  // If no agent data is provided, use default values
  const defaultKriData = [
    { title: "High Cash Handling", value: "₹82,000" },
    { title: "PTP Break Rate", value: 31, suffix: "%" },
    { title: "Complaint Rate", value: "3.31/100" },
    { title: "Agent Absenteeism", value: "1 Day" },
    { title: "Discrepancy Reports", value: "2 Flagged" },
    { title: "Unauthorized Visits", value: 0 },
    { title: "Delayed Deposit Cases", value: 21, suffix: " hrs" },
    { title: "Drop-off Rate", value: 14, suffix: "%" },
  ];

  // If agent data is available, use it to create KRI data
  const kriSummaryData = agentData ? [
    { title: "High Cash Handling", value: agentData.metrics.kri.highCashHandling },
    { title: "PTP Break Rate", value: agentData.metrics.kri.ptpBreakRate },
    { title: "Complaint Rate", value: agentData.metrics.kri.complaintRate },
    { title: "Agent Absenteeism", value: agentData.metrics.kri.agentAbsenteeism },
    { title: "Discrepancy Reports", value: agentData.metrics.kri.discrepancyReports },
    { title: "Unauthorized Visits", value: agentData.metrics.kri.unauthorizedVisits },
    { title: "Delayed Deposit Cases", value: agentData.metrics.kri.delayedDepositCases },
    { title: "Drop-off Rate", value: agentData.metrics.kri.dropOffRate },
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

export default KRICardSection;
