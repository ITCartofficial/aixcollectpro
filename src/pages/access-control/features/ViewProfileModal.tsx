import React from "react";
import ViewProfile from "./ViewProfile";
import { IoClose } from "react-icons/io5";

interface ViewProfileModalProps {
  isOpen: boolean;
  closeOnOverlayClick?: boolean;
  onClose: () => void;
  userData: {
    name: string;
    phone: string;
    email: string;
    role: string;
    vendor: string;
    employeeID: string;
    joinedOn: string;
    location: string;
    avatar?: string;
  } | null;
}

const ViewProfileModal: React.FC<ViewProfileModalProps> = ({
  isOpen,
  onClose,
  userData,
  closeOnOverlayClick = true,
}) => {
  if (!isOpen || !userData) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  return (
    <div
      className="w-full fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-[12px] p-8 w-[1227px] h-[248px] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Close modal"
          type="button"
        >
          <IoClose className="w-6 h-6 text-gray-500" />
        </button>
        <ViewProfile {...userData} />
      </div>
    </div>
  );
};

export default ViewProfileModal;
