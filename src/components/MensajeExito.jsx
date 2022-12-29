import React from "react";

function MensajeExito(props) {
  return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
      <em className="material-icons md-18 ">done</em>
      <span className="ms-2">{props.mensaje}</span>
    </div>
  );
}
export default MensajeExito;
