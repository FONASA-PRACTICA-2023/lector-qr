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
    const [detalleBono, setDetallesBono] = useState([]);
    const [copa, setDetallesCopagos] = useState([]);
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
            const { registro, paciente, sucursal, bitacora, activacion, vt_bono, copagos } = data;
            let detalles, detallesPaciente, detallesSucursal, detallesBitacora, detallesAtivacion, detalleBono, copa;

            if (!Array.isArray(registro)) {
                detalles = [registro];
                detallesPaciente = [paciente];
                detallesSucursal = [sucursal];
                detallesBitacora = bitacora;
                copa = copagos
                detalleBono = [vt_bono];

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
                console.log(detalleBono);
            } else {
                detalles = registro;
                detallesPaciente = paciente;
                detallesSucursal = sucursal;
                detallesBitacora = bitacora;
                detallesAtivacion = activacion;
                detalleBono = vt_bono;
                copa = copagos;
            }
            setDetalles(detalles);
            setDetallesP(detallesPaciente);
            setDetallesS(detallesSucursal);
            setDetallesB(detallesBitacora);
            setDetallesCopagos(copa);
            setDetallesBono(detalleBono);
            setDetallesActivacion(detallesAtivacion);

            console.log(detallesAtivacion);
        } catch (error) {
            console.log("Error al obtener detalles: ", error);
        }
    };
    return (

        <div className="container">
            <div className="encabezado ">
                <a className="fs-1" onClick={() => {
                    navigate("/RegistrosCredenciales");
                }}><IoArrowBack /></a>

                <h3>Detalle del Encuentro Médico({params.id})</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-4 g-2 mt-2 text-center ">
                {detalleBono && detalleBono.map(bono => (
                    <div className="col">
                        <div className="card h-100 rounded-1">
                            <div className="card-body">
                                <h5 className="card-title fs-6 ">{bono.nomPrestador}</h5><span>prestador</span>
                            </div>
                        </div>

                    </div>
                ))}
                {detalles && detalles.map(registro => (
                    <div className="col">
                        <div className="card h-100 rounded-1">
                            <div className="card-body ">
                                <h5 className="card-title fs-6 " style={{ color: registro.estado === "CREADO" ? "red" : "green" }}>{registro.estado}</h5><span>Estado de encuentro</span>
                            </div>
                        </div>
                    </div>))}
                {detalles && detalles.map(registro => (
                    <div className="col">
                        <div className="card h-100 rounded-1">
                            <div className="card-body">
                                <h5 className="card-title text-primary" >{registro.folio_bono}</h5><span>Folio del bono</span>
                            </div>
                        </div>
                    </div>))}
                {detallesAtivacion && detallesAtivacion.map(acivacion => (
                    <div className="col">
                        <div className="card h-100 rounded-1">
                            <div className="card-body">
                                {acivacion.estadoBono !== null ? (
                                    <>
                                        <h5 className="card-title">{acivacion.estadoBono}</h5>
                                        <span>Activacion bono</span>
                                    </>
                                ) : (
                                    <h5 className="card-title">Sin activacion de bono</h5>
                                )}
                            </div>
                        </div>
                    </div>
                ))}


            </div>
            <div className="row row-cols-1 row-cols-md-3 mt-2 g-2">
                <div className="col">
                    <div className="card h-100 rounded-1">
                        <div className="card-body">
                            <h5 className="card-title">Encuantro medico</h5>
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Atributo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                {detalles && detalles.map(registro => (
                                    <tbody className="table-group-divider" key={registro.identificador}>
                                        <tr>
                                            <td>Run beneficiario:</td>
                                            <td>{registro.beneficiario}</td>
                                        </tr>
                                        <tr>
                                            <td>Creacion:</td>
                                            <td>{registro.creacion}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_bonificado:</td>
                                            <td>${registro.mto_bonificado}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_copago:</td>
                                            <td>${registro.mto_copago}</td>
                                        </tr>
                                        <tr>
                                            <td>mto_total:</td>
                                            <td>${registro.mto_total}</td>
                                        </tr>
                                        <tr>
                                            <td>Run titular:</td>
                                            <td>{registro.titular}</td>
                                        </tr>
                                        <tr>
                                            <td>tramo ingreso:</td>
                                            <td>{registro.tramo_ingreso}</td>
                                        </tr>
                                        <tr>
                                            <td>telefono:</td>
                                            <td>{registro.telefono}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{registro.email}</td>
                                        </tr>
                                        <tr>
                                            <td>credencial_utilizada:</td>
                                            <td>{registro.credencial_utilizada}</td>
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
                        <div className="card h-100 rounded-1">
                            <div className="card-body">
                                <h5 className="card-title">beneficiario</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    {detallesP && detallesP.map(persona => (
                                        <tbody className="table-group-divider" key={persona.identificador}>
                                            <tr>
                                                <td>Nombre:</td>
                                                <td>{persona.nombreCotizante}</td>
                                            </tr>
                                            <tr>
                                                <td>Fecha de nacimiento:</td>
                                                <td>{persona.fechaNacimiento}</td>
                                            </tr>
                                            <tr>
                                                <td>Genero:</td>
                                                <td>{persona.sexo}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col ">
                    {detallesSucursal && detallesSucursal.map(sucursal => (
                        <div className="card h-100 rounded-1">
                            <div className="card-body">
                                <h5 className="card-title">Prestador</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    {detalles && detalles.map(registro => (
                                        <tbody className="table-group-divider">
                                            <tr>
                                                <td>Nombre:</td>
                                                <td>{registro.credencial_utilizada}</td>
                                            </tr>
                                            <tr>
                                                <td>RUT:</td>
                                                <td>{registro.prestador}</td>
                                            </tr>
                                            <tr>
                                                <td>Sucursal:</td>
                                                <td>{sucursal.codSucursal}</td>
                                            </tr>
                                            <tr>
                                                <td>Nivel Atención:</td>
                                                <td>{registro.nivel_atencion}</td>
                                            </tr>
                                            <tr>
                                                <td>Dirección Atención:</td>
                                                <td>{sucursal.direccion}</td>
                                            </tr>
                                            <tr>
                                                <td>Comuna:</td>
                                                <td>{sucursal.comuna}</td>
                                            </tr>
                                            <tr>
                                                <td>Región:</td>
                                                <td>{sucursal.region}</td>
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
            {detalles && detalles.map(registro => (
                <div className="row row-cols-1 row-cols-md-2 g-2 mt-2">
                    <div >
                        <div className="col">
                            <div className="card h-100 rounded-1">
                                <div className="card-body">
                                    <h5 className="title">Prestaciones</h5>
                                    <table className="table" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Código</th>
                                                <th scope="col"> Glosa</th>
                                                <th scope="col"> Mto. Bonificado</th>
                                                <th scope="col">Mto. Copago</th>
                                                <th scope="col">Mto. Total</th>
                                                <th scope="col">cantidad</th>
                                            </tr>
                                        </thead>
                                        {detallesP && detallesP.map(persona => (
                                            <tbody className="table-group-divider">
                                                {detallesBitacora && detallesBitacora.map((item, numero) => (
                                                    <tr>
                                                        <td>{persona.codigoCaracterizacion}</td>
                                                        <td>{item.glosa}</td>
                                                        <td>${registro.mto_bonificado}</td>
                                                        <td>${registro.mto_copago}</td>
                                                        <td>${registro.mto_total}</td>
                                                        <td>{numero + 1}</td>
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
                                <div className="card h-100 rounded-1">
                                    {copa && copa.map(copago => (
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
                                                    <td>{copago[0]}</td>
                                                    <td>{copago[1]}</td>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="col">
                            <div className="card h-100 rounded-1 ">
                                <div className="card-body">
                                    <h5 className="card-title">Acciones ejecutadas</h5>

                                    <div className="card-text ">
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
                                            {detallesBitacora && detallesBitacora.map(bitacora => (
                                                <tr>
                                                    <td>{bitacora.codigo}</td>
                                                    <td>{bitacora.creacion}</td>
                                                    <td>{bitacora.glosa}</td>
                                                    <td>{bitacora.metadata}</td>
                                                   
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                        
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div >
    )
}
export default Detalle;