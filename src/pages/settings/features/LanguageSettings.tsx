import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown"; 
 
 
const languageOptions = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" }
];
 
const dateFormatOptions = [
  { label: "DD-MM-YYYY", value: "dd-mm-yyyy" },
  { label: "MM-DD-YYYY", value: "mm-dd-yyyy" },
  { label: "YYYY-MM-DD", value: "yyyy-mm-dd" }
];
 
const timeFormatOptions = [
  { label: "12 Hour", value: "12hr" },
  { label: "24 Hour", value: "24hr" }
];
 
const timezoneOptions = [
  { label: "Auto System", value: "auto" },
  { label: "GMT", value: "gmt" },
  { label: "UTC", value: "utc" },
  { label: "IST (India)", value: "ist" },
  { label: "EST (US)", value: "est" }
];
 
const LanguageSettings: React.FC = () => {
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [dateFormat, setDateFormat] = useState(dateFormatOptions[0].value);
  const [timeFormat, setTimeFormat] = useState(timeFormatOptions[0].value);
  const [timezone, setTimezone] = useState(timezoneOptions[0].value);
 
  // Dropdown handle function to support string or string[] value
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string | string[]) => {
    if (Array.isArray(value)) {
      setter(value[0] || "");
    } else {
      setter(value);
    }
  };
 
  return (
    <div className="max-w-full mx-auto mr-3 bg-white rounded-lg shadow px-8 py-7">
      <h2 className="text-xl font-semibold mb-1">Language & Regional Settings</h2>
      <div className="text-gray-600 mb-6 text-sm">
        Personalize the UI language and date format
      </div>
 
      {/* Language */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
          <span className="font-medium">Language</span>
        </div>
        <div className="min-w-[180px]">
          <Dropdown
            options={languageOptions}
            value={language}
            onChange={handleChange(setLanguage)}
            placeholder="Select language"
          />
        </div>
      </div>
 
      {/* Date Format */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
          <span className="font-medium">Date Format</span>
        </div>
        <div className="min-w-[180px]">
          <Dropdown
            options={dateFormatOptions}
            value={dateFormat}
            onChange={handleChange(setDateFormat)}
            placeholder="Select date format"
          />
        </div>
      </div>
 
      {/* Time Format */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
          <span className="font-medium">Time Format</span>
        </div>
        <div className="min-w-[180px]">
          <Dropdown
            options={timeFormatOptions}
            value={timeFormat}
            onChange={handleChange(setTimeFormat)}
            placeholder="Select time format"
          />
        </div>
      </div>
 
      {/* Timezone */}
      <div className="flex items-center justify-between py-4">
        <div>
          <span className="font-medium">Timezone</span>
        </div>
        <div className="min-w-[180px]">
          <Dropdown
            options={timezoneOptions}
            value={timezone}
            onChange={handleChange(setTimezone)}
            placeholder="Select timezone"
          />
        </div>
      </div>
    </div>
  );
};
 
export default LanguageSettings;