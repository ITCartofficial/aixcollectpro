import React, { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Extend props to support textarea
interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label = "Label",
  placeholder = "Enter text...",
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  error = "",
  helperText = "",
  className = "",
  multiline = false,
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Common styles for input/textarea
  const inputStyles = `
    w-full px-3 py-2 border rounded-md text-sm
    transition-colors duration-200 ease-in-out
    placeholder-gray-400
    ${isFocused 
      ? 'border-blue-500 ring-1 ring-blue-500' 
      : error 
        ? 'border-red-500' 
        : 'border-gray-300'
    }
    ${disabled 
      ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
      : 'bg-white text-gray-900 hover:border-gray-400'
    }
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
  `;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={inputStyles}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => void}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={inputStyles}
            {...props}
          />
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;