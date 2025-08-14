import React from "react";
import Dropdown from "../../../components/common/Dropdown";
import InputField from "../../../components/ui/Input/InputField";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";

interface FlagTaskForReviewModalUIProps {
  flagReasons: { label: string; value: string }[];
  selectedReason: string;
  setSelectedReason: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  onCancel: () => void;
  onFlag: () => void;
}

const FlagTaskReviewModal: React.FC<FlagTaskForReviewModalUIProps> = ({
  flagReasons,
  selectedReason,
  setSelectedReason,
  notes,
  setNotes,
  onCancel,
  onFlag,
}) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4 mt-2">
      Flag This Task for Review
    </h2>
    <p className="text-gray-700 mb-7 text-base">
      Use this if the task has issues that need escalation or supervisor attention
    </p>
    {/* Flag Reason Dropdown */}
    <div className="mb-5 w-full">
      <Dropdown
        label="Flag Reason"
        required
        options={flagReasons}
        value={selectedReason}
        onChange={v => setSelectedReason(v as string)}
        placeholder="Select Reason"
        className="w-full"
      />
    </div>
    {/* Notes TextArea */}
    <div className="mb-8 w-full">
      <InputField
        label="Notes"
        required
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Add Note If Any"
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
        text="Flag Task"
        onClick={onFlag}
        className="px-8 py-2 rounded-lg font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-base text-white"
      />
    </div>
  </div>
);

export default FlagTaskReviewModal;