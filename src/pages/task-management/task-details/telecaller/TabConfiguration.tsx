
import React, { useState } from "react";
import Notes from "./Notes";
import TabNavigation from "../../../../components/common/TabNavigation";
import TaskHistory from "./TaskHistory";
import TaskActionLogged from "./TaskActionLogged";

interface TabConfigurationsProps {
  taskId: string | undefined;
  taskData?: any;
}

interface TabConfig {
  label: string;
  value: string;
  component: React.ComponentType<any>;
}

const TabConfigurations: React.FC<TabConfigurationsProps> = ({
  taskId,
  taskData,
}) => {
  const tabsConfig: TabConfig[] = [
 
    {
      label: "Task History",
      value: "Task History",
      component: TaskHistory,
    },
    {
      label: "Notes",
      value: "Notes",
      component: Notes,
    },
    {
      label: "Task Action Logged",
      value: "Task-Action-Logged",
      component: TaskActionLogged,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabsConfig[0].value);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    console.log(`Tab changed to: ${tabValue}`);
  };

  const activeTabConfig = tabsConfig.find((tab) => tab.value === activeTab);
  const ActiveComponent = activeTabConfig?.component;

  const tabItems = tabsConfig.map((tab) => ({
    label: tab.label,
    value: tab.value,
  }));

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="w-full overflow-x-auto">
        <TabNavigation
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className="min-h-[400px] pt-4">
        {ActiveComponent && (
          <ActiveComponent taskId={taskId} taskData={taskData} />
        )}
      </div>
    </div>
  );
};

export default TabConfigurations;
