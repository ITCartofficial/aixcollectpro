// import { AiOutlineBell } from "react-icons/ai";
// import UserProfileDropdown from "./UserProfileDropdown";
// import SearchBar from "../../common/Searchbar";

// // export default Header

// interface User {
//   name: string;
//   designation: string;
//   avatar?: string;
// }

// interface HeaderProps {
//   user?: User;
//   notificationCount?: number;
//   onSearch?: (query: string) => void;
//   onNotificationClick?: () => void;
//   onProfileClick?: () => void;
//   onSettingsClick?: () => void;
//   onLogoutClick?: () => void;
// }

// const Header: React.FC<HeaderProps> = ({
//   user = {
//     name: "Arjun Kannan",
//     designation: "Supervisor",
//     avatar: undefined
//   },
//   notificationCount = 3,
//   onSearch,
//   onNotificationClick,
//   onProfileClick,
//   onSettingsClick,
//   onLogoutClick
// }) => {
//   // Handler functions with default implementations
//   const handleSearch = (query: string): void => {
//     if (onSearch) {
//       onSearch(query);
//     } else {
//       console.log('Searching for:', query);
//     }
//   };

//   const handleNotificationClick = (): void => {
//     if (onNotificationClick) {
//       onNotificationClick();
//     } else {
//       console.log('Notifications clicked');
//     }
//   };

//   const handleProfileClick = (): void => {
//     if (onProfileClick) {
//       onProfileClick();
//     } else {
//       console.log('Profile clicked');
//     }
//   };

//   const handleSettingsClick = (): void => {
//     if (onSettingsClick) {
//       onSettingsClick();
//     } else {
//       console.log('Settings clicked');
//     }
//   };

//   const handleLogoutClick = (): void => {
//     if (onLogoutClick) {
//       onLogoutClick();
//     } else {
//       console.log('Logout clicked');
//     }
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-2 rounded-lg mr-3">
//       <div className="flex items-center justify-between">
//         {/* Left side - Search Bar */}
//         <div className="flex-1 max-w-md">
//           <SearchBar
//             placeholder="Search..."
//             onSearch={handleSearch}
//             className="w-full"
//           />
//         </div>

//         {/* Right side - Notifications and User Profile */}
//         <div className="flex items-center space-x-4">
//           {/* Notification Icon */}
//           <button
//             onClick={handleNotificationClick}
//             className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
//           >
//             <AiOutlineBell className="h-5 w-5" />
//             {notificationCount > 0 && (
//               <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
//                 {notificationCount > 9 ? '9+' : notificationCount}
//               </span>
//             )}
//           </button>

//           {/* User Profile Dropdown */}
//           <UserProfileDropdown
//             user={user}
//             onProfileClick={handleProfileClick}
//             onSettingsClick={handleSettingsClick}
//             onLogoutClick={handleLogoutClick}
//           />
//         </div>
//       </div>
//     </header>
//   );
// };

// // Export individual components for reuse
// export default Header;










import UserProfileDropdown from "./UserProfileDropdown";
import SearchBar from "../../common/Searchbar";
import NotificationDropdown from "./NotificationDropdown";
import type { Notification } from "./NotificationDropdown";

interface User {
  name: string;
  designation: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  notifications?: Notification[];
  onSearch?: (query: string) => void;
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAllNotifications?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user = {
    name: "Arjun Kannan",
    designation: "Supervisor",
    avatar: undefined
  },
  notifications = [
    {
      id: "1",
      type: "success",
      title: "Task Completed",
      message: "TASK-248712 successfully closed by Agent Rajeev - ₹5,340 collected.",
      timestamp: "Today, 11:30 AM",
      isRead: false
    },
    {
      id: "2",
      type: "error",
      title: "Risk Alert",
      message: "Agent Ajay entered a geo-flagged red zone.",
      timestamp: "Today, 11:30 AM",
      isRead: false
    },
    {
      id: "3",
      type: "warning",
      title: "KYC Flag",
      message: "Aadhaar doc in TASK-248702 flagged - mismatch with PAN.",
      timestamp: "Today, 11:30 AM",
      isRead: false
    },
    {
      id: "4",
      type: "info",
      title: "Missed Check-In",
      message: "Agent Manoj missed check-in - alert sent for follow-up.",
      timestamp: "Today, 11:30 AM",
      isRead: true
    },
    {
      id: "5",
      type: "info",
      title: "Missed Check-In",
      message: "Agent Manoj missed check-in - alert sent for follow-up.",
      timestamp: "Today, 11:30 AM",
      isRead: true
    },
    {
      id: "6",
      type: "info",
      title: "Missed Check-In",
      message: "Agent Manoj missed check-in - alert sent for follow-up.",
      timestamp: "Today, 11:30 AM",
      isRead: true
    },
  ],
  onSearch,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAllNotifications,
  onProfileClick,
  onSettingsClick,
  onLogoutClick
}) => {
  // Handler functions with default implementations
  const handleSearch = (query: string): void => {
    if (onSearch) {
      onSearch(query);
    } else {
      console.log('Searching for:', query);
    }
  };

  const handleNotificationClick = (notification: Notification): void => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    } else {
      console.log('Notification clicked:', notification);
    }
  };

  const handleMarkAsRead = (notificationId: string): void => {
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    } else {
      console.log('Mark as read:', notificationId);
    }
  };

  const handleMarkAllAsRead = (): void => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    } else {
      console.log('Mark all as read');
    }
  };

  const handleClearAllNotifications = (): void => {
    if (onClearAllNotifications) {
      onClearAllNotifications();
    } else {
      console.log('Clear all notifications');
    }
  };

  const handleProfileClick = (): void => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      console.log('Profile clicked');
    }
  };

  const handleSettingsClick = (): void => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      console.log('Settings clicked');
    }
  };

  const handleLogoutClick = (): void => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      console.log('Logout clicked');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2 rounded-lg mr-5">
      <div className="flex items-center justify-between">
        {/* Left side - Search Bar */}
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search..."
            onSearch={handleSearch}
            className="w-full"
          />
        </div>

        {/* Right side - Notifications and User Profile */}
        <div className="flex items-center space-x-3">
          {/* Notification Dropdown */}
          <NotificationDropdown
            notifications={notifications}
            onNotificationClick={handleNotificationClick}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAllNotifications}
          />

          {/* User Profile Dropdown */}
          <UserProfileDropdown
            user={user}
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;