import React from "react";
import DatePickerInput from "../../../components/ui/Input/DatePickerInput";
import Dropdown from "../../../components/common/Dropdown";
import InputField from "../../../components/ui/Input/InputField";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";

interface AddNotesToTaskModalUIProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  category: string;
  setCategory: (cat: string) => void;
  notes: string;
  setNotes: (notes: string) => void;
  categoryOptions: { label: string; value: string }[];
  onCancel: () => void;
  onAddNote: () => void;
}

const AddNotesTaskModal: React.FC<AddNotesToTaskModalUIProps> = ({
  date,
  setDate,
  category,
  setCategory,
  notes,
  setNotes,
  categoryOptions,
  onCancel,
  onAddNote,
}) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4 mt-2">
      Add Notes to Task
    </h2>
    <p className="text-neutral-700 mb-7 text-base">
      Add remarks, observations, or updates related to the borrower or task progress.
    </p>
    {/* Notes Added Date */}
    <div className="mb-5 w-full">
      <DatePickerInput
        label="Notes Added Date *"
        required
        value={date}
        onChange={v => setDate(v as Date)}
        placeholder="Select Date"
        className="w-full"
      />
    </div>
    {/* Select from list */}
    <div className="mb-5 w-full">
      <Dropdown
        label="Select from list*"
        required
        options={categoryOptions}
        value={category}
        onChange={v => setCategory(v as string)}
        placeholder="Others"
        className="w-full"
      />
    </div>
    {/* Notes TextArea */}
    <div className="mb-8 w-full">
      <InputField
        label="Notes *"
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
        className="px-8 py-2 rounded-lg font-semibold text-primary-700 border-primary-700 text-base"
      />
      <PrimaryButton
        text="Add Notes"
        onClick={onAddNote}
        className="px-8 py-2 rounded-lg font-semibold bg-text-primary-700 hover:bg-text-primary-700 transition text-base text-white"
      />
    </div>
  </div>
);

export default AddNotesTaskModal;