// import React, { useState } from 'react';
// import OtpVerification from "./OtpVerification";
// import homedashbord from "../../assets/homedashbord.png"; 
// import { dummyUsers } from '../../utils/auth';

// const Login: React.FC = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errors, setErrors] = useState<{ employeeId?: string; phoneNumber?: string }>({});
//   const [step, setStep] = useState<'login' | 'otp'>('login');


//   // Validation functions
//   const validateEmployeeId = (id: string) => {
//     const regex = /^SUP-\d{6}$/;
//     if (!id) return "Employee ID is required";
//     if (!regex.test(id)) return "Employee ID must be in format SUP-xxxxxx";
//     return "";
//   };

//   const validatePhoneNumber = (num: string) => {
//     const regex = /^(\+91[\s\-]?)?[6-9]\d{9}$/;
//     if (!num) return "Phone number is required";
//     if (!regex.test(num.replace(/\s+/g, ""))) return "Enter a valid Indian phone number";
//     return "";
//   };

//   // Handle login
//   const handleLogin = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();

//     const employeeIdError = validateEmployeeId(employeeId);
//     const phoneNumberError = validatePhoneNumber(phoneNumber);

//     setErrors({
//       employeeId: employeeIdError,
//       phoneNumber: phoneNumberError,
//     });

//     if (employeeIdError || phoneNumberError) return;

//     // Role-based check
//     const user = dummyUsers.find(
//       u => u.employeeId === employeeId && u.phoneNumber === phoneNumber
//     );
//     if (!user) {
//       setErrors({
//         employeeId: "",
//         phoneNumber: "Invalid credentials",
//       });
//       return;
//     }

//     setStep('otp');
//   };

//   // Allow only numbers, spaces, hyphens, and plus
//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const phoneRegex = /^[\d\s\-\+]*$/;
//     if (phoneRegex.test(value)) {
//       setPhoneNumber(value);
//     }
//   };

//   // Main render logic
//   if (step === 'otp') {
//     return (
//       <OtpVerification
//         onVerify={() => {
//           // You can add post-OTP logic here
//         }}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-[#f6f7fa]">
//       {/* Left Panel - Welcome Section */}
//       <div className="flex-1 flex flex-col justify-center items-center bg-blue-600 rounded-l-[12px] px-8 py-8">
//         <div className="flex flex-col items-center w-full">
//           <img
//             src={homedashbord}
//             alt="Dashboard"
//             className="w-full max-w-[420px] mb-8 rounded-lg shadow-lg bg-white"
//             style={{ objectFit: "contain" }}
//           />
//           <h1 className="text-3xl font-bold text-white mb-4 text-center drop-shadow">
//             Welcome Back to AiXCollectPro
//           </h1>
//           <p className="text-lg text-blue-100 text-center max-w-md">
//             Monitor your team, manage tasks, and drive recovery with real-time insights.
//           </p>
//         </div>
//       </div>

//       {/* Right Panel - Login Form */}
//       <div className="flex-1 bg-white flex flex-col justify-center items-center rounded-none p-12 relative">
//         <div className="w-full max-w-md mx-auto">
//           {/* Logo/Title */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2 text-left">AiXCollectPro</h2>
//           </div>
//           {/* Login Form */}
//           <div className="mb-8">
//             <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
//               Log in to AiXCollectPro
//             </h3>
//             <p className="text-gray-600 mb-8 text-left">
//               Get started by entering your Employee ID & Mobile Number to access the supervisor dashboard
//             </p>
//             <div className="space-y-6">
//               {/* Employee ID Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Employee ID
//                 </label>
//                 <input
//                   type="text"
//                   value={employeeId}
//                   onChange={e => setEmployeeId(e.target.value)}
//                   placeholder="SUP-112345"
//                   className={`w-full px-4 py-3 border ${errors.employeeId ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
//                   autoComplete="username"
//                 />
//                 {errors.employeeId && (
//                   <p className="mt-2 text-sm text-red-600">{errors.employeeId}</p>
//                 )}
//               </div>
//               {/* Phone Number Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone number
//                 </label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={handlePhoneChange}
//                   placeholder="+91 xxxxx xxx98"
//                   className={`w-full px-4 py-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
//                   autoComplete="current-password"
//                 />
//                 {errors.phoneNumber && (
//                   <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
//                 )}
//               </div>
//               {/* Remember Me */}
//               <div className="flex items-center mt-2">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   id="rememberMe"
//                   className="mr-2"
//                 />
//                 <label htmlFor="rememberMe" className="text-sm text-gray-700 select-none">Remember Me</label>
//               </div>
//               {/* Continue Button */}
//               <button
//                 onClick={handleLogin}
//                 className="w-full bg-[#1877F2] text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 Continue
//               </button>
//             </div>
//           </div>
//           {/* Footer */}
//           <div className="text-center text-sm text-gray-500 mt-10">
//             ©copyright 2025, AiXCollectPro - All Rights Reserved
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpVerification from "./OtpVerification";
import ConfirmEmailModal from "./ConfirmEmailModal";
import homedashbord from "../../assets/homedashbord.png";
import BackupEmailOTP from '../settings/features/BackupEmailOTP';
import AuthenticatorOtpModal from './AuthenticatorOTPModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  updateEmployeeId, 
  updatePhoneNumber, 
  updateRememberMe,
  setCurrentStep,
  confirmEmailContinue,
  clearErrors 
} from '../../store/slices/authSlice';
import { authSagaActions } from '../../store/sagas/authSaga';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux state
  const {
    currentStep,
    employeeId,
    phoneNumber,
    rememberMe,
    validationErrors,
    isLoggingIn,
    loginError,
    user,
    isAuthenticated
  } = useAppSelector((state) => state.auth);

  // Navigate to dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated && currentStep === "dashboard") {
      navigate("/");
    }
  }, [isAuthenticated, currentStep, navigate]);

  // Handle form input changes
  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmployeeId(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneRegex = /^[\d\s\-\+]*$/;
    if (phoneRegex.test(value)) {
      dispatch(updatePhoneNumber(value));
    }
  };

  const handleRememberMeChange = () => {
    dispatch(updateRememberMe(!rememberMe));
  };

  // Handle login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Clear any previous errors
    dispatch(clearErrors());
    
    // Dispatch login request to saga
    dispatch(authSagaActions.loginRequest({
      employeeId,
      phoneNumber,
      rememberMe
    }));
  };

  // Handle OTP verification step
  const handleOtpVerified = () => {
    // OTP verification logic is handled in the saga and slice
    // This is called when OTP verification is complete
  };

  // Handle Confirm Email modal continue
  const handleEmailConfirmContinue = () => {
    dispatch(confirmEmailContinue());
  };

  // Handle Backup Email OTP verification
  const handleEmailOtpVerified = () => {
    // Email OTP verification logic is handled in the saga and slice
  };

  // Handle Authenticator verification
  const handleAuthenticatorOtpVerified = () => {
    // Authenticator verification logic is handled in the saga and slice
  };

  // Handle modal close - return to login
  const handleModalClose = () => {
    dispatch(setCurrentStep("login"));
  };

  return (
    <>
      {currentStep === 'login' && (
        <div className="min-h-screen flex bg-[#f6f7fa]">
          {/* Left Panel - Welcome Section */}
          <div className="flex-1 flex flex-col justify-center items-center bg-blue-600 rounded-l-[12px] px-8 py-8">
            <div className="flex flex-col items-center w-full">
              <img
                src={homedashbord}
                alt="Dashboard"
                className="w-full max-w-[420px] mb-8 rounded-lg shadow-lg bg-white"
                style={{ objectFit: "contain" }}
              />
              <h1 className="text-3xl font-bold text-white mb-4 text-center drop-shadow">
                Welcome Back to AiXCollectPro
              </h1>
              <p className="text-lg text-blue-100 text-center max-w-md">
                Monitor your team, manage tasks, and drive recovery with real-time insights.
              </p>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 bg-white flex flex-col justify-center items-center rounded-none p-12 relative">
            <div className="w-full max-w-md mx-auto">
              {/* Logo/Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-left">AiXCollectPro</h2>
              </div>
              {/* Login Form */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2 text-left">
                  Log in to AiXCollectPro
                </h3>
                <p className="text-gray-600 mb-8 text-left">
                  Get started by entering your Employee ID & Mobile Number to access the supervisor dashboard
                </p>
                
                {/* Display login error if any */}
                {loginError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {loginError}
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Employee ID Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={handleEmployeeIdChange}
                      placeholder="SUP-112345"
                      className={`w-full px-4 py-3 border ${validationErrors.employeeId ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                      autoComplete="username"
                      disabled={isLoggingIn}
                    />
                    {validationErrors.employeeId && (
                      <p className="mt-2 text-sm text-red-600">{validationErrors.employeeId}</p>
                    )}
                  </div>
                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="+91 xxxxx xxx98"
                      className={`w-full px-4 py-3 border ${validationErrors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                      autoComplete="current-password"
                      disabled={isLoggingIn}
                    />
                    {validationErrors.phoneNumber && (
                      <p className="mt-2 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                    )}
                  </div>
                  {/* Remember Me */}
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                      id="rememberMe"
                      className="mr-2"
                      disabled={isLoggingIn}
                    />
                    <label htmlFor="rememberMe" className="text-sm text-gray-700 select-none">Remember Me</label>
                  </div>
                  {/* Continue Button */}
                  <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full bg-[#1877F2] text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? 'Signing in...' : 'Continue'}
                  </button>
                </div>
              </div>
              {/* Footer */}
              <div className="text-center text-sm text-gray-500 mt-10">
                ©copyright 2025, AiXCollectPro - All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'otp' && (
        <OtpVerification onVerify={handleOtpVerified} />
      )}

      {currentStep === 'confirmEmail' && (
        <ConfirmEmailModal
          isOpen={true}
          onClose={handleModalClose}
          email={user?.email || ""}
          onContinue={handleEmailConfirmContinue}
        />
      )}

      {currentStep === 'verifyEmailOtp' && (
        <BackupEmailOTP
          isOpen={true}
          onClose={handleModalClose}
          onVerify={handleEmailOtpVerified}
        />
      )}

      {currentStep === 'authenticator' && (
        <AuthenticatorOtpModal
          isOpen={true}
          onClose={handleModalClose}
          onVerify={handleAuthenticatorOtpVerified}
        />
      )}
    </>
  );
};

export default Login;
