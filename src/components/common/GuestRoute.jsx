// Sadece girişsiz kullanıcılar için (login, register).
// Girişli kullanıcıyı önce geldiği sayfaya (ProtectedRoute'un bıraktığı state.from), yoksa rolüne göre paneline yönlendirir.
// Login/Register sayfaları navigate() çağırmaz; tek yönlendirme noktası burasıdır (yarış durumu önlemi).
// Sahip: Öğrenci 1
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HOME_BY_ROLE, ROUTES } from '../../utils/constants';

export default function GuestRoute() {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    return <Navigate to={from ?? HOME_BY_ROLE[user.role] ?? ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
