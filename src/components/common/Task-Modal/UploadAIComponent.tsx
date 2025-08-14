import React, { useState, useRef, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineCloudUpload } from "react-icons/hi";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import OutlineButton from "../../ui/Buttons/OutlineButton";
import SuccessUI from "./SuccessUI";
import Dropdown from "../Dropdown";

interface UploadAIComponentProps {
  onBack: () => void;
  onSuccessStateChange?: (isSuccess: boolean) => void;
  onEditClick?: () => void;
  // Add new props to control state from parent
  showAssignmentSummary?: boolean;
  hasSelectedFile?: boolean;
  fileName?: string;
}

const UploadAIComponent: React.FC<UploadAIComponentProps> = ({
  onSuccessStateChange,
  onEditClick,
  showAssignmentSummary: externalShowAssignmentSummary = false,
  hasSelectedFile: externalHasSelectedFile = false,
  fileName: externalFileName = "",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAssignmentSummary, setShowAssignmentSummary] = useState(
    externalShowAssignmentSummary
  );
  const [showSuccessUI, setShowSuccessUI] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Task type options
  const taskTypeOptions = [
    { label: "Select Task Type", value: "" },
    { label: "Field Task", value: "field" },
    { label: "Telecalling", value: "telecalling" },
  ];

  // Update local state when external props change (when coming back from edit)
  useEffect(() => {
    setShowAssignmentSummary(externalShowAssignmentSummary);
    if (externalHasSelectedFile && externalFileName) {
      // Create a mock file object to display the filename
      const mockFile = new File([""], externalFileName, {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      setSelectedFile(mockFile);
    }
  }, [
    externalShowAssignmentSummary,
    externalHasSelectedFile,
    externalFileName,
  ]);

  // Mock assignment data - dynamically generated based on task type
  const getAssignmentData = () => {
    if (selectedTaskType === "field") {
      return {
        agents: [
          { name: "Rakesh Kumar", tasksAssigned: 4, location: "Indiranagar" },
          { name: "Amit Verma", tasksAssigned: 3, location: "Banashankari" },
          { name: "Sunil Patil", tasksAssigned: 3, location: "Jayanagar" },
        ],
        telecallers: [],
        totalTasks: {
          telecaller: 0,
          agents: 10,
        },
      };
    } else if (selectedTaskType === "telecalling") {
      return {
        agents: [],
        telecallers: [
          {
            name: "Ramya Prakash",
            tasksAssigned: 5,
            languageKnow: "English, Hindi, Tamil",
          },
          {
            name: "Priya Sharma",
            tasksAssigned: 3,
            languageKnow: "English, Hindi, Kannada",
          },
          {
            name: "Anita Reddy",
            tasksAssigned: 2,
            languageKnow: "English, Telugu, Tamil",
          },
        ],
        totalTasks: {
          telecaller: 10,
          agents: 0,
        },
      };
    }
    return {
      agents: [],
      telecallers: [],
      totalTasks: {
        telecaller: 0,
        agents: 0,
      },
    };
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if task type is selected
    if (!selectedTaskType) {
      alert("Please select a task type before uploading the file.");
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      // Simulate processing and show assignment summary after a brief delay
      setTimeout(() => {
        setShowAssignmentSummary(true);
      }, 1000);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if task type is selected
    if (!selectedTaskType) {
      alert("Please select a task type before uploading the file.");
      event.target.value = ""; // Reset file input
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate processing and show assignment summary after a brief delay
      setTimeout(() => {
        setShowAssignmentSummary(true);
      }, 1000);
    }
  };

  const triggerFileUpload = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Check if task type is selected
    if (!selectedTaskType) {
      alert("Please select a task type before uploading the file.");
      return;
    }

    fileInputRef.current?.click();
  };

  const handleDownloadTemplate = () => {
    if (!selectedTaskType) {
      alert("Please select a task type to download the appropriate template.");
      return;
    }

    // Different templates based on task type
    // // if (selectedTaskType === "field") {
    // //   alert(
    // //     "Downloading Field Task Excel template with columns: Task ID, Borrower Name, Mobile, Address, Location, Amount, etc."
    // //   );
    // // } else if (selectedTaskType === "telecalling") {
    // //   alert(
    // //     "Downloading Telecalling Excel template with columns: Task ID, Borrower Name, Mobile, Language Preference, Call Priority, etc."
    // //   );
    // }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setShowAssignmentSummary(false);
    setShowSuccessUI(false);
    setSelectedTaskType("");
    onSuccessStateChange?.(false);
  };

  const handleUploadAndAssign = () => {
    // Show success UI instead of alert
    setShowSuccessUI(true);
    onSuccessStateChange?.(true);
  };

  const handleEditButtonClick = () => {
    onEditClick?.();
  };

  const handleTaskTypeChange = (value: string | string[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSelectedTaskType(newValue);

    // If there's already a file and assignment summary shown, update it
    if (selectedFile && showAssignmentSummary) {
      // Re-process the assignment with new task type
      setShowAssignmentSummary(false);
      setTimeout(() => {
        setShowAssignmentSummary(true);
      }, 500);
    }
  };
  const getUploadDescription = () => {
    if (selectedTaskType === "field") {
      return "Upload Excel file for field tasks. The system will auto-assign tasks to field agents based on location, availability, and performance metrics.";
    } else if (selectedTaskType === "telecalling") {
      return "Upload Excel file for telecalling tasks. The system will auto-assign tasks to telecallers based on language preference, availability, and performance metrics.";
    }
    return "The system will auto-assign tasks to agents or telecallers based on location, language, availability, and performance metrics.";
  };

  const assignmentData = getAssignmentData();

  // Show success UI if upload is complete
  if (showSuccessUI) {
    return <SuccessUI />;
  }

  return (
    <div>
      {/* Download Template */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#F8FAFF] border border-[#E6E9F4] rounded-lg px-6 py-4 mb-6 shadow-sm gap-4">
        <div className="flex-1 sm:pr-4">
          <p className="text-black font-inter text-[16px] font-semibold leading-[24px]">
            Download Template for Bulk Upload
          </p>
          {/* <p className="text-sm text-gray-500 text-[14px] font-normal">
            {selectedTaskType === "field"
              ? "Sample columns with Task ID, Borrower Name, Mobile, Address, Task Type, Location, Amount."
              : selectedTaskType === "telecalling"
              ? "Sample columns with Task ID, Borrower Name, Mobile, Language Preference, Call Priority, Notes."
              : "Select a task type to see relevant template columns."}
          </p> */}
          <p className="text-sm text-gray-500 font-normal">
            Sample columns with Task ID, Borrower Name, Mobile, Address, Task
            Type, Location, Amount.
          </p>
        </div>

        {/* {selectedTaskType ? ( */}
        <PrimaryButton
          text="Download Excel"
          onClick={handleDownloadTemplate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded w-40 min-w-40 shrink-0"
        />
        {/* ) : (
          <button
            disabled
            className="bg-gray-400 cursor-not-allowed text-white px-5 py-2 rounded w-40 min-w-40 shrink-0"
          >
            Download Excel
          </button>
        )} */}
      </div>

      <div className=" flex  justify-between mb-2">
        {/* Upload Excel */}
        <p className="mb-2 font-semibold text-base">Upload Excel</p>
        {/* Task Type Selection */}
        <Dropdown
          required={true}
          options={taskTypeOptions}
          value={selectedTaskType}
          onChange={handleTaskTypeChange}
          placeholder="Select Task Type"
          className="w-48 mb-4"
        />
      </div>
      <p className="text-sm font-normal leading-[21px] mb-2">
        {getUploadDescription()}
      </p>

      <div
        onClick={triggerFileUpload}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg px-0 py-8 text-center transition-colors relative mb-6 ${
          selectedTaskType
            ? "border-[#B7C0D8] cursor-pointer hover:border-blue-400 bg-neutral-100"
            : "border-gray-300 cursor-not-allowed bg-gray-50"
        }`}
      >
        <HiOutlineCloudUpload
          className={`mx-auto text-4xl mb-2 ${
            selectedTaskType ? "text-gray-600" : "text-gray-400"
          }`}
        />
        <p
          className={`font-inter text-base font-semibold leading-[24px] ${
            selectedTaskType ? "text-black" : "text-gray-400"
          }`}
        >
          {selectedTaskType
            ? "Drag and drop or browse to upload."
            : "Select a task type first to upload file."}
        </p>
        <p
          className={`text-sm mt-1 ${
            selectedTaskType ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Supported file format: .xls, .xlsx
        </p>
        {selectedFile && (
          <div className="mt-2 text-xs text-blue-700 font-semibold">
            {selectedFile.name}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Assignment Summary - Only show after file upload */}
      {showAssignmentSummary && (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-base">Assignment Summary</p>
              <button
                onClick={handleEditButtonClick}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                <span>Edit</span>
                <CiEdit />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6 font-normal">
              With the help of AI, the system will automatically assign{" "}
              {selectedTaskType} tasks to{" "}
              {selectedTaskType === "field" ? "agents" : "telecallers"} based on{" "}
              {selectedTaskType === "field"
                ? "geo-location and performance metrics"
                : "language preference and performance metrics"}
              .
            </p>

            {/* Agents Table - Only show for field tasks */}
            {assignmentData.agents.length > 0 && (
              <div className="mb-6">
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tasks Assigned
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignmentData.agents.map((agent, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {agent.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {agent.tasksAssigned}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {agent.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Telecallers Table - Only show for telecalling tasks */}
            {assignmentData.telecallers.length > 0 && (
              <div className="mb-6">
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Telecaller Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tasks Assigned
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Language Know
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {assignmentData.telecallers.map((telecaller, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {telecaller.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {telecaller.tasksAssigned}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {telecaller.languageKnow}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Summary Text */}
            <div className="text-sm text-gray-600 mb-6">
              {assignmentData.totalTasks.telecaller > 0 && (
                <>
                  <strong>
                    {assignmentData.totalTasks.telecaller} tasks assigned to{" "}
                    {assignmentData.telecallers.length} Telecaller
                    {assignmentData.telecallers.length > 1 ? "s" : ""}
                  </strong>
                </>
              )}
              {assignmentData.totalTasks.agents > 0 && (
                <>
                  <strong>
                    {assignmentData.totalTasks.agents} tasks distributed across{" "}
                    {assignmentData.agents.length} Agent
                    {assignmentData.agents.length > 1 ? "s" : ""}
                  </strong>
                </>
              )}
              . You can review or edit task details anytime in the Task
              Management section.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <OutlineButton text="Cancel" onClick={handleCancel} />
            <PrimaryButton
              text="Upload & Assign"
              onClick={handleUploadAndAssign}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadAIComponent;
