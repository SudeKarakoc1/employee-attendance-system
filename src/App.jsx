// Uygulama kabuğu: provider'lar + router. Rotalar src/routes/AppRoutes.jsx içinde.
// Sahip: Öğrenci 1
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  );
}
