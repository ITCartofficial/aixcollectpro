import React, { useState } from "react";
import InputField from "../../../components/ui/Input/InputField";
import Dropdown from "../../../components/common/Dropdown";
import DatePickerInput from "../../../components/ui/Input/DatePickerInput";

// All dropdown options (reuse from creation form)
const caseTypeOptions = [
  { label: "Collection", value: "collection" },
  { label: "KYC", value: "kyc" },
  { label: "FI", value: "fi" },
];
const taskTypeOptions = [
  { label: "Collection", value: "collection" },
  { label: "KYC", value: "kyc" },
  { label: "FI", value: "fi" },
];
const cityOptions = [
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
];
const stateOptions = [
  { label: "Karnataka", value: "karnataka" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Delhi", value: "delhi" },
];
const bankOptions = [
  { label: "HDFC Bank", value: "hdfc" },
  { label: "ICICI Bank", value: "icici" },
  { label: "SBI Bank", value: "sbi" },
];
const loanCategoryOptions = [
  { label: "Personal Loan", value: "personal" },
  { label: "Home Loan", value: "home" },
  { label: "Auto Loan", value: "auto" },
];

// Example: get these from props, backend API, or router location.state
const initialTask = {
  caseType: "collection",
  borrowerName: "John Doe",
  mobileNumber: "9876543210",
  altNumber1: "9123456789",
  altNumber2: "",
  email: "john@example.com",
  address1: "123 Main St",
  address2: "Near Market",
  city: "bengaluru",
  state: "karnataka",
  pincode: "560001",
  showAltAddress: true,
  altAddress1: "Flat 102",
  altAddress2: "Sunrise Apartments",
  altCity: "mumbai",
  altState: "maharashtra",
  altPincode: "400001",
  taskType: "collection",
  scheduleDate: new Date("2025-08-19"),
  recommendedTime: "10:00 AM",
  note: "This is a note.",
  loanNumber: "LN123456789",
  bank: "hdfc",
  loanCategory: "personal",
  loanAmount: "500000",
  dueAmount: "25000",
  dueDate: new Date("2025-09-15"),
  penalInterest: "500",
  overdueDays: "15",
  pos: "80000",
  tos: "120000"
};

const EditTaskModel: React.FC<{ task?: typeof initialTask }> = ({ task = initialTask }) => {
  // Form state, prefilled
  const [caseType, setCaseType] = useState<string>(task.caseType);
  const [borrowerName, setBorrowerName] = useState<string>(task.borrowerName);
  const [mobileNumber, setMobileNumber] = useState<string>(task.mobileNumber);
  const [altNumber1, setAltNumber1] = useState<string>(task.altNumber1);
  const [altNumber2, setAltNumber2] = useState<string>(task.altNumber2);
  const [email, setEmail] = useState<string>(task.email);
  const [address1, setAddress1] = useState<string>(task.address1);
  const [address2, setAddress2] = useState<string>(task.address2);
  const [city, setCity] = useState<string>(task.city);
  const [state, setState] = useState<string>(task.state);
  const [pincode, setPincode] = useState<string>(task.pincode);

  const [showAltAddress, setShowAltAddress] = useState<boolean>(task.showAltAddress);
  const [altAddress1, setAltAddress1] = useState<string>(task.altAddress1);
  const [altAddress2, setAltAddress2] = useState<string>(task.altAddress2);
  const [altCity, setAltCity] = useState<string>(task.altCity);
  const [altState, setAltState] = useState<string>(task.altState);
  const [altPincode, setAltPincode] = useState<string>(task.altPincode);

  const [taskType, setTaskType] = useState<string>(task.taskType);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(task.scheduleDate);
  const [recommendedTime, setRecommendedTime] = useState<string>(task.recommendedTime);
  const [note, setNote] = useState<string>(task.note);

  const [loanNumber, setLoanNumber] = useState<string>(task.loanNumber);
  const [bank, setBank] = useState<string>(task.bank);
  const [loanCategory, setLoanCategory] = useState<string>(task.loanCategory);
  const [loanAmount, setLoanAmount] = useState<string>(task.loanAmount);
  const [dueAmount, setDueAmount] = useState<string>(task.dueAmount);
  const [dueDate, setDueDate] = useState<Date | null>(task.dueDate);
  const [penalInterest, setPenalInterest] = useState<string>(task.penalInterest);
  const [overdueDays, setOverdueDays] = useState<string>(task.overdueDays);
  const [pos, setPOS] = useState<string>(task.pos);
  const [tos, setTOS] = useState<string>(task.tos);

  // Add validation/submit logic as needed

  return (
    <form className="max-w-[900px] mx-auto px-2">
      <h2 className="text-xl font-semibold mb-8">Edit Task</h2>

      {/* Case Type */}
      <div className="mb-8">
        <Dropdown
          options={caseTypeOptions}
          value={caseType}
          onChange={v => setCaseType(v as string)}
          placeholder="Select Type"
          className="max-w-md"
        />
      </div>

      {/* Borrower Details */}
      <h3 className="text-lg font-semibold mb-2">Borrower Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <InputField label="Name" required value={borrowerName} onChange={e => setBorrowerName(e.target.value)} placeholder="Borrower name" />
        <InputField label="Mobile Number" required value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="Borrower number" />
        <InputField label="Alternate Number 1" required value={altNumber1} onChange={e => setAltNumber1(e.target.value)} placeholder="Borrower alternate number 1" />
        <InputField label="Alternate Number 2" required value={altNumber2} onChange={e => setAltNumber2(e.target.value)} placeholder="Borrower alternate number 2" />
        <InputField label="Email ID (Optional)" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter ID number" />
        <InputField label="Primary Address Line 1" required value={address1} onChange={e => setAddress1(e.target.value)} placeholder="Type Address" />
        <InputField label="Primary Address Line 2" value={address2} onChange={e => setAddress2(e.target.value)} placeholder="Type Address" />
        <Dropdown options={cityOptions} value={city} onChange={v => setCity(v as string)} placeholder="Search & Select City" label="City" required />
        <Dropdown options={stateOptions} value={state} onChange={v => setState(v as string)} placeholder="Search & Select State" label="State" required />
        <InputField label="Pincode" required value={pincode} onChange={e => setPincode(e.target.value)} placeholder="Type Pincode" />
      </div>
      <div className="mb-6">
        {!showAltAddress && (
          <button
            type="button"
            className="text-blue-600 font-semibold text-sm hover:underline"
            onClick={() => setShowAltAddress(true)}
          >
            + Add Another Address
          </button>
        )}
      </div>

      {/* Alternative Address Section */}
      {showAltAddress && (
        <div className="mb-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
            <InputField
              label="Alternative Address Line 1"
              required
              value={altAddress1}
              onChange={e => setAltAddress1(e.target.value)}
              placeholder="Type Address"
            />
            <InputField
              label="Alternative Address Line 2"
              required
              value={altAddress2}
              onChange={e => setAltAddress2(e.target.value)}
              placeholder="Type Address"
            />
            <Dropdown
              options={cityOptions}
              value={altCity}
              onChange={v => setAltCity(v as string)}
              placeholder="Search & Select City"
              label="City"
              required
            />
            <Dropdown
              options={stateOptions}
              value={altState}
              onChange={v => setAltState(v as string)}
              placeholder="Search & Select State"
              label="State"
              required
            />
            <InputField
              label="Pincode"
              required
              value={altPincode}
              onChange={e => setAltPincode(e.target.value)}
              placeholder="Type Pincode"
            />
          </div>
        </div>
      )}

      {/* Task Scheduling */}
      <h3 className="text-lg font-semibold mb-2">Task Scheduling</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <InputField label="Task ID" value="Task - 248712" disabled />
        <Dropdown options={taskTypeOptions} value={taskType} onChange={v => setTaskType(v as string)} placeholder="Search Type" required label="Task Type" />
        <DatePickerInput label="Schedule Date" value={scheduleDate} onChange={setScheduleDate} className="your-custom-class" />
        <InputField label="Recommended Time" value={recommendedTime} onChange={e => setRecommendedTime(e.target.value)} placeholder="Select Time" />
      </div>
      <div className="mb-8">
        <InputField label="Note" value={note} onChange={e => setNote(e.target.value)} placeholder="Add Note If Any" />
      </div>

      {/* Loan Details */}
      <h3 className="text-lg font-semibold mb-2">Loan Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <InputField label="Loan Number" required value={loanNumber} onChange={e => setLoanNumber(e.target.value)} placeholder="Enter Loan Number" />
        <Dropdown options={bankOptions} value={bank} onChange={v => setBank(v as string)} placeholder="Search & Select Bank" required label="Bank Name" />
        <Dropdown options={loanCategoryOptions} value={loanCategory} onChange={v => setLoanCategory(v as string)} placeholder="Select Category" label="Loan Category" />
        <InputField label="Loan Amount" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} placeholder="Enter Amount" />
        <InputField label="Due Amount" value={dueAmount} onChange={e => setDueAmount(e.target.value)} placeholder="Enter Amount" />
        <DatePickerInput label="Due Date" value={dueDate} onChange={setDueDate} />
        <InputField label="Penal Interest" value={penalInterest} onChange={e => setPenalInterest(e.target.value)} placeholder="Enter Amount" />
        <InputField label="Over due Days" value={overdueDays} onChange={e => setOverdueDays(e.target.value)} placeholder="Enter Days" />
        <InputField label="POS" value={pos} onChange={e => setPOS(e.target.value)} placeholder="Enter Amount" />
        <InputField label="TOS" value={tos} onChange={e => setTOS(e.target.value)} placeholder="Enter Amount" />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 font-semibold">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700">
          Create
        </button>
      </div>
    </form>
  );
};

export default EditTaskModel;