import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResumenEmision() {
    const navigate = useNavigate();
    const [confirmadas, setDataConfirmada] = useState([]);
    const [copagas, setDataCopagas] = useState([]);
    const currentDate = new Date().toISOString().slice(0, 10);


    useEffect(() => {
        getDataEmision();
    }, []);

    const getDataEmision = () => {
        let url = "https://api.fonasa.cl/SQA/MantenedorApiMP/resumen-emision-agrupado/"+ currentDate ;

        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setDataConfirmada(res.confirmadas);
                setDataCopagas(res.copagadas);
                console.log(confirmadas);
                console.log(copagas);
                console.log(currentDate);

            })
            .catch((error) => {
                console.log("Error al obtener los usuarios", error);
            });
    };


    return (
        <div className="row mt-3 p-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
                <div className="card rounded">
                    <div className="card-body">
                        <div className="card-header">
                            <h4>Confirmadas</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table w-100 ">
                                <thead>
                                    <tr>
                                        <th scope="col">prestador</th>
                                        <th scope="col">beneficiario</th>
                                        <th scope="col">mto_total</th>
                                        <th scope="col">mto_copago_total</th>
                                        <th scope="col">candidad_bas</th>
                                        <th scope="col">fecha creacion</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {confirmadas && confirmadas.map(registro => (
                                        <tr>
                                            <td>{registro.PRESTADOR}</td>
                                            <td>{registro.BENEFICIARIO}</td>
                                            <td>{registro.MTO_TOTAL}</td>
                                            <td>{registro.MTO_COPAGO_TOTAL}</td>
                                            <td>{registro.CANTIDAD_BAS}</td>

                                            <td className="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                {registro.FECHA_CREACION}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card rounded">
                    <div className="card-body">
                        <div className="card-header">
                           <h4>Copagadas</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">prestador</th>
                                        <th scope="col">beneficiario</th>
                                        <th scope="col">mto_total</th>
                                        <th scope="col">mto_copago_total</th>
                                        <th scope="col">candidad_bas</th>
                                        <th scope="col">fecha creacion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {copagas && copagas.map(copagado => (
                                        <tr>
                                            <td>{copagado.PRESTADOR}</td>
                                            <td>{copagado.BENEFICIARIO}</td>
                                            <td>{copagado.MTO_TOTAL}</td>
                                            <td>{copagado.MTO_COPAGO_TOTAL}</td>
                                            <td>{copagado.CANTIDAD_BAS}</td>
                                            <td className="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                {copagado.FECHA_CREACION}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl" >
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Detalle</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table w-100 ">
                                        <thead>
                                            <tr>
                                                <th scope="col">prestador</th>
                                                <th scope="col">beneficiario</th>
                                                <th scope="col">mto_total</th>
                                                <th scope="col">mto_copago_total</th>
                                                <th scope="col">candidad_bas</th>
                                                <th scope="col">fecha creacion</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {confirmadas && confirmadas.map(registro => (
                                                <tr>
                                                    <td>{registro.PRESTADOR}</td>
                                                    <td>{registro.BENEFICIARIO}</td>
                                                    <td>{registro.MTO_TOTAL}</td>
                                                    <td>{registro.MTO_COPAGO_TOTAL}</td>
                                                    <td>{registro.CANTIDAD_BAS}</td>

                                                    <td className="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                        {registro.FECHA_CREACION}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}

export default ResumenEmision;