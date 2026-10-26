// Sahip: Öğrenci 1. Ortak dosya: diğer öğrenciler sadece ilgili bloğa rota satırı ekler.
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import GuestRoute from './components/common/GuestRoute';
import Layout from './components/common/Layout';
import { HOME_BY_ROLE, ROLES, ROUTES } from './utils/constants';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MyRecords from './pages/employee/MyRecords';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageEmployees from './pages/admin/ManageEmployees';
import PayrollReport from './pages/admin/PayrollReport';
import AttendanceReport from './pages/admin/AttendanceReport';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function HomeRedirect() {
  const { isAuthenticated, user } = useAuth();
  const target = isAuthenticated ? HOME_BY_ROLE[user.role] ?? ROUTES.LOGIN : ROUTES.LOGIN;
  return <Navigate to={target} replace />;
}

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomeRedirect />} />

            {/* Girişsiz kullanıcı sayfaları (Ö1) */}
            <Route element={<GuestRoute />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
            </Route>

            {/* Çalışan sayfaları (Ö2) */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]} />}>
              <Route element={<Layout />}>
                <Route path={ROUTES.EMPLOYEE} element={<EmployeeDashboard />} />
                <Route path={ROUTES.MY_RECORDS} element={<MyRecords />} />
              </Route>
            </Route>

            {/* Admin sayfaları (Ö3) */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route element={<Layout />}>
                <Route path={ROUTES.ADMIN} element={<AdminDashboard />} />
                <Route path={ROUTES.MANAGE_EMPLOYEES} element={<ManageEmployees />} />
                <Route path={ROUTES.PAYROLL} element={<PayrollReport />} />
                <Route path={ROUTES.ATTENDANCE_REPORT} element={<AttendanceReport />} />
              </Route>
            </Route>

            <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  );
}
