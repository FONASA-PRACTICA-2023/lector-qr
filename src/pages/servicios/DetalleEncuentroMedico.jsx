import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

function Detalle() {
    const params = useParams();
    const [detalles, setDetalles] = useState([]);
    const [detallesP, setDetallesP] = useState([]);
    const [detallesSucursal, setDetallesS] = useState([]);
    const [detallesBitacora, setDetallesB] = useState([]);
    const [detallesAtivacion, setDetallesActivacion] = useState([]);
    const navigate = useNavigate();

    if (params.id) {
        console.log("params", params);
    }

    useEffect(() => {
        getDetalles(params.id);
    }, []);

    const getDetalles = async (id) => {

        try {
            const response = await fetch(`http://10.8.160.18:8010/multiprestador/encuentro/` + id);
            const data = await response.json();
            const { registro, paciente, sucursal, bitacora, activacion } = data;
            let detalles, detallesP, detallesS, detallesB, detallesAtivacion;

            if (!Array.isArray(registro)) {
                detalles = [registro];
                detallesP = [paciente];
                detallesS = [sucursal];
                detallesB = bitacora;
                if (activacion !== null) {
                    detallesAtivacion = [activacion];
                    swal({
                        buttons: [false],
                        icon: "success",
                        timer: "2000",
                        text: ""
                    });
                } else {
                    swal({
                        buttons: [false],
                        icon: "warning",
                        timer: "2000",
                        text: "No cuenta con activacion de bono"
                    });
                }


            } else {
                detalles = registro;
                detallesP = paciente;
                detallesS = sucursal;
                detallesB = bitacora;
                detallesAtivacion = activacion;
            }
            setDetalles(detalles);
            setDetallesP(detallesP);
            setDetallesS(detallesS);
            setDetallesB(detallesB);
            if (detallesAtivacion !== null) {
                setDetallesActivacion(detallesAtivacion);
            }


            console.log(detallesAtivacion);
        } catch (error) {
            console.log("Error al obtener detalles: ", error);
        }
    };
    return (
        <>
            <div>
                <a className="fs-1" onClick={() => {
                    navigate("/RegistrosCredenciales");
                }}><IoArrowBack /></a>
                <div>
                    <h3>Detalle del Encuentro Médico({params.id})</h3>
                </div>
            </div>
            
            {detalles && detalles.map(item => (
                <div className="row row-cols-1 row-cols-md-4 g-4 mt-2 text-center ">
                    <div className="col">
                        <div className="card h-100 rounded">
                            <div className="card-body">
                                <h5 className="card-title">prestador</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100  rounded">
                            <div className="card-body ">
                                <h5 className="card-title " style={{ color: item.estado === "CREADO" ? "red" : "green" }}>{item.estado}</h5><span>Estado de encuentro</span>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100  rounded">
                            <div className="card-body">
                                <h5 className="card-title text-primary" >{item.folio_bono}</h5><span>Folio del bono</span>
                            </div>
                        </div>
                    </div>
                    {detallesAtivacion && detallesAtivacion.map(acivacion => (
                        <div className="col">
                            <div className="card h-100   rounded">
                                <div className="card-body">
                                    <h5 className="card-title">{acivacion.estadoBono}</h5><span>Activacion bono</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2 ">
                <div className="col">
                    <div className="card h-100   rounded">
                        <div className="card-body">
                            <h5 className="card-title">Encuantro medico</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Atributo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                {detalles && detalles.map(item => (
                                    <tbody className="table-group-divider" key={item.identificador}>
                                        <tr>
                                            <td>Run:</td>
                                            <td>{item.usuario}</td>
                                        </tr>
                                        <tr>
                                            <td>Creacion:</td>
                                            <td>{item.creacion}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_bonificado:</td>
                                            <td>${item.mto_bonificado}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_copago:</td>
                                            <td>${item.mto_copago}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_total:</td>
                                            <td>${item.mto_total}</td>
                                        </tr>
                                        <tr>
                                            <td>run titular:</td>
                                            <td>{item.titular}</td>
                                        </tr>
                                        <tr>
                                            <td>tramo ingreso:</td>
                                            <td>{item.tramo_ingreso}</td>
                                        </tr>
                                        <tr>
                                            <td>telefono:</td>
                                            <td>{item.telefono}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{item.email}</td>
                                        </tr>
                                        <tr>
                                            <td>credencial_utilizada:</td>
                                            <td>{item.credencial_utilizada}</td>
                                        </tr>
                                    </tbody>
                                ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col ">
                    <div className="col">
                        <div className="card h-100  rounded">
                            <div className="card-body">
                                <h5 className="card-title">beneficiario</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    {detallesP && detallesP.map(item => (

                                        <tbody className="table-group-divider" key={item.identificador}>
                                            <tr>
                                                <td>Nombre:</td>
                                                <td>{item.nombreCotizante}</td>
                                            </tr>
                                            <tr>
                                                <td>Fecha de nacimiento:</td>
                                                <td>{item.fechaNacimiento}</td>
                                            </tr>
                                            <tr>
                                                <td>Genero:</td>
                                                <td>{item.sexo}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col ">
                    {detallesSucursal && detallesSucursal.map(item => (
                        <div className="card  rounded">
                            <div className="card-body">
                                <h5 className="card-title">prestador</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    {detalles && detalles.map(itemm => (
                                        <tbody className="table-group-divider">
                                            <tr>
                                                <td>Nombre:</td>
                                                <td>{itemm.credencial_utilizada}</td>
                                            </tr>
                                            <tr>
                                                <td>RUT:</td>
                                                <td>{itemm.prestador}</td>
                                            </tr>
                                            <tr>
                                                <td>Sucursal:</td>
                                                <td>{item.codSucursal}</td>
                                            </tr>
                                            <tr>
                                                <td>Nivel Atención:</td>
                                                <td>{itemm.nivel_atencion}</td>
                                            </tr>
                                            <tr>
                                                <td>Dirección Atención:</td>
                                                <td>{item.direccion}</td>
                                            </tr>
                                            <tr>
                                                <td>Comuna:</td>
                                                <td>{item.comuna}</td>
                                            </tr>
                                            <tr>
                                                <td>Región:</td>
                                                <td>{item.region}</td>
                                            </tr>
                                        </tbody>
                                    ))
                                    }
                                </table>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            {detalles && detalles.map(itemm => (
                <div className="row row-cols-1 row-cols-md-2 g-3 mt-3">
                    <div className="col mt-">
                        <div className="col">
                            <div className="card rounded">
                                <div className="card-body">
                                    <h5 className="title">Prestaciones</h5>
                                    <table className="table table-sm" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Código</th>
                                                <th scope="col"> Glosa</th>
                                                <th scope="col"> Mto. Bonificado</th>
                                                <th scope="col">Mto. Copago</th>
                                                <th scope="col">Mto. Total</th>
                                                <th scope="col">Direccion</th>
                                            </tr>
                                        </thead>
                                        {detallesP && detallesP.map(itemn => (
                                            <tbody className="table-group-divider">
                                                {detallesBitacora && detallesBitacora.map(item => (
                                                    <tr>
                                                        <td>{itemn.codigoCaracterizacion}</td>
                                                        <td>{item.glosa}</td>
                                                        <td>${itemm.mto_bonificado}</td>
                                                        <td>${itemm.mto_copago}</td>
                                                        <td>${itemm.mto_total}</td>
                                                        <td></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col mt-2">
                            <div className="col">
                                <div className="card rounded">
                                    <div className="card-body">
                                        <h5 className="card-title">Registros copago</h5>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Correo</th>
                                                    <th scope="col">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-3">
                        <div className="col">
                            <div className="card rounded">
                                <div className="card-body">
                                    <h5 className="card-title">Acciones ejecutadas</h5>
                                    <table className=" table table-sm" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Paso </th>
                                                <th scope="col">Creacion </th>
                                                <th scope="col">Glosa </th>
                                                <th scope="col">Metadata</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {detallesBitacora && detallesBitacora.map(item => (
                                                <tr>
                                                    <td>{item.codigo}</td>
                                                    <td>{item.creacion}</td>
                                                    <td>{item.glosa}</td>
                                                    <td>{item.metadata}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </ >
    )
}
export default Detalle;