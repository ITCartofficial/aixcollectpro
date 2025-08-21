import React, { useState, useEffect } from "react";
import Dropdown from "../common/Dropdown";
import InputField from "../ui/Input/InputField";
import DatePickerInput from "../ui/Input/DatePickerInput";
import OutlineButton from "../ui/Buttons/OutlineButton";
import PrimaryButton from "../ui/Buttons/PrimaryButton";

const cityOptions = [
  { label: "Bengaluru", value: "Bengaluru" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
];

const reportingOptions = [
  { label: "Manager 1", value: "Manager 1" },
  { label: "Manager 2", value: "Manager 2" },
];

const languageOptions = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Kannada", value: "Kannada" },
];

interface AccessControlUser {
  id: string;
  employeeId: string;
  name: string;
  mobileNumber: string;
  role: string;
  avatar?: string;
  email?: string;
  vendor?: string;
  dateOfJoining?: string;
  city?: string;
  reportingTo?: string;
  languages?: string[];
}

interface EditMemberFormFields {
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

const initialFormState: EditMemberFormFields = {
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

interface EditMemberFormProps {
  userData?: AccessControlUser | null;
  onUpdate?: (updatedUser: AccessControlUser) => void;
  onCancel?: () => void;
}

const EditMemberForm: React.FC<EditMemberFormProps> = ({
  userData,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState<EditMemberFormFields>(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<EditMemberFormFields>>({});

  // Populate form when userData changes
  useEffect(() => {
    if (userData) {
      // Split name into first and last name (assuming space-separated)
      const nameParts = userData.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setForm({
        role: userData.role || "",
        firstName: firstName,
        lastName: lastName,
        mobile: userData.mobileNumber || "",
        email: userData.email || "",
        empId: userData.employeeId || "",
        vendor: userData.vendor || "ITCart",
        dateOfJoining: userData.dateOfJoining
          ? new Date(userData.dateOfJoining)
          : null,
        city: userData.city || "",
        reportingTo: userData.reportingTo || "",
        languages: userData.languages || [],
      });
    } else {
      setForm(initialFormState);
    }
  }, [userData]);

  const handleChange = (field: keyof EditMemberFormFields, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EditMemberFormFields> = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.empId.trim()) {
      newErrors.empId = "Employee ID is required";
    }
    if (!form.city) {
      newErrors.city = "City is required";
    }
    if (
      form.role !== "Global Admin" &&
      form.role !== "Super Admin" &&
      !form.reportingTo
    ) {
      newErrors.reportingTo = "Reporting to is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API call function to update user
  const updateUserInDatabase = async (
    updatedUserData: AccessControlUser
  ): Promise<AccessControlUser> => {
    // Replace this with your actual API endpoint
    const response = await fetch(`/api/users/${updatedUserData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm() || !userData) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedUserData: AccessControlUser = {
        ...userData,
        name: `${form.firstName} ${form.lastName}`.trim(),
        mobileNumber: form.mobile,
        email: form.email,
        employeeId: form.empId,
        vendor: form.vendor,
        dateOfJoining: form.dateOfJoining
          ? form.dateOfJoining.toISOString()
          : userData.dateOfJoining,
        city: form.city,
        reportingTo: form.reportingTo,
        languages: form.languages,
      };

      const updatedUser = await updateUserInDatabase(updatedUserData);

      if (onUpdate) {
        onUpdate(updatedUser);
      }

      alert("User updated successfully!");
    } catch (error) {
      alert("Failed to update user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      const nameParts = userData.name.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setForm({
        role: userData.role || "",
        firstName: firstName,
        lastName: lastName,
        mobile: userData.mobileNumber || "",
        email: userData.email || "",
        empId: userData.employeeId || "",
        vendor: userData.vendor || "ITCart",
        dateOfJoining: userData.dateOfJoining
          ? new Date(userData.dateOfJoining)
          : null,
        city: userData.city || "",
        reportingTo: userData.reportingTo || "",
        languages: userData.languages || [],
      });
    } else {
      setForm(initialFormState);
    }
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="max-w-5xl mx-auto px-2">
      {/* Role - Now as disabled InputField */}
      <div className="max-w-[400px]">
        <InputField
          label="Role"
          required
          value={form.role}
          disabled
          placeholder="Role"
          className="bg-gray-50"
        />
      </div>

      {/* Details Section */}
      <h3 className="text-lg font-semibold mb-4">Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
        <InputField
          label="First Name"
          required
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Enter First name"
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          required
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Enter Last Name"
          error={errors.lastName}
        />
        <InputField
          label="Mobile Number"
          required
          value={form.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          placeholder="Enter mobile number"
          error={errors.mobile}
        />
        <InputField
          label="Email ID"
          required
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter email"
          error={errors.email}
        />
        <InputField
          label="Employee ID"
          required
          value={form.empId}
          onChange={(e) => handleChange("empId", e.target.value)}
          placeholder="Enter ID number"
          error={errors.empId}
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
          onChange={(date) => handleChange("dateOfJoining", date)}
          placeholder="Select Date"
        />
        <Dropdown
          label="Location"
          options={cityOptions}
          value={form.city}
          onChange={(v) => handleChange("city", v as string)}
          placeholder="Search & Select City"
          required
        />
        {form.role !== "Global Admin" && form.role !== "Super Admin" && (
          <>
            <Dropdown
              label="Reporting to"
              options={reportingOptions}
              value={form.reportingTo}
              onChange={(v) => handleChange("reportingTo", v as string)}
              placeholder="Select Reporting to"
              required
            />
            <Dropdown
              label="Language (only for telecaller)"
              options={languageOptions}
              value={form.languages}
              onChange={(v) => handleChange("languages", v as string[])}
              placeholder="Search & Select Multiple language"
              multiSelect
              searchable
            />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <OutlineButton text="Cancel" className="w-32" onClick={handleCancel} />
        <PrimaryButton
          text={isLoading ? "Updating..." : "Update"}
          className="w-32 bg-primary-700 hover:bg-primary-600 text-white disabled:bg-gray-400"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default EditMemberForm;