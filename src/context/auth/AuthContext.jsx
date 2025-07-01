import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: {
      userNo: 2,
      email: "tjseorud@gmail.com",
      realName: "qwerty",
      nickName: "qwerty",
      refreshToken:
        "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbjIyOSIsImlhdCI6MTc1MTMzNzkzMywiZXhwIjoxNzUzOTI5OTMzfQ.fFOAj9H-LXz4GYCIkj1nWpxXK-NBE5bUs_9-LpmEZxApS4ghjh1KizyigV8XX9tq",
      isAuthenticated: true,
    },
  });

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
