import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setIsAuthenticated(true);
  };

  const register = async (email, password) => {
    await API.post("/auth/register", { email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        isAuthenticated,
        loading,
        token, // 🔥 ESTE ERA EL QUE FALTABA
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};