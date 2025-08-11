import React, { useEffect, useState } from 'react';
import PrimaryButton from '../../components/ui/Buttons/PrimaryButton';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{ employeeId?: string; phoneNumber?: string }>({});

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

    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/';
  };

  // Allow only numbers, spaces, hyphens, and plus
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const phoneRegex = /^[\d\s\-\+]*$/;
    if (phoneRegex.test(value)) {
      setPhoneNumber(value);
    }
  };

  // Check if already authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  // Handle form submission (Enter key or button)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  // Render login if not authenticated
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Welcome Section */}
      <div className="flex-1 bg-blue-600 flex flex-col justify-center items-center text-white p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-8">
            Welcome Back to AiXCollectPro
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Monitor your team, manage tasks, and drive recovery with real-time insights.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">AiXCollectPro</h2>
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Log in to AiXCollectPro
            </h3>
            <p className="text-gray-600 mb-8">
              Get started by entering your Employee ID & Mobile Number to access the supervisor dashboard
            </p>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
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
                  placeholder="+91 xxxxx xxxxx"
                  className={`w-full px-4 py-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors`}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Continue Button */}
              <PrimaryButton text="Continue" onClick={handleLogin} className='bg-primary-700 hover:bg-primary-600 text-white w-full font-medium' />

            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            ©copyright 2025, AiXCollectPro - All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


