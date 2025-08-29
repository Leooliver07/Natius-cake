"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI(){
  const context = useContext(UIContext);
  if(!context){
    throw new Error("useUI must be used within a UIProvider")

  }
  return context;

}

export function UIProvider({children}: {children: ReactNode}){
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev=> !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  
  const value = {
    isSidebarOpen: isSidebarOpen,
    toggleSidebar,
    closeSidebar,
  };
  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}