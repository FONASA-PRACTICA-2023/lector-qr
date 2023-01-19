import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Detalle() {

    const params = useParams();
    const [detalles, setDetalles] = useState([]);



    if (params.id) {
        console.log("params", params);
    }

    useEffect(() => {
        getDetalles();
    }, []);

    const getDetalles = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://10.8.160.18:8010/multiprestador/encuentro/" + params.id, requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log(res.registro)
                if (!Array.isArray(res.registro)) {
                    setDetalles([res.registro]);
                } else {
                    setDetalles(res.registro);
                }
            })
            .catch(error => {
                console.log('Error al obtener los usuarios', error);
            });
    }

    return (
        <div className='container-recurses mt-3'>
            <div className='encabezado '>
                <div>
                    <h3>Detalle del Encuentro Médico({params.id})</h3>
                </div>
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar w-25"></div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-2 ">
                <div class="col">
                    <div class="card h-100 rounded">
                        <div class="card-body">
                            <h5 class="card-title">prestador</h5>
                        </div>
                    </div>
                </div>


                <div class="col">
                    <div class="card h-100 rounded">
                        <div class="card-body">
                            <h5 class="card-title">beneficiario</h5>
                        </div>
                    </div>
             </div>
                <div class="col">
                    <div class="card h-100 rounded">
                        <div class="card-body">
                            <h5 class="card-title">beneficiario</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-4 mt-2 ">
                <div class="col">
                    <div class="card h-100 rounded">
                        <div class="card-body">
                            <h5 class="card-title">Encuantro medico</h5>
                            <table className="table table-sm" >
                                <thead>
                                    <tr>
                                        <th scope="col">Atributo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {detalles && detalles.map((item) => (
                                        <tr key={item.identificador}>
                                            <tr>
                                                
                                                <td>Run</td>
                                                <td>{item.beneficiario}</td>
                                            </tr>

                                            <tr>
                                                <td>creacion</td>
                                                <td>{item.creacion}</td>
                                            </tr>
                                            <tr>
                                                <td>mto_bonificado</td>
                                                <td>{item.mto_bonificado}</td>
                                            </tr>
                                            <tr>
                                                <td>mto_total</td>
                                                <td>{item.mto_total}</td>
                                            </tr>
                                            <tr>
                                                <td>run titular</td>
                                                <td>{item.titular}</td>
                                            </tr>
                                            <tr>
                                                <td>tramo ingreso</td>
                                                <td>{item.tramo_ingreso}</td>
                                            </tr>
                                            <tr>
                                                <td>telefono</td>
                                                <td>{item.telefono}</td>
                                            </tr>
                                            <tr>
                                                <td>email</td>
                                                <td>{item.email}</td>
                                            </tr>
                                            <tr>
                                                <td>credencial_utilizada</td>
                                                <td>{item.credencial_utilizada}</td>
                                            </tr>
                                            

                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col ">
                    <div class="col">
                        <div class="card h-100 rounded">
                            <div class="card-body">
                                <h5 class="card-title">beneficiario</h5>
                                <table className="table table-sm " >
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        <tr>
                                            <tr>Nombre</tr>
                                            <tr>Fecha de nacimiento</tr>
                                            <tr>Genero</tr>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col ">
                    <div class="card h-100 rounded">
                        <div class="card-body">
                            <h5 class="card-title">prestador</h5>
                            <table className="table table-smle " >
                                <thead>
                                    <tr>
                                        <th scope="col">Atributo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                        <tr>Atributo </tr>
                                        <tr> Nombre</tr>
                                        <tr> RUT 	</tr>
                                        <tr> Sucursal </tr>
                                        <tr> Nivel Atención </tr>
                                        <tr> Dirección Atención </tr>
                                        <tr> Comuna 	</tr>
                                        <tr> Región</tr>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row row-cols-1 row-cols-md-2 g-3 mt-3">
                <div class="col mt-3">
                    <div class="col">
                        <div class="card h-100 rounded">
                            <div class="card-body">
                                <h5 class="title">Prestaciones</h5>
                                <table className="table table-sm" >
                                    <thead>
                                        <tr>
                                            <th scope="col">Código</th>
                                            <th scope="col"> Glosa</th>
                                            <th scope="col"> Mto. Bonificado</th>
                                            <th scope="col">Mto. Copago</th>
                                            <th scope="col">Mto. Total</th>
                                            <th scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="col mt-2">
                        <div class="col">
                            <div class="card h-100 rounded">
                                <div class="card-body">
                                    <h5 class="card-title">Registros copago</h5>
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
                <div class="col mt-3">
                    <div class="col">
                        <div class="card h-100 rounded">
                            <div class="card-body">
                                <h5 class="card-title">Acciones ejecutadas</h5>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )

}



export default Detalle;