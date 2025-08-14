// // import React, { useState } from "react";

// // Helper to format numbers to two digits
// const pad = (num: number) => num.toString().padStart(2, "0");

// // --- Time Input Component ---
// interface TimeInputProps {
//   label?: string;
//   value: { hour: number; minute: number; period: "AM" | "PM" };
//   onChange: (val: { hour: number; minute: number; period: "AM" | "PM" }) => void;
//   disabled?: boolean;
// }
// const TimeInput: React.FC<TimeInputProps> = ({
//   value,
//   onChange,
//   disabled = false,
// }) => {
//   const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let hour = parseInt(e.target.value, 10);
//     if (isNaN(hour) || hour < 1) hour = 1;
//     if (hour > 12) hour = 12;
//     onChange({ ...value, hour });
//   };
//   const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let minute = parseInt(e.target.value, 10);
//     if (isNaN(minute) || minute < 0) minute = 0;
//     if (minute > 59) minute = 59;
//     onChange({ ...value, minute });
//   };
//   const handlePeriodChange = (period: "AM" | "PM") => {
//     onChange({ ...value, period });
//   };
//   const incrementMinute = () => {
//     let minute = value.minute + 1;
//     if (minute > 59) minute = 0;
//     onChange({ ...value, minute });
//   };
//   const decrementMinute = () => {
//     let minute = value.minute - 1;
//     if (minute < 0) minute = 59;
//     onChange({ ...value, minute });
//   };
//   const incrementHour = () => {
//     let hour = value.hour + 1;
//     if (hour > 12) hour = 1;
//     onChange({ ...value, hour });
//   };
//   const decrementHour = () => {
//     let hour = value.hour - 1;
//     if (hour < 1) hour = 12;
//     onChange({ ...value, hour });
//   };

//   return (
//     <div className="flex items-center gap-1">
//       <button type="button" onClick={decrementHour} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>▲</button>
//       <input
//         type="number"
//         min={1}
//         max={12}
//         value={pad(value.hour)}
//         onChange={handleHourChange}
//         className="w-10 text-center border rounded"
//         disabled={disabled}
//       />
//       <span>:</span>
//       <button type="button" onClick={decrementMinute} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>▲</button>
//       <input
//         type="number"
//         min={0}
//         max={59}
//         value={pad(value.minute)}
//         onChange={handleMinuteChange}
//         className="w-10 text-center border rounded"
//         disabled={disabled}
//       />
//       <button type="button" onClick={incrementMinute} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>▼</button>
//       <span>&nbsp;</span>
//       <select
//         value={value.period}
//         onChange={e => handlePeriodChange(e.target.value as "AM" | "PM")}
//         className="border rounded px-1"
//         disabled={disabled}
//       >
//         <option value="AM">AM</option>
//         <option value="PM">PM</option>
//       </select>
//       <button type="button" onClick={incrementHour} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1 }}>▼</button>
//     </div>
//   );
// };

// // --- Time Range Picker ---
// interface TimeRangePickerProps {
//   label?: string;
//   from: { hour: number; minute: number; period: "AM" | "PM" };
//   to: { hour: number; minute: number; period: "AM" | "PM" };
//   onChange: (range: { from: TimeInputProps["value"]; to: TimeInputProps["value"] }) => void;
//   onApply?: () => void;
// }

// const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
//   label = "Select Time",
//   from,
//   to,
//   onChange,
//   onApply,
// }) => {
//   return (
//     <div className="bg-gray-200 rounded-xl p-6 w-max">
//       <div className="font-semibold text-lg mb-4">{label}</div>
//       <div className="flex gap-6 items-center justify-between">
//         <div>
//           <TimeInput
//             value={from}
//             onChange={val => onChange({ from: val, to })}
//           />
//         </div>
//         <span className="font-medium">To</span>
//         <div>
//           <TimeInput
//             value={to}
//             onChange={val => onChange({ from, to: val })}
//           />
//         </div>
//       </div>
//       <div className="flex justify-end mt-6">
//         <button
//           type="button"
//           className="bg-[#0064E1] text-white px-4 py-2 rounded font-semibold"
//           onClick={onApply}
//         >
//           Apply
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- Usage Example ---
// /*
// const [timeRange, setTimeRange] = useState({
//   from: { hour: 6, minute: 28, period: "PM" },
//   to: { hour: 6, minute: 28, period: "PM" },
// });
// <TimeRangePicker
//   from={timeRange.from}
//   to={timeRange.to}
//   onChange={setTimeRange}
//   onApply={() => console.log(timeRange)}
// />
// */

// export default TimeRangePicker;