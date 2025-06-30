import { AiOutlineBell } from "react-icons/ai";
import UserProfileDropdown from "./UserProfileDropdown";
import SearchBar from "../../common/Searchbar";

// export default Header

interface User {
  name: string;
  designation: string;
  avatar?: string;
}

interface HeaderProps {
  user?: User;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
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
  notificationCount = 3,
  onSearch,
  onNotificationClick,
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

  const handleNotificationClick = (): void => {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      console.log('Notifications clicked');
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
    <header className="bg-white border-b border-gray-200 px-6 py-2 rounded-lg mr-3">
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
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <AiOutlineBell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

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

// Export individual components for reuse
export default Header;