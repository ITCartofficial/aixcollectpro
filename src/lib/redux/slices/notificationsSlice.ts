import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../../../utils/auth';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId?: string; // Link notifications to specific users
}

interface NotificationsState {
  notifications: Notification[];
}

// Generate user-specific notifications based on role
const generateNotificationsForUser = (user: User | null): Notification[] => {
  if (!user) return [];

  const baseNotifications: Notification[] = [];
  // const now = new Date().toLocaleString();

  // Role-specific notifications
  if (user.role === 'global_admin') {
    baseNotifications.push(
      {
        id: "ga-1",
        type: "info",
        title: "System Maintenance",
        message: "Scheduled maintenance window tonight from 2:00 AM - 4:00 AM.",
        timestamp: "Today, 9:00 AM",
        isRead: false,
        userId: user.employeeId
      },
      {
        id: "ga-2",
        type: "warning",
        title: "Security Alert",
        message: "Multiple failed login attempts detected from IP 192.168.1.100.",
        timestamp: "Today, 8:30 AM",
        isRead: false,
        userId: user.employeeId
      }
    );
  }

  if (user.role === 'super_admin') {
    baseNotifications.push(
      {
        id: "sa-1",
        type: "success",
        title: "Weekly Report",
        message: "Weekly performance report has been generated successfully.",
        timestamp: "Today, 10:00 AM",
        isRead: false,
        userId: user.employeeId
      },
      {
        id: "sa-2",
        type: "error",
        title: "Agent Alert",
        message: "Agent #1234 has exceeded maximum daily task limit.",
        timestamp: "Today, 9:45 AM",
        isRead: false,
        userId: user.employeeId
      }
    );
  }

  if (user.role === 'supervisor') {
    baseNotifications.push(
      {
        id: "s-1",
        type: "success",
        title: "Task Completed",
        message: `TASK-248712 successfully closed by Agent Rajeev - ₹5,340 collected.`,
        timestamp: "Today, 11:30 AM",
        isRead: false,
        userId: user.employeeId
      },
      {
        id: "s-2",
        type: "error",
        title: "Risk Alert",
        message: "Agent Ajay entered a geo-flagged red zone.",
        timestamp: "Today, 11:30 AM",
        isRead: false,
        userId: user.employeeId
      },
      {
        id: "s-3",
        type: "warning",
        title: "KYC Flag",
        message: "Aadhaar doc in TASK-248702 flagged - mismatch with PAN.",
        timestamp: "Today, 11:30 AM",
        isRead: false,
        userId: user.employeeId
      },
      {
        id: "s-4",
        type: "info",
        title: "Missed Check-In",
        message: "Agent Manoj missed check-in - alert sent for follow-up.",
        timestamp: "Today, 11:30 AM",
        isRead: true,
        userId: user.employeeId
      }
    );
  }

  return baseNotifications;
};

const initialState: NotificationsState = {
  notifications: [], // Will be populated when user is set
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    initializeNotifications: (state, action: PayloadAction<User | null>) => {
      state.notifications = generateNotificationsForUser(action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
    },
  },
});

export const { 
  initializeNotifications,
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications, 
  addNotification 
} = notificationsSlice.actions;
export default notificationsSlice.reducer;