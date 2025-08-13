import React, { useState } from "react";
import Dropdown from "../../../components/common/Dropdown";
import DateRangePickerInput from "../../../components/ui/Input/DateRangePickerInput";
import BackupEmailOTP from "./BackupEmailOTP";
import BackupEmailModal from "./BackupEmail";

interface ExportBackupState {
    frequency: string;
    format: string;
    types: string[];
}

const exportFrequencyOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
];

const exportFormatOptions = [
    { label: "Excel", value: "excel" },
    { label: "CSV", value: "csv" },
];

const autoExportOptions = [
    { label: "Task Report", value: "task" },
    { label: "Collection Report", value: "collection" },
    { label: "Attendance Report", value: "attendance" },
];

const initialState: ExportBackupState = {
    frequency: "daily",
    format: "excel",
    types: ["collection"],
};

const ExportBackup: React.FC = () => {
    const [state, setState] = useState<ExportBackupState>(initialState);
    const [backupEmails, setBackupEmails] = useState<string[]>([]);

    // Modal states
    const [showBackupEmailModal, setShowBackupEmailModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [pendingEmail, setPendingEmail] = useState("");

    // Single select handler
    const handleSingleChange =
        (key: keyof Omit<ExportBackupState, "types">) =>
        (value: string | string[]) => {
            setState((prev) => ({
                ...prev,
                [key]: Array.isArray(value) ? value[0] || "" : value,
            }));
        };

    // Multi select handler
    const handleTypesChange = (value: string | string[]) => {
        setState((prev) => ({
            ...prev,
            types: Array.isArray(value) ? value : value ? [value] : [],
        }));
    };

    // Open backup email modal
    const handleAddBackupMail = () => setShowBackupEmailModal(true);

    // Close backup email modal
    const handleBackupEmailClose = () => setShowBackupEmailModal(false);

    // Email submitted -> open OTP modal
    const handleBackupEmailAdd = (email: string) => {
        setPendingEmail(email);
        setShowBackupEmailModal(false);
        setShowOtpModal(true);
    };

    // Close OTP modal
    const handleOtpModalClose = () => setShowOtpModal(false);

    // OTP verified -> add email to list
    const handleOtpVerify = (_otp: string) => {
        if (pendingEmail) {
            setBackupEmails((prev) => [...prev, pendingEmail]);
        }
        setPendingEmail("");
        setShowOtpModal(false);
    };

    return (
        <div className="max-w-full mx-auto mr-3 bg-white rounded-lg shadow px-8 py-7">
            <h2 className="text-xl font-semibold mb-1">Export & Backup Settings</h2>
            <div className="text-gray-600 mb-6 text-sm">
                Manage automatic export and report backup delivery
            </div>

            {/* Auto Export Frequency */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <span className="font-medium">Auto Export Frequency</span>
                <div className="w-48">
                    <Dropdown
                        options={exportFrequencyOptions}
                        value={state.frequency}
                        onChange={handleSingleChange("frequency")}
                        placeholder="Select"
                    />
                </div>
            </div>

            {/* Preferred Export Format */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <span className="font-medium">Preferred Export Format</span>
                <div className="w-48">
                    <Dropdown
                        options={exportFormatOptions}
                        value={state.format}
                        onChange={handleSingleChange("format")}
                        placeholder="Select Format"
                    />
                </div>
            </div>

            {/* Reports to Auto-Export */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <span className="font-medium">Reports to Auto-Export</span>
                <div className="w-48">
                    <Dropdown
                        options={autoExportOptions}
                        value={state.types}
                        onChange={handleTypesChange}
                        placeholder="Multi Select"
                        multiSelect={true}
                    />
                </div>
            </div>

            {/* Backup Email Recipients */}
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <span className="font-medium">Backup Email Recipients</span>
                <button
                    className="text-primary-700 text-sm font-normal cursor-pointer"
                    onClick={handleAddBackupMail}
                >
                    + Add Backup Mail
                </button>
            </div>

            {/* Show added backup emails */}
            {backupEmails.length > 0 && (
                <div className="mb-4">
                    <span className="text-sm text-gray-700 font-medium">
                        Added Backup Emails:
                    </span>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                        {backupEmails.map((email, idx) => (
                            <li key={idx}>{email}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Schedule Export Time */}
            <div className="flex items-center justify-between py-4">
                <span className="font-medium">Schedule Export Time</span>
                <DateRangePickerInput />
            </div>

            {/* BackupEmail Modal */}
            <BackupEmailModal
                isOpen={showBackupEmailModal}
                onClose={handleBackupEmailClose}
                onSubmit={handleBackupEmailAdd}
                initialEmail=""
            />

            {/* OTP Modal */}
            <BackupEmailOTP
                isOpen={showOtpModal}
                onClose={handleOtpModalClose}
                onVerify={handleOtpVerify}
            />
        </div>
    );
};

export default ExportBackup;