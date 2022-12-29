import React from "react";

function MensajeError(props) {
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
      <em className="material-icons md-18 ">error</em>
      <span className="ms-2">{props.mensaje}</span>
    </div>
  );
}

export default MensajeError;
