// Rol tabanlı rota koruması. docs/ARCHITECTURE.md §7.3
// Kullanım: <Route element={<ProtectedRoute allowedRoles={['admin']} />}> ... </Route>
// allowedRoles verilmezse sadece giriş kontrolü yapar.
// Sahip: Öğrenci 1
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
