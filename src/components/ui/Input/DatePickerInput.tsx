import React from "react";

interface DatePickerInputProps {
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  error = "",
  placeholder = "Select Date",
  className = "",
  disabled = false,
}) => {
  // Format value as yyyy-MM-dd for input type="date"
  const formattedValue =
    value instanceof Date && !isNaN(value.valueOf())
      ? value.toISOString().slice(0, 10)
      : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      onChange?.(new Date(val + "T00:00:00"));
    } else {
      onChange?.(null);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="date"
        value={formattedValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md text-sm
          ${error ? "border-red-500" : "border-gray-300"}
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        `}
      />
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
};

export default DatePickerInput;





















