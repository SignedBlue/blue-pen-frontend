"use client";

import React, { createContext, useContext, useState } from "react";

interface AuthContextData {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthContextProvider");
  }
  return context;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [display, setDisplay] = useState<string>("grid");

  const contextValue: AuthContextData = {
    display,
    setDisplay
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>);
};