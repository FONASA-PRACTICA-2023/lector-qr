import React from "react";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { BsTrash } from "react-icons/bs";

function Recursos() {
    const [formData, setFormData] = useState({ tipo: "", identificador: "" });
    const [prestadores, setPrestadores] = useState([]);
    const [prestaciones, setPrestaciones] = useState([]);
    const [excepcion, setExcepcion] = useState([]);
    const [users, setUsers] = useState([]);

    const getData = () => {

        const nuevoRegistro = {
            identificador: formData.identificador,
            fecha_creacion: new Date().toLocaleString().split(",")[0]
        };

        fetch("http://10.8.160.18:8010/multiprestador/autorizaciones")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setPrestadores([...data.prestadores, nuevoRegistro]);
                setPrestaciones([...data.prestaciones, nuevoRegistro]);
                setExcepcion([...data.excepciones_contacto, nuevoRegistro]);

                console.log(data);

            })
            .catch(error => {
                console.log("Error al obtener los usuarios", error);
            });
    }


    const handleReset = () => {
        setFormData({ tipo: "seleccione una opcion", identificador: "" });
    }

    useEffect(() => {
        console.log(formData);
        getData();
    }, []);

    const handleSave = () => {
        const nuevoRegistro = {
            identificador: formData.identificador,
            fecha_creacion: new Date().toLocaleString().split(",")[0],
            tipo: formData.tipo
        };

        fetch("http://10.8.160.18:8010/multiprestador/crear/autorizaciones", {

            method: "POST",
            body: JSON.stringify(nuevoRegistro),
            headers: {
                "Content-Type": "application/json",


            }

        })
            .then(response => response.json())
            .then(data => {
                switch (data.tipo) {
                    case "PRESTADOR":
                        setPrestadores([...prestadores, nuevoRegistro]);
                        break;
                    case "PRESTACION":
                        setPrestaciones([...prestaciones, nuevoRegistro]);
                        break;
                    case "EXCEPCION_VALIDAR_CONTACTO_BENEFICIARIO":
                        setExcepcion([...excepcion, nuevoRegistro]);
                        break;
                    default:
                        console.log(data)
                }
                if (formData.tipo === "seleccione una opcion" || formData.identificador === "") {
                    swal({
                        buttons: [false],
                        text: "debe seleccionar una opcion o verificar el identificador",
                        icon: "error",
                        timer: "2000",
                    });
                } else {
                    swal({
                        buttons: [true],
                        icon: "success",
                        timer: "2000",
                    });
                }
                getData();
            })
            .catch(error => {
                console.log("Error al enviar la solicitud", error);

            });
    }

    function deletePrestador(index) {
        const deletedIdentificador = prestadores[index].autorizacion_id;
        fetch(`https://api.fonasa.cl/SQA/MantenedorApiMP/autorizaciones/${deletedIdentificador}/delete`, {
            method: "DELETED",
            headers: {
                "Content-Type": "application/json",

            }
        })
        setPrestadores(prestadores.filter((_, i) => i !== index));
    }

    function deletePrestacion(index) {
        const deletedIdentificador = prestaciones[index].autorizacion_id;
        fetch(`http://10.8.160.18:8010/multiprestador/autorizaciones/${deletedIdentificador}/delete`, {
            method: "DELETED",
            headers: {
                "Content-Type": "application/json",

            }
        })
        setPrestaciones(prestaciones.filter((_, i) => i !== index));
    }

    function deleteExcepcion(index) {
        const deletedIdentificador = excepcion[index].autorizacion_id;
        fetch(`http://10.8.160.18:8010/multiprestador/autorizaciones/${deletedIdentificador}/delete`, {
            method: "DELETED",
            headers: {
                "Content-Type": "application/json",

            }
        })
        setExcepcion(excepcion.filter((_, i) => i !== index));
    }

    return (
        <>
            <div className="menu">
                <div className="text-center">
                    <h1 className="mb-3">Recursos Autorizados</h1>
                </div>
                <div className="input-group mb-3" >
                    <button type="button" className="btn btn-outline-primary rounded " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleReset}>
                        Autorizar Item
                    </button></div>
            </div>
            <div className="row row-cols-md-2 ">
                <div className="col mt-3">
                    <div className="col">

                        <div className="card rounded">
                            <div className="card-body ">
                                <h5 className="title">Prestadores Autorizados</h5>
                                <table className="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Rut Prestador</th>
                                            <th scope="col">Fecha de Autorizacion</th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider" >
                                        {prestadores.map((ss, index) => (
                                            <tr key={index}>
                                                <td>{ss.identificador}</td>
                                                <td>{ss.fecha_creacion}</td>
                                                <td>
                                                    <button className="btn btn-sm  rounded" onClick={() => deletePrestador(index)}>< BsTrash style={{ color: "red", fontSize: "20px" }} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-2">
                        <div className="col">
                            <div className="card rounded">
                                <div className="card-body">
                                    <h5 className="card-title">EXCEPCION_VALIDAR_CONTACTO_BENEFICIARIO</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Rut Prestador</th>
                                                <th scope="col">Fecha de Autorizacion</th>
                                                <th scope="col">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {excepcion.map((sss, index) => (
                                                <tr key={index.tipo}>
                                                    <td>{sss.identificador}</td>
                                                    <td>{sss.fecha_creacion}</td>
                                                    <td>
                                                        <button className="btn btn-sm  rounded" onClick={() => deleteExcepcion(index)} ><BsTrash style={{ color: "red", fontSize: "20px" }} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mt-3">
                    <div className="col">
                        <div className="card rounded ">
                            <div className="card-body">
                                <h5 className="card-title">Prestaciones Autorizadas</h5>
                                <table className="table " >
                                    <thead>
                                        <tr>
                                            <th scope="col">Código Prestación</th>
                                            <th scope="col">Fecha de Autorización </th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {prestaciones.map((s, index) => (
                                            <tr key={index}>
                                                <td>{s.identificador}</td>
                                                <td>{s.fecha_creacion}</td>
                                                <td>
                                                    <button className="btn btn-sm  rounded" onClick={() => deletePrestacion(index)}><BsTrash style={{ color: "red", fontSize: "20px" }} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Crear registro</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label for="disabledSelect" className="form-text">TIPO</label>
                                <select id="disabledSelect" className="form-select" onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}>
                                    <option value="seleccione una opcion" selected={formData.tipo === ""}>seleccione una opcion</option>
                                    <option className="form-text">PRESTACION</option>
                                    <option className="form-text">PRESTADOR</option>
                                    <option className="form-text">EXCEPCION_VALIDAR_CONTACTO_BENEFICIARIO</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-text" >Identificador</label>
                                <input type="text" className="form-control" value={formData.identificador} onChange={(e) => setFormData({ ...formData, identificador: e.target.value })} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary rounded" data-bs-dismiss="modal" onClick={handleSave}>GUARDAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recursos;