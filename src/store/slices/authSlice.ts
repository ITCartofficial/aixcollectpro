import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../utils/auth';

export type AuthStep = 
  | "login"
  | "otp" 
  | "confirmEmail"
  | "verifyEmailOtp"
  | "authenticator"
  | "dashboard";

export interface AuthState {
  // Authentication status
  isAuthenticated: boolean;
  
  // Current user
  user: User | null;
  
  // Current authentication step
  currentStep: AuthStep;
  
  // Loading states
  isLoading: boolean;
  isLoggingIn: boolean;
  isVerifyingOtp: boolean;
  isVerifyingEmailOtp: boolean;
  isVerifyingAuthenticator: boolean;
  
  // Form data
  employeeId: string;
  phoneNumber: string;
  rememberMe: boolean;
  
  // Error states
  error: string | null;
  loginError: string | null;
  otpError: string | null;
  emailOtpError: string | null;
  authenticatorError: string | null;
  
  // Validation errors
  validationErrors: {
    employeeId?: string;
    phoneNumber?: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  currentStep: "login",
  isLoading: false,
  isLoggingIn: false,
  isVerifyingOtp: false,
  isVerifyingEmailOtp: false,
  isVerifyingAuthenticator: false,
  employeeId: '',
  phoneNumber: '',
  rememberMe: false,
  error: null,
  loginError: null,
  otpError: null,
  emailOtpError: null,
  authenticatorError: null,
  validationErrors: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoggingIn = true;
      state.loginError = null;
      state.validationErrors = {};
    },
    loginSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.isLoggingIn = false;
      state.user = action.payload.user;
      state.currentStep = "otp";
      state.loginError = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggingIn = false;
      state.loginError = action.payload;
    },
    
    // OTP verification actions
    verifyOtpStart: (state) => {
      state.isVerifyingOtp = true;
      state.otpError = null;
    },
    verifyOtpSuccess: (state) => {
      state.isVerifyingOtp = false;
      const tfaType = state.user?.twoFactorType || "none";
      
      if (tfaType === "none") {
        state.isAuthenticated = true;
        state.currentStep = "dashboard";
      } else if (tfaType === "email") {
        state.currentStep = "confirmEmail";
      } else if (tfaType === "authenticator") {
        state.currentStep = "authenticator";
      }
      state.otpError = null;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.isVerifyingOtp = false;
      state.otpError = action.payload;
    },
    
    // Email confirmation actions
    confirmEmailContinue: (state) => {
      state.currentStep = "verifyEmailOtp";
    },
    
    // Email OTP verification actions
    verifyEmailOtpStart: (state) => {
      state.isVerifyingEmailOtp = true;
      state.emailOtpError = null;
    },
    verifyEmailOtpSuccess: (state) => {
      state.isVerifyingEmailOtp = false;
      state.isAuthenticated = true;
      state.currentStep = "dashboard";
      state.emailOtpError = null;
    },
    verifyEmailOtpFailure: (state, action: PayloadAction<string>) => {
      state.isVerifyingEmailOtp = false;
      state.emailOtpError = action.payload;
    },
    
    // Authenticator OTP verification actions
    verifyAuthenticatorStart: (state) => {
      state.isVerifyingAuthenticator = true;
      state.authenticatorError = null;
    },
    verifyAuthenticatorSuccess: (state) => {
      state.isVerifyingAuthenticator = false;
      state.isAuthenticated = true;
      state.currentStep = "dashboard";
      state.authenticatorError = null;
    },
    verifyAuthenticatorFailure: (state, action: PayloadAction<string>) => {
      state.isVerifyingAuthenticator = false;
      state.authenticatorError = action.payload;
    },
    
    // Form updates
    updateEmployeeId: (state, action: PayloadAction<string>) => {
      state.employeeId = action.payload;
      // Clear validation error when user starts typing
      if (state.validationErrors.employeeId) {
        state.validationErrors = {
          ...state.validationErrors,
          employeeId: undefined,
        };
      }
    },
    updatePhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      // Clear validation error when user starts typing
      if (state.validationErrors.phoneNumber) {
        state.validationErrors = {
          ...state.validationErrors,
          phoneNumber: undefined,
        };
      }
    },
    updateRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    
    // Validation
    setValidationErrors: (state, action: PayloadAction<{ employeeId?: string; phoneNumber?: string }>) => {
      state.validationErrors = action.payload;
    },
    
    // Navigation
    setCurrentStep: (state, action: PayloadAction<AuthStep>) => {
      state.currentStep = action.payload;
    },
    
    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.currentStep = "login";
      state.employeeId = '';
      state.phoneNumber = '';
      state.rememberMe = false;
      state.error = null;
      state.loginError = null;
      state.otpError = null;
      state.emailOtpError = null;
      state.authenticatorError = null;
      state.validationErrors = {};
      state.isLoading = false;
      state.isLoggingIn = false;
      state.isVerifyingOtp = false;
      state.isVerifyingEmailOtp = false;
      state.isVerifyingAuthenticator = false;
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.loginError = null;
      state.otpError = null;
      state.emailOtpError = null;
      state.authenticatorError = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  confirmEmailContinue,
  verifyEmailOtpStart,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  verifyAuthenticatorStart,
  verifyAuthenticatorSuccess,
  verifyAuthenticatorFailure,
  updateEmployeeId,
  updatePhoneNumber,
  updateRememberMe,
  setValidationErrors,
  setCurrentStep,
  logout,
  clearErrors,
} = authSlice.actions;

export default authSlice.reducer;