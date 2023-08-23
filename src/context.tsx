import React, { createContext, useState } from "react";
import { getEntries } from "./store";

export const Context = createContext<string | null>(null);

type DispatchType<T> = React.Dispatch<React.SetStateAction<T>>;
type SetIdStateType = DispatchType<number>;
const ActiveIdContext = createContext<
  | {
      activeId: number;
      setActiveId: SetIdStateType;
    }
  | undefined
>(undefined);

export function ActiveIdProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const entries = getEntries();
  const [activeId, setActiveId] = useState<number>(entries[0].id);
  return (
    <ActiveIdContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}

export function useActiveId(): [number, SetIdStateType] {
  const context = React.useContext(ActiveIdContext);
  if (context === undefined) {
    throw new Error("useActiveId must be used within a ActiveIdProvider");
  }
  return [context.activeId, context.setActiveId];
}
