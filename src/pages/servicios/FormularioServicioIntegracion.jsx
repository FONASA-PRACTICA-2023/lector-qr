import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";
import { useParams, useNavigate } from "react-router-dom";
import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useAuth } from "../../hooks/useAuth";

function FormularioServicioIntegracion(props) {
  const navigate = useNavigate();
  let params = useParams();
  const { usuario_jwt } = useAuth();
  const [ejemplos, setEjemplos] = useState([]);

  const [mensaje, setMensaje] = useState(null);

  const [estoyEditando, setEstoyEditando] = useState(false);

  const [cssFormulario, setCssFormulario] = useState(
    "row g-3 needs-validation"
  );

  let apiSnoopy = useApiSnoopy();

  const [noEditable, setNoEditable] = useState(false);

  const dataInicial = {
    id: "",
    nombre: "",
    autor_id: usuario_jwt().username,
    descripcion: "",
    tps_estimadas: "5",
    promedio_uso_mensual: "",
    metodo_http: "post",
    tipo_protocolo: "rest",
    categoria_servicio: "",
    ambiente: "qa+prd",
    tipo_autenticacion: "no_autenticacion",
    url_backend_prd: "http://",
    url_backend_qa: "http://",
    url_backend_dev: "http://",
    url_servicio_prd: "https://",
    url_servicio_qa: "https://",
    url_servicio_dev: "https://",
    canal_exposicion: "https",
    criticidad_servicio: "",
    valida_ip_consumidor: "no",
    restringir_contenttype: "no",
    habilita_cors: "no",
    validación_jwt: "no",
    guarda_log_request_response: "si",
    genera_alarma_por_incumplimiento_politica: "no",
    timeout: "10",
    max_size_payload: "800",
    max_peticiones_diarias: "",
    fecha_creacion: "",
    fecha_actualizacion: "",
  };

  const [valoresFormulario, setValoresFormulario] = useState(dataInicial);

  const [formularioDesahabilitado, setFormularioDesahabilitado] = useState(
    props.desahabilitado
  );

  const inicializarFormulario = async () => {
    if (params.id) {
      console.log("params", params);
      let id = params.id;
      await apiSnoopy.buscarDetalleServicio(id, setValoresFormulario);
      setNoEditable(true);
      setEstoyEditando(true);
      await apiSnoopy.buscarRegistrosEjemploRequest(id, setEjemplos);
    } else {
      setValoresFormulario(dataInicial);
      const newValoresFormulario = { ...valoresFormulario };

      setValoresFormulario(newValoresFormulario);
      setEstoyEditando(false);
    }
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
      console.log("valoresFormulario", valoresFormulario);

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

  const eliminarRegistroEjemploRequest = async (id_registro) => {
    console.log("eliminarRegistroEjemploRequest", id_registro);
    await apiSnoopy.eliminarRegistroEjemploRequest(
      valoresFormulario.id,
      id_registro
    );
    await apiSnoopy.buscarRegistrosEjemploRequest(
      valoresFormulario.id,
      setEjemplos
    );
  };
  const eliminarRegistroServicio = async (id_registro) => {
    console.log("eliminarRegistroServicio", id_registro);
    await apiSnoopy.eliminarRegistroServicio(id_registro);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 mb-3">
          <h1>Formulario Antecedentes del Servicio</h1>
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
                disabled={formularioDesahabilitado}
                value={valoresFormulario.nombre}
                onChange={gestionarCambioValor}
                required
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
              <div class="form-text">
                Debe ser un valor único, no se puede repetir.
              </div>
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

            {/* DESCRIPCION */}
            <div className="col-md-12">
              <label htmlFor="descripcion" className="form-label">
                Descripcion
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="descripcion"
                name="descripcion"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.descripcion}
                onChange={gestionarCambioValor}
              ></textarea>
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* TPS_ESTIMADAS */}
            <div className="col-md-4">
              <label className="form-label">Tps Estimadas</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="tps_estimadas"
                  id="tps_estimadas"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="10"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.tps_estimadas}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">TPS</span>
              </div>
            </div>

            {/* PROMEDIO_USO_MENSUAL */}
            <div className="col-md-4">
              <label className="form-label">Promedio Uso Mensual</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="promedio_uso_mensual"
                  id="promedio_uso_mensual"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="10000000"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.promedio_uso_mensual}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">Peticiones</span>
              </div>
            </div>
            <div className="col-md-4"> </div>

            {/* METODO_HTTP */}
            <div className="col-md-3">
              <label className="form-label">
                Metodo Http<span class="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodo_http"
                  id="metodo_http_get"
                  required
                  onChange={gestionarCambioValor}
                  value="get"
                  checked={valoresFormulario.metodo_http === "get"}
                />
                <label htmlFor="metodo_http_get" className="form-check-label">
                  Get
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodo_http"
                  id="metodo_http_post"
                  onChange={gestionarCambioValor}
                  value="post"
                  checked={valoresFormulario.metodo_http === "post"}
                />
                <label htmlFor="metodo_http_post" className="form-check-label">
                  Post
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodo_http"
                  id="metodo_http_put"
                  onChange={gestionarCambioValor}
                  value="put"
                  checked={valoresFormulario.metodo_http === "put"}
                />
                <label htmlFor="metodo_http_put" className="form-check-label">
                  Put
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodo_http"
                  id="metodo_http_delete"
                  onChange={gestionarCambioValor}
                  value="delete"
                  checked={valoresFormulario.metodo_http === "delete"}
                />
                <label
                  htmlFor="metodo_http_delete"
                  className="form-check-label"
                >
                  Delete
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodo_http"
                  id="metodo_http_otro"
                  onChange={gestionarCambioValor}
                  value="otro"
                  checked={valoresFormulario.metodo_http === "otro"}
                />
                <label htmlFor="metodo_http_otro" className="form-check-label">
                  Otro
                </label>
              </div>
            </div>

            {/* TIPO_PROTOCOLO */}
            <div className="col-md-3">
              <label className="form-label">
                Tipo Protocolo<span class="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_protocolo"
                  id="tipo_protocolo_rest"
                  required
                  onChange={gestionarCambioValor}
                  value="rest"
                  checked={valoresFormulario.tipo_protocolo === "rest"}
                />
                <label
                  htmlFor="tipo_protocolo_rest"
                  className="form-check-label"
                >
                  Rest
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_protocolo"
                  id="tipo_protocolo_soap"
                  onChange={gestionarCambioValor}
                  value="soap"
                  checked={valoresFormulario.tipo_protocolo === "soap"}
                />
                <label
                  htmlFor="tipo_protocolo_soap"
                  className="form-check-label"
                >
                  Soap
                </label>
              </div>
            </div>

            {/* CATEGORIA_SERVICIO */}
            <div className="col-md-3">
              <label className="form-label">Categoria Servicio</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoria_servicio"
                  id="categoria_servicio_consulta_informacion"
                  onChange={gestionarCambioValor}
                  value="consulta_informacion"
                  checked={
                    valoresFormulario.categoria_servicio ===
                    "consulta_informacion"
                  }
                />
                <label
                  htmlFor="categoria_servicio_consulta_informacion"
                  className="form-check-label"
                >
                  Consulta Informacion
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="categoria_servicio"
                  id="categoria_servicio_transaccional"
                  onChange={gestionarCambioValor}
                  value="transaccional"
                  checked={
                    valoresFormulario.categoria_servicio === "transaccional"
                  }
                />
                <label
                  htmlFor="categoria_servicio_transaccional"
                  className="form-check-label"
                >
                  Transaccional
                </label>
              </div>
            </div>

            {/* AMBIENTE */}
            <div className="col-md-3">
              <label className="form-label">Desplegado en Ambiente</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ambiente"
                  id="ambiente_qa"
                  onChange={gestionarCambioValor}
                  value="qa"
                  checked={valoresFormulario.ambiente === "qa"}
                />
                <label htmlFor="ambiente_qa" className="form-check-label">
                  Solo QA
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ambiente"
                  id="ambiente_qa+prd"
                  onChange={gestionarCambioValor}
                  value="qa+prd"
                  checked={valoresFormulario.ambiente === "qa+prd"}
                />
                <label htmlFor="ambiente_qa+prd" className="form-check-label">
                  QA y PRD
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ambiente"
                  id="ambiente_qa+prd"
                  onChange={gestionarCambioValor}
                  value="prd"
                  checked={valoresFormulario.ambiente === "prd"}
                />
                <label htmlFor="ambiente_qa+prd" className="form-check-label">
                  Solo PRD
                </label>
              </div>
              <span class="form-text">Indicar donde ya esta desplegado.</span>
            </div>

            {/* TIPO_AUTENTICACION */}
            <div className="col-md-3">
              <label className="form-label">
                Tipo Autenticacion
                <span class="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_basic"
                  required
                  onChange={gestionarCambioValor}
                  value="basic"
                  checked={valoresFormulario.tipo_autenticacion === "basic"}
                />
                <label
                  htmlFor="tipo_autenticacion_basic"
                  className="form-check-label"
                >
                  Basic
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_jwt"
                  onChange={gestionarCambioValor}
                  value="jwt"
                  checked={valoresFormulario.tipo_autenticacion === "jwt"}
                />
                <label
                  htmlFor="tipo_autenticacion_jwt"
                  className="form-check-label"
                >
                  Jwt
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_oauth2"
                  onChange={gestionarCambioValor}
                  value="oauth2"
                  checked={valoresFormulario.tipo_autenticacion === "oauth2"}
                />
                <label
                  htmlFor="tipo_autenticacion_oauth2"
                  className="form-check-label"
                >
                  Oauth2
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_api-key"
                  onChange={gestionarCambioValor}
                  value="api-key"
                  checked={valoresFormulario.tipo_autenticacion === "api-key"}
                />
                <label
                  htmlFor="tipo_autenticacion_api-key"
                  className="form-check-label"
                >
                  Api-Key
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_credencial"
                  onChange={gestionarCambioValor}
                  value="credencial"
                />
                <label
                  htmlFor="tipo_autenticacion_credencial"
                  className="form-check-label"
                >
                  Credencial
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_ssl"
                  onChange={gestionarCambioValor}
                  value="ssl"
                  checked={valoresFormulario.tipo_autenticacion === "ssl"}
                />
                <label
                  htmlFor="tipo_autenticacion_ssl"
                  className="form-check-label"
                >
                  Mediante Certificado SSL
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_filtro_ip"
                  onChange={gestionarCambioValor}
                  value="filtro_ip"
                  checked={valoresFormulario.tipo_autenticacion === "filtro_ip"}
                />
                <label
                  htmlFor="tipo_autenticacion_filtro_ip"
                  className="form-check-label"
                >
                  Filtro Ip
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="tipo_autenticacion"
                  id="tipo_autenticacion_no_autenticacion"
                  onChange={gestionarCambioValor}
                  value="no_autenticacion"
                  checked={
                    valoresFormulario.tipo_autenticacion === "no_autenticacion"
                  }
                />
                <label
                  htmlFor="tipo_autenticacion_no_autenticacion"
                  className="form-check-label"
                >
                  Sin Autenticacion
                </label>
              </div>
            </div>

            {/* CANAL_EXPOSICION */}
            <div className="col-md-3">
              <label className="form-label">
                Canal Exposicion<span class="text-danger fw-bold fs-5">*</span>
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="canal_exposicion"
                  id="canal_exposicion_http"
                  required
                  onChange={gestionarCambioValor}
                  value="http"
                  checked={valoresFormulario.canal_exposicion === "http"}
                />
                <label
                  htmlFor="canal_exposicion_http"
                  className="form-check-label"
                >
                  Http
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="canal_exposicion"
                  id="canal_exposicion_https"
                  onChange={gestionarCambioValor}
                  value="https"
                  checked={valoresFormulario.canal_exposicion === "https"}
                />
                <label
                  htmlFor="canal_exposicion_https"
                  className="form-check-label"
                >
                  Https
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="canal_exposicion"
                  id="canal_exposicion_https+ssl"
                  onChange={gestionarCambioValor}
                  value="https+ssl"
                  checked={valoresFormulario.canal_exposicion === "https+ssl"}
                />
                <label
                  htmlFor="canal_exposicion_https+ssl"
                  className="form-check-label"
                >
                  Https+Ssl
                </label>
              </div>
              <div className="form-text">
                ¿ Por cual canal se expondra el servicio 80, 8080, 443, 8443 ?
              </div>
            </div>

            {/* CRITICIDAD_SERVICIO */}
            <div className="col-md-3">
              <label className="form-label">
                Cantidad Personas Afectadas en 1 minuto
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criticidad_servicio"
                  id="criticidad_servicio_100"
                  onChange={gestionarCambioValor}
                  value="100"
                />
                <label
                  htmlFor="criticidad_servicio_100"
                  className="form-check-label"
                >
                  100
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criticidad_servicio"
                  id="criticidad_servicio_500"
                  onChange={gestionarCambioValor}
                  value="500"
                  checked={valoresFormulario.criticidad_servicio === "500"}
                />
                <label
                  htmlFor="criticidad_servicio_500"
                  className="form-check-label"
                >
                  500
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criticidad_servicio"
                  id="criticidad_servicio_1000"
                  onChange={gestionarCambioValor}
                  value="1000"
                  checked={valoresFormulario.criticidad_servicio === "1000"}
                />
                <label
                  htmlFor="criticidad_servicio_1000"
                  className="form-check-label"
                >
                  1000
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="criticidad_servicio"
                  id="criticidad_servicio_9999"
                  onChange={gestionarCambioValor}
                  value="9999"
                  checked={valoresFormulario.criticidad_servicio === "9999"}
                />
                <label
                  htmlFor="criticidad_servicio_9999"
                  className="form-check-label"
                >
                  +9999
                </label>
              </div>
              <div class="form-text">
                Determinar la criticidad del servicio en base a la cantidad de
                personas que pueden verse afectadas en un minuto.
              </div>
            </div>

            <hr className="my-4" />

            {/* TIMEOUT */}
            <div className="col-md-4">
              <label className="form-label">Timeout</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="timeout"
                  id="timeout"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="30"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.timeout}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">segundos</span>
              </div>
              <div className="form-text">
                Tiempo que se espera al backend para responder.
              </div>
            </div>

            {/* MAX_SIZE_PAYLOAD */}
            <div className="col-md-4">
              <label className="form-label">Peso Máximo del Request</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="max_size_payload"
                  id="max_size_payload"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="900"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.max_size_payload}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">KB</span>
              </div>
              <div className="form-text">
                Tamaño máximo del request que se puede enviar al backend.
              </div>
            </div>

            {/* MAX_PETICIONES_DIARIAS */}
            <div className="col-md-4">
              <label className="form-label">Max Peticiones Diarias</label>
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  name="max_peticiones_diarias"
                  id="max_peticiones_diarias"
                  type="number"
                  maxLength="3"
                  min="0"
                  max="2000000"
                  step="1"
                  disabled={formularioDesahabilitado}
                  value={valoresFormulario.max_peticiones_diarias}
                  onChange={gestionarCambioValor}
                />
                <span className="input-group-text">Peticiones</span>
              </div>
              <div className="form-text">
                Dejar en 0 para que no se limite la cantidad de peticiones.
              </div>
            </div>
            <hr className="my-4" />
            {/* URL_BACKEND_PRD */}
            <div className="col-md-6">
              <label htmlFor="url_backend_prd" className="form-label">
                Url Backend Prd
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_prd"
                name="url_backend_prd"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_backend_prd}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* URL_SERVICIO_PRD */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_prd" className="form-label">
                Url Servicio Prd
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_prd"
                name="url_servicio_prd"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_servicio_prd}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* URL_BACKEND_QA */}
            <div className="col-md-6">
              <label htmlFor="url_backend_qa" className="form-label">
                Url Backend Qa
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_qa"
                name="url_backend_qa"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_backend_qa}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* URL_SERVICIO_QA */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_qa" className="form-label">
                Url Servicio Qa
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_qa"
                name="url_servicio_qa"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_servicio_qa}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* URL_BACKEND_DEV */}
            <div className="col-md-6">
              <label htmlFor="url_backend_dev" className="form-label">
                Url Backend Dev
              </label>
              <input
                type="text"
                className="form-control"
                id="url_backend_dev"
                name="url_backend_dev"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_backend_dev}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            {/* URL_SERVICIO_DEV */}
            <div className="col-md-6">
              <label htmlFor="url_servicio_dev" className="form-label">
                Url Servicio Dev
              </label>
              <input
                type="text"
                className="form-control"
                id="url_servicio_dev"
                name="url_servicio_dev"
                disabled={formularioDesahabilitado}
                value={valoresFormulario.url_servicio_dev}
                onChange={gestionarCambioValor}
              />
              <div className="invalid-feedback">Debe ingresar un valor</div>
            </div>

            <hr className="my-4" />

            {/* VALIDA_IP_CONSUMIDOR */}
            <div className="col-md-3">
              <label className="form-label">Valida Ip Consumidor</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="valida_ip_consumidor"
                  id="valida_ip_consumidor_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={valoresFormulario.valida_ip_consumidor === "si"}
                />
                <label
                  htmlFor="valida_ip_consumidor_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="valida_ip_consumidor"
                  id="valida_ip_consumidor_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={valoresFormulario.valida_ip_consumidor === "no"}
                />
                <label
                  htmlFor="valida_ip_consumidor_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
              <div className="form-text">
                ¿El servicio valida la ip del consumidor para responder?
              </div>
            </div>

            {/* RESTRINGIR_CONTENTTYPE */}
            <div className="col-md-3">
              <label className="form-label">Restringir Content-Type</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="restringir_contenttype"
                  id="restringir_contenttype_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={valoresFormulario.restringir_contenttype === "si"}
                />
                <label
                  htmlFor="restringir_contenttype_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="restringir_contenttype"
                  id="restringir_contenttype_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={valoresFormulario.restringir_contenttype === "no"}
                />
                <label
                  htmlFor="restringir_contenttype_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
              <div className="form-text">
                ¿El servicio valida el content-type?
              </div>
            </div>

            {/* HABILITA_CORS */}
            <div className="col-md-3">
              <label className="form-label">Habilita Cors</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="habilita_cors"
                  id="habilita_cors_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={valoresFormulario.habilita_cors === "si"}
                />
                <label htmlFor="habilita_cors_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="habilita_cors"
                  id="habilita_cors_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={valoresFormulario.habilita_cors === "no"}
                />
                <label htmlFor="habilita_cors_no" className="form-check-label">
                  No
                </label>
              </div>
              <div className="form-text">
                ¿Permitir al servicio interactuar con otros dominios?
              </div>
            </div>

            {/* VALIDACIÓN_JWT */}
            <div className="col-md-3">
              <label className="form-label">Validación Jwt</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="validación_jwt"
                  id="validación_jwt_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={valoresFormulario.validación_jwt === "si"}
                />
                <label htmlFor="validación_jwt_si" className="form-check-label">
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="validación_jwt"
                  id="validación_jwt_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={valoresFormulario.validación_jwt === "no"}
                />
                <label htmlFor="validación_jwt_no" className="form-check-label">
                  No
                </label>
              </div>
              <div className="form-text">
                ¿El servicio valida el token jwt (presencia y vigencia)?
              </div>
            </div>

            {/* GUARDA_LOG_REQUEST_RESPONSE */}
            <div className="col-md-3">
              <label className="form-label">Guarda Log Request Response</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="guarda_log_request_response"
                  id="guarda_log_request_response_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={
                    valoresFormulario.guarda_log_request_response === "si"
                  }
                />
                <label
                  htmlFor="guarda_log_request_response_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="guarda_log_request_response"
                  id="guarda_log_request_response_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={
                    valoresFormulario.guarda_log_request_response === "no"
                  }
                />
                <label
                  htmlFor="guarda_log_request_response_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
              <div className="form-text">
                ¿El servicio almacena el request y response?
              </div>
            </div>

            {/* GENERA_ALARMA_POR_INCUMPLIMIENTO_POLITICA */}
            <div className="col-md-3">
              <label className="form-label">
                Genera Alarma Por Incumplimiento Politica
              </label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genera_alarma_por_incumplimiento_politica"
                  id="genera_alarma_por_incumplimiento_politica_si"
                  onChange={gestionarCambioValor}
                  value="si"
                  checked={
                    valoresFormulario.genera_alarma_por_incumplimiento_politica ===
                    "si"
                  }
                />
                <label
                  htmlFor="genera_alarma_por_incumplimiento_politica_si"
                  className="form-check-label"
                >
                  Si
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="genera_alarma_por_incumplimiento_politica"
                  id="genera_alarma_por_incumplimiento_politica_no"
                  onChange={gestionarCambioValor}
                  value="no"
                  checked={
                    valoresFormulario.genera_alarma_por_incumplimiento_politica ===
                    "no"
                  }
                />
                <label
                  htmlFor="genera_alarma_por_incumplimiento_politica_no"
                  className="form-check-label"
                >
                  No
                </label>
              </div>
              <div className="form-text">
                En caso de incumplir la política de seguridad, ¿la plataforma
                notifica al equipo de monitoreo?
              </div>
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
            {/* FECHA_ACTUALIZACION */}
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
                disabled={valoresFormulario.id === ""}
                className="btn btn-danger"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Eliminar Registro
              </button>
              <button
                type="button"
                disabled={valoresFormulario.id === ""}
                className="btn btn-info"
                onClick={() => {
                  navigate("/add-request/" + valoresFormulario.id);
                }}
              >
                Añadir Request Response
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  navigate("/registros");
                }}
              >
                Cancelar
              </button>
            </div>
            <div class="collapse" id="collapseExample">
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  eliminarRegistroServicio(valoresFormulario.id);
                }}
              >
                Confirmar Eliminar
              </button>
            </div>
          </form>

          <hr />
          {ejemplos.length > 0 && (
            <div className="row">
              <div className="col-md-12">
                <h3>Ejemplos de uso del Servicio</h3>

                {ejemplos.map((ejemplo) => (
                  <div className="row mt-3" key={ejemplo.id}>
                    <div className="col-md-12">
                      <h4>
                        {ejemplo.descripcion}{" "}
                        <div class="dropdown">
                          <button
                            class="btn btn-outline-danger btn-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Eliminar
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => {
                                  eliminarRegistroEjemploRequest(ejemplo.id);
                                }}
                              >
                                Confirmar Eliminar : {ejemplo.descripcion}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </h4>
                      {apiSnoopy.loading && <Cargando />}
                    </div>
                    <div className="col-md-6">
                      <h4>Request</h4>
                      <pre>{ejemplo.pregunta}</pre>
                    </div>
                    <div className="col-md-6">
                      <h4>Response</h4>
                      <pre>{ejemplo.respuesta}</pre>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormularioServicioIntegracion;
