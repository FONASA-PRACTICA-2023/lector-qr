import { useState, useEffect } from "react";
import { HiOutlineDocumentPlus, HiOutlineDocumentMinus } from 'react-icons/hi2';
import { useAuth } from "../../hooks/useAuth";
import MenuSuperior from "../../components/MenuSuperior";


function Roles() {

    const [listadoDeRoles, setListadoDeRoles] = useState([]);
    const [listadoDeRolesAsociados, setListadoDeRolesAsociados] = useState([]);
    let listaRoles = ["Gerente", "Ejecutivo de ventas", "Contador", "Analista de finanzas", "Administrador de proyectos", "Diseñador gráfico", "Ingeniero", "Especialista en marketing", "Analista de datos", "Recursos humanos"];
    const { usuario_jwt } = useAuth();
    const user = usuario_jwt();
    const handleAsociar = (rol) => {
        setListadoDeRolesAsociados(prev => [...prev, rol]);
        setListadoDeRoles(listadoDeRoles.filter(r => r !== rol));
        fetch("http://cmdb.fonasa.cl/notificacion/notificaciones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //   'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => res.json())
            .then((response) => {
                console.log({ response });

            })
            .catch(() => {
                console.log("error");
            });
    };

   
    const handleRemover = (rol) => {
        setListadoDeRoles(listadoDeRoles.concat(rol));
        setListadoDeRolesAsociados(listadoDeRolesAsociados.filter(r => r !== rol));
        fetch("http://cmdb.fonasa.cl/notificacion/notificaciones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                //   'Authorization': 'Bearer ' + token
            }
        })
            .then((res) => res.json())
            .then((response) => {
                console.log({ response });

            })
            .catch(() => {
                console.log("error");
            });

    };

    useEffect(() => {
        setListadoDeRoles(listaRoles);
        // setListadoDeRolesAsociados(listadoDeRolesAsociados);

    }, []);
    console.log(listadoDeRolesAsociados);
    return (
        <div style={{ height: "100%", width: "100%", marginTop: "30px" }}>
            <div className="contenedor-roles">

                <div className="contenedor-usuario">
                    <div className="datos-usuario">
                        <div >
                            <h2 className="mt-1 mb-1">{user.nombre}</h2>
                            <p>Actualizado</p>
                        </div>
                        <div className="usuario-datos">
                            <div className="usuario-correo">
                                <p>{user.mail}</p>
                                <p>correo</p>
                            </div>
                            <div className="usuario-alias">
                                <p>{user.username}</p>
                                <p>alias</p>
                            </div>
                            <div className="usuario-departamento">
                                <p>staff</p>
                                <p>departamento</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contenedor-tablas">
                    <div className="contanedor-tabla--roles-asociados">
                        <h3>Roles Disponibles para Asociar</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoDeRoles && listadoDeRoles.map((rol) => (
                                    <tr>
                                        <td >{rol}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAsociar(rol)}
                                                className="btn btn-success btn-sm rounded"
                                                style={{ outline: "none" }}

                                            ><HiOutlineDocumentPlus />
                                                Asociar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="contanedor-tabla--roles-asociados">
                        <h3>Roles Asociados al Sistema</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoDeRolesAsociados.map((rol) => (
                                    <tr>
                                        <td>{rol}</td>
                                        <td>
                                            <button onClick={() => handleRemover(rol)}
                                                className="btn btn-danger btn-sm rounded"><HiOutlineDocumentMinus />
                                                remover</button>
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