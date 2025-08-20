import React, { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { HiOutlineCloudUpload } from "react-icons/hi";
import PrimaryButton from "../../ui/Buttons/PrimaryButton";
import OutlineButton from "../../ui/Buttons/OutlineButton";
import SuccessUI from "./SuccessUI";

interface UploadAIComponentProps {
  onBack: () => void;
  onSuccessStateChange?: (isSuccess: boolean) => void;
  onEditClick?: () => void;
}

const UploadAIComponent: React.FC<UploadAIComponentProps> = ({
  onSuccessStateChange,
  onEditClick
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showAssignmentSummary, setShowAssignmentSummary] = useState(false);
  const [showSuccessUI, setShowSuccessUI] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock assignment data
  const assignmentData = {
    agents: [
      { name: "Rakesh Kumar", tasksAssigned: 4, location: "Indiranagar" },
      { name: "Amit Verma", tasksAssigned: 3, location: "Banashankari" },
      { name: "Sunil Patil", tasksAssigned: 3, location: "Jayanagar" },
    ],
    telecallers: [
      {
        name: "Ramya prakash",
        tasksAssigned: 1,
        languageKnow: "English, Hindi, Tamil",
      },
    ],
    totalTasks: {
      telecaller: 1,
      agents: 9,
    },
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
    fileInputRef.current?.click();
  };

  const handleDownloadTemplate = () => {
    // Replace with real download logic
    alert("Download Excel template");
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setShowAssignmentSummary(false);
    setShowSuccessUI(false);
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
          <p className="text-sm text-gray-500 text-[14px] font-normal">
            Sample columns with Task ID, Borrower Name, Mobile, Address, Task
            Type, Location, Amount.
          </p>
        </div>

        <PrimaryButton
          text="Download Excel"
          onClick={handleDownloadTemplate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded w-40 min-w-40 shrink-0"
        />
      </div>

      {/* Upload Excel */}
      <div className="mb-2 font-semibold text-base">Upload Excel</div>
      <div className="text-sm font-normal leading-[21px] mb-2">
        The system will auto-assign tasks to agents or telecallers based on
        location, language, availability, and performance metrics.
      </div>
      <div
        onClick={triggerFileUpload}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#B7C0D8] rounded-lg px-0 py-8 text-center cursor-pointer transition-colors hover:border-blue-400 relative mb-6 bg-neutral-100"
      >
        <HiOutlineCloudUpload className="mx-auto text-4xl mb-2" />
        <div className="text-black font-inter text-base font-semibold leading-[24px]">
          Drag and drop or browse to upload.
        </div>
        <div className="text-sm mt-1">Supported file format: .xls, .xlsx</div>
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
              <div className="font-semibold text-base">Assignment Summary</div>
              <button 
                onClick={handleEditButtonClick}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                <span>Edit</span>
                <CiEdit />
              </button>
            </div>

            <div className="text-sm text-gray-500 mb-6 font-normal">
              With the help of AI, the system will automatically assign tasks to
              agents or telecallers based on geo-location, language preference,
              and performance metrics.
            </div>

            {/* Agents Table */}
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

            {/* Telecallers Table */}
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

            {/* Summary Text */}
            <div className="text-sm text-gray-600 mb-6">
              <strong>
                {assignmentData.totalTasks.telecaller} task assigned to{" "}
                {assignmentData.telecallers.length} Telecaller
              </strong>{" "}
              and{" "}
              <strong>
                {assignmentData.totalTasks.agents} tasks distributed across{" "}
                {assignmentData.agents.length} Agents
              </strong>
              . You can review or edit task details anytime in the Task
              Management section.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <OutlineButton text="Cancel" onClick={handleCancel}  />
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