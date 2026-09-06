import React from 'react';
import { useStudy } from '../../context/StudyContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStudy();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toast-container">
      {toasts.map(t => {
        let iconClass = 'fa-info-circle';
        if (t.type === 'success') iconClass = 'fa-check-circle';
        if (t.type === 'error' || t.type === 'danger') iconClass = 'fa-exclamation-circle';
        if (t.type === 'warning') iconClass = 'fa-triangle-exclamation';

        return (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <i className={`fas ${iconClass} toast-icon`}></i>
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => removeToast(t.id)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}
