import { useState, useEffect } from "react";
import Cargando from "../../components/Cargando";
import MensajeError from "../../components/MensajeError";
import MensajeExito from "../../components/MensajeExito";

import useApiSnoopy from "../../hooks/useApiSnoopy";
import { useNavigate } from "react-router-dom";
function ListadoServiciosIntegracion() {
  const navigate = useNavigate();
  let apiSnoopy = useApiSnoopy();

  const buscarServicios = async () => {
    apiSnoopy.listarServiciosIntegracion();
  };

  useEffect(() => {
    buscarServicios();
  }, []);

  return (
    <div className="container">
      <h1>Listado de Servicios de Integración</h1>

      {apiSnoopy.loading && <Cargando />}
      {apiSnoopy.error && <MensajeError mensaje={apiSnoopy.error} />}
      {apiSnoopy.data && <MensajeExito mensaje={apiSnoopy.data.mensaje} />}

      <table className="table table-striped table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Descripción</th>
            <th>Tipo de Protocolo</th>
            <th>Categoría de Servicio</th>
            <th>Canal de Exposición</th>
            <th>Criticidad de Servicio</th>
            <th>Fecha de Creación</th>
            <th>Fecha de Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apiSnoopy.listadoServicios &&
            apiSnoopy.listadoServicios.map((servicio) => (
              <tr key={servicio.id}>
                <td>{servicio.nombre}</td>
                <td>{servicio.autor_id}</td>
                <td>{servicio.descripcion}</td>
                <td>{servicio.tipo_protocolo}</td>
                <td>{servicio.categoria_servicio}</td>
                <td>{servicio.canal_exposicion}</td>
                <td>{servicio.criticidad_servicio}</td>
                <td>{servicio.fecha_creacion}</td>
                <td>{servicio.fecha_actualizacion}</td>
                <td>
                  <button
                    className="btn btn-link btn-sm"
                    onClick={() => navigate(`/servicio-editar/${servicio.id}`)}
                  >
                    <span className="material-icons">edit</span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoServiciosIntegracion;
