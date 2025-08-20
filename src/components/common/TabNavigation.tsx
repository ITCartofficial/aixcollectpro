import React from "react";

interface TabItem {
  label: string;
  value: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}) => (
  <div className={`flex border-b border-neutral-200 ${className}`}>
    {tabs.map(tab => (
      <button
        key={tab.value}
        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
          activeTab === tab.value
            ? "border-primary-500 text-primary-600"
            : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
        }`}
        onClick={() => onTabChange(tab.value)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabNavigation;







