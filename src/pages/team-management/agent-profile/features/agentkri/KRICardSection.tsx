// import React from "react";
// import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

// const KRICardSection: React.FC = () => {
//   const kriSummaryData = [
//     { title: "High Cash Handling", value: "₹82,000" },
//     { title: "PTP Break Rate", value: 31, suffix: "%" },
//     { title: "Complaint Rate", value: "3.31/100" },
//     { title: "Agent Absenteeism", value: "1 Day" },
//     { title: "Discrepancy Reports", value: "2 Flagged" },
//     { title: "Unauthorized Visits", value: 0 },
//     { title: "Delayed Deposit Cases", value: 21, suffix: " hrs" },
//     { title: "Drop-off Rate", value: 14, suffix: "%" },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {kriSummaryData.map((item, idx) => (
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

// export default KRICardSection;



// KRICardSection.tsx - Updated to accept agent data
import React from "react";
import SummaryCard from "../../../../../components/ui/Card/SummaryCard";

interface FieldAgent {
  id: string;
  agentId: string;
  name: string;
  totalVisits: number;
  paidVisits: number;
  amountCollected: number;
  location: string;
  status: "online" | "On Road" | "In Active" | "On Leave";
  lastSynced: string;
  avatar?: string;
  email: string;
  role: string;
  Vendor: string;
  "Reporting Manager": string;
  dateOfJoining: string;
  performanceScore: string;
  phone: string;
  metrics: {
    kri: {
      highCashHandling: string;
      ptpBreakRate: string;
      complaintRate: string;
      agentAbsenteeism: string;
      discrepancyReports: string;
      unauthorizedVisits: number;
      delayedDepositCases: string;
      dropOffRate: string;
    };
  };
}

interface KRICardSectionProps {
  agentData?: FieldAgent;
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
