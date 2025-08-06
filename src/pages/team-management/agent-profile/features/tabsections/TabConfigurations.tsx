// import React, { useState } from 'react'
// import TabNavigation from '../../../../../components/common/TabNavigation'

// // Import your tab components (adjust paths as needed)
// // import GeneralConfig from './GeneralConfigTab';
// // import SecurityConfig from './SecurityConfigTab';
// // import NotificationConfig from './NotificationConfigTab';
// // import IntegrationConfig from './IntegrationConfigTab';

// // For demonstration, creating placeholder components
// const GeneralConfig = () => (
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-4">General Configuration</h3>
//     <p>General configuration settings would go here...</p>
//   </div>
// );

// const SecurityConfig = () => (
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-4">Security Configuration</h3>
//     <p>Security configuration settings would go here...</p>
//   </div>
// );

// const NotificationConfig = () => (
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-4">Notification Configuration</h3>
//     <p>Notification configuration settings would go here...</p>
//   </div>
// );

// const IntegrationConfig = () => (
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-4">Integration Configuration</h3>
//     <p>Integration configuration settings would go here...</p>
//   </div>
// );

// interface TabConfig {
//   label: string;
//   value: string;
//   component: React.ComponentType;
// }

// const TabConfigurations = () => {
//   const tabsConfig: TabConfig[] = [
//     {
//       label: 'KPI',
//       value: 'kpi',
//       component: GeneralConfig
//     },
//     {
//       label: 'KRI',
//       value: 'kri',
//       component: SecurityConfig
//     },
//     {
//       label: 'Tasks',
//       value: 'tasks',
//       component: NotificationConfig
//     },
//     {
//       label: 'Attendance',
//       value: 'attendance',
//       component: IntegrationConfig
//     },
//     {
//       label: 'Leave & Request',
//       value: 'leave-request',
//       component: IntegrationConfig
//     },
//     {
//       label: 'Documents',
//       value: 'documents',
//       component: IntegrationConfig
//     },
//     {
//       label: 'Issue Logged',
//       value: 'issue-logged',
//       component: IntegrationConfig
//     },
//     {
//       label: 'Location Tracking',
//       value: 'location-tracking',
//       component: IntegrationConfig
//     },
//     {
//       label: 'Task Feedback',
//       value: 'task-feedback',
//       component: IntegrationConfig
//     },
//   ];

//   // State for active tab
//   const [activeTab, setActiveTab] = useState<string>(tabsConfig[0].value);

//   // Handle tab change
//   const handleTabChange = (tabValue: string) => {
//     setActiveTab(tabValue);
//     console.log(`Tab changed to: ${tabValue}`);
//   };

//   // Get current active component
//   const activeTabConfig = tabsConfig.find(tab => tab.value === activeTab);
//   const ActiveComponent = activeTabConfig?.component;

//   // Create tab items for TabNavigation (only label and value)
//   const tabItems = tabsConfig.map(tab => ({
//     label: tab.label,
//     value: tab.value
//   }));

//   return (
//     <div className="w-full bg-white rounded-lg shadow-sm p-6">
//       {/* Tab Navigation */}
//       <div className='w-max'>
//         <TabNavigation
//           tabs={tabItems}
//           activeTab={activeTab}
//           onTabChange={handleTabChange}
//         />
//       </div>

//       {/* Tab Content */}
//       <div className="min-h-[400px] pt-4">
//         {ActiveComponent && <ActiveComponent />}
//       </div>
//     </div>
//   )
// }

// export default TabConfigurations


import React, { useState } from 'react'
import TabNavigation from '../../../../../components/common/TabNavigation'
import AgentKPI from '../agentkpi/AgentKPI';

// Create specific components for each tab
// const KPIConfig = () => (
//   <div className="p-4">
//     <h3 className="text-lg font-semibold mb-4">KPI Configuration</h3>
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="border rounded-lg p-4">
//           <h4 className="font-medium mb-2">Performance Metrics</h4>
//           <p className="text-sm text-gray-600">Configure key performance indicators</p>
//         </div>
//         <div className="border rounded-lg p-4">
//           <h4 className="font-medium mb-2">Target Settings</h4>
//           <p className="text-sm text-gray-600">Set targets and benchmarks</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

const KRIConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">KRI Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Risk Indicators</h4>
          <p className="text-sm text-gray-600">Configure key risk indicators</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Alert Thresholds</h4>
          <p className="text-sm text-gray-600">Set risk alert thresholds</p>
        </div>
      </div>
    </div>
  </div>
);

const TasksConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Tasks Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Task Categories</h4>
          <p className="text-sm text-gray-600">Manage task categories and types</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Priority Settings</h4>
          <p className="text-sm text-gray-600">Configure task priority levels</p>
        </div>
      </div>
    </div>
  </div>
);

const AttendanceConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Attendance Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Working Hours</h4>
          <p className="text-sm text-gray-600">Configure standard working hours</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Break Times</h4>
          <p className="text-sm text-gray-600">Set break time policies</p>
        </div>
      </div>
    </div>
  </div>
);

const LeaveRequestConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Leave & Request Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Leave Types</h4>
          <p className="text-sm text-gray-600">Configure different leave types</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Approval Workflow</h4>
          <p className="text-sm text-gray-600">Set up approval processes</p>
        </div>
      </div>
    </div>
  </div>
);

const DocumentsConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Documents Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Document Types</h4>
          <p className="text-sm text-gray-600">Manage document categories</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Storage Settings</h4>
          <p className="text-sm text-gray-600">Configure storage options</p>
        </div>
      </div>
    </div>
  </div>
);

const IssueLoggedConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Issue Logged Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Issue Categories</h4>
          <p className="text-sm text-gray-600">Define issue types and categories</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Escalation Rules</h4>
          <p className="text-sm text-gray-600">Set up escalation procedures</p>
        </div>
      </div>
    </div>
  </div>
);

const LocationTrackingConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Location Tracking Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Tracking Settings</h4>
          <p className="text-sm text-gray-600">Configure location tracking parameters</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Privacy Controls</h4>
          <p className="text-sm text-gray-600">Manage privacy and permissions</p>
        </div>
      </div>
    </div>
  </div>
);

const TaskFeedbackConfig = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Task Feedback Configuration</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Feedback Types</h4>
          <p className="text-sm text-gray-600">Configure feedback categories</p>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Rating System</h4>
          <p className="text-sm text-gray-600">Set up rating and scoring</p>
        </div>
      </div>
    </div>
  </div>
);

interface TabConfig {
  label: string;
  value: string;
  component: React.ComponentType;
}

const TabConfigurations = () => {
  const tabsConfig: TabConfig[] = [
    {
      label: 'KPI',
      value: 'kpi',
      component: AgentKPI
    },
    {
      label: 'KRI',
      value: 'kri',
      component: KRIConfig
    },
    {
      label: 'Tasks',
      value: 'tasks',
      component: TasksConfig
    },
    {
      label: 'Attendance',
      value: 'attendance',
      component: AttendanceConfig
    },
    {
      label: 'Leave & Request',
      value: 'leave-request',
      component: LeaveRequestConfig
    },
    {
      label: 'Documents',
      value: 'documents',
      component: DocumentsConfig
    },
    {
      label: 'Issue Logged',
      value: 'issue-logged',
      component: IssueLoggedConfig
    },
    {
      label: 'Location Tracking',
      value: 'location-tracking',
      component: LocationTrackingConfig
    },
    {
      label: 'Task Feedback',
      value: 'task-feedback',
      component: TaskFeedbackConfig
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
      <div className='w-full overflow-x-auto'>
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
  )
}

export default TabConfigurations