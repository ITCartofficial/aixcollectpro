import React, { useState, useEffect } from "react";
import ReusableModal from "../../../components/ui/Modal/ReusableModal";
import { FaEdit, FaUpload } from "react-icons/fa";
import { FaBots } from "react-icons/fa6";
import TaskCreationForm from "../../../components/forms/TaskCreationForm";
import TaskAutoAssign from "../../../components/common/Task-Modal/TaskAutoAssign";
import UploadManualComponent from "../../../components/common/Task-Modal/UploadManualComponent";
import UploadAIComponent from "../../../components/common/Task-Modal/UploadAIComponent";
import AIEditAssignTask from "../../../components/common/Task-Modal/AIEditAssignTask";

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OptionType =
  | "upload-manual"
  | "create-manual"
  | "upload-ai"
  | "edit-assign";

// Rename the local interface to avoid conflicts
interface TaskOption {
  id: OptionType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const options: TaskOption[] = [
  {
    id: "upload-manual",
    title: "Upload Excel & Assign Manually",
    description: "Upload an Excel file and manually allocate tasks to agents",
    icon: FaUpload,
  },
  {
    id: "create-manual",
    title: "Create Task Manually",
    description:
      "Enter all task details individually (for small or urgent cases)",
    icon: FaEdit,
  },
  {
    id: "upload-ai",
    title: "Upload Excel & Auto-Assign (AI)",
    description:
      "Upload file and let the system assign based on agent geo + performance data",
    icon: FaBots,
  },
];

const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [showEditAssign, setShowEditAssign] = useState(false);
  const [uploadAIState, setUploadAIState] = useState({
    showAssignmentSummary: false,
    hasSelectedFile: false,
    fileName: "",
  });

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null);
      setIsSuccessState(false);
      setShowEditAssign(false);
      setUploadAIState({
        showAssignmentSummary: false,
        hasSelectedFile: false,
        fileName: "",
      });
    }
  }, [isOpen]);

  const handleOptionClick = (optionId: OptionType) => {
    setSelectedOption(optionId);
  };

  // Back button: go to card selection
  const handleBack = () => {
    setSelectedOption(null);
    setIsSuccessState(false);
    setShowEditAssign(false);
  };

  // Handle success state change from UploadAIComponent
  const handleSuccessStateChange = (isSuccess: boolean) => {
    setIsSuccessState(isSuccess);
  };

  // Handle edit button click
  const handleEditClick = () => {
    setShowEditAssign(true);
    setUploadAIState({
      showAssignmentSummary: true,
      hasSelectedFile: true,
      fileName: "uploaded-file.xlsx", 
    });
  };

  // Handle back from edit assign to upload AI component
  const handleBackFromEditAssign = () => {
    setShowEditAssign(false);
  };

  // Handle update from edit assign - this will go back to UploadAIComponent with updated data
  const handleUpdateFromEditAssign = (updatedData: any) => {
    console.log("Updated data:", updatedData);
    // Go back to UploadAIComponent
    setShowEditAssign(false);
    setIsSuccessState(false);
  };

  // Custom close handler based on current state
  const handleModalClose = () => {
    if (showEditAssign) {
      handleBackFromEditAssign();
    } else {
      onClose();
    }
  };

  // Render content based on selectedOption and showEditAssign
  let modalContent: React.ReactNode;

  if (showEditAssign) {
    modalContent = (
      <AIEditAssignTask
        onCancel={handleBackFromEditAssign}
        onUpdate={handleUpdateFromEditAssign}
      />
    );
  } else if (selectedOption === "upload-manual") {
    modalContent = <UploadManualComponent onBack={handleBack} />;
  } else if (selectedOption === "upload-ai") {
    modalContent = (
      <UploadAIComponent
        onBack={handleBack}
        onSuccessStateChange={handleSuccessStateChange}
        onEditClick={handleEditClick}
        showAssignmentSummary={uploadAIState.showAssignmentSummary}
        hasSelectedFile={uploadAIState.hasSelectedFile}
        fileName={uploadAIState.fileName}
      />
    );
  } else if (selectedOption === "create-manual") {
    modalContent = <TaskCreationForm />;
  } else {
    modalContent = (
      <TaskAutoAssign
        options={options as any}
        onOptionSelect={handleOptionClick}
      />
    );
  }

  // Determine if title should be shown
  const showTitle = !isSuccessState;
  let modalTitle = "Assign Task";

  if (showEditAssign) {
    modalTitle = "Edit Assigned Task";
  } else if (selectedOption) {
    modalTitle =
      options.find((opt) => opt.id === selectedOption)?.title ?? "Assign Task";
  }

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={handleModalClose} 
      title={showTitle ? modalTitle : ""}
      size="xl"
      height="auto"
      backgroundColor="bg-white"
      showCloseButton={true}
      closeOnOverlayClick={true}
      hideHeaderBorder={true}
    >
      <div className="py-4 px-8">{modalContent}</div>
    </ReusableModal>
  );
};

export default TaskAssignmentModal;
