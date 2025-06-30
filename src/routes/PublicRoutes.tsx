// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Signin from '../pages/auth/Signin';



// // import ForgotPassword from '../pages/Auth/ForgotPassword';
// // import ResetPassword from '../pages/Auth/ResetPassword';
// // import Landing from '../pages/Landing';


// export const PublicRoutes: React.FC = () => {
//   return (
//     <Routes>
//       {/* Landing page */}
//       {/* <Route path="/" element={<Landing />} /> */}
      
//       {/* Authentication routes */}
//       <Route path="/login" element={<Signin />} />
//       {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
//       {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      
//       {/* Public pages */}
//       {/* <Route path="/support" element={<Support />} /> */}

      
//       {/* Redirect to login by default */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };










import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';


// Uncomment these when you have the components ready
// import ForgotPassword from '../pages/Auth/ForgotPassword';
// import ResetPassword from '../pages/Auth/ResetPassword';
// import Landing from '../pages/Landing';
// import Support from '../pages/Support';

export const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Landing page - optional */}
      {/* <Route path="/" element={<Landing />} /> */}
      
      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />
      {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}
      
      {/* Public pages */}
      {/* <Route path="/support" element={<Support />} /> */}
      
      {/* Redirect all routes to login for unauthenticated users */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};