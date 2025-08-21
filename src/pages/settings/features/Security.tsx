import React, { useState } from "react";

import Dropdown from "../../../components/common/Dropdown";
import ToggleSwitch from "../../../components/ui/Input/ToggleSwitch";
 
const authMethods = [
  { label: "Authenticator App", value: "auth_app" },
  { label: "SMS", value: "sms" },
  { label: "Email", value: "email" },
];
 
const Security: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [authMethod, setAuthMethod] = useState(authMethods[0].value);
 
  // Dropdown's onChange expects (value: string | string[]) => void
  const handleAuthMethodChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setAuthMethod(value[0] || "");
    } else {
      setAuthMethod(value);
    }
  };
 
  return (
    <div className="max-w-full mx-auto mr-3 bg-white rounded-lg shadow px-8 py-7 ">
      <h2 className="text-xl font-semibold mb-1">Security Settings</h2>
      <div className="text-neutral-600 mb-6 text-sm">
        Enable additional account protection
      </div>
 
      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200">
        <div>
          <span className="font-medium">Two-Factor Authentication</span>
        </div>
        <div className="flex gap-4 items-center">
          <ToggleSwitch
            checked={twoFactorEnabled}
            onChange={setTwoFactorEnabled}
            showLabel={false}
            id="twoFactorToggle"/>
        </div>
      </div>
 
      {/* Authentication Method */}
      <div className="flex items-center justify-between py-4">
        <div>
          <span className="font-medium">Authentication Method</span>
        </div>
        <div className="min-w-[180px]">
          <Dropdown
            options={authMethods}
            value={authMethod}
            onChange={handleAuthMethodChange}
            placeholder="Select method"
            disabled={!twoFactorEnabled}
          />
        </div>
      </div>
    </div>
  );
};
 
export default Security;