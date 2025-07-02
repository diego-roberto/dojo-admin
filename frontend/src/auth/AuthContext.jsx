import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });
      setToken(res.data.token);
      setUser({ username });
      api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      return { success: true };
    } catch (err) {
      setToken(null);
      setUser(null);
      return { success: false, message: err?.response?.data || "Login inválido" };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
  };

  useEffect(() => {
    const resp = api.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err.response && err.response.status === 401) logout();
        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.response.eject(resp);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
