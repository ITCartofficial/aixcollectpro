import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown"; // adjust path as needed
import ToggleSwitch from "../../../components/ui/Input/ToggleSwitch";
 
const sensitivityOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];
 
const frequencyOptions = [
  { label: "Real Time", value: "real_time" },
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
];
 
const AiConfiguration: React.FC = () => {
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [autoTaskPrioritization, setAutoTaskPrioritization] = useState(true);
  const [riskSensitivity, setRiskSensitivity] = useState(sensitivityOptions[2].value); // "high"
  const [insightFrequency, setInsightFrequency] = useState(frequencyOptions[0].value); // "real_time"
  const [smartRouting, setSmartRouting] = useState(true);
 
  const handleDropdownChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string | string[]) => {
    if (Array.isArray(value)) {
      setter(value[0] || "");
    } else {
      setter(value);
    }
  };
 
  return (
    <div className="max-w-full mx-auto mr-3 bg-white rounded-lg shadow px-8 py-7">
      <h2 className="text-xl font-semibold mb-1">AI Configuration Settings</h2>
      <div className="text-neutral-600 mb-6 text-sm">
        Control the behavior and sensitivity of AI on the platform
      </div>
 
      {/* Enable AI Suggestions */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Enable AI Suggestions</span>
        <ToggleSwitch
          checked={aiSuggestions}
          onChange={setAiSuggestions}
          showLabel={false}
          id="aiSuggestions"
        />
      </div>
 
      {/* Auto Task Prioritization */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">Auto Task Prioritization</span>
        <ToggleSwitch
          checked={autoTaskPrioritization}
          onChange={setAutoTaskPrioritization}
          showLabel={false}
          id="autoTaskPrioritization"
        />
      </div>
 
      {/* AI Sensitivity for Risk Flags */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">AI Sensitivity for Risk Flags</span>
        <div className="min-w-[140px]">
          <Dropdown
            options={sensitivityOptions}
            value={riskSensitivity}
            onChange={handleDropdownChange(setRiskSensitivity)}
            placeholder="Select Sensitivity"
          />
        </div>
      </div>
 
      {/* AI Insight Frequency */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <span className="font-medium">AI Insight Frequency</span>
        <div className="min-w-[140px]">
          <Dropdown
            options={frequencyOptions}
            value={insightFrequency}
            onChange={handleDropdownChange(setInsightFrequency)}
            placeholder="Select Frequency"
          />
        </div>
      </div>
 
      {/* Smart Routing Based on Behavior */}
      <div className="flex items-center justify-between py-4">
        <span className="font-medium">Smart Routing Based on Behavior</span>
        <ToggleSwitch
          checked={smartRouting}
          onChange={setSmartRouting}
          showLabel={false}
          id="smartRouting"
        />
      </div>
    </div>
  );
};
 
export default AiConfiguration;