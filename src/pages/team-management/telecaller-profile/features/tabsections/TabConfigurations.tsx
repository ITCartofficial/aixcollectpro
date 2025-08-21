import React, { useState } from "react";
import TabNavigation from "../../../../../components/common/TabNavigation";
import TelecallerKPI from "../telecallerKPI/TelecallerKPI";
import TelecallerKRI from "../telecallerkri/TelecallerKRI";
import TelecallerTask from "../telecallertask/TelecallerTask";
import TelecallerLeaveRequest from "../telecallerleave-request/TelecallerLeaveRequest";
import TelecallerDocuments from "../telecallerdocuments/TelecallerDocuments";
import TelecallerIssueLogged from "../telecallerIssue-Logged/TelecallerIsueLogged";
import TelecallerAttendance from "../telecallerattendance/TelecallerAttendance";


interface TabConfig {
  label: string;
  value: string;
  component: React.ComponentType;
}

const TabConfigurations: React.FC = () => {
  const tabsConfig: TabConfig[] = [
    {
      label: "KPI",
      value: "kpi",
      component: TelecallerKPI,
    },
    {
      label: "KRI",
      value: "kri",
      component: TelecallerKRI,
    },
    {
      label: "Task",
      value: "Task",
      component: TelecallerTask,
    },
    {
      label: "Attendance",
      value: "attendance",
      component: TelecallerAttendance,
    },
    {
      label: "Leave & Request",
      value: "leave-request",
      component: TelecallerLeaveRequest,
    },
    {
      label: "Documents",
      value: "documents",
      component: TelecallerDocuments,
    },
    {
      label: "Issue Logged",
      value: "issue-logged",
      component: TelecallerIssueLogged,
    }
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
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default TabConfigurations;
