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
import attendanceData from "../../../../../../data/attendance/attendanceData.json";

interface TabConfigurationsProps {
  agentData: any; 
}

interface TabConfig {
  label: string;
  value: string;
  component: (props: { agentData: any }) => React.ReactNode;
}

const TabConfigurations: React.FC<TabConfigurationsProps> = ({ agentData }) => {
  console.log("I am TabConfig", agentData);

  // Find corresponding attendance data for the agent
  const agentAttendanceData = attendanceData.find(
    (attendance: any) => attendance.id === agentData.agentId
  );

  // Merge agent data with attendance data
  const mergedAgentData = {
    ...agentData,
    ...agentAttendanceData,
  };

  const tabsConfig: TabConfig[] = [
    {
      label: "KPI",
      value: "kpi",
      component: (props) => <AgentKPI agentData={props.agentData} />,
    },
    {
      label: "KRI",
      value: "kri",
      component: (props) => <AgentKRI agentData={props.agentData} />,
    },
    {
      label: "Tasks",
      value: "tasks",
      component: (props) => <AgentTaskTab agentData={props.agentData} />,
    },
    {
      label: "Attendance",
      value: "attendance",
      component: () => <AgentAttendance agentData={mergedAgentData} />,
    },
    {
      label: "Leave & Request",
      value: "leave-request",
      component: AgentLeaveRequest,
    },
    {
      label: "Documents",
      value: "documents",
      component: (props) => <AgentDocuments agentData={props.agentData} />,
    },
    {
      label: "Issue Logged",
      value: "issue-logged",
      component: (props) => <AgentIssueLogged agentData={props.agentData} />,
    },
    {
      label: "Location Tracking",
      value: "location-tracking",
      component: CombinedLocationAndActivity,
    },
    {
      label: "Task Feedback",
      value: "task-feedback",
      component: (props) => <AgentTaskFeedback agentData={props.agentData} /> ,
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
        {ActiveComponent ? (
          <ActiveComponent
            agentData={activeTab === "attendance" ? mergedAgentData : agentData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TabConfigurations;
