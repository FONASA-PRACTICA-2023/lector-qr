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
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Atributo</th>
                                        <th scope="col">Valor</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr>
                                        <td>Run:</td>
                                        <td>205031782</td>
                                    </tr>
                                    <tr>
                                        <td>Creacion:</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <td>mto_bonificado:</td>
                                        <td>205031782</td>
                                    </tr>
                                    <tr>
                                        <td>mto_total:</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <td>run titular:</td>
                                        <td>205031782</td>
                                    </tr>
                                    <tr>
                                        <td>tramo ingreso:</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <td>telefono:</td>
                                        <td>205031782</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>Thornton</td>
                                    </tr>
                                    <tr>
                                        <td>credencial_utilizada:</td>
                                        <td>Thornton</td>
                                    </tr>
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
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr>
                                            <td>Nombre:</td>
                                            <td>daaa</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de nacimiento:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Genero:</td>
                                            <td>@fat</td>
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
                            <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Atributo</th>
                                            <th scope="col">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr>
                                            <td>Nombre:</td>
                                            <td>daaa</td>
                                        </tr>
                                        <tr>
                                            <td>RUT:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Sucursal:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Nivel Atención:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Dirección Atención:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Comuna:</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td>Región:</td>
                                            <td>@fat</td>
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