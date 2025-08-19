import React, { useState, useRef, useEffect } from "react";
import { FaRegClock } from "react-icons/fa";

export type TimePeriod = "AM" | "PM";
export interface TimeValue {
  hour: number;
  minute: number;
  period: TimePeriod;
}
export interface TimeRangeValue {
  from: TimeValue;
  to: TimeValue;
}

const pad = (num: number) => num.toString().padStart(2, "0");

const HOURS = Array.from({ length: 15 }, (_, i) => pad(i + 1));
const MINUTES = Array.from({ length: 15 }, (_, i) => pad(i * 5));
const PERIODS: TimePeriod[] = ["AM", "PM"];

interface TimeRangePickerInputProps {
  label?: string;
  value?: TimeRangeValue;
  onChange?: (value: TimeRangeValue) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const formatTime = (t: TimeValue) =>
  `${pad(t.hour)}:${pad(t.minute)} ${t.period}`;

const formatRange = (range?: TimeRangeValue) =>
  range
    ? `${formatTime(range.from)} – ${formatTime(range.to)}`
    : "";

const ScrollSelector: React.FC<{
  values: string[];
  selected: string;
  onSelect: (val: string) => void;
  columnClass?: string;
}> = ({ values, selected, onSelect, columnClass }) => {
  const selectedIndex = values.indexOf(selected);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = Math.max(0, selectedIndex * 36 - 72); // item height, scroll to show selected in middle
    }
  }, [selectedIndex]);
  return (
    <div
      className={`flex flex-col overflow-y-auto max-h-[180px] border-r last:border-r-0 ${columnClass || ""}`}
      // style={{ minWidth: 62 }}
      ref={ref}
      tabIndex={0}
    >
      {values.map((val) => (
        <div
          key={val}
          className={`w-full text-center py-2 cursor-pointer select-none hover:bg-blue-50 ${
            val === selected
              ? "bg-blue-100 font-bold text-blue-700"
              : "text-gray-900"
          }`}
          onClick={() => onSelect(val)}
          // style={{ fontSize: 18 }}
        >
          {val}
        </div>
      ))}
    </div>
  );
};

const TimeSelector: React.FC<{
  time: TimeValue;
  onChange: (t: TimeValue) => void;
  onNext?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}> = ({ time, onChange, onNext, onCancel, showActions = true }) => {
  return (
    <div className="bg-white rounded shadow-lg border flex flex-col mb-5">
      <div className="flex">
        {/* Hour */}
        <div className="flex-1">
          <div className="bg-blue-600 text-white text-center py-1">{pad(time.hour)}</div>
          <ScrollSelector
            values={HOURS}
            selected={pad(time.hour)}
            onSelect={(h) => onChange({ ...time, hour: parseInt(h, 10) })}
          />
        </div>
        {/* Minute */}
        <div className="flex-1">
          <div className="bg-blue-600 text-white text-center py-1">{pad(time.minute)}</div>
          <ScrollSelector
            values={MINUTES}
            selected={pad(time.minute)}
            onSelect={(m) => onChange({ ...time, minute: parseInt(m, 10) })}
          />
        </div>
        {/* Period */}
        <div className="flex-1">
          <div className="bg-blue-600 text-white font-medium  text-center py-1">{time.period}</div>
          <ScrollSelector
            values={PERIODS}
            selected={time.period}
            onSelect={(p) => onChange({ ...time, period: p as TimePeriod })}
          />
        </div>
      </div>
      {showActions && (
        <div className="flex border-t">
          <button
            className="flex-1 text-blue-600 font-sm hover:bg-blue-50 cursor-pointer"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex-1 py-1 text-blue-600 font-sm hover:bg-blue-50 cursor-pointer"
            onClick={onNext}
            type="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const TimeRangePickerInput: React.FC<TimeRangePickerInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  error = "",
  placeholder = "Select Time Range",
  // className = "",
  disabled = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [step, setStep] = useState<"from" | "to">("from");
  const [internalValue, setInternalValue] = useState<TimeRangeValue>(
    value || {
      from: { hour: 2, minute: 5, period: "PM" },
      to: { hour: 4, minute: 20, period: "PM" },
    }
  );

  useEffect(() => {
    if (value) setInternalValue(value);
  }, [value]);

  const handleInputClick = () => {
    if (!disabled) {
      setStep("from");
      setShowPicker(true);
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    setStep("from");
  };

  const handleNext = () => {
    setStep("to");
  };

  const handleApply = () => {
    setShowPicker(false);
    setStep("from");
    onChange?.(internalValue);
  };

  const setFrom = (from: TimeValue) => setInternalValue({ ...internalValue, from });
  const setTo = (to: TimeValue) => setInternalValue({ ...internalValue, to });

  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        onClick={handleInputClick}
        className={`flex items-center justify-between border border-neutral-300 rounded-md px-4 py-3 cursor-pointer  bg-white ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <span className="text-neutral-700 text-sm">
          {internalValue ? formatRange(internalValue) : placeholder}
        </span>
        <FaRegClock className="text-gray-600 ml-2" />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {showPicker && (
        <div className="absolute z-10 mt-2 shadow-lg min-w-[260px]">
          {step === "from" ? (
            <TimeSelector
              time={internalValue.from}
              onChange={setFrom}
              onNext={handleNext}
              onCancel={handleCancel}
              showActions
            />
          ) : (
            <TimeSelector
              time={internalValue.to}
              onChange={setTo}
              onNext={handleApply}
              onCancel={handleCancel}
              showActions
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TimeRangePickerInput;