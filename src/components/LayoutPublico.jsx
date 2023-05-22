import React from "react";
import MenuSuperior from "./MenuSuperior";

import { useOutlet } from "react-router-dom";

function LayoutFonasa() {
  const outlet = useOutlet();

  return (
    <>
      <MenuSuperior />
      <main className="container h-100">{outlet}</main>
    </>
  );
}

export default LayoutFonasa;
