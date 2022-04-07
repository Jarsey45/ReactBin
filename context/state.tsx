import { createContext, useCallback, useContext, useState } from "react";
import { ToastProps } from "../components/toasts/Toast";
import { Reaction } from "../types/Bin";

type StateType = {
  text: string
  lang: string
  id: string | null
  reactions: Reaction[]
}
type ContextType = {
  State: StateType;
  Toasts: ToastProps[];
  addToast: (newToast: ToastProps) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const AppContext = createContext({} as ContextType);


export function AppWrapper({ children }: any) {
  //TODO: this should be useState 
  const State: StateType = { text: "", lang: "txt", id: "", reactions: [] };
  const [Toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((newToast: ToastProps) => {
    setToasts([...Toasts, newToast]);
  }, [Toasts, setToasts])

  const removeToast = useCallback((id: string) => {
    setToasts(Toasts.filter((toast) => toast.id !== id));
  }, [Toasts])

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  return (
    <AppContext.Provider value={{ State, Toasts, addToast, removeToast, clearToasts }} >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() { return useContext(AppContext) };
