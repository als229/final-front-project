import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = window.ENV?.API_URL;
  const [auth, setAuth] = useState({
    userId: null,
    nickName: null,
    realName: null,
    email: null,
    accessToken: null,
    refreshToken: null,
  });

  const login = (
    userId,
    nickName,
    realName,
    email,
    accessToken,
    refreshToken
  ) => {
    setAuth({
      userId,
      nickName,
      realName,
      email,
      accessToken,
      refreshToken,
    });

    console.log("세션 저장된 값:", sessionStorage.getItem("accessToken"));

    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("nickName", nickName);
    sessionStorage.setItem("realName", realName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("accessToken", accessToken);

    if (refreshToken !== undefined) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken && refreshToken !== undefined) {
      axios.post(`${apiUrl}localhost:12345/api/logout`, {
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
      value={{ auth, setAuth, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
