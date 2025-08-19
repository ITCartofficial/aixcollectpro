import { Routes, Route } from 'react-router-dom'
import { PublicRoutes } from './routes/PublicRoutes';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { useAppSelector } from './store/hooks';

const App = () => {
  // Use Redux state instead of localStorage
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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