import { useState, useEffect } from "react";

import { useAuth } from "../../hooks/useAuth";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useNavigate } from "react-router-dom";

export const FormularioLogin = () => {
  const { login } = useAuth();

  let apiSnoopy = useApiSnoopy();
  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );
  const iniciarSesion = async (usuarioLogeado) => {
    try {
      console.log("FormularioLogin::iniciarSesion", usuarioLogeado);
      await login(usuarioLogeado);
    } catch (error) {
      console.log(error);
    }
  };

  const [valoresFormulario, setValoresFormulario] = useState({
    rut_externo: "",
    usuario_interno: "",
    password: "",
  });
  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setCssFormulario("was-validated needs-validation row g-3 ");
    } else {
      apiSnoopy.loginUsuarioFonasa(
        valoresFormulario.rut_externo,
        valoresFormulario.password,
        iniciarSesion
      );
    }

    setCssFormulario("needs-validation row g-3 ");
  };

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Acceso</h1>
      {apiSnoopy.loading && <Cargando />}
      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
      {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.nombre} />}
      <form onSubmit={handleSubmit} className={cssFormulario} noValidate>
        {/* rut_externo */}
        <div className="col-md-12 mb-3">
          <label htmlFor="rut_externo" className="form-label">
            Usuario Fonasa
          </label>
          <input
            type="text"
            className="form-control"
            id="rut_externo"
            name="rut_externo"
            value={valoresFormulario.rut_externo}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        {/* password */}
        <div className="col-md-12 mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={valoresFormulario.password}
            onChange={gestionarCambioValor}
            required
          />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        <div className="col-md-6 mb-3">
          <button
            className="btn btn-sm btn-primary d-flex align-items-center"
            type="submit"
          >
            <em className="material-icons md-18">login</em> Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
