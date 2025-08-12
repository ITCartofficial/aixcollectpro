import React, { useState } from 'react';
import OtpVerification from "../auth/OtpVerification";
// import AuthenticatorOTPModal from './AddReuseableModel'; // <-- Import your modal wrapper for Authentication
import homedashbord from "../../assets/homedashbord.png"; // <-- Import your image

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ employeeId?: string; phoneNumber?: string }>({});
  const [step, setStep] = useState<'login' | 'otp'>('login');
  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   typeof window !== "undefined" && localStorage.getItem('isAuthenticated') === 'true'
  // );

  // Validation functions
  const validateEmployeeId = (id: string) => {
    const regex = /^SUP-\d{6}$/;
    if (!id) return "Employee ID is required";
    if (!regex.test(id)) return "Employee ID must be in format SUP-xxxxxx";
    return "";
  };

  const validatePhoneNumber = (num: string) => {
    const regex = /^(\+91[\s\-]?)?[6-9]\d{9}$/;
    if (!num) return "Phone number is required";
    if (!regex.test(num.replace(/\s+/g, ""))) return "Enter a valid Indian phone number";
    return "";
  };

  // Handle login
  const handleLogin = () => {
    const employeeIdError = validateEmployeeId(employeeId);
    const phoneNumberError = validatePhoneNumber(phoneNumber);

    setErrors({
      employeeId: employeeIdError,
      phoneNumber: phoneNumberError,
    });

    if (employeeIdError || phoneNumberError) return;

    setStep('otp');
  };

  // Allow only numbers, spaces, hyphens, and plus
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneRegex = /^[\d\s\-\+]*$/;
    if (phoneRegex.test(value)) {
      setPhoneNumber(value);
    }
  };

  // Redirect to dashboard if already authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     window.location.href = '/';
  //   }
  // }, [isAuthenticated]);

  // Main render logic
  if (step === 'otp') {
    return (
      <OtpVerification
        onVerify={() => {
          // You can add post-OTP logic here
        }}
      />
    );
  }

  // Render login if not authenticated
  return (
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
            <div className="space-y-6">
              {/* Employee ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="SUP-112345"
                  className={`w-full px-4 py-3 border ${errors.employeeId ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                />
                {errors.employeeId && (
                  <p className="mt-2 text-sm text-red-600">{errors.employeeId}</p>
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
                  className={`w-full px-4 py-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>
              {/* Remember Me */}
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  id="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700 select-none">Remember Me</label>
              </div>
              {/* Continue Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-[#1877F2] text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue
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
  );
};

export default Login;