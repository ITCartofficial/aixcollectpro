import React, { useState, useRef } from 'react';
import ReusableModal from '../../../components/ui/Modal/ReusableModal';
import { FaEdit, FaUpload } from 'react-icons/fa';
import { FaBots } from 'react-icons/fa6';

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
  hasFileUpload: boolean;
}

const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState<OptionType>('upload-manual');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const options: Option[] = [
    {
      id: 'upload-manual',
      title: 'Upload Excel & Assign Manually',
      description: 'Upload an Excel file and manually allocate tasks to agents',
      icon: FaUpload,
      hasFileUpload: true
    },
    {
      id: 'create-manual',
      title: 'Create Task Manually',
      description: 'Enter all task details individually (for small or urgent cases)',
      icon: FaEdit,
      hasFileUpload: false
    },
    {
      id: 'upload-ai',
      title: 'Upload Excel & Auto-Assign (AI)',
      description: 'Upload file and let the system assign based on agent geo + performance data',
      icon: FaBots,
      hasFileUpload: true
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleOptionClick = (optionId: OptionType) => {
    setSelectedOption(optionId);
    setSelectedFile(null);
  };

  const handleContinue = () => {
    console.log('Selected option:', selectedOption);
    if (selectedFile) {
      console.log('Selected file:', selectedFile.name);
    }
    onClose();
  };

  const modalContent = (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.id} className="relative">
              <div
                onClick={() => handleOptionClick(option.id)}
                className={`
                  p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 h-full
                  ${selectedOption === option.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className={`
                  w-16 h-16 rounded-lg flex items-center justify-center mb-4
                  ${selectedOption === option.id 
                    ? 'bg-blue-500' 
                    : 'bg-gray-100'
                  }
                `}>
                  <IconComponent 
                    className={`w-8 h-8 ${selectedOption === option.id ? 'text-white' : 'text-gray-700'}`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* File Upload Section */}
      {options.find(opt => opt.id === selectedOption)?.hasFileUpload && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Excel File
          </label>
          <div 
            onClick={triggerFileUpload}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            <FaUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {selectedFile ? selectedFile.name : 'Click to upload Excel file or drag and drop'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports .xlsx, .xls files
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          disabled={options.find(opt => opt.id === selectedOption)?.hasFileUpload && !selectedFile}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign Task"
      size="xl"
      height="auto"
      backgroundColor="bg-white"
      showCloseButton={true}
      closeOnOverlayClick={true}
    >
      {modalContent}
    </ReusableModal>
  );
};

export default TaskAssignmentModal;