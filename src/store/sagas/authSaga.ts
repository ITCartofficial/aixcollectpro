import { call, put, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  verifyEmailOtpStart,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  verifyAuthenticatorStart,
  verifyAuthenticatorSuccess,
  verifyAuthenticatorFailure,
  setValidationErrors,
} from '../slices/authSlice';
import { dummyUsers } from '../../utils/auth';

// Action types for saga
export const AUTH_SAGA_ACTIONS = {
  LOGIN_REQUEST: 'auth/loginRequest',
  VERIFY_OTP_REQUEST: 'auth/verifyOtpRequest',
  VERIFY_EMAIL_OTP_REQUEST: 'auth/verifyEmailOtpRequest',
  VERIFY_AUTHENTICATOR_REQUEST: 'auth/verifyAuthenticatorRequest',
} as const;

// Action creators for saga
export const authSagaActions = {
  loginRequest: (payload: { employeeId: string; phoneNumber: string; rememberMe: boolean }) => ({
    type: AUTH_SAGA_ACTIONS.LOGIN_REQUEST,
    payload,
  }),
  verifyOtpRequest: (payload: { otp: string }) => ({
    type: AUTH_SAGA_ACTIONS.VERIFY_OTP_REQUEST,
    payload,
  }),
  verifyEmailOtpRequest: (payload: { otp: string }) => ({
    type: AUTH_SAGA_ACTIONS.VERIFY_EMAIL_OTP_REQUEST,
    payload,
  }),
  verifyAuthenticatorRequest: (payload: { otp: string }) => ({
    type: AUTH_SAGA_ACTIONS.VERIFY_AUTHENTICATOR_REQUEST,
    payload,
  }),
};

// Validation functions (from original Login component)
const validateEmployeeId = (id: string): string => {
  const regex = /^SUP-\d{6}$/;
  if (!id) return "Employee ID is required";
  if (!regex.test(id)) return "Employee ID must be in format SUP-xxxxxx";
  return "";
};

const validatePhoneNumber = (num: string): string => {
  const cleanedNum = num.replace(/[\s-+()]/g, '');
  if (!cleanedNum) return "Phone number is required";
  
  // Check if it's 10 digits (without country code) or starts with country code
  if (!/^(\+91|91)?\d{10}$/.test(cleanedNum)) {
    return "Please enter a valid 10-digit phone number";
  }
  return "";
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Login saga
function* loginSaga(action: PayloadAction<{ employeeId: string; phoneNumber: string; rememberMe: boolean }>) {
  try {
    yield put(loginStart());
    
    const { employeeId, phoneNumber } = action.payload;
    
    // Validate inputs
    const employeeIdError = validateEmployeeId(employeeId);
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    
    if (employeeIdError || phoneNumberError) {
      yield put(setValidationErrors({
        employeeId: employeeIdError || undefined,
        phoneNumber: phoneNumberError || undefined,
      }));
      yield put(loginFailure('Please fix the validation errors'));
      return;
    }
    
    // Simulate API call delay
    yield call(delay, 1000);
    
    // Find user in dummy data
    const normalizePhoneNumber = (phone: string): string => {
      return phone.replace(/[\s-+()]/g, '').replace(/^91/, '');
    };
    
    const normalizedInputPhone = normalizePhoneNumber(phoneNumber);
    const currentUser = dummyUsers.find(user => 
      user.employeeId === employeeId && 
      normalizePhoneNumber(user.phoneNumber) === normalizedInputPhone
    );
    
    if (!currentUser) {
      yield put(loginFailure('Invalid credentials. Please check your Employee ID and phone number.'));
      return;
    }
    
    yield put(loginSuccess({ user: currentUser }));
    
  } catch (error) {
    yield put(loginFailure('An error occurred during login. Please try again.'));
  }
}

// Verify OTP saga
function* verifyOtpSaga(action: PayloadAction<{ otp: string }>) {
  try {
    yield put(verifyOtpStart());
    
    const { otp } = action.payload;
    
    if (otp.length !== 6) {
      yield put(verifyOtpFailure('Please enter a valid 6-digit OTP'));
      return;
    }
    
    // Simulate API call delay
    yield call(delay, 500);
    
    // In a real app, you would verify the OTP with the server
    // For now, we'll accept any 6-digit OTP
    yield put(verifyOtpSuccess());
    
  } catch (error) {
    yield put(verifyOtpFailure('An error occurred during OTP verification. Please try again.'));
  }
}

// Verify Email OTP saga
function* verifyEmailOtpSaga(action: PayloadAction<{ otp: string }>) {
  try {
    yield put(verifyEmailOtpStart());
    
    const { otp } = action.payload;
    
    if (otp.length !== 6) {
      yield put(verifyEmailOtpFailure('Please enter a valid 6-digit OTP'));
      return;
    }
    
    // Simulate API call delay
    yield call(delay, 500);
    
    // In a real app, you would verify the email OTP with the server
    yield put(verifyEmailOtpSuccess());
    
  } catch (error) {
    yield put(verifyEmailOtpFailure('An error occurred during email OTP verification. Please try again.'));
  }
}

// Verify Authenticator OTP saga
function* verifyAuthenticatorSaga(action: PayloadAction<{ otp: string }>) {
  try {
    yield put(verifyAuthenticatorStart());
    
    const { otp } = action.payload;
    
    if (otp.length !== 6) {
      yield put(verifyAuthenticatorFailure('Please enter a valid 6-digit OTP'));
      return;
    }
    
    // Simulate API call delay
    yield call(delay, 500);
    
    // In a real app, you would verify the authenticator OTP
    yield put(verifyAuthenticatorSuccess());
    
  } catch (error) {
    yield put(verifyAuthenticatorFailure('An error occurred during authenticator verification. Please try again.'));
  }
}

// Root auth saga
export function* authSaga() {
  yield takeEvery(AUTH_SAGA_ACTIONS.LOGIN_REQUEST, loginSaga);
  yield takeEvery(AUTH_SAGA_ACTIONS.VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeEvery(AUTH_SAGA_ACTIONS.VERIFY_EMAIL_OTP_REQUEST, verifyEmailOtpSaga);
  yield takeEvery(AUTH_SAGA_ACTIONS.VERIFY_AUTHENTICATOR_REQUEST, verifyAuthenticatorSaga);
}