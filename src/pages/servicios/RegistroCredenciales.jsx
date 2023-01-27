import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Recursos() {
    const [encuentros, setEncuentros] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getDataEncuentros();
    }, []);

    const getDataEncuentros = () => {
        let url = "https://api.fonasa.cl/SQA/MantenedorApiMP/encuentros";

        fetch(url)
            .then((response) => response.json())
            .then((res) => {
                setEncuentros(res.encuentros);
            })
            .catch((error) => {
                console.log("Error al obtener los usuarios", error);
            });
    };

    const filteredEncuentros = encuentros.filter((encuentro) =>
        encuentro.beneficiario.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        encuentro.prestador.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="w-100 p-5" >
            <div className="row">
                <div className="col-12">
                    
                    <h1 className="mb-3 text-center">Operación canal multiprestador</h1>
                </div>
            </div>
            <div className="card rounded w-100 mx-auto" >
                <h5 className="card-header bg-primary-subtle">
                    <h4>Registro de credenciales</h4>
                    <input
                        type="text"
                        className="form-control mt-2"
                        style={{width:"300px"}}
                        placeholder="Buscar por rut"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </h5>
                <div className="card-body w-100">
                    <div className="table-responsive w-100 " >
                        <table className="table w-100" 

                        >
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
                            <tbody>
                                {filteredEncuentros.map((encuentro, index) => (
                                    <tr key={index}>
                                        <td
                                            className="text-primary"
                                            onClick={() => {
                                                navigate(`/Encuentro/` + encuentro.identificador);
                                            }}
                                        >{encuentro.creacion}</td>
                                        <td>{encuentro.prestador}</td>
                                        <td>{encuentro.beneficiario}</td>
                                        <td>{encuentro.estado}</td>
                                        <td>{encuentro.mto_bonificado}</td>
                                        <td>{encuentro.mto_copago}</td>
                                        <td>{encuentro.mto_total}</td>
                                        <td>{encuentro.sucursal}</td>
                                        <td>{encuentro.folio_bono}</td>
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

export default Recursos;