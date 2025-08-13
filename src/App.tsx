import { Routes, Route } from 'react-router-dom'
import { PublicRoutes } from './routes/PublicRoutes';
import { ProtectedRoutes } from './routes/ProtectedRoutes';


const App = () => {
  // For development purposes - simulating authentication
  // Replace this with your actual auth logic later
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <>
      <Routes>
        {/* Public routes - only accessible when not authenticated */}
        <Route path="/auth/*" element={!isAuthenticated ? <PublicRoutes /> : <ProtectedRoutes />} />
        
        {/* Protected routes - only accessible when authenticated */}
        <Route
          path="/*"
          element={isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}
        />
      </Routes>
    </>
  )
}

export default App