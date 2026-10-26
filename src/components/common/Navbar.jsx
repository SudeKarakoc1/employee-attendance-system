// Üst bar: uygulama adı, kullanıcı adı, rol ve çıkış.
// Sahip: Öğrenci 1
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { ROLES, ROUTES } from '../../utils/constants';

const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Yönetici',
  [ROLES.EMPLOYEE]: 'Çalışan',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showAlert('Çıkış yapıldı', 'info');
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <header className="navbar">
      <span className="navbar__brand">Employee Attendance System</span>
      <div className="navbar__user">
        <span className="navbar__name">{user?.name}</span>
        <span className="navbar__role">{ROLE_LABELS[user?.role] ?? user?.role}</span>
        <button type="button" className="btn btn--ghost" onClick={handleLogout}>
          Çıkış
        </button>
      </div>
    </header>
  );
}
