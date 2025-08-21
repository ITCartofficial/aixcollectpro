import React from "react";
import { IoClose } from "react-icons/io5";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton";

interface ConfirmEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onContinue: () => void;
}

const ConfirmEmailModal: React.FC<ConfirmEmailModalProps> = ({
  isOpen,
  onClose,
  email,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-500">
      <div className="relative bg-white rounded-[12px] shadow-xl flex flex-col items-center w-[600px] min-h-[350px] px-8 py-10">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-neutral-400 hover:text-neuneutral-600 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose />
        </button>
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4 mt-2">
          Confirm Your Email for Two-Step Authentication
        </h2>
        <p className="text-neutral-600 text-center mb-8 text-base px-2 leading-6">
          To enhance your account security, we'll send a verification code to your registered email every time you log in from a new device.
          Please confirm that your email is correct to proceed.
        </p>
        {/* Email Input (read-only) */}
        <input
          type="text"
          value={email}
          readOnly
          className="w-full max-w-xl px-4 py-4 border border-neutral-400 rounded-lg bg-white text-base font-normal mb-8 focus:outline-none"
          placeholder="Email"
        />
        {/* Continue Button */}
        <PrimaryButton
          text="Continue"
          onClick={onContinue}
          className="w-full max-w-xl py-3 px-4 rounded-lg text-base font-semibold bg-primary-700 hover:bg-primary-700 transition text-white"
        />
      </div>
    </div>
  );
};

export default ConfirmEmailModal;