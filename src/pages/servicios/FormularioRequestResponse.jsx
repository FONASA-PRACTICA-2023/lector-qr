import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useParams, useNavigate } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useAuth } from "../../hooks/useAuth";

function FormularioRequestResponse(props) {
  const navigate = useNavigate();
  let params = useParams();
  const { usuario_jwt } = useAuth();

  const [servicio, setServicio] = useState(null);

  const [mensaje, setMensaje] = useState(null);

  const [estoyEditando, setEstoyEditando] = useState(false);

  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );

  let apiSnoopy = useApiSnoopy();

  const [noEditable, setNoEditable] = useState(false);

  const [valoresFormulario, setValoresFormulario] = useState({
    id: "",
    id_servicio: "",
    nombre: "",
    autor_id: "",
    pregunta: "",
    respuesta: "",
    tipo_contenido: "json",
    fecha_creacion: "",
    fecha_actualizacion: "",
  });

  const [formularioDesahabilitado, setFormularioDesahabilitado] = useState(
    props.desahabilitado
  );

  const inicializarFormulario = async () => {
    console.log(usuario_jwt().roles);

    console.log("Servicio_ID:", params.id);
    await apiSnoopy.buscarDetalleServicio(params.id, setServicio);

    const newValoresFormulario1 = { ...valoresFormulario, nombre: params.id };
    const newValoresFormulario2 = {
      ...newValoresFormulario1,
      id_servicio: params.id,
    };
    const newValoresFormulario3 = {
      ...newValoresFormulario2,
      autor_id: usuario_jwt().username,
    };

    setValoresFormulario(newValoresFormulario3);
    setNoEditable(true);
    setEstoyEditando(false);
  };

  useEffect(() => {
    inicializarFormulario();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } else {
      setMensaje(null);

      try {
        if (estoyEditando) {
          //apiSnoopy.actualizarRegistroServicioIntegracion(valoresFormulario);
          console.log("apiSnoopy.actualizarRegistro", valoresFormulario);
        } else {
          apiSnoopy.crearRegistroEjemploRequest(valoresFormulario);
          console.log("apiSnoopy.crearRegistro", valoresFormulario);
          navigate("/servicio-editar/" + valoresFormulario.id_servicio);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 mb-3">
          <h1>Formulario Request & Response</h1>
          {apiSnoopy.loading && <Cargando />}
          {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
          {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}
          <form
            noValidate
            className={cssFormulario}
            onSubmit={gestionarEnvioFormulario}
          >
            {/* 07/12/2022 20:33:04 */}

            {/* NOMBRE */}
            <div className="col-md-10">
              <label htmlFor="nombre" className="form-label">
                Nombre del Servicio
                <span class="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                disabled={true}
                value={valoresFormulario.nombre}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div class="form-text">
                Debe ser un valor único, no se puede repetir.
              </div>
            </div>

            {/* descripcion */}
            <div className="col-md-10">
              <label htmlFor="descripcion" className="form-label">
                Descripción del Ejemplo
                <span class="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.descripcion}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div class="form-text">Descripción del ejemplo</div>
            </div>
            {/* AUTOR_ID */}
            <div className="col-md-2">
              <label htmlFor="autor_id" className="form-label">
                Autor Id<span class="text-danger fw-bold fs-5">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="autor_id"
                name="autor_id"
                disabled={true}
                value={valoresFormulario.autor_id}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* tipo_contenido */}
            <div className="col-md-6">
              <label className="form-label">Tipo Contenido</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_contenido"
                  id="tipo_contenido_json"
                  onChange={gestionarCambioValor}
                  value="json"
                  checked={valoresFormulario.tipo_contenido === "json"}
                />
                <label
                  htmlFor="tipo_contenido_json"
                  className="form-check-label"
                >
                  JSON
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_contenido"
                  id="tipo_contenido_xml"
                  onChange={gestionarCambioValor}
                  value="xml"
                  checked={valoresFormulario.tipo_contenido === "xml"}
                />
                <label
                  htmlFor="tipo_contenido_xml"
                  className="form-check-label"
                >
                  XML
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_contenido"
                  id="tipo_contenido_otros"
                  onChange={gestionarCambioValor}
                  value="otros"
                  checked={valoresFormulario.tipo_contenido === "otros"}
                />
                <label
                  htmlFor="tipo_contenido_otros"
                  className="form-check-label"
                >
                  OTROS
                </label>
              </div>

              <div className="form-text">
                Indicar que tipo de Contenido acepta el servicio.
              </div>
            </div>
            <hr />
            {/* REQUEST */}
            <div className="col-md-6">
              <label htmlFor="pregunta" className="form-label">
                Request / Pregunta
              </label>
              <textarea
                required
                className="form-control"
                rows="8"
                id="pregunta"
                name="pregunta"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.pregunta}
                onChange={gestionarCambioValor}
              ></textarea>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* REQUEST */}
            <div className="col-md-6">
              <label htmlFor="respuesta" className="form-label">
                Response / Respuesta
              </label>
              <textarea
                required
                className="form-control"
                rows="8"
                id="respuesta"
                name="respuesta"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.respuesta}
                onChange={gestionarCambioValor}
              ></textarea>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* FECHA_CREACION */}
            <input
              type="hidden"
              value={valoresFormulario.fecha_creacion}
              name="fecha_creacion"
            />
            {/* FECHA_ACTUALIZACION */}
            <input
              type="hidden"
              value={valoresFormulario.fecha_actualizacion}
              name="fecha_actualizacion"
            />
            {/* dddd */}
            <input
              type="hidden"
              value={valoresFormulario.id_servicio}
              name="id_servicio"
            />
            <input type="hidden" value={valoresFormulario.id} name="id" />
            {/* FIN DE LOS CAMPOS */}

            {apiSnoopy.loading && <Cargando />}
            {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
            {apiSnoopy.data && (
              <MensajeExito mensaje={apiSnoopy.data.mensaje} />
            )}

            <div className="col-md-12">
              <button
                disabled={apiSnoopy.loading}
                type="submit"
                className="btn btn-primary"
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  navigate("/servicio-editar/" + valoresFormulario.id_servicio);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioRequestResponse;
