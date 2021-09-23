import { createContext, useContext } from "react";

type ContextType = {
  text: string
  lang: string
  id: string
}

const AppContext = createContext({} as ContextType);

export function AppWrapper({ children }: any) {
  // const [setText]
  const State: ContextType = { text: "", lang: "txt", id: "" };

  return (
    <AppContext.Provider value={State} >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() { return useContext(AppContext) };
