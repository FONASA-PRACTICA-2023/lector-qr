import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useNavigate } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { v4 as uuidv4 } from 'uuid';
import MainSelector from "../../comunass/MainSelector";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import swal from 'sweetalert';
import {FiSave} from 'react-icons/fi';

const generateRandomPassword = () => {
  return uuidv4().slice(0, 8);
}

function FormularioUsuario(props) {

  let apiSnoopy = useApiSnoopy();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState(null);
  const [estoyEditando, setEstoyEditando] = useState(false);
  const [cssFormulario, setCssFormulario] = useState("row g-3 needs-validation");
  const [password, setPassword] = useState(generateRandomPassword());
 

  const [mostrarPassword, setMostrarPassword] = useState(false);

  const dataInicial = {
    rut_persona: "",
    nombres: "",
    apellidos: "",
    rut_prestador_medico: "",
    password: "",
    comuna: "",
    region: "",
    direccion_zonal: "",
  };

  const [valoresFormulario, setValoresFormulario] = useState(dataInicial);

  const [formularioDesahabilitado, setFormularioDesahabilitado] = useState(
    props.desahabilitado
  );



  function handleClick() {
    setMostrarPassword(!mostrarPassword);
  }

  useEffect(() => {
    setPassword(generateRandomPassword());
  }, []);

  const gestionarCambioValor = async (evt) => {
    const { target } = evt;
    const { name, value } = target;
    const newValoresFormulario = { ...valoresFormulario, [name]: value };
    setValoresFormulario(newValoresFormulario);
  };

  const gestionarEnvioFormulario = async (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    console.log("gestionarEnvioFormulario");

    if (form.checkValidity() === false) {
      evt.stopPropagation();
      setCssFormulario("was-validated needs-validation row g-3 ");
      setMensaje({
        mensaje: "Debe revisar el formulario",
        tipo: "error",
      });
      swal({
        text: "REVISE LOS CAMPOS",
        icon: "warning",
        timer: "2000",
        buttons: [false],
      });
    } else {
      setMensaje(null);
      console.log("valoresFormulario", valoresFormulario);
      generarTabla(valoresFormulario);
      swal({
        buttons: [false],
        icon: "success",
        timer: "2000",
      });

      try {
        if (estoyEditando) {
          apiSnoopy.actualizarRegistroServicioIntegracion(valoresFormulario);
          console.log("apiSnoopy.actualizarRegistro", valoresFormulario);
          navigate("/");
        } else {
          apiSnoopy.crearRegistroServicioIntegracion(valoresFormulario);
          console.log("apiSnoopy.crearRegistro", valoresFormulario);
          navigate("/");
        }
      } catch (error) {

        console.log("error", error);
      }
    }
  };

  const generarTabla = (datos) => {
    let tabla = document.createElement("table");
    let tbody = document.createElement("tbody");
    for (let key in datos) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML = key;
      let td2 = document.createElement("td");
      td2.innerHTML = datos[key];
      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    }
    tabla.appendChild(tbody);
    console.log(tabla);
  }

  return (
    <div className="container w-50 mt-4">
      <h1 className="mb-3">Formulario de Registro</h1>
      {apiSnoopy.loading && <Cargando />}
      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
      {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.nombre} />}
      <form onSubmit={gestionarEnvioFormulario} className={cssFormulario} noValidate>
        {/* RUT_PERSONA */}
        <div className="col-md-12 mb-3">
          <label htmlFor="rut_externo" className="form-label">
            Rut persona
          </label><span className="text-danger fw-bold fs-5">*</span>
          <input type="text" className="form-control rounded"
            id="rut_persona" name="rut_persona"
            disabled={formularioDesahabilitado}
            value={valoresFormulario.rut_persona}
            onChange={gestionarCambioValor}
            required />
          <div className="invalid-feedback">Debe ingresar un valor</div>
        </div>

        {/* NOMBRES */}
        <div className="col-md-12 mb-3">
          <label htmlFor="nombres" style={{ marginTop: "20px" }} className="form-label">Nombres<span className="text-danger fw-bold fs-5">*</span></label>
          <input type="text" className="form-control rounded"
            id="nombres" name="nombres"
            disabled={formularioDesahabilitado}
            value={valoresFormulario.nombres}
            onChange={gestionarCambioValor}
            required />
          <div className="invalid-feedback">
            Debe ingresar un valor
          </div>
        </div>

        {/* APELLIDOS */}
        <div className="col-md-12 mb-3">
          <label htmlFor="apellidos" style={{ marginTop: "20px" }} className="form-label">Apellidos<span className="text-danger fw-bold fs-5">*</span></label>
          <input type="text" className="form-control rounded"
            id="apellidos" name="apellidos"
            disabled={formularioDesahabilitado}
            value={valoresFormulario.apellidos}
            onChange={gestionarCambioValor}
            required />
          <div className="invalid-feedback">
            Debe ingresar un valor
          </div>
        </div>

        {/* RUT_PRESTADOR_MEDICO */}
        <div className="col-md-12 mb-3">
          <label htmlFor="rut_prestador_medico" style={{ marginTop: "20px" }} className="form-label">Rut Prestador Medico</label>
          <input type="text" className="form-control rounded"
            id="rut_prestador_medico" name="rut_prestador_medico"
            disabled={formularioDesahabilitado}
            value={valoresFormulario.rut_prestador_medico}
            onChange={gestionarCambioValor}
          />
          <div className="invalid-feedback">
            Debe ingresar un valor
          </div>
        </div>

        {/* PASSWORD */}
        <label htmlFor="password" className="form-label" style={{ marginTop: "20px" }}>Password<span className="text-danger fw-bold fs-5">*</span></label>
        <div className="col-md-12 mb-3">
          <InputGroup className="mb-2" >
            <input type={mostrarPassword ? "text" : "password"}
              className="form-control rounded"
              id="password" name="password"
              disabled={formularioDesahabilitado}
              value={password}
              onChange={gestionarCambioValor}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={handleClick} style={{ border: "none" }}>
              {mostrarPassword ? <HiEyeOff /> : <HiEye />}
            </Button>
            <div className="invalid-feedback">
              Debe ingresar un valor
            </div>
          </InputGroup>
        </div>

        {/* REGION */}
        <div className="col-md-12 mb-3" style={{ marginTop: "20px" }}>
          <MainSelector />
          <div className="invalid-feedback">
            Debe ingresar un valor
          </div>
        </div>

        {/* DIRECCION_ZONAL */}
        <div className="col-md-12 mb-3">
          <label htmlFor="direccion_zonal" className="form-label" style={{ marginTop: "20px" }}>Direccion Zonal</label>
          <input type="text" className="form-control rounded"
            id="direccion_zonal" name="direccion_zonal"
            disabled={formularioDesahabilitado}
            value={valoresFormulario.direccion_zonal}
            onChange={gestionarCambioValor}
          />
          <div className="invalid-feedback">
            Debe ingresar un valor
          </div>
        </div>

        {/* FIN DE LOS CAMPOS */}

        {apiSnoopy.loading && <Cargando />}
        {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
        {apiSnoopy.data && (
          <MensajeExito mensaje={apiSnoopy.data.mensaje} />
        )}

        <div className="col-md-6 mb-3">
          <button
            disabled={apiSnoopy.loading}
            type="submit"
            className="btn btn-sm btn-primary "
          ><FiSave/>
            Guardar
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary ms-1 "
            
            onClick={() => {
              navigate("/registros");
            }}
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );

}

export default FormularioUsuario;