import React, { useState } from "react";
import Dropdown from "../common/Dropdown";
import InputField from "../ui/Input/InputField";
import DatePickerInput from "../ui/Input/DatePickerInput";
import OutlineButton from "../ui/Buttons/OutlineButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";


const roleOptions = [
    { label: "Field Agent User", value: "field-agent" },
    { label: "Telecaller", value: "telecaller" },
];

const cityOptions = [
    { label: "Bengaluru", value: "bengaluru" },
    { label: "Mumbai", value: "mumbai" },
    { label: "Delhi", value: "delhi" },
];
const reportingOptions = [
    { label: "Manager 1", value: "manager1" },
    { label: "Manager 2", value: "manager2" },
];
const languageOptions = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Kannada", value: "kannada" },
];


interface AddMemberFormFields {
    role: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    empId: string;
    vendor: string;
    dateOfJoining: Date | null;
    city: string;
    reportingTo: string;
    languages: string[];
}

const initialFormState: AddMemberFormFields = {
    role: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    empId: "",
    vendor: "ITCart",
    dateOfJoining: null,
    city: "",
    reportingTo: "",
    languages: [],
};

const AddMemberForm: React.FC = () => {
    const [form, setForm] = useState<AddMemberFormFields>(initialFormState);

    const handleChange = (field: keyof AddMemberFormFields, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        // console.log(form);
    };

    return (
        <form className="max-w-5xl mx-auto px-2" onSubmit={handleSubmit}>
            {/* Select Role */}
            <div className="mb-8 max-w-[400px]">
                <Dropdown
                    label="Select Role"
                    required
                    options={roleOptions}
                    value={form.role}
                    onChange={v => handleChange("role", v as string)}
                    placeholder="Select Role"
                />
            </div>

            {/* Details Section */}
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <InputField
                    label="First Name"
                    required
                    value={form.firstName}
                    onChange={e => handleChange("firstName", e.target.value)}
                    placeholder="Enter First name"
                />
                <InputField
                    label="Last Name"
                    required
                    value={form.lastName}
                    onChange={e => handleChange("lastName", e.target.value)}
                    placeholder="Enter Last Name"
                />
                <InputField
                    label="Mobile Number"
                    required
                    value={form.mobile}
                    onChange={e => handleChange("mobile", e.target.value)}
                    placeholder="Enter mobile number"
                />
                <InputField
                    label="Email ID"
                    required
                    value={form.email}
                    onChange={e => handleChange("email", e.target.value)}
                    placeholder="Enter email"
                />
                <InputField
                    label="Employee ID"
                    required
                    value={form.empId}
                    onChange={e => handleChange("empId", e.target.value)}
                    placeholder="Enter ID number"
                />
                <InputField
                    label="Vendor"
                    required
                    value={form.vendor}
                    disabled
                    placeholder="Vendor"
                />
                <DatePickerInput
                    label="Date of Joining"
                    required
                    value={form.dateOfJoining}
                    onChange={date => handleChange("dateOfJoining", date)}
                    placeholder="Select Date"
                />
                <Dropdown
                    label="Location"
                    options={cityOptions}
                    value={form.city}
                    onChange={v => handleChange("city", v as string)}
                    placeholder="Search & Select City"
                    required
                />
                <Dropdown
                    label="Reporting to"
                    options={reportingOptions}
                    value={form.reportingTo}
                    onChange={v => handleChange("reportingTo", v as string)}
                    placeholder="Select Reporting to"
                    required
                />
                <Dropdown
                    label="Language (only for telecaller)"
                    options={languageOptions}
                    value={form.languages}
                    onChange={v => handleChange("languages", v as string[])}
                    placeholder="Search & Select Multiple language"
                    multiSelect
                    searchable
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
                <OutlineButton text="Cancel" className="w-32" />
                <PrimaryButton text="Save" className="w-32 bg-primary-700 hover:bg-primary-600 text-white" />
            </div>
        </form>
    );
};

export default AddMemberForm;