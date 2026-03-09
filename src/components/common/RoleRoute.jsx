import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/authStore';

function RoleRoute({ children, role }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;

  return children;
}

export default RoleRoute;