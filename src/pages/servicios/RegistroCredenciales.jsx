import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Recursos() {
    const [encuentross, setEncuentros] = useState([]);
    const [en, setEn] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);



    const getData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://10.8.160.18:8010/multiprestador/encuentros", requestOptions)
            .then(response => response.json())
            .then(res => {
                setEncuentros(res.encuentros);

            })
            .catch(error => {
                console.log('Error al obtener los usuarios', error);
            });
    }

    return (
        
        <div className='container-recurses'>
            <div className='menu'>
                <div className='w-auto p-3 d-flex justify-content-center'>
                    <h1 className="mb-3">GESTION DE AUTORIZACIONES</h1>
                </div>
            </div>
            

            
                    <div className="  card  rounded overflow-auto heigth-300 overflow-x-auto" style={{height:"800px"}}>
                        <div >
                            <h3>REGISTROS DE CREDENCIALES</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">creacion</th>
                                        <th scope="col">prestador</th>
                                        <th scope="col">beneficiario</th>
                                        <th scope="col">estado</th>
                                        <th scope="col">mto_bonificado</th>
                                        <th scope="col">mto_copago</th>
                                        <th scope="col">mto_total</th>
                                        <th scope="col">sucursal</th>
                                        <th scope="col">folio_bono</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider ">

                                    {encuentross.map((encuentro, index) => (
                                        <tr key={index}>
                                            <td className='text-primary' onClick={() => {
                                                setEn(encuentross[index]);
                                                navigate(`/Encuentro/`+encuentro.identificador);
                                            }}>{encuentro.creacion}</td>
                                            <td>{encuentro.prestador}</td>
                                            <td>{encuentro.beneficiario}</td>
                                            <td>{encuentro.estado}</td>
                                            <td>{encuentro.mto_bonificado}</td>
                                            <td>{encuentro.mto_copago}</td>
                                            <td>{encuentro.mto_total}</td>
                                            <td>{encuentro.sucursal}</td>
                                            <td>{encuentro.folio_bono}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
          
    )

}



export default Recursos;