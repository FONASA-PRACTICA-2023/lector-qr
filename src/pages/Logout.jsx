import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "react-feather";

import { useAuth } from "../hooks/useAuth";
import { useCookies } from "react-cookie";
function Logout() {
  const { logout } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    setTimeout(() => {
      setCookie("token", "", { path: "/" });
      setCookie("JSESSIONID", "", { path: "/" });
      setCookie("ORA_OTD_JROUTE", "", { path: "/" });
      logout();
    }, 2000);
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">
        Cerrando la Sesión <LogOut />
      </h1>
      <button className="btn btn-warning" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Redireccionando...
      </button>
    </div>
  );
}

export default Logout;
