import React, { useState } from "react";

import Dropdown from "../../../components/common/Dropdown"; 
import ToggleSwitch from "../../../components/ui/Input/ToggleSwitch";
 
const notificationOptions = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Push Notification", value: "push" },
];
 
const NotificationSettings: React.FC = () => {
  const [taskAlerts, setTaskAlerts] = useState(true);
  const [escalation, setEscalation] = useState(true);
  const [inactivity, setInactivity] = useState(true);
  const [aiSummary, setAiSummary] = useState(true);
  const [dailyReports, setDailyReports] = useState(true);
  const [preferredChannel, setPreferredChannel] = useState(notificationOptions[0].value);
 
  const handleChannelChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setPreferredChannel(value[0] ?? "");
    } else {
      setPreferredChannel(value);
    }
  };
 
  return (
    <div className="max-w-full mx-auto mr-3 bg-white rounded-lg shadow px-8 py-7">
      <h2 className="text-xl font-semibold mb-1">Notification Settings</h2>
      <div className="text-neutral-600 mb-6 text-sm">
        Set alert preferences across platform activities
      </div>
 
      {/* Task Assignment Alerts */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Task Assignment Alerts</span>
        <ToggleSwitch
          checked={taskAlerts}
          onChange={setTaskAlerts}
          labelOn=""
          labelOff=""
          id="taskAssignmentAlerts"
        />
      </div>
 
      {/* Escalation Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Escalation Notifications</span>
        <ToggleSwitch
          checked={escalation}
          onChange={setEscalation}
          labelOn=""
          labelOff=""
          id="escalationNotifications"
        />
      </div>
 
      {/* Agent Inactivity Notifications */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Agent Inactivity Notifications</span>
        <ToggleSwitch
          checked={inactivity}
          onChange={setInactivity}
          labelOn=""
          labelOff=""
          id="agentInactivityNotifications"
        />
      </div>
 
      {/* AI Insight Summaries */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">AI Insight Summaries</span>
        <ToggleSwitch
          checked={aiSummary}
          onChange={setAiSummary}
          labelOn=""
          labelOff=""
          id="aiInsightSummaries"
        />
      </div>
 
      {/* Daily Email Reports */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Daily Email Reports</span>
        <ToggleSwitch
          checked={dailyReports}
          onChange={setDailyReports}
          labelOn=""
          labelOff=""
          id="dailyEmailReports"
        />
      </div>
 
      {/* Preferred Notification Channel */}
      <div className="flex items-center justify-between py-4">
        <span className="font-medium">Preferred Notification Channel</span>
        <div className="min-w-[180px]">
          <Dropdown
            options={notificationOptions}
            value={preferredChannel}
            onChange={handleChannelChange}
            placeholder="Select channel"
          />
        </div>
      </div>
    </div>
  );
};
 
export default NotificationSettings;