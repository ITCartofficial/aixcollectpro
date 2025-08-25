import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, getCurrentUser, } from '../../../utils/auth';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  lastUpdated: string | null;
}

// Initialize state from localStorage
const savedUser = getCurrentUser();
const initialState: UserState = {
  currentUser: savedUser,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  lastUpdated: savedUser ? new Date().toISOString() : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.lastUpdated = new Date().toISOString();
      // Sync with localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", "true");
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        state.lastUpdated = new Date().toISOString();
        // Sync with localStorage
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.avatar = action.payload;
        state.lastUpdated = new Date().toISOString();
        // Sync with localStorage
        localStorage.setItem("user", JSON.stringify(state.currentUser));
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.lastUpdated = null;
      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
    initializeUserFromStorage: (state) => {
      const savedUser = getCurrentUser();
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      
      state.currentUser = savedUser;
      state.isAuthenticated = isAuth;
      if (savedUser) {
        state.lastUpdated = new Date().toISOString();
      }
    },
  },
});

export const { 
  setUser, 
  updateUserProfile, 
  updateUserAvatar, 
  logoutUser,
  initializeUserFromStorage 
} = userSlice.actions;
export default userSlice.reducer;
















