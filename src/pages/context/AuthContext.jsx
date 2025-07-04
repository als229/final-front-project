import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = window.ENV?.API_URL;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [auth, setAuth] = useState({
    userId: null,
    nickName: null,
    realName: null,
    email: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  const login = (
    userId,
    nickName,
    realName,
    email,
    accessToken,
    refreshToken,
    isAuthenticated
  ) => {
    setAuth({
      userId,
      nickName,
      realName,
      email,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("nickName", nickName);
    sessionStorage.setItem("realName", realName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("accessToken", accessToken);

    if (refreshToken !== undefined) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  useEffect(() => {
    if (!auth.userId || !auth.realName) {
      setIsAdmin(false);
      return;
    }

    if (auth.userId.substring(2, 7) !== "admin" || auth.realName !== "어드민") {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(true);
  }, [auth]);
  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && refreshToken !== undefined) {
      axios.post(`${apiUrl}/api/logout`, {
        refreshToken: refreshToken,
      });
    }
    setAuth({
      userId: null,
      nickName: null,
      realName: null,
      email: null,
      accessToken: null,
      refreshToken: null,
    });
    sessionStorage.clear();
    localStorage.removeItem("refreshToken");
  };
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    const nickName = sessionStorage.getItem("nickName");
    const realName = sessionStorage.getItem("realName");
    const email = sessionStorage.getItem("email");

    if (accessToken) {
      setAuth({
        userId,
        nickName,
        realName,
        email,
        accessToken,
        refreshToken: localStorage.getItem("refreshToken"),
        isAuthenticated: true,
      });
      setLoading(false);
    } else {
      setAuth({
        userId: null,
        nickName: null,
        realName: null,
        email: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  }, []);

  const updateProfile = ({ realName, nickName, email, fileUrl }) => {
    setAuth((prev) => ({
      ...prev,
      realName,
      nickName,
      email,
      fileUrl,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, login, logout, updateProfile, loading, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
