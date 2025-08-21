import React from "react";
import Dropdown from "../../../components/common/Dropdown";
import InputField from "../../../components/ui/Input/InputField";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";

interface ReassignTaskModalUIProps {
  agentOptions: { label: string; value: string }[];
  selectedAgent: string;
  setSelectedAgent: (val: string) => void;
  reason: string;
  setReason: (val: string) => void;
  onCancel: () => void;
  onReassign: () => void;
}

const ReassignTaskModal: React.FC<ReassignTaskModalUIProps> = ({
  agentOptions,
  selectedAgent,
  setSelectedAgent,
  reason,
  setReason,
  onCancel,
  onReassign,
}) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4 mt-2">
      Reassign Task to Another Agent
    </h2>
    <p className="text-neutral-700 mb-7 text-base">
      Select a different agent for this task due to availability, location, or performance issues.
    </p>
    <div className="mb-5 w-full">
      <Dropdown
        options={agentOptions}
        value={selectedAgent}
        onChange={v => setSelectedAgent(v as string)}
        placeholder="Select New Agent"
        label="Select New Agent"
        required
        className="w-full"
      />
    </div>
    <div className="mb-8 w-full">
      <InputField
        label="Reason for Reassignment"
        required
        value={reason}
        onChange={e => setReason(e.target.value)}
        placeholder="Add Reason If Any"
        type="textarea"
        rows={4}
        className="w-full resize-none"
        style={{ minHeight: 80, maxHeight: 120 }}
      />
    </div>
    <div className="flex w-full justify-end gap-4 mt-2">
      <OutlineButton
        text="Cancel"
        onClick={onCancel}
        className="px-8 py-2 rounded-lg font-semibold text-primary-700 border-primary-700 text-base"
      />
      <PrimaryButton
        text="Reassign Task"
        onClick={onReassign}
        className="px-8 py-2 rounded-lg font-semibold bg-primary-700 hover:bg-primary-700 transition text-base text-white"
      />
    </div>
  </div>
);

export default ReassignTaskModal;