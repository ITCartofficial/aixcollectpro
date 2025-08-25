// import { useState } from "react";
// import { AiOutlineDown, AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";

// interface User {
//     name: string;
//     designation: string;
//     avatar?: string;
// }

// interface UserProfileDropdownProps {
//     user: User;
//     onProfileClick?: () => void;
//     onSettingsClick?: () => void;
//     onLogoutClick?: () => void;
// }

// const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
//     user,
//     onProfileClick,
//     onSettingsClick,
//     onLogoutClick
// }) => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     const toggleDropdown = (): void => {
//         setIsOpen(!isOpen);
//     };

//     const handleItemClick = (action?: () => void): void => {
//         setIsOpen(false);
//         if (action) action();
//     };

//     return (
//         <div className="relative">
//             <button
//                 onClick={toggleDropdown}
//                 className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
//                 <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
//                     {user.avatar ? (
//                         <img
//                             src={user.avatar}
//                             alt={user.name}
//                             className="w-full h-full object-cover"
//                         />
//                     ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-medium">
//                             {(() => {
//                                 const nameParts = user.name.trim().split(' ');
//                                 const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
//                                 const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
//                                 return `${firstInitial}${secondInitial}`;
//                             })()}
//                         </div>
//                     )}
//                 </div>
//                 <div className="hidden md:block text-left">
//                     <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                     <div className="text-xs text-gray-500">{user.designation}</div>
//                 </div>
//                 <AiOutlineDown
//                     className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
//                         }`}
//                 />
//             </button>

//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                     {/* User Info Section */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                         <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
//                                 {user.avatar ? (
//                                     <img
//                                         src={user.avatar}
//                                         alt={user.name}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium">
//                                         {(() => {
//                                             const nameParts = user.name.trim().split(' ');
//                                             const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
//                                             const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
//                                             return `${firstInitial}${secondInitial}`;
//                                         })()}
//                                     </div>
//                                 )}
//                             </div>
//                             <div>
//                                 <div className="font-medium text-gray-900">{user.name}</div>
//                                 <div className="text-sm text-gray-500">{user.designation}</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                         <button
//                             onClick={() => handleItemClick(onProfileClick)}
//                             className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//                         >
//                             <AiOutlineUser className="h-4 w-4 mr-3 text-gray-400" />
//                             Profile
//                         </button>
//                         <button
//                             onClick={() => handleItemClick(onSettingsClick)}
//                             className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//                         >
//                             <AiOutlineSetting className="h-4 w-4 mr-3 text-gray-400" />
//                             Setting
//                         </button>
//                         <button
//                             onClick={() => handleItemClick(onLogoutClick)}
//                             className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
//                         >
//                             <AiOutlineLogout className="h-4 w-4 mr-3 text-red-500" />
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Backdrop to close dropdown when clicking outside */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 z-40"
//                     onClick={() => setIsOpen(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default UserProfileDropdown;
















import { useState } from "react";
import { AiOutlineDown, AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { useAppSelector } from '../../../lib/redux/reduxHooks';
import { selectUserDisplayData } from "../../../lib/redux/selectors";
import { RiCustomerServiceFill } from "react-icons/ri";



interface UserProfileDropdownProps {
    onProfileClick?: () => void;
    onSupportClick?:() => void;
    onSettingsClick?: () => void;
    onLogoutClick?: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
    onProfileClick,
    onSettingsClick,
    onSupportClick,
    onLogoutClick
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const userDisplayData = useAppSelector(selectUserDisplayData);

    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (action?: () => void): void => {
        setIsOpen(false);
        if (action) action();
    };

    if (!userDisplayData) {
        return null;
    }

    const getInitials = (name: string): string => {
        const nameParts = name.trim().split(' ');
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
        const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
        return `${firstInitial}${secondInitial}`;
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    {userDisplayData.avatar ? (
                        <img
                            src={userDisplayData.avatar}
                            alt={userDisplayData.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-medium">
                            {getInitials(userDisplayData.name)}
                        </div>
                    )}
                </div>
                <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">{userDisplayData.name}</div>
                    <div className="text-xs text-gray-500">{userDisplayData.designation}</div>
                </div>
                <AiOutlineDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                {userDisplayData.avatar ? (
                                    <img
                                        src={userDisplayData.avatar}
                                        alt={userDisplayData.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium">
                                        {getInitials(userDisplayData.name)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{userDisplayData.name}</div>
                                <div className="text-sm text-gray-500">{userDisplayData.designation}</div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            onClick={() => handleItemClick(onProfileClick)}
                            className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <AiOutlineUser className="h-4 w-4 mr-3 text-gray-400" />
                            Edit Profile
                        </button>
                        <button
                            onClick={() => handleItemClick(onSupportClick)}
                            className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <RiCustomerServiceFill className="h-4 w-4 mr-3 text-gray-400" />
                            Help & Support
                        </button>
                        <button
                            onClick={() => handleItemClick(onSettingsClick)}
                            className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            <AiOutlineSetting className="h-4 w-4 mr-3 text-gray-400" />
                            Settings
                        </button>
                        <button
                            onClick={() => handleItemClick(onLogoutClick)}
                            className="w-full flex items-center px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                            <AiOutlineLogout className="h-4 w-4 mr-3 text-red-500" />
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Backdrop to close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default UserProfileDropdown;