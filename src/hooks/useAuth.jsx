import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (usuarioLogeadoData) => {
    console.log("useAuth::login", usuarioLogeadoData.token);
    setToken(usuarioLogeadoData.token);
    var decoded = await jwt_decode(usuarioLogeadoData.token);
    console.log("LEYENDO TOKEN");
    await setUser(decoded.payload);
    navigate("/registros", { replace: true });
  };

  const usuario_jwt = () => {
    try {
      if (token) {
        var decoded = jwt_decode(token);
        return decoded.payload;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      usuario_jwt,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
