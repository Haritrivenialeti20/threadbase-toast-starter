export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
          onClick={() => onDismiss(toast.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onDismiss(toast.id);
            }
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
