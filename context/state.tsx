import { createContext, useContext } from "react";
import { Reaction } from "../types/Bin";

type ContextType = {
  text: string
  lang: string
  id: string | null
  reactions: Reaction[]
}

const AppContext = createContext({} as ContextType);


export function AppWrapper({ children }: any) {
  //TODO: this should be useState 
  const State: ContextType = { text: "", lang: "txt", id: "", reactions: [] };

  return (
    <AppContext.Provider value={State} >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() { return useContext(AppContext) };
