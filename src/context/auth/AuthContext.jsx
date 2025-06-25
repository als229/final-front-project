import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      memberNo: null,
      email: null,
      memberPw: null,
      memberName: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: true,
    },
  });

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
