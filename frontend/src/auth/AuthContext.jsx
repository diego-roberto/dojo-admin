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
    } else {
      localStorage.removeItem("token");
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
        nome: username,
        password,
      });
      setToken(res.data.token);
      setUser({ username });
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
  };

  useEffect(() => {
    const req = api.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    const resp = api.interceptors.response.use(
      r => r,
      err => {
        if (err.response && err.response.status === 401) logout();
        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.request.eject(req);
      api.interceptors.response.eject(resp);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
