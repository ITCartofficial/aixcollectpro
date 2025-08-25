import { createSelector } from '@reduxjs/toolkit';
import { getDisplayName, getDisplayDesignation } from '../../../utils/auth';
import type { RootState } from '../store';

// Basic user selectors
export const selectCurrentUser = (_state: RootState) => _state.user.currentUser;
export const selectIsAuthenticated = (_state: RootState) => _state.user.isAuthenticated;
export const selectUserLastUpdated = (_state: RootState) => _state.user.lastUpdated;

// Enhanced user selectors with display data (keep for other components)
export const selectUserDisplayData = createSelector(
  [selectCurrentUser],
  (user) => {
    if (!user) return null;
    
    return {
      name: user.name || getDisplayName(user),
      designation: user.designation || getDisplayDesignation(user.role),
      avatar: user.avatar,
      role: user.role,
      email: user.email,
      employeeId: user.employeeId,
      phoneNumber: user.phoneNumber,
      username: user.username,
      twoFactorType: user.twoFactorType,
      location: user.location,
      vendor: user.vendor,
      reportingManagerId: user.reportingManagerId,
      reportingManagerName: user.reportingManagerName,
      joinedOn: user.joinedOn,
      status: user.status,
      department: user.department,
      lastLogin: user.lastLogin,
    };
  }
);

// Selector specifically for UserDetails component props - returns exact required types
export const selectUserDetailsProps = createSelector(
  [selectCurrentUser],
  (user) => {
    if (!user) return null;

    // Reporting manager logic - N/A for global_admin and super_admin
    let reportingManager = "N/A";
    if (user.role !== "global_admin" && user.role !== "super_admin") {
      reportingManager = user.reportingManagerName || "N/A";
    }

    // Return object with all required string properties
    return {
      name: user.name || getDisplayName(user),
      phone: user.phoneNumber || "N/A",
      email: user.email || "N/A", 
      role: user.designation || getDisplayDesignation(user.role),
      employeeId: user.employeeId || "N/A",
      location: user.location || "N/A",
      vendor: user.vendor || "N/A",
      reportingManager: reportingManager,
      joinedOn: user.joinedOn || "N/A",
      status: (user.status || "Active") as "Active" | "Inactive",
      avatar: user.avatar || "",
    };
  }
);

// Profile-specific selectors (keep for Profile component)
export const selectUserProfileData = createSelector(
  [selectCurrentUser, selectUserDisplayData],
  (user, displayData) => {
    if (!user || !displayData) return null;
    
    // Parse full name into first and last name
    const nameParts = displayData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    return {
      firstName,
      lastName,
      email: user.email,
      avatar: user.avatar,
      employeeId: user.employeeId,
      username: user.username,
      role: user.role,
      designation: displayData.designation
    };
  }
);

// Role-based selectors (Keep these - they're useful for role checks)
export const selectUserRole = createSelector(
  [selectCurrentUser],
  (user) => user?.role || null
);

export const selectIsGlobalAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'global_admin'
);

export const selectIsSuperAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'super_admin'
);

export const selectIsSupervisor = createSelector(
  [selectUserRole],
  (role) => role === 'supervisor'
);

// User utility selectors (keep for other components)
export const selectUserInitials = createSelector(
  [selectUserDisplayData],
  (displayData) => {
    if (!displayData) return 'U';
    
    const nameParts = displayData.name.trim().split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${secondInitial}` || 'U';
  }
);

// User status selector (keep for other components)
export const selectUserStatus = createSelector(
  [selectCurrentUser, selectIsAuthenticated, selectUserLastUpdated],
  (user, isAuthenticated, lastUpdated) => {
    return {
      isLoggedIn: isAuthenticated && !!user,
      hasProfile: !!user,
      lastActiveTime: lastUpdated,
      sessionStatus: isAuthenticated ? 'active' : 'inactive'
    };
  }
);