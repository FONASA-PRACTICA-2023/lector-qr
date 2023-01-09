import { useState, useRef, useCallback, useEffect } from "react";
import QrReader from "react-web-qr-reader";
import { FaQrcode } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import useApiSnoopy from "../../hooks/useApiSnoopy";
import swal from 'sweetalert';

const videoConstraintsFrontal = {
  width: 350,
  height: 350,
  facingMode: "user",
  frameRate: 60,
  focusMode: "continuous",
  frameRate: 60,
  flashMode: "on",
  zoom: "2.5",
};
const videoConstraintsTrasera = {
  width: 350,
  height: 350,
  facingMode: { exact: "environment" },
  focusMode: "continuous",
  frameRate: 60,
  flashMode: "on",
  zoom: "2.5",

};

function Muestreo() {

  const limpiarDatos = () => {

    setUsuarios([]);
    setCaptura("");
    setLoading(false);
    setPorcentaje("");
    setEtiqueta("");
    setLabels([]);
    setEstado("");
    setDatosPersonales({});
    setRutBuscado("");
    setCasosAUGE([]);
  }

  const [usuarios, setUsuarios] = useState([]);
  const [captura, setCaptura] = useState("");
  const [loading, setLoading] = useState(false);
  const [porcentaje, setPorcentaje] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [modo, setModo] = useState(videoConstraintsFrontal);
  const payload = { imagen: captura, file_name: "foto_evaluando.jpg" };
  const [labels, setLabels] = useState([]);
  const [estado, setEstado] = useState("");
  const [datosPersonales, setDatosPersonales] = useState({});
  const [rutBuscado, setRutBuscado] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [antecedentesSigges, setAntecedentesSigges] = useState({});
  const [casosAUGE, setCasosAUGE] = useState([]);
  const qrReaderRef = useRef(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5vbWJyZSI6Ik1pZ3VlbCBIZXJuXHUwMGUxbmRleiBHb256XHUwMGUxbGV6IiwicnVuIjoiTkEiLCJtYWlsIjoibWlndWVsLmhlcm5hbmRlekBmb25hc2EuZ292LmNsIiwidXNlcm5hbWUiOiJtaWd1ZWwuaGVybmFuZGV6IiwidGlwb191c3VhcmlvIjoiTkEiLCJydXRfcHJlc3RhZG9yIjoiIiwiaW5zdGl0dWNpb24iOiIiLCJyb2xlcyI6W119LCJpYXQiOjE2NzIzMjc0NjAsImV4cCI6MTY3MjMzMTA2MCwiaXNzIjoiRm9uZG8gTmFjaW9uYWwgZGUgU2FsdWQifQ.WKq6_MvycrMMd_I3gyvkjW0JeNV52IBEbIdaD2Kb5vA"


  let apiSnoopy = useApiSnoopy();


  const callDatosPersonales = (rutd) => {
    setLoading(true);
    let url = "https://api.fonasa.cl/FONASACertificacionTrabajadorREST/"
    fetch(url + rutd, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((response) => {
        console.log({ response });
        setDatosPersonales(response);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  const callDatosMedicos = (rutd) => {
    setLoading(true);
    let rutDV = rutd.split("-")[0]
    let DV = rutd.split("-")[1]

    var raw = JSON.stringify({
      "Rut": "16932390",
      "DV": "9",
      "Contrasena": "wssigges"
    });

    let url = "https://api.fonasa.cl/FonasaConsultaSigges"

    fetch(url, {
      method: "POST",
      body: raw,
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => res.json())
      .then((response) => {

        console.log(response.Beneficiarios.Beneficiario[0].CasosAUGE.CasoAUGE);
        setCasosAUGE(response.Beneficiarios.Beneficiario[0].CasosAUGE.CasoAUGE);
        setAntecedentesSigges(response);
        if (response.Beneficiarios.Beneficiario[0].CasosAUGE.CasoAUGE.NombrePS == "") {
          console.log("hfdsaj")
        } else {
          swal({
            buttons: [false],
            icon: "success",
            timer: "2000",

          });
          setLoading(false);
        }

      })
      .catch(() => {
        console.log("error");

        swal({
          text: "Usuario no cuenta con datos AUGE",
          icon: "warning",
          timer: "2000",
          buttons: [false],

        });
        setLoading(false);
      });
  };


  const handleButtonClick = () => {
    document.getElementById("fg").style.display = "flex"

    setShowWebcam(true);
    setInterval(true)
    limpiarDatos();

  };


  function handleQrScan(result) {
    if (result) {
      setCaptura(result);
      setShowWebcam(false);

    }

    console.log("QR result:", result.data);
    let code = result.data.split("?")[1]
    console.log("rut :", code);
    let rut = code.split("&")[0]
    console.log("rut :", rut);
    let rutd = rut.split("=")[1]
    console.log(rutd);
    setRutBuscado(rutd);
    callDatosPersonales(rutd);
    callDatosMedicos(rutd);

  }

  function handleQrError(error) {
    console.error("QR error:", error);
  }
  // 


  return (
    <div >
      <div className="container-camara rounded" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}>
        {showWebcam ? (

          <QrReader
            ref={qrReaderRef}
            videoConstraints={modo}
            onScan={handleQrScan}
            onError={handleQrError}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (

          <button class="btn btn-outline-primary rounded " onClick={handleButtonClick} id="botnCap" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}><FaQrcode style={{ marginRight: "10px" }} />ESCANEAR QR</button>
        )}
      </div>
      <div className="container-tabla" style={{ marginTop: "20px", display: "none", height: "100%" }} id="fg" >

        <div className="card-body">
          <table class="table" style={{ marginTop: "20px" }}>
            <tbody>

              <ul class="list-group" style={{ background: "$blue" }}>
                <li class="list-group-item active" aria-current="true" ><BiUserCircle style={{ marginRight: "10px", fontSize: "20px" }} />Datos Afiliado</li>
                <li class="list-group-item">Nombre: {datosPersonales.nombres}</li>
                <li class="list-group-item">Apellidos: {datosPersonales.apellidoPaterno}<span>  </span>{datosPersonales.apellidoMaterno}</li>
                <li class="list-group-item">Direccion: {datosPersonales.direccionPaciente}</li>
                <li class="list-group-item">Comuna: {datosPersonales.glosaComuna}</li>
                <li class="list-group-item">Rut: {rutBuscado}</li>
                <li class="list-group-item">Sexo: {datosPersonales.sexo}</li>


              </ul>
            </tbody>
          </table>
        </div>
        </div>
        <div
        style={{overflow:"scroll"}}> 

          {casosAUGE && casosAUGE.length > 0 && (

            < table class="table" style={{ marginTop: "20px" }} id="xsx">
              <thead >

                <tr >
                  <td scope="row">Problema de salud</td>
                  <td scope="row" >Estado</td>
                  <td scope="row">Responsable</td>
                  <td scope="row">Región</td>
                  <td scope="row">Fecha de inicio</td>
                  <td scope="row">Fecha de termino</td>

                </tr>
              </thead>

              <tbody class="table-group-divider">


                {casosAUGE.map(item => (
                  <tr key={item.FechaCreacion}>
                    <td> {item.NombrePS}</td>
                    <td style={{ background: item.EstadoCaso === "Caso Cerrado" ? "#d18988" : "#c3e6cb" }}>{item.EstadoCaso}</td>
                    <td> {item.NombreEstablecimiento}</td>
                    <td> {item.Region}</td>
                    <td> {item.FechaCreacion}</td>
                    <td>{item.FechaCierre}</td>

                  </tr>

                ))}
              </tbody>
            </table>
          )}
       



      </div>
    </div >

  );
}

export default Muestreo;

