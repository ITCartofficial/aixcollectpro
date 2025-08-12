import React, { useState, useRef } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';

interface UploadManualComponentProps {
  onBack: () => void;
}

const UploadManualComponent: React.FC<UploadManualComponentProps> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDownloadTemplate = () => {
    // Replace with real download logic
    alert('Download Excel template');
  };

  // Dummy upload handler
  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading file: ${selectedFile.name}`);
      // Place your real upload logic here
    }
  };

  return (
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
          onClick={onBack}
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
};

export default UploadManualComponent;