import React, { useState, useRef, useEffect } from 'react';
import ReusableModal from '../../../components/ui/Modal/ReusableModal';
import { FaEdit, FaUpload } from 'react-icons/fa';
import { FaBots } from 'react-icons/fa6';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import TaskCreationForm from '../../../components/forms/TaskCreationForm';


interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OptionType = 'upload-manual' | 'create-manual' | 'upload-ai';

interface Option {
  id: OptionType;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const options: Option[] = [
  {
    id: 'upload-manual',
    title: 'Upload Excel & Assign Manually',
    description: 'Upload an Excel file and manually allocate tasks to agents',
    icon: FaUpload,
  },
  {
    id: 'create-manual',
    title: 'Create Task Manually',
    description: 'Enter all task details individually (for small or urgent cases)',
    icon: FaEdit,
  },
  {
    id: 'upload-ai',
    title: 'Upload Excel & Auto-Assign (AI)',
    description: 'Upload file and let the system assign based on agent geo + performance data',
    icon: FaBots,
  },
];



const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [manualForm, setManualForm] = useState(initialManualForm);

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(null);
      setSelectedFile(null);

    }
  }, [isOpen]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const triggerFileUpload = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleOptionClick = (optionId: OptionType) => {
    setSelectedOption(optionId);
    setSelectedFile(null);
  };

  const handleDownloadTemplate = () => {
    // Replace with real download logic
    alert('Download Excel template');
  };



  // Back button: go to card selection
  const handleBack = () => {
    setSelectedOption(null);
    setSelectedFile(null);
  };

  // Dummy upload handler
  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading file: ${selectedFile.name}`);
      // Place your real upload logic here
    }
  };

  // Render content based on selectedOption
  let modalContent: React.ReactNode;

  if (selectedOption === 'upload-manual') {
    modalContent = (
      <div>
        {/* Download Template */}
        <div className="flex justify-between items-center bg-[#F8FAFF] border border-[#E6E9F4] rounded-lg px-6 py-4 mb-6 shadow-sm">
          <div>
            <div className="font-semibold text-sm">Download Template for Bulk Upload</div>
            <div className="text-xs text-gray-500">
              Sample columns with Task ID, Borrower Name, Mobile, Address, Task Type, Location, Amount.
            </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded transition"
            onClick={handleDownloadTemplate}
          >
            Download Excel
          </button>
        </div>
        {/* Upload Excel */}
        <div className="mb-2 font-medium text-sm">Upload Excel</div>
        <div className="text-xs text-gray-500 mb-2">
          Tasks will be listed in the Task Management section for manual assignment to agents or telecallers.
        </div>
        <div
          onClick={triggerFileUpload}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-[#B7C0D8] rounded-lg px-0 py-8 text-center cursor-pointer transition-colors hover:border-blue-400 relative mb-6"
        >
          <HiOutlineCloudUpload className="mx-auto text-4xl text-blue-400 mb-2" />
          <div className="font-medium text-gray-900">Drag and drop or browse to upload.</div>
          <div className="text-xs text-gray-500 mt-1">
            Supported file format: .xls, .xlsx
          </div>
          {selectedFile && (
            <div className="mt-2 text-xs text-blue-700 font-semibold">{selectedFile.name}</div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Upload
          </button>
        </div>
      </div>
    );
  } else if (selectedOption === 'upload-ai') {
    modalContent = (
      <div>
        {/* Download Template */}
        <div className="flex justify-between items-center bg-[#F8FAFF] border border-[#E6E9F4] rounded-lg px-6 py-4 mb-6 shadow-sm">
          <div>
            <div className="font-semibold text-sm">Download Template for Bulk Upload</div>
            <div className="text-xs text-gray-500">
              Sample columns with Task ID, Borrower Name, Mobile, Address, Task Type, Location, Amount.
            </div>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded transition"
            onClick={handleDownloadTemplate}
          >
            Download Excel
          </button>
        </div>
        {/* Upload Excel */}
        <div className="mb-2 font-medium text-sm">Upload Excel</div>
        <div className="text-xs text-gray-500 mb-2">
          The system will auto-assign tasks to agents or telecallers based on location, language, availability, and performance metrics.
        </div>
        <div
          onClick={triggerFileUpload}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-[#B7C0D8] rounded-lg px-0 py-8 text-center cursor-pointer transition-colors hover:border-blue-400 relative mb-6"
        >
          <HiOutlineCloudUpload className="mx-auto text-4xl text-blue-400 mb-2" />
          <div className="font-medium text-gray-900">Drag and drop or browse to upload.</div>
          <div className="text-xs text-gray-500 mt-1">
            Supported file format: .xls, .xlsx
          </div>
          {selectedFile && (
            <div className="mt-2 text-xs text-blue-700 font-semibold">{selectedFile.name}</div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
        {/* Assignment Summary */}
        <div className="mt-6">
          <div className="font-semibold text-sm mb-1">Assignment Summary</div>
          <div className="text-xs text-gray-500">
            Here you’ll see a summary of the task assignment results based on your uploaded Excel and the AI’s allocation logic. (UI placeholder)
          </div>
          <button className="text-blue-600 text-xs mt-2 font-medium">Edit</button>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Upload
          </button>
        </div>
      </div>
    );
  } else if (selectedOption === 'create-manual') {
    modalContent = (
      <TaskCreationForm/>
    );
  } else {
    // Card selection UI
    modalContent = (
      <div className="flex gap-4 px-3">
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOptionClick(option.id)}
              className={`
                flex-1 flex flex-col justify-center items-center rounded-lg border transition-all duration-200 p-8
                cursor-pointer outline-none
                border-blue-500
                bg-white text-gray-900 hover:bg-blue-600 hover:text-white
                group
              `}
              style={{ minWidth: 250, minHeight: 220 }}
            >
              <IconComponent className="mb-6 text-4xl text-blue-600 group-hover:text-white" />
              <span className="font-semibold text-lg mb-2 text-center group-hover:text-white">{option.title}</span>
              <span className="text-sm text-center text-gray-500 group-hover:text-white/80">{option.description}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        selectedOption
          ? options.find((opt) => opt.id === selectedOption)?.title ?? 'Assign Task'
          : 'Assign Task'
      }
      size="xl"
      height="auto"
      backgroundColor="bg-white"
      showCloseButton={true}
      closeOnOverlayClick={true}
    >
      <div className="p-6">
        {modalContent}
      </div>
    </ReusableModal>
  );
};

export default TaskAssignmentModal;