// Proje geneli sabitler. Saf JS, React bağımsız.
// Sahip: Öğrenci 1 oluşturdu. Ortak dosya: yeni sabit eklerken changelog'a yaz.

export const API_BASE_URL = 'http://localhost:3001';
export const SESSION_KEY = 'eas_session';

export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EMPLOYEE: '/employee',
  MY_RECORDS: '/employee/records',
  ADMIN: '/admin',
  MANAGE_EMPLOYEES: '/admin/employees',
  PAYROLL: '/admin/payroll',
  ATTENDANCE_REPORT: '/admin/attendance',
  UNAUTHORIZED: '/unauthorized',
};

// Role göre açılış sayfası (login sonrası ve '/' yönlendirmesi).
export const HOME_BY_ROLE = {
  [ROLES.ADMIN]: ROUTES.ADMIN,
  [ROLES.EMPLOYEE]: ROUTES.EMPLOYEE,
};

export const TOAST_DURATION_MS = 3500;

// Sidebar menüsü role göre buradan üretilir. Yeni sayfa ekleyen öğrenci buraya satır ekler.
export const MENU_ITEMS = [
  { label: 'Panel', path: ROUTES.EMPLOYEE, roles: [ROLES.EMPLOYEE] },
  { label: 'Kayıtlarım', path: ROUTES.MY_RECORDS, roles: [ROLES.EMPLOYEE] },
  { label: 'Panel', path: ROUTES.ADMIN, roles: [ROLES.ADMIN] },
  { label: 'Çalışanlar', path: ROUTES.MANAGE_EMPLOYEES, roles: [ROLES.ADMIN] },
  { label: 'Bordro', path: ROUTES.PAYROLL, roles: [ROLES.ADMIN] },
  { label: 'Devam Raporu', path: ROUTES.ATTENDANCE_REPORT, roles: [ROLES.ADMIN] },
];

// İş kuralları (docs/ARCHITECTURE.md §10). "Öneri" olanlar ekip onayı bekliyor.
export const WORK_HOURS_PER_DAY = 8;
export const OVERTIME_MULTIPLIER = 1.5;
export const NIGHT_SHIFT = { start: '22:00', end: '06:00', multiplier: 1.25 }; // öneri
export const DEDUCTION_RATE = 0.15; // öneri
export const WORKING_DAYS = [1, 2, 3, 4, 5]; // Date.getDay(): Pzt=1 … Cum=5
export const CURRENCY = 'TRY';
