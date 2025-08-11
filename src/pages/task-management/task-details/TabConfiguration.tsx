import React, { useState } from "react";
// import TabNavigation from "../../../../../components/common/TabNavigation";
import DocumentsSubmitted from "./DocumentsSubmitted";
import History from "./TaskHistory";
import Notes from "./Notes";
import TaskAction from "./TaskAction";
import TabNavigation from "../../../components/common/TabNavigation";


// Create specific components for each tab


interface TabConfig {
    label: string;
    value: string;
    component: React.ComponentType;
}

const TabConfigurations = () => {
    const tabsConfig: TabConfig[] = [
        {
            label: "Documets Submitted",
            value: "Documents-Submitted",
            component: DocumentsSubmitted,
        },
        {
            label: "Task History",
            value: "Task History",
            component: History,
        },

        {
            label: "Notes",
            value: "Notes",
            component: Notes,
        },
        {
            label: "Task Action Logged",
            value: "Task-Action-Logged",
            component: TaskAction,
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
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
};

export default TabConfigurations;
