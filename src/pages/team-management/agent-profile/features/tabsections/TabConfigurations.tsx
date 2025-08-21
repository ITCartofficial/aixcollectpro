import React, { useState } from "react";
import TabNavigation from "../../../../../components/common/TabNavigation";
import AgentKPI from "../agentkpi/AgentKPI";
import AgentKRI from "../agentkri/AgentKRI";
import AgentTaskTab from "../agenttasks/AgentTaskTab";
import AgentLeaveRequest from "../agentleave-request/AgentLeaveRequest";
import AgentAttendance from "../agentattendance/AgentAttendance";
import AgentDocuments from "../agentdocuments/AgentDocuments";
import AgentIssueLogged from "../agentissuelogged/AgentIssueLogged";
import CombinedLocationAndActivity from "../agentlocationtracking/CombinedLocationAndActivity";
import AgentTaskFeedback from "../agenttaskfeedback/AgentTaskFeedback";

// Create specific components for each tab



interface TabConfigurationsProps {
  agentData: any; // You can replace `any` with a proper AgentData interface
}

interface TabConfig {
  label: string;
  value: string;
  component: (props: { agentData: any }) => React.ReactNode;
}

const TabConfigurations: React.FC<TabConfigurationsProps> = ({ agentData }) => {
  console.log("i am Agentdata", agentData);
  const tabsConfig: TabConfig[] = [
    {
      label: "KPI",
      value: "kpi",
      component: (props) =><AgentKPI agentData={props.agentData} />,
    },
    {
      label: "KRI",
      value: "kri",
      component: (props) =><AgentKRI agentData={props.agentData} />,
    },
    {
      label: "Tasks",
      value: "tasks",
      component: (props) => <AgentTaskTab agentData={props.agentData} />,
    },
    {
      label: "Attendance",
      value: "attendance",
      component:  (props) => <AgentAttendance agentData={props.agentData} />,
    },
    {
      label: "Leave & Request",
      value: "leave-request",
      component: AgentLeaveRequest,
    },
    {
      label: "Documents",
      value: "documents",
      component: AgentDocuments,
    },
    {
      label: "Issue Logged",
      value: "issue-logged",
      component: AgentIssueLogged,
    },
    {
      label: "Location Tracking",
      value: "location-tracking",
      component: CombinedLocationAndActivity,
    },
    {
      label: "Task Feedback",
      value: "task-feedback",
      component: AgentTaskFeedback,
    },
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
        {ActiveComponent ? <ActiveComponent agentData={agentData} /> : null}
      </div>
    </div>
  );
};

export default TabConfigurations;
