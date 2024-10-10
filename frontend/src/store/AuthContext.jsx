import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [Details, setDetail] = useState();

  useEffect(() => {
    const detail = localStorage.getItem("Info");
    if (detail) {
      setDetail(JSON.parse(detail));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("Info");
  };

  return (
    <AuthContext.Provider value={{ logout, Details }}>
      {children}
    </AuthContext.Provider>
  );
};
