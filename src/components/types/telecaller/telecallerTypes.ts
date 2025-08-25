import type { RecentActivityItem } from "../../ui/Table/ExpandedRowContent";

export interface TelecallersTask {
  id: string;
  taskId: string;
  borrowerName: string;
  location: string;
  language: string;
  taskType: "New Calls" | "Follow-up";
  status: "Completed" | "Pending" | "Flagged";
  collectionStatus:
    | "PTP"
    | "Paid"
    | "TNC"
    | "PTPD"
    | "YTC"
    | "SI"
    | "NFI"
    | "No Update";
  lastCallTime: string;
  lastUpdated: string;
  telecaller: string;
  avatar?: string;
  agentAvatar?: string;
  expandedDetails: {
    taskDetails: {
      recommendedTime: string;
      notes: string;
      amount: string;
    };
    loanInformation: {
      loanCategory: string;
      loanAmount: string;
      loanNumber: string;
      bankName: string;
      netAmount: string;
      dueDate: string;
      pos: string;
      tos: string;
    };
    recentActivity: Array<RecentActivityItem>;
  };
}


export interface FieldAgent {
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





export interface Notes {
  id: string;
  lastUpdated: string;
  expandedDetails: {
    taskDetails: {
      notes: string;
    };
  };
  isNew?: boolean; 
}