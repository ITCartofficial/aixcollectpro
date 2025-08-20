import React from "react";
import Dropdown from "../../../components/common/Dropdown";
import InputField from "../../../components/ui/Input/InputField";
import OutlineButton from "../../../components/ui/Buttons/OutlineButton";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";

interface UpdateTaskLocationModalUIProps {
  addressLine1: string;
  setAddressLine1: (val: string) => void;
  addressLine2: string;
  setAddressLine2: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  pincode: string;
  setPincode: (val: string) => void;
  reason: string;
  setReason: (val: string) => void;
  cityOptions: { label: string; value: string }[];
  stateOptions: { label: string; value: string }[];
  onCancel: () => void;
  onUpdate: () => void;
}

const UpdateTaskLocationModal: React.FC<UpdateTaskLocationModalUIProps> = ({
  addressLine1,
  setAddressLine1,
  addressLine2,
  setAddressLine2,
  city,
  setCity,
  state,
  setState,
  pincode,
  setPincode,
  reason,
  setReason,
  cityOptions,
  stateOptions,
  onCancel,
  onUpdate,
}) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4 mt-2">
      Update Task Location
    </h2>
    <p className="text-gray-700 mb-7 text-base">
      Use this if the current location is inaccurate or has changed.
    </p>
    {/* Address Line 1 */}
    <div className="mb-5 w-full">
      <InputField
        label="Address Line 1"
        required
        value={addressLine1}
        onChange={e => setAddressLine1(e.target.value)}
        placeholder="Type Address"
        className="w-full"
      />
    </div>
    {/* Address Line 2 */}
    <div className="mb-5 w-full">
      <InputField
        label="Address Line 2"
        value={addressLine2}
        onChange={e => setAddressLine2(e.target.value)}
        placeholder="Type Address"
        className="w-full"
      />
    </div>
    {/* City Dropdown */}
    <div className="mb-5 w-full">
      <Dropdown
        label="City"
        required
        options={cityOptions}
        value={city}
        onChange={v => setCity(v as string)}
        placeholder="Search & Select City"
        className="w-full"
      />
    </div>
    {/* State Dropdown */}
    <div className="mb-5 w-full">
      <Dropdown
        label="State"
        required
        options={stateOptions}
        value={state}
        onChange={v => setState(v as string)}
        placeholder="Search & Select State"
        className="w-full"
      />
    </div>
    {/* Pincode */}
    <div className="mb-5 w-full">
      <InputField
        label="Pincode"
        required
        value={pincode}
        onChange={e => setPincode(e.target.value)}
        placeholder="Type Pincode"
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
        text="Update Task"
        onClick={onUpdate}
        className="px-8 py-2 rounded-lg font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-base text-white"
      />
    </div>
  </div>
);

export default UpdateTaskLocationModal;