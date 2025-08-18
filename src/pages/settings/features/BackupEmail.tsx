import React, { useState } from "react";
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";

interface BackupEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (email: string) => void;
  initialEmail?: string;
}

const BackupEmailModal: React.FC<BackupEmailModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialEmail = "",
}) => {
  const [email, setEmail] = useState(initialEmail);

  const handleContinue = () => {
    if (onSubmit) onSubmit(email);
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      height="auto"
      backgroundColor="bg-white"
      showCloseButton={false} // We render our own close button inside
      closeOnOverlayClick={true}
      className="p-0"
      headerClassName="hidden"
      contentClassName="p-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        className="relative bg-white rounded-[12px]"
        style={{ width: "798px", height: "492px" }}
      >
        {/* Close button */}
        <button
          className="absolute top-7 right-7 text-gray-400 hover:text-gray-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Content */}
        <div className="flex flex-col h-full justify-center">
          <h2 className="text-2xl font-semibold text-center mb-2 mt-2">
            Add Backup Email for Reports
          </h2>
          <p className="text-gray-600 text-center mb-10 text-base px-10 pt-4">
            Ensure your critical reports are also delivered to a backup email for redundancy or team sharing. You can update or remove this anytime from settings.
          </p>
          {/* Email field */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-[600px]">
              <input
                type="email"
                id="backup-email"
                className="w-full border border-gray-500 bg-white rounded-lg px-4 pt-7 pb-3 text-base focus:outline-none font-semibold transition"
                placeholder=" "
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="backup-email"
                className="absolute left-4 top-2 text-gray-400 text-sm pointer-events-none"
              >
                Email
              </label>
            </div>
          </div>
          {/* Button */}
          <div className="flex justify-center">
            <div className="w-[600px]">
              <PrimaryButton
                text="Continue"
                onClick={handleContinue}
                className="w-full py-4 px-4 rounded-lg text-base font-semibold bg-[#0064E1] hover:bg-[#0055C4] transition text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default BackupEmailModal;