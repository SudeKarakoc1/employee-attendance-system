// Toast listesini render eder. Tetikleme useAlert().showAlert ile yapılır.
// Sahip: Öğrenci 1
import './ToastAlert.css';

export default function ToastAlert({ toasts = [], onClose }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__message">{toast.message}</span>
          <button
            type="button"
            className="toast__close"
            aria-label="Kapat"
            onClick={() => onClose?.(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
