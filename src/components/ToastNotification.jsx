import { useEffect } from 'react';

function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="toast-notification toast-visible" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export default ToastNotification;
