// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // For development purposes - simulate successful login
//     // Replace this with your actual authentication logic
//     if (email && password) {
//       // Set authentication flag
//       localStorage.setItem('isAuthenticated', 'true');
      
//       // Navigate to dashboard (root URL)
//       navigate('/');
      
//       // Force a page refresh to trigger route re-evaluation
//       window.location.reload();
//     } else {
//       alert('Please enter email and password');
//     }
//   };

//   const handleLogout = () => {
//     // For development purposes - clear authentication
//     localStorage.removeItem('isAuthenticated');
//     window.location.reload();
//   };

//   // Check if already authenticated
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

//   if (isAuthenticated) {
//     return (
//       <div style={{ padding: '20px', textAlign: 'center' }}>
//         <h2>You are already logged in</h2>
//         <button onClick={() => navigate('/')}>Go to Dashboard</button>
//         <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
//       </div>
//     );
//   }

//   return (
//     <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
//       <h2 className='text-3xl font-semibold pb-4'>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }} className='border rounded-sm'
//             required
//           />
//         </div>
//         <div style={{ marginBottom: '15px' }}>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }} className='border rounded-sm'
//             required
//           />
//         </div>
//         <button 
//           type="submit"
//           style={{ 
//             width: '100%', 
//             padding: '12px', 
//             backgroundColor: '#007bff', 
//             color: 'white', 
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer'
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;








import React, { useState } from 'react';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleLogin = () => {
    // For development purposes - simulate successful login
    // Replace this with your actual authentication logic
    if (employeeId && phoneNumber) {
      // Set authentication flag
      localStorage.setItem('isAuthenticated', 'true');
      
      // Redirect to dashboard (simulate navigation)
      window.location.href = '/';
    } else {
      alert('Please enter Employee ID and Phone Number');
    }
  };

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };

  const goToDashboard = () => {
    window.location.href = '/';
  };

  // Handle phone number input to only allow numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers, spaces, hyphens, and plus sign
    const phoneRegex = /^[\d\s\-\+]*$/;
    if (phoneRegex.test(value)) {
      setPhoneNumber(value);
    }
  };

  // Check if already authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">You are already logged in</h2>
          <div className="space-x-4">
            <button 
              onClick={goToDashboard}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button 
              onClick={handleLogout}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              {/* Continue Button */}
              <button 
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue
              </button>
            </div>
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