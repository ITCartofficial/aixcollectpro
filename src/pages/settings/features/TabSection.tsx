import React, { useState } from 'react';
import TabNavigation from '../../../components/common/TabNavigation';

// Tab content components
const AttendanceSummary = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h2>
      <p className="text-gray-600">Attendance summary content goes here...</p>
    </div>
  );
};

const LeaveRequest = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Request</h2>
      <p className="text-gray-600">Leave request content goes here...</p>
    </div>
  );
};

const PerformanceSummary = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h2>
      <p className="text-gray-600">Performance summary content goes here...</p>
    </div>
  );
};

const Calendar = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendar</h2>
      <p className="text-gray-600">Calendar content goes here...</p>
    </div>
  );
};

const TabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('attendance-summary');

  const tabs = [
    { label: 'Attendance Summary', value: 'attendance-summary' },
    { label: 'Leave Request', value: 'leave-request' },
    { label: 'Performance Summary', value: 'performance-summary' },
    { label: 'Calendar', value: 'calendar' },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab} by ITCartofficial at 2025-07-30 12:12:02`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'attendance-summary':
        return <AttendanceSummary />;
      case 'leave-request':
        return <LeaveRequest />;
      case 'performance-summary':
        return <PerformanceSummary />;
      case 'calendar':
        return <Calendar />;
      default:
        return <AttendanceSummary />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="px-6 pt-6"
      />
      <div className="min-h-[200px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TabSection;