// import React from "react";
// import SummaryCard from "../../../../../components/ui/Card/SummaryCard";
// const KPICardSection: React.FC = () => {
//   const kpiSummaryData = [
//     { title: "Total Assigned", value: "₹3,80,000" },
//     { title: "Total Collected", value: "₹3,80,000" },
//     { title: "Collection Rate", value: 77.9, suffix: "%" },
//     { title: "Accounts resolved", value: 52 },
//     { title: "PTP conversion Rate", value: 68.2, suffix: "%" },
//     { title: "Visit CompletionRate", value: 83, suffix: "%" },
//     { title: "Field Utilization Rate", value: 40, suffix: " hrs" },
//     { title: "Customer Score", value: 4.5 },
//     { title: "Avg. Collection per Visit", value: "₹4,345" },
//     { title: "Success Rate", value: 83, suffix: "%" },
//     { title: "Dispute Resolution TAT", value: "1.8 Days" },
//     { title: "Pending Accounts", value: 18 },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {kpiSummaryData.map((item, id) => (
//         <SummaryCard
//           key={id}
//           title={item.title}
//           value={item.value}
//           suffix={item.suffix}
//         />
//       ))}
//     </div>
//   );
// };

// export default KPICardSection;




// KPICardSection.tsx - Updated to accept agent data
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
    kpi: {
      totalAssigned: string;
      totalCollected: string;
      collectionRate: string;
      accountsResolved: number;
      ptpConversionRate: string;
      visitCompletionRate: string;
      fieldUtilizationRate: string;
      customerScore: number;
      avgCollectionPerVisit: string;
      successRate: string;
      disputeResolutionTAT: string;
      pendingAccounts: number;
    };
  };
}

interface KPICardSectionProps {
  agentData?: FieldAgent;
}

const KPICardSection: React.FC<KPICardSectionProps> = ({ agentData }) => {
  const defaultKpiData = [
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
    { title: "Pending Accounts", value: 18888 },
  ];

  // If agent data is available, use it to create KPI data
  const kpiSummaryData = agentData ? [
    { title: "Total Assigned", value: agentData.metrics.kpi.totalAssigned },
    { title: "Total Collected", value: agentData.metrics.kpi.totalCollected },
    { title: "Collection Rate", value: agentData.metrics.kpi.collectionRate },
    { title: "Accounts resolved", value: agentData.metrics.kpi.accountsResolved },
    { title: "PTP conversion Rate", value: agentData.metrics.kpi.ptpConversionRate },
    { title: "Visit CompletionRate", value: agentData.metrics.kpi.visitCompletionRate },
    { title: "Field Utilization Rate", value: agentData.metrics.kpi.fieldUtilizationRate },
    { title: "Customer Score", value: agentData.metrics.kpi.customerScore },
    { title: "Avg. Collection per Visit", value: agentData.metrics.kpi.avgCollectionPerVisit },
    { title: "Success Rate", value: agentData.metrics.kpi.successRate },
    { title: "Dispute Resolution TAT", value: agentData.metrics.kpi.disputeResolutionTAT },
    { title: "Pending Accounts", value: agentData.metrics.kpi.pendingAccounts },
  ] : defaultKpiData;

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