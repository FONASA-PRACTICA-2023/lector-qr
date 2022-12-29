import React from "react";

function Cargando() {
  return (
    <button className="btn btn-warning" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Procesando Solicitud...
    </button>
  );
}

export default Cargando;