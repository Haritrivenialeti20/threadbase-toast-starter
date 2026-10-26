export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container" aria-live="polite" aria-relevant="additions removals">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast-${toast.type}`}
          onClick={() => onDismiss(toast.id)}
          aria-label={`Dismiss ${toast.type} notification: ${toast.message}`}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
