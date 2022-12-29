import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useApiSnoopy from "../hooks/useApiSnoopy";

export const HomePage = () => {
  let apiSnoopy = useApiSnoopy();

  const [usuario, setUsuario] = useState(null);

  const buscarUsuario = async () => {
    try {
      await apiSnoopy.validarUsuarioSnoopy(setUsuario);
    } catch (error) {
      alert("No se pudo validar el usuario");
      console.error(error);
    }
  };

  useEffect(() => {
    buscarUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {usuario ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Bienvenido {usuario.nombre}</h5>
            <p className="card-text">Su run es: {usuario.run}</p>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};
