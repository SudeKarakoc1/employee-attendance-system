// Genel amaçlı modal. confirm() bunu kullanır; Ö3 EmployeeFormModal için de kullanabilir.
// props: open, title, children, footer, onClose
// Sahip: Öğrenci 1
import { useEffect } from 'react';
import './Modal.css';

export default function Modal({ open, title, children, footer, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="modal__close" aria-label="Kapat" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}
