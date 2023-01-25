import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Recursos() {
    const [encuentross, setEncuentros] = useState([]);
    const [en, setEn] = useState({});
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermPrestador, setSearchTermPrestador] = useState("");

    useEffect(() => {
        getDataEncuentros();
    }, []);

    const getDataEncuentros = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("http://10.8.160.18:8010/multiprestador/encuentros", requestOptions)
            .then(response => response.json())
            .then(res => {
                setEncuentros(res.encuentros);

            })
            .catch(error => {
                console.log("Error al obtener los usuarios", error);
            });
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);

    }
    const handleSearchPrestador = (event) => {
        setSearchTermPrestador(event.target.value);
    }

    const filteredEncuentros = encuentross
    
        .filter(encuentro => encuentro.beneficiario.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .filter(encuentro => encuentro.prestador.toLowerCase().startsWith(searchTermPrestador.toLowerCase()));

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-3 text-center">Operación canal multiprestador</h1>
                </div>
            </div>
            <h3 className="card-title text-center mb-2">Registros de Credenciales</h3>
            <form >
                <div className="row w-50 mx-auto">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Buscar beneficiario" value={searchTerm} onChange={handleSearch} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Buscar prestador" value={searchTermPrestador} onChange={handleSearchPrestador} />
                    </div>
                </div>
            </form>
            <table className="table border mt-3 mx-auto ">
                <thead className="bg-light">
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
                            <td className="text-primary" onClick={() => {
                                setEn(encuentross[index]);
                                navigate(`/Encuentro/` + encuentro.identificador);
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
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Recursos;