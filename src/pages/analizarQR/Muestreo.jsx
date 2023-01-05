import { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { HiQrCode } from "react-icons/hi2";
import { MdCameraswitch } from "react-icons/md";





const videoConstraintsFrontal = {
  width: 350,
  height: 350,
  facingMode: "user",
  frameRate: 60,
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

const ImagenCapturada = ({ data }) => <img alt="hhh" src={`${data}`} />;

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
    // setAntecedentesSigges([]);
    setCasosAUGE([]);
  }


  const [usuarios, setUsuarios] = useState([]);
  const [captura, setCaptura] = useState("");
  const [loading, setLoading] = useState(false);
  const [porcentaje, setPorcentaje] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [camara, setCamara] = useState("TRASERA");
  const [modo, setModo] = useState(videoConstraintsTrasera);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const payload = { imagen: captura, file_name: "foto_evaluando.jpg" };
  const [labels, setLabels] = useState([]);
  const [estado, setEstado] = useState("");
  const [datosPersonales, setDatosPersonales] = useState({});
  const [rutBuscado, setRutBuscado] = useState("");
  const webcamRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [antecedentesSigges, setAntecedentesSigges] = useState({});
  const [casosAUGE, setCasosAUGE] = useState([]);




  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5vbWJyZSI6Ik1pZ3VlbCBIZXJuXHUwMGUxbmRleiBHb256XHUwMGUxbGV6IiwicnVuIjoiTkEiLCJtYWlsIjoibWlndWVsLmhlcm5hbmRlekBmb25hc2EuZ292LmNsIiwidXNlcm5hbWUiOiJtaWd1ZWwuaGVybmFuZGV6IiwidGlwb191c3VhcmlvIjoiTkEiLCJydXRfcHJlc3RhZG9yIjoiIiwiaW5zdGl0dWNpb24iOiIiLCJyb2xlcyI6W119LCJpYXQiOjE2NzIzMjc0NjAsImV4cCI6MTY3MjMzMTA2MCwiaXNzIjoiRm9uZG8gTmFjaW9uYWwgZGUgU2FsdWQifQ.WKq6_MvycrMMd_I3gyvkjW0JeNV52IBEbIdaD2Kb5vA"

  const capture = useCallback(() => {

    const imageSrc = webcamRef.current.getScreenshot();
    setCaptura(imageSrc);

  }, [webcamRef]);


  const callSubirImagen = () => {
    setLoading(true);
    fetch("https://api.fonasa.cl/LectorQR/recibir-imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        setNombreArchivo(response.file_name);
        callDatosPersonales(response.decodificado.rut);
        callDatosMedicos(response.decodificado.rut);
        console.log(response.decodificado.rut);
        setRutBuscado(response.decodificado.rut);
        setLoading(false);
      })
      .catch(() => {
        console.log("error")
        setLoading(false);
      });
  };

  const callDatosPersonales = (rut) => {
    setLoading(true);
    let url = "https://api.fonasa.cl/FONASACertificacionTrabajadorREST/"
    fetch(url + rut, {
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
    // callDatosMedicos(rut);
  };

  const callDatosMedicos = (rut) => {
    setLoading(true);
    let rutDV = rut.split("-")[0]
    let DV = rut.split("-")[1]

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
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  const cambiarCamara = () => {
    if (camara === "TRASERA") {
      setCamara("FRONTAL");
      setModo(videoConstraintsFrontal);
    } else {
      setCamara("TRASERA");
      setModo(videoConstraintsTrasera);
    }
  }


  const handleError = (err) => {
    console.error(err);
  };


  useEffect(() => {
    if (rutBuscado !== '') {
      setShowWebcam(false)

      return;
    }

    const interval = setInterval(() => {
      capture();
      callSubirImagen();
    }, 500);

    return () => clearInterval(interval);
  }, [rutBuscado, capture, callSubirImagen]);


  const handleButtonClick = () => {
    document.getElementById("fg").style.display = "flex"

    setShowWebcam(true);
    setInterval(true)
    limpiarDatos();
  };



  return (
    <div >
      <div className="container-camara rounded" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}>
        {showWebcam ? (

          <Webcam
            ref={webcamRef}
            delay={300}
            onError={handleError}
            videoConstraints={modo}
            focusMode="continuous"
            className="rounded-5 border border-1"
            forceScreenshotSourceSize={{ width: 400, height: 400 }}

          ></Webcam>
        ) : (
          <button class="btn btn-outline-primary rounded " onClick={handleButtonClick} id="botnCap" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "20px" }}><HiQrCode /> ESCANEAR QR</button>
        )}
      </div>

      <div className="container-tabla" style={{ marginTop: "20px", display: "none" }} id="fg">

        <div className="card-body">
          <div>
            <button class="btn btn-outline-primary rounded " onClick={cambiarCamara} id="botn" style={{ display: "flex", width: "8%" }}><MdCameraswitch style={{ width: "100%" }} /></button>

          </div>
          <table class="table" style={{ marginTop: "20px" }}>
            <tbody>
              <ul class="list-group" style={{ background: "$blue" }}>
                <li class="list-group-item active" aria-current="true" >Datos Afiliado</li>
                <li class="list-group-item">Nombre: {datosPersonales.nombres}</li>
                <li class="list-group-item">Apellidos: {datosPersonales.apellidoPaterno}<span>  </span>{datosPersonales.apellidoMaterno}</li>
                <li class="list-group-item">Direccion: {datosPersonales.direccionPaciente}</li>
                <li class="list-group-item">Comuna: {datosPersonales.glosaComuna}</li>
                <li class="list-group-item">Rut: {rutBuscado}</li>
                <li class="list-group-item">Sexo: {datosPersonales.sexo}</li>

              </ul>

            </tbody>
          </table>
          <table class="table" style={{ marginTop: "20px" }}>
            <thead >
              <tr style={{ background: "#0f69b4", color: "white" }}>
                <th scope="row">Nombre establecimiento</th>
                <th scope="row">Region</th>
                <th scope="row">Caso</th>
                <th scope="row" >Estado de caso </th>
                <th scope="row">Fecha de inicio </th>
                <th scope="row">Fecha de termino</th>
              </tr>
            </thead>
            <tbody>

              {casosAUGE.map(item => (
                <tr key={item.FechaCreacion}>
                  <td> {item.NombreEstablecimiento}</td>
                  <td> {item.Region}</td>
                  <td> {item.NombrePS}</td>
                  <td style={{ color: item.EstadoCaso === "Caso Cerrado" ? "red" : "green" }}>{item.EstadoCaso}</td>
                  <td> {item.FechaCreacion}</td>
                  <td>{item.FechaCierre}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Muestreo;

