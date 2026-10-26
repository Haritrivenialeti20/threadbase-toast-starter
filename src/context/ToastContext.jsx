import { createContext, useCallback, useContext, useState } from "react";
import ToastContainer from "../components/ToastContainer.jsx";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  // The list of active toasts. Each toast is { id, message, type, duration }.
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = crypto.randomUUID();
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, message, type, duration },
    ]);
    setTimeout(() => dismissToast(id), duration);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

// useToast lets any component grab showToast / dismissToast without prop drilling.
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
}
