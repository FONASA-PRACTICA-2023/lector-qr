import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TfiReload } from 'react-icons/tfi';


function Recursos() {
    const [encuentros, setEncuentros] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [value, setValue] = React.useState(dayjs(""));
    const [fecha, setFecha] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState(null);

    const handleReset = () => {
        setFechaFiltro(null);
        getDataEncuentros();
    }


    const handleChange = async (newValue) => {
        setFechaFiltro(dayjs(newValue.$d).format("YYYY-MM-DD"))
        await fetch(`` + dayjs(newValue.$d).format("YYYY-MM-DD"))
            .then((response) => response.json())

            .then((res) => {
                setFecha(res.encuentros);
            })

            .catch((error) => {
                console.log("Error al obtener los usuarios", error);
            });
    };


    useEffect(() => {
        getDataEncuentros();
    }, []);



    const getDataEncuentros = () => {

        fetch("https://api.fonasa.cl/SQA/MantenedorApiMP/encuentros")
            .then((response) => response.json())

            .then((res) => {
                setEncuentros(res.encuentros);
                console.log(encuentros);
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
            <div className="card rounded w-100 mx-auto  " >
                <div className="card-header bg-primary-subtle d-flex justify-content-between">
                    <div>
                        <h4><button className="btn btn-primary" onClick={handleReset}><TfiReload/></button> Registro de credenciales
                        </h4>
                        <input
                            type="text"
                            className="form-control mt-2"
                            style={{ width: "300px" }}
                            placeholder="Filtrar por run"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="mt-2 ">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Filtrar por fecha"
                                    inputFormat="YYYY-MM-DD"
                                    value={fechaFiltro}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <div>
                        </div>
                    </div>
                </div>
                <div className="card-body w-100 shadow">
                    <div className="table-responsive w-100 " >

                        <table className="table w-100">
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
                                {fechaFiltro ? fecha.map((fecha, index) => (
                                    <tr key={index}>
                                        <td
                                            className="text-primary"
                                            onClick={() => {
                                                navigate(`/Encuentro/` + fecha.identificador);
                                            }}
                                        >{fecha.creacion}</td>
                                        <td>{fecha.prestador}</td>
                                        <td>{fecha.beneficiario}</td>
                                        <td>{fecha.estado}</td>
                                        <td>{fecha.mto_bonificado}</td>
                                        <td>{fecha.mto_copago}</td>
                                        <td>{fecha.mto_total}</td>
                                        <td>{fecha.sucursal}</td>
                                        <td>{fecha.folio_bono}</td>
                                    </tr>
                                )) : filteredEncuentros.map((encuentro, index) => (
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
                                    </tr>))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div >

        </div >
    )
}

export default Recursos;