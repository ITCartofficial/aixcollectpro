import React, { useState } from "react";
import TabNavigation from "../../../../../components/common/TabNavigation";
import SuprvisorKPI from "../suprvisorKPI/SuprvisorKPI";
import SupervisorTeamOverview from "../supervisorteam-overview/SupervisorTeamOverview";
import SupervisorTaskReassignments from "../supervisorTaskReassignments/SupervisorTaskReassignments";
import SupervisorDocumentsFlagged from "../supervisorDocumentsFlagged/SupervisorDocumentsFlagged";
import SupervisorIssueLogsReviewed from "../supervisorIssueLogsReviewed/SupervisorIssueLogsReviewed";
import SupervisorAttendance from "../supervisorAttendance/SupervisorAttendance";
import SupervisorLeaveRequest from "../supervisorLeaveRequest/SupervisorLeaveRequest";




interface TabConfig {
  label: string;
  value: string;
 component: React.ComponentType;
}

const TabConfig: React.FC = () => {
  const tabsConfig: TabConfig[] = [
    {
      label: "KPI",
      value: "kpi",
      component: SuprvisorKPI,
    },
    {
      label: "Team Overview",
      value: "Team-Overview",
      component: SupervisorTeamOverview,
    },
    {
      label: "Task Reassignments",
      value: "Task-Reassignments",
      component: SupervisorTaskReassignments,
    },
    {
      label: "Documents Flagged",
      value: "Documents-Flagged",
      component: SupervisorDocumentsFlagged,
    },
    {
      label: "Issue Logs Reviewed",
      value: "Issue-Logs-Reviewed",
      component: SupervisorIssueLogsReviewed,
    },
    {
      label: "Attendance",
      value: "Attendance",
      component: SupervisorAttendance,
    },
    {
      label: "Leave & Request",
      value: "Leave-Request",
      component: SupervisorLeaveRequest,
    },
    // {
    //   label: "Location Tracking",
    //   value: "location-tracking",
    //   component: CombinedLocationAndActivity,
    // },
    // {
    //   label: "Task Feedback",
    //   value: "task-feedback",
    //   component: AgentTaskFeedback,
    // },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState<string>(tabsConfig[0].value);

  // Handle tab change
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    console.log(`Tab changed to: ${tabValue}`);
  };

  // Get current active component
  const activeTabConfig = tabsConfig.find((tab) => tab.value === activeTab);
  const ActiveComponent = activeTabConfig?.component;

  // Create tab items for TabNavigation (only label and value)
  const tabItems = tabsConfig.map((tab) => ({
    label: tab.label,
    value: tab.value,
  }));

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      {/* Tab Navigation */}
      <div className="w-full overflow-x-auto">
        <TabNavigation
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px] pt-4">
        {ActiveComponent && <ActiveComponent/>}
      </div>
    </div>
  );
};

export default TabConfig;
