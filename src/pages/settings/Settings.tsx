import { useState } from "react";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton"
import Profile from "./features/Profile";
import Security from "./features/Security";
import TabButtonSection, { type TabConfig } from "./features/TabButtonSection";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const tabsConfig: TabConfig[] = [
    {
      id: "profile",
      label: "Profile",
      component: Profile,
      width: "w-full sm:w-41"
    },
    {
      id: "telecallingTask",
      label: "Telecalling Task",
      component: Security,
      width: "w-full sm:w-41"
    },
    {
      id: "language",
      label: "Language",
      component: Security,
      width: "w-full sm:w-41"
    },
    {
      id: "notification",
      label: "Notification",
      component: Security,
      width: "w-full sm:w-41"
    },
    {
      id: "aiConfiguration",
      label: "AI Configuration",
      component: Security,
      width: "w-full sm:w-41"
    },
    {
      id: "exportBackup",
      label: "Export & Backup",
      component: Security,
      width: "w-full sm:w-41"
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId} by ITCartofficial at 2025-07-30 10:26:13`);
  };

  return (
    <div className="p-4 w-full">
      {/* Header Section */}
      <div className="w-full flex  justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-black">Settings</h1>
        <PrimaryButton 
          text="Export Report" 
          className="w-auto px-6 bg-primary-700 hover:bg-primary-600 text-white" 
        />
      </div>

      {/* Tab Buttons and Content Section */}
      <div className="w-full">
        <TabButtonSection
          tabsConfig={tabsConfig}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  )
}

export default Settings