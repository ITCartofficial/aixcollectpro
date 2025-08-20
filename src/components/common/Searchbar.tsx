// import React, { useState } from 'react';
// import { AiOutlineSearch} from 'react-icons/ai';





// interface SearchBarProps {
//   placeholder?: string;
//   onSearch?: (query: string) => void;
//   className?: string;
// }


// // Reusable Search Component
// const SearchBar: React.FC<SearchBarProps> = ({ 
//   placeholder = "Search...", 
//   onSearch, 
//   className = "" 
// }) => {
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     if (onSearch) {
//       onSearch(value);
//     }
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         <AiOutlineSearch className="h-4 w-4 text-gray-400" />
//       </div>
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={searchQuery}
//         onChange={handleSearch}
//         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
//       />
//     </div>
//   );
// };

// export default SearchBar;








import { useState } from "react";
import { FaSearch } from "react-icons/fa";


// SearchBar Component
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  onSearch, 
  className = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <FaSearch className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-neutral-50 text-sm"
      />
    </div>
  );
};
export default SearchBar;