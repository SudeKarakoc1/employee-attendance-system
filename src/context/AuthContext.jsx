// Oturum ve rol yönetimi. docs/ARCHITECTURE.md §7.1
// Sahip: Öğrenci 1
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as authService from '../services/authService';
import { ROLES, SESSION_KEY } from '../utils/constants';

const AuthContext = createContext(null);

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage kapalıysa oturum sadece bellekte kalır
  }
}

export function AuthProvider({ children }) {
  // localStorage senkron olduğu için oturum ilk render'da hazır; loading ileride
  // asenkron bir kaynağa geçilirse diye API'de tutuluyor.
  const [user, setUser] = useState(readSession);
  const loading = false;

  const login = useCallback(async (email, password) => {
    const safeUser = await authService.login(email, password);
    setUser(safeUser);
    writeSession(safeUser);
    return safeUser;
  }, []);

  // Kayıt sonrası kullanıcı otomatik giriş yapmış olur.
  const register = useCallback(async (data) => {
    const safeUser = await authService.register(data);
    setUser(safeUser);
    writeSession(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === ROLES.ADMIN,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth yalnızca <AuthProvider> içinde kullanılabilir');
  return ctx;
}
