import UserProfileDropdown from "./UserProfileDropdown";
import SearchBar from "../../common/Searchbar";
import NotificationDropdown from "./NotificationDropdown";
import type { Notification } from "./NotificationDropdown";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';

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
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user: propUser,
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
  const navigate = useNavigate(); 
  const dispatch = useAppDispatch();
  
  // Get user from Redux store
  const reduxUser = useAppSelector((state) => state.auth.user);
  
  // Use Redux user data if available, otherwise fall back to prop user or default
  const user = reduxUser ? {
    name: reduxUser.username,
    designation: reduxUser.role === 'global_admin' ? 'Global Admin' : 
                reduxUser.role === 'super_admin' ? 'Super Admin' : 'Supervisor',
    avatar: undefined
  } : propUser || {
    name: "Arjun Kannan",
    designation: "Supervisor",
    avatar: undefined
  }; 

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
      navigate('/profile');

    }
  };

  const handleSettingsClick = (): void => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      navigate('/settings');

    }
  };

  const handleLogoutClick = (): void => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      // Use Redux logout action to clear state and persist storage
      dispatch(logout());
      navigate('/auth/login');
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