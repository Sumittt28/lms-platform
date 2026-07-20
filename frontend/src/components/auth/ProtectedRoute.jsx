import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PageLoader } from '../common/Loader';

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, loading, isInstructor, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole === 'instructor' && !isInstructor) {
    return <Navigate to="/" replace />;
  }

  if (requireRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
