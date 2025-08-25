import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Basic notification selectors
export const selectNotifications = (_state: RootState) => _state.notifications.notifications;

// Unread notifications selectors
export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => !notification.isRead)
);

export const selectUnreadCount = createSelector(
  [selectUnreadNotifications],
  (unreadNotifications) => unreadNotifications.length
);

// Read notifications selector
export const selectReadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.isRead)
);

// Notifications by type selectors
export const selectNotificationsByType = createSelector(
  [selectNotifications, (_state: RootState, type: string) => type],
  (notifications, type) => notifications.filter(notification => notification.type === type)
);

export const selectSuccessNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'success')
);

export const selectErrorNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'error')
);

export const selectWarningNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'warning')
);

export const selectInfoNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => notification.type === 'info')
);

// High priority notifications
export const selectHighPriorityNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter(notification => 
    notification.type === 'error' || notification.type === 'warning'
  )
);

export const selectHasUnreadHighPriority = createSelector(
  [selectUnreadNotifications],
  (unreadNotifications) => 
    unreadNotifications.some(notification => 
      notification.type === 'error' || notification.type === 'warning'
    )
);

// Recent notifications
export const selectRecentNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.slice(0, 5)
);

// Latest notification
export const selectLatestNotification = createSelector(
  [selectNotifications],
  (notifications) => {
    if (notifications.length === 0) return null;
    return notifications[0];
  }
);

// Notification statistics
export const selectNotificationStats = createSelector(
  [selectNotifications, selectUnreadNotifications],
  (allNotifications, unreadNotifications) => {
    const stats = {
      total: allNotifications.length,
      unread: unreadNotifications.length,
      read: allNotifications.length - unreadNotifications.length,
      byType: {
        success: 0,
        error: 0,
        warning: 0,
        info: 0
      }
    };

    allNotifications.forEach(notification => {
      stats.byType[notification.type]++;
    });

    return stats;
  }
);

// Unread count by type
export const selectUnreadCountByType = createSelector(
  [selectUnreadNotifications],
  (unreadNotifications) => {
    const countByType = {
      success: 0,
      error: 0,
      warning: 0,
      info: 0
    };

    unreadNotifications.forEach(notification => {
      countByType[notification.type]++;
    });

    return countByType;
  }
);

// Check if there are notifications
export const selectHasNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.length > 0
);

// Check if there are unread notifications
export const selectHasUnreadNotifications = createSelector(
  [selectUnreadCount],
  (unreadCount) => unreadCount > 0
);