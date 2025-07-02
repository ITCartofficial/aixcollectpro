import { useState } from "react";
import { AiOutlineBell, AiOutlineClose } from "react-icons/ai";

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAsRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onClearAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications = [],
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications);

  const unreadCount = localNotifications.filter(notification => !notification.isRead).length;

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification): void => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
      // Update local state
      setLocalNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
    }
  };

  const handleMarkAllAsRead = (): void => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
    // Update local state
    setLocalNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const handleClearAll = (): void => {
    if (onClearAll) {
      onClearAll();
    }
    // Update local state
    setLocalNotifications([]);
  };

  const getNotificationBgColor = (isRead: boolean) => {
    return isRead ? 'bg-neutral-50' : 'bg-neutral-200';
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative py-2 px-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
      >
        <div className="relative">
          <AiOutlineBell className="h-6 w-6" />
          {unreadCount > 0 && (
            <>
              {/* Red badge with count */}
              <span className="absolute -top-2 -right-1 h-[18px] w-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-[500px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Notification</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors duration-150 cursor-pointer"
            >
              <AiOutlineClose className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Actions */}
          {localNotifications.length > 0 && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50">
              <button
                onClick={handleMarkAllAsRead}
                className={`text-xs transition-colors duration-150 cursor-pointer ${
                  unreadCount === 0 
                    ? 'text-gray-400' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-800 transition-colors duration-150 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {localNotifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center relative">
                      <div className="w-4 h-4 bg-blue-300 rounded"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No New Notifications</h3>
                <p className="text-sm text-gray-500">You're all caught up. We'll notify you when there's something new.</p>
              </div>
            ) : (
              localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                    getNotificationBgColor(notification.isRead)
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1 relative">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <AiOutlineBell className="h-4 w-4 text-gray-500" />
                        {!notification.isRead && (
                          <div className="absolute top-0.25 -right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          notification.isRead ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${
                        notification.isRead ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
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

export default NotificationDropdown;