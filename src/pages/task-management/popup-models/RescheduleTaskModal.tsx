import React from "react";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";
import InputField from "../../../components/ui/Input/InputField";
import DatePickerInput from "../../../components/ui/Input/DatePickerInput";

interface RescheduleTaskModalProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  reason: string;
  setReason: (reason: string) => void;
  onCancel: () => void;
  onReschedule: () => void;
}

const RescheduleTaskModal: React.FC<RescheduleTaskModalProps> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  reason,
  setReason,
  onCancel,
  onReschedule,
}) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4 mt-2">
      Reschedule Task Visit
    </h2>
    <p className="text-gray-700 mb-7 text-base">
      Update the scheduled visit time based on agent or borrower request.
    </p>
    {/* Select New Date */}
    <div className="mb-5 w-full">
      <DatePickerInput
        label="Select New Date"
        required
        value={selectedDate}
        onChange={v => setSelectedDate(v as Date)}
        placeholder="Select Date"
        className="w-full"
      />
    </div>
    {/* Select Recommended Time */}
    <div className="mb-5 w-full">
      <InputField
        label="Select Recommended Time"
        required
        value={selectedTime}
        onChange={e => setSelectedTime(e.target.value)}
        placeholder="Select Time"
        type="time"
        className="w-full"
      />
    </div>
    {/* Reason for Reschedule */}
    <div className="mb-8 w-full">
      <InputField
        label="Reason for Reschedule"
        required
        value={reason}
        onChange={e => setReason(e.target.value)}
        placeholder="Add Reschedule If Any"
        type="textarea"
        rows={4}
        className="w-full resize-none"
        style={{ minHeight: 80, maxHeight: 120 }}
      />
    </div>
    {/* Buttons */}
    <div className="flex w-full justify-end gap-4 mt-2">
      <OutlineButton
        text="Cancel"
        onClick={onCancel}
        className="px-8 py-2 rounded-lg font-semibold text-[#0064E1] border-[#0064E1] text-base"
      />
      <PrimaryButton
        text="Reschedule Task"
        onClick={onReschedule}
        className="text-white px-8 py-2 rounded-lg font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-base"
      />
    </div>
  </div>
);

export default RescheduleTaskModal;