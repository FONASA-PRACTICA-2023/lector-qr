import { useState } from "react";
import axios from "axios";

import { useAuth } from "./useAuth";
import { useCookies } from "react-cookie";

const useApiSnoopy = () => {
  const { token } = useAuth();

  const header_autenticado = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const [data, setData] = useState(null);

  const [listadoServicios, setListadoServicios] = useState([]);
  const [bitacoraVector, setBitacoraVector] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getGenerico = async (url) => {
    console.log("getGenerico >> " + url);
    setLoading(true);
    try {
      let res = await axios.get(url, { headers: header_autenticado });
      setData(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log("error", error);
    }
    setLoading(false);
    console.log(data);
    return data;
  };

  const deleteGenerico = async (url, formulario) => {
    console.log("deleteGenerico >> " + url);
    setLoading(true);
    console.log(header_autenticado);
    try {
      await axios
        .delete(url, { headers: header_autenticado, data: formulario })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  const postGenerico = async (url, formulario) => {
    console.log("postGenerico >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getRegistrosPrestador = async (rut, pagina) => {
    await getGenerico(
      process.env.REACT_APP_WS_REGISTROS_BY_PRESTADOR + rut + "/" + pagina
    );
  };

  const loginUsuarioFonasa = async (usuario, password, login) => {
    let url = process.env.REACT_APP_WS_LOGIN;

    let login_payload = {
      username: usuario,
      password: password,
    };

    console.log("loginUsuarioExterno >> " + url);
    setLoading(true);
    try {
      await axios.post(url, login_payload).then((res) => {
        setData(res.data);
        setLoading(false);
        setError(null);
        login(res.data);
      });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.mensaje);
      setLoading(false);
    }
  };

  const crearRegistroServicioIntegracion = async (formulario) => {
    let url = process.env.REACT_APP_SERVICIO_CREAR;
    console.log("crearRegistroServicioIntegracion >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const actualizarRegistroServicioIntegracion = async (formulario) => {
    let url = process.env.REACT_APP_SERVICIO_ACTUALIZAR;
    console.log("actualizarRegistroServicioIntegracion >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const listarServiciosIntegracion = async () => {
    let url = process.env.REACT_APP_SERVICIO_TODOS;
    console.log("listarServiciosIntegracion >> " + url);
    setLoading(true);
    try {
      await axios.get(url, { headers: header_autenticado }).then((res) => {
        setListadoServicios(res.data.registros);
        setLoading(false);
        setError(null);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const buscarDetalleServicio = async (pk_servicio, setValoresFormulario) => {
    let url = process.env.REACT_APP_SERVICIO_UNO;
    console.log("buscarDetalleServicio >> " + url);
    setLoading(true);
    let formulario = {
      id: pk_servicio,
    };

    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setValoresFormulario(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const crearRegistroEjemploRequest = async (formulario) => {
    let url = process.env.REACT_APP_REQUEST_CREAR;
    console.log("crearRegistroEjemploRequest >> " + url);
    setLoading(true);
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const buscarRegistrosEjemploRequest = async (id_servicio, setEjemplos) => {
    let url = process.env.REACT_APP_REQUEST_TODOS;
    console.log("buscarRegistrosEjemploRequest >> " + url);
    setLoading(true);
    let formulario = {
      id_servicio: id_servicio,
    };
    try {
      await axios
        .post(url, formulario, { headers: header_autenticado })
        .then((res) => {
          setEjemplos(res.data);
          console.log(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const eliminarRegistroEjemploRequest = async (id_servicio, id_registro) => {
    let url = process.env.REACT_APP_REQUEST_ELIMINAR;
    console.log("eliminarRegistroEjemploRequest >> " + url);
    setLoading(true);
    let formulario = {
      id_servicio: id_servicio,
      id: id_registro,
    };
    try {
      await axios
        .delete(url, { headers: header_autenticado, data: formulario })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const eliminarRegistroServicio = async (id_servicio) => {
    let url = process.env.REACT_APP_SERVICIO_ELIMINAR;
    console.log("eliminarRegistroServicio >> " + url);
    setLoading(true);
    let formulario = {
      id: id_servicio,
    };
    try {
      await axios
        .delete(url, { headers: header_autenticado, data: formulario })
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          setError(null);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    eliminarRegistroServicio,
    loginUsuarioFonasa,
    crearRegistroServicioIntegracion,
    actualizarRegistroServicioIntegracion,
    listadoServicios,
    listarServiciosIntegracion,
    buscarDetalleServicio,
    crearRegistroEjemploRequest,
    buscarRegistrosEjemploRequest,
    eliminarRegistroEjemploRequest,
  };
};

export default useApiSnoopy;
