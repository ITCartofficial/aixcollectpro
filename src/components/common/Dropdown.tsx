// import { useState, useEffect, useRef } from 'react';
// import { FaChevronDown, FaSearch } from 'react-icons/fa';

// interface DropdownOption {
//   label: string;
//   value: string;
// }

// interface DropdownProps {
//   options: DropdownOption[];
//   value?: string | string[];
//   onChange: (value: string | string[]) => void;
//   placeholder?: string;
//   searchable?: boolean;
//   multiSelect?: boolean;
//   className?: string;
//   disabled?: boolean;
// }

// const Dropdown: React.FC<DropdownProps> = ({
//   options,
//   value,
//   onChange,
//   placeholder = "Select...",
//   searchable = false,
//   multiSelect = false,
//   className = "",
//   disabled = false
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   // Prepare sorted options: "All" first, then selected, then unselected (all matching search)
//   let sortedOptions: DropdownOption[] = [];

//   if (multiSelect) {
//     const selectedValues = Array.isArray(value) ? value : [];
//     // "All" option
//     const allOption = options.find(opt => opt.value === "");
//     // Selected (except "") and unselected (except "") matching search
//     const selectedOptions = options.filter(opt =>
//       opt.value !== "" &&
//       selectedValues.includes(opt.value) &&
//       opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     const unselectedOptions = options.filter(opt =>
//       opt.value !== "" &&
//       !selectedValues.includes(opt.value) &&
//       opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     sortedOptions = [
//       ...(allOption ? [allOption] : []),
//       ...selectedOptions,
//       ...unselectedOptions,
//     ];
//   } else {
//     sortedOptions = options.filter(opt =>
//       opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   const getDisplayText = () => {
//     if (multiSelect) {
//       const selectedValues = Array.isArray(value) ? value : [];
//       if (selectedValues.length === 0 || (selectedValues.length === 1 && selectedValues[0] === "")) return placeholder;
//       if (selectedValues.length === 1) {
//         const option = options.find(opt => opt.value === selectedValues[0]);
//         return option?.label || placeholder;
//       }
//       return `${selectedValues.length} filter applied`;
//     } else {
//       if (!value || (Array.isArray(value) && value.length === 0)) return placeholder;
//       const selectedValue = Array.isArray(value) ? value[0] : value;
//       const option = options.find(opt => opt.value === selectedValue);
//       return option?.label || placeholder;
//     }
//   };

//   const handleSelect = (optionValue: string) => {
//     if (multiSelect) {
//       let currentValues = Array.isArray(value) ? value : [];
//       if (optionValue === "") {
//         onChange([""]);
//         return;
//       }
//       if (currentValues.includes(optionValue)) {
//         currentValues = currentValues.filter(v => v !== optionValue);
//       } else {
//         currentValues = currentValues.filter(v => v !== "");
//         currentValues = [...currentValues, optionValue];
//       }
//       if (currentValues.length === 0) {
//         onChange([""]);
//       } else {
//         onChange(currentValues);
//       }
//     } else {
//       onChange(optionValue);
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div ref={dropdownRef} className={`relative ${className}`}>
//       <button
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         disabled={disabled}
//         className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//           disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//         }`}
//       >
//         <span className={`${getDisplayText() === placeholder ? 'text-gray-400' : 'text-gray-900'}`}>
//           {getDisplayText()}
//         </span>
//         <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
//       </button>

//       {isOpen && (
//         <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
//           {searchable && (
//             <div className="p-2 border-b border-gray-200">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search..."
//                   className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="max-h-40 overflow-y-auto">
//             {sortedOptions.length === 0 ? (
//               <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
//             ) : (
//               sortedOptions.map((option) => (
//                 <div
//                   key={option.value}
//                   onClick={() => handleSelect(option.value)}
//                   className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
//                     multiSelect
//                       ? (Array.isArray(value) && value.includes(option.value)) ? 'bg-blue-50' : ''
//                       : (value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700')
//                   }`}
//                 >
//                   {multiSelect && (
//                     <input
//                       type="checkbox"
//                       checked={Array.isArray(value) && value.includes(option.value)}
//                       readOnly
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
//                     />
//                   )}
//                   <span>{option.label}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;








// Dropdown component with label 
import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaSearch } from 'react-icons/fa';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  required?: boolean;
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  required = false,
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchable = false,
  multiSelect = false,
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Prepare sorted options: "All" first, then selected, then unselected (all matching search)
  let sortedOptions: DropdownOption[] = [];

  if (multiSelect) {
    const selectedValues = Array.isArray(value) ? value : [];
    // "All" option
    const allOption = options.find(opt => opt.value === "");
    // Selected (except "") and unselected (except "") matching search
    const selectedOptions = options.filter(opt =>
      opt.value !== "" &&
      selectedValues.includes(opt.value) &&
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const unselectedOptions = options.filter(opt =>
      opt.value !== "" &&
      !selectedValues.includes(opt.value) &&
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    sortedOptions = [
      ...(allOption ? [allOption] : []),
      ...selectedOptions,
      ...unselectedOptions,
    ];
  } else {
    sortedOptions = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getDisplayText = () => {
    if (multiSelect) {
      const selectedValues = Array.isArray(value) ? value : [];
      if (selectedValues.length === 0 || (selectedValues.length === 1 && selectedValues[0] === "")) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length} filter applied`;
    } else {
      if (!value || (Array.isArray(value) && value.length === 0)) return placeholder;
      const selectedValue = Array.isArray(value) ? value[0] : value;
      const option = options.find(opt => opt.value === selectedValue);
      return option?.label || placeholder;
    }
  };

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      let currentValues = Array.isArray(value) ? value : [];
      if (optionValue === "") {
        onChange([""]);
        return;
      }
      if (currentValues.includes(optionValue)) {
        currentValues = currentValues.filter(v => v !== optionValue);
      } else {
        currentValues = currentValues.filter(v => v !== "");
        currentValues = [...currentValues, optionValue];
      }
      if (currentValues.length === 0) {
        onChange([""]);
      } else {
        onChange(currentValues);
      }
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Label block added here. No style changes to dropdown itself! */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className={`${getDisplayText() === placeholder ? 'text-gray-400' : 'text-gray-900'}`}>
          {getDisplayText()}
        </span>
        <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="max-h-40 overflow-y-auto">
            {sortedOptions.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              sortedOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    multiSelect
                      ? (Array.isArray(value) && value.includes(option.value)) ? 'bg-blue-50' : ''
                      : (value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700')
                  }`}
                >
                  {multiSelect && (
                    <input
                      type="checkbox"
                      checked={Array.isArray(value) && value.includes(option.value)}
                      readOnly
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;