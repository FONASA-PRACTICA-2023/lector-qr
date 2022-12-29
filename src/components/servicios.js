import axios from "axios";

const BASE_BACKEND_URL = `${process.env.REACT_APP_WS_BACKEND}/FONASASEC/ModeloPredictivo`;

const headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
};

const buscarVectores = () =>
  axios.get(`${BASE_BACKEND_URL}/FONASAVectoresRESTSEC`);

const buscarVectorPorId = (idVector) =>
  axios.get(`${BASE_BACKEND_URL}/FONASAVectoresRESTSEC/${idVector}`);

const crearVector = (vector) =>
  axios.post(`${BASE_BACKEND_URL}/FONASAVectoresRESTSEC`, vector, {
    headers: headers,
  });

const consultarVector = (vector) =>
  axios.post(`${BASE_BACKEND_URL}/consultaVector`, vector, {
    headers: headers,
  });

const addPhoto = (vector) => console.log("ADD FOTO SIN IMPLEMENTAR", vector);

const obtenerUsuarioLogeado = () =>
  axios.get(process.env.REACT_APP_WS_USER_LOGEADO);

export {
  buscarVectores,
  buscarVectorPorId,
  crearVector,
  consultarVector,
  addPhoto,
  obtenerUsuarioLogeado,
};
