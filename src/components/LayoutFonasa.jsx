import React from "react";
import MenuSuperior from "./MenuSuperior";
import { useOutlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import constantes from "./constantes.json";

function LayoutFonasa() {
  const outlet = useOutlet();
  const { usuario_jwt } = useAuth();
  console.log("decodificado", usuario_jwt());

  if (!usuario_jwt()) {
    return <Navigate to={constantes.logout} />;
  }

  return (
    <>
      <MenuSuperior user={usuario_jwt()} />

      <main className="container h-100">{outlet}</main>
    </>
  );
}

export default LayoutFonasa;
