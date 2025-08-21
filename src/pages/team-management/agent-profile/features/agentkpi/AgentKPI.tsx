//main
// import KPICardSection from "./KPICardSection";

// const AgentKPI = () => {
//   return (
//     <div className="flex flex-col gap-y-4">
//       <KPICardSection />
//     </div>
//   );
// };

// export default AgentKPI;



//second

// AgentKPI.tsx - Updated to accept and pass agent data
import KPICardSection from "./KPICardSection";

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

interface AgentKPIProps {
  agentData?: FieldAgent;
}

const AgentKPI: React.FC<AgentKPIProps> = ({ agentData }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <KPICardSection agentData={agentData} />
    </div>
  );
};

export default AgentKPI;
