export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  labelOn?: string;
  labelOff?: string;
  showLabel?: boolean; // Add this prop
  disabled?: boolean;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  id,
  labelOn = "Enable",
  labelOff = "Disable",
  showLabel = true, // Default to true for backward compatibility
  disabled = false,
  className = "",
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {showLabel && labelOff && !checked && (
      <span className="text-gray-500 text-sm">{labelOff}</span>
    )}
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer
        ${checked ? "bg-green-500" : "bg-gray-300"} focus:outline-none min-w-[44px]`}>
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition
          ${checked ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
    {showLabel && labelOn && checked && (
      <span className="text-green-600 text-sm">{labelOn}</span>
    )}
  </div>
);

export default ToggleSwitch;