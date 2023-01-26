import { useState, useEffect } from "react";
import { HiOutlineDocumentPlus, HiOutlineDocumentMinus } from 'react-icons/hi2';
import { useAuth } from "../../hooks/useAuth";

function Roles() {
    const [listadoDeRoles, setListadoDeRoles] = useState([]);
    const [listadoDeRolesAsociados, setListadoDeRolesAsociados] = useState([]);
    const listaRoles = ["Gerente", "Ejecutivo de ventas", "Contador", "Analista de finanzas", "Administrador de proyectos", "Diseñador gráfico", "Ingeniero", "Especialista en marketing", "Analista de datos", "Recursos humanos"];
    const { usuario_jwt } = useAuth();
    const user = usuario_jwt();

    const handleAsociar = (rol) => {
        setListadoDeRolesAsociados(prev => [...prev, rol]);
        setListadoDeRoles(listadoDeRoles.filter(r => r !== rol));
        fetch("http://cmdb.fonasa.cl/notificacion/notificaciones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(response => console.log({ response }))
            .catch(() => console.log("error"));
    };

    const handleRemover = (rol) => {
        setListadoDeRoles(listadoDeRoles.concat(rol));
        setListadoDeRolesAsociados(listadoDeRolesAsociados.filter(r => r !== rol));
        fetch("http://cmdb.fonasa.cl/notificacion/notificaciones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(response => console.log({ response }))
            .catch(() => console.log("error"));
    };

    useEffect(() => {
        setListadoDeRoles(listaRoles);
    }, []);

    return (

        <div className="row p-5">
            <div className="card mb-3 rounded mt-3">
                <div className="card-body">
                    <h5 className="card-title">Datos</h5>
                </div>
            </div>
            <div className="col-sm-6 mb-sm-0">
                <div className="card rounded">
                    <div className="card-body">
                        <h5 className="card-title">Roles Disponibles para Asociar</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoDeRoles && listadoDeRoles.map((rol) => (
                                    <tr key={rol}>
                                        <td>{rol}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAsociar(rol)}
                                                className="btn btn-success btn-sm rounded"
                                                style={{ outline: "none" }}
                                            >
                                                <HiOutlineDocumentPlus /> Asociar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card rounded">
                    <div className="card-body">
                        <h5 className="card-title">Roles Asociados al Sistema</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoDeRolesAsociados.map((rol) => (
                                    <tr key={rol}>
                                        <td>{rol}</td>
                                        <td>
                                            <button
                                                onClick={() => handleRemover(rol)}
                                                className="btn btn-danger btn-sm rounded"
                                            >
                                                <HiOutlineDocumentMinus /> Remover
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roles;