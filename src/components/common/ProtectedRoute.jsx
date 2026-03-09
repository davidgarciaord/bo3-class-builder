import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;