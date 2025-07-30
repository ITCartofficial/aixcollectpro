import React, { useState } from 'react';
import AttendanceSummary from './AttendanceSummary';
import LeaveRequest from './LeaveRequest';
import PerformanceSummary from './PerformanceSummary';
import Calendar from './Calendar';
import TabNavigation from '../../../components/common/TabNavigation';

// import AttendanceSummary from './tabs/AttendanceSummary';
// import LeaveRequest from './tabs/LeaveRequest';
// import PerformanceSummary from './tabs/PerformanceSummary';
// import Calendar from './tabs/Calendar';

// Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-07-30 12:20:39
// Current User's Login: ITCartofficial

// Define tab configuration type
interface TabConfig {
    label: string;
    value: string;
    component: React.ComponentType;
}

const AttendanceTab: React.FC = () => {
    // Tab configuration array - easy to modify
    const tabsConfig: TabConfig[] = [
        {
            label: 'Attendance Summary',
            value: 'attendance-summary',
            component: AttendanceSummary
        },
        {
            label: 'Leave Request',
            value: 'leave-request',
            component: LeaveRequest
        },
        {
            label: 'Performance Summary',
            value: 'performance-summary',
            component: PerformanceSummary
        },
        {
            label: 'Calendar',
            value: 'calendar',
            component: Calendar
        }
    ];

    // State for active tab
    const [activeTab, setActiveTab] = useState<string>(tabsConfig[0].value);

    // Handle tab change
    const handleTabChange = (tabValue: string) => {
        setActiveTab(tabValue);
        console.log(`Tab changed to: ${tabValue} by ITCartofficial at 2025-07-30 12:20:39`);
    };

    // Get current active component
    const activeTabConfig = tabsConfig.find(tab => tab.value === activeTab);
    const ActiveComponent = activeTabConfig?.component;

    // Create tab items for TabNavigation (only label and value)
    const tabItems = tabsConfig.map(tab => ({
        label: tab.label,
        value: tab.value
    }));

    return (
        <div className="w-full bg-white rounded-lg shadow-sm p-6">
            {/* Tab Navigation */}
            <div className='w-max'>
                <TabNavigation
                    tabs={tabItems}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}/>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px] pt-4">
                {ActiveComponent && <ActiveComponent />}
            </div>
        </div>
    );
};

export default AttendanceTab;