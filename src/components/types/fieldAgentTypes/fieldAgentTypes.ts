import type { RecentActivityItem } from "../../ui/Table/ExpandedRowContent";

//KPI
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

//KRI
export interface FieldAgentKRI {
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

//AgentTaskFeedback
export interface FieldAgentsTask {
  taskId: string;
  borrowerName: string;
  location: string;
  docType?: string;
  taskType: string;
  dueDate: string;
  agent: string; 
  lastUpdated: string;
  confirmationStatus: string;
  rating: number;
  comments: string;
  submittedDate: string;
  avatar?: string;
  agentAvatar?: string;
}



//FieldAgentTaskTable

export interface FieldAgentsTaskType {
    id: string;
    taskId: string;
    borrowerName: string;
    location: string;
    docType?: string;
    taskType: "Collection" | "KYC";
    status: "Completed" | "Pending" | "Flagged";
    collectionStatus: "PTP" | "Paid" | "ID" | "PTPD" | "TNC" | "FI" | "No Update";
    dueDate: string;
    agent: string;
    uploadedBy?: string;
    lastUpdated: string;
    telecaller:string;
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