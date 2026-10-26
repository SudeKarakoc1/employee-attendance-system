// Proje geneli toast ve onay penceresi. docs/ARCHITECTURE.md §7.2
// Sahip: Öğrenci 1
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ToastAlert from '../components/ui/ToastAlert';
import Modal from '../components/ui/Modal';
import { ALERT_TYPES, TOAST_DURATION_MS } from '../utils/constants';

const AlertContext = createContext(null);
const VALID_TYPES = new Set(Object.values(ALERT_TYPES));

export function AlertProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [confirmState, setConfirmState] = useState(null);
  const nextId = useRef(1);

  const closeToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const showAlert = useCallback(
    (message, type = ALERT_TYPES.INFO) => {
      const id = nextId.current++;
      const safeType = VALID_TYPES.has(type) ? type : ALERT_TYPES.INFO;
      setToasts((list) => [...list, { id, message: String(message), type: safeType }]);
      setTimeout(() => closeToast(id), TOAST_DURATION_MS);
    },
    [closeToast],
  );

  /** Promise<boolean> döner: onay → true, iptal/kapatma → false. */
  const confirm = useCallback((options = {}) => {
    return new Promise((resolve) => {
      setConfirmState({
        title: options.title ?? 'Onay',
        message: options.message ?? 'Devam edilsin mi?',
        confirmText: options.confirmText ?? 'Onayla',
        cancelText: options.cancelText ?? 'İptal',
        danger: Boolean(options.danger),
        resolve,
      });
    });
  }, []);

  const settleConfirm = useCallback(
    (result) => {
      confirmState?.resolve(result);
      setConfirmState(null);
    },
    [confirmState],
  );

  const value = useMemo(() => ({ showAlert, confirm }), [showAlert, confirm]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <ToastAlert toasts={toasts} onClose={closeToast} />
      <Modal
        open={Boolean(confirmState)}
        title={confirmState?.title}
        onClose={() => settleConfirm(false)}
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => settleConfirm(false)}>
              {confirmState?.cancelText}
            </button>
            <button
              type="button"
              className={confirmState?.danger ? 'btn btn--danger' : 'btn'}
              onClick={() => settleConfirm(true)}
              autoFocus
            >
              {confirmState?.confirmText}
            </button>
          </>
        }
      >
        <p>{confirmState?.message}</p>
      </Modal>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert yalnızca <AlertProvider> içinde kullanılabilir');
  return ctx;
}
