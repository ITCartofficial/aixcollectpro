import React from 'react';
import { IoClose } from 'react-icons/io5';


interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
  backgroundColor?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  height = 'auto',
  backgroundColor = 'bg-white',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  headerClassName = '',
  contentClassName = '',
  overlayClassName = ''
}) => {
  // Size configurations
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  // Height configurations
  const heightClasses = {
    auto: 'max-h-[90vh]',
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-[32rem]',
    full: 'h-[90vh]'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${overlayClassName}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className={`
          ${backgroundColor} 
          rounded-lg 
          ${sizeClasses[size]} 
          ${heightClasses[height]} 
          w-full 
          ${height === 'auto' ? 'overflow-y-auto' : 'overflow-hidden'}
          shadow-xl
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${headerClassName}`}>
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto"
                aria-label="Close modal"
              >
                <IoClose className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`${height === 'auto' ? 'overflow-y-auto' : 'overflow-hidden h-full'} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;