import KRICardSection from "./KRICardSection";
import type { FieldAgentKRI } from "../../../../../components/types/fieldAgentTypes/fieldAgentTypes";

// interface FieldAgentKRI {
//   id: string;
//   agentId: string;
//   name: string;
//   totalVisits: number;
//   paidVisits: number;
//   amountCollected: number;
//   location: string;
//   status: "online" | "On Road" | "In Active" | "On Leave";
//   lastSynced: string;
//   avatar?: string;
//   email: string;
//   role: string;
//   Vendor: string;
//   "Reporting Manager": string;
//   dateOfJoining: string;
//   performanceScore: string;
//   phone: string;
//   metrics: {
//     kri: {
//       highCashHandling: string;
//       ptpBreakRate: string;
//       complaintRate: string;
//       agentAbsenteeism: string;
//       discrepancyReports: string;
//       unauthorizedVisits: number;
//       delayedDepositCases: string;
//       dropOffRate: string;
//     };
//   };
// }

interface AgentKRIProps {
  agentData?: FieldAgentKRI;
}

const AgentKRI: React.FC<AgentKRIProps> = ({ agentData }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <KRICardSection agentData={agentData} />
    </div>
  );
};

export default AgentKRI;