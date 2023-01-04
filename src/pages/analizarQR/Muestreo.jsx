import { useState, useRef, useCallback,useEffect } from "react";
import Webcam from "react-webcam";
import { Camera } from 'react-feather';


const videoConstraintsFrontal = {
  width: 500,
  height: 500,
  facingMode: "user",
  frameRate: 60,
};
const videoConstraintsTrasera = {
  width: 400,
  height: 400,
  facingMode: { exact: "environment" },
  focusMode: "auto",
  frameRate: 60,
  zoom:3.0,
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
}


  const [usuarios, setUsuarios] = useState([]);
  const [captura, setCaptura] = useState("");
  const [loading, setLoading] = useState(false);
  const [porcentaje, setPorcentaje] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [camara, setCamara] = useState("TRASERA");
  const [modo, setModo] = useState(videoConstraintsFrontal);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const payload = { imagen: captura, file_name: "foto_evaluando.jpg" };
  const [labels, setLabels] = useState([]);
  const [estado, setEstado] = useState("");
  const [datosPersonales, setDatosPersonales] = useState({});
  const [rutBuscado, setRutBuscado] = useState("");
  const webcamRef = useRef(null);
  const [datosMadicos, setDatosMedicos] = useState({});
  const qrRef = useRef(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [antecedentesSigges,setAntecedentesSigges]= useState(null);
  


  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5vbWJyZSI6Ik1pZ3VlbCBIZXJuXHUwMGUxbmRleiBHb256XHUwMGUxbGV6IiwicnVuIjoiTkEiLCJtYWlsIjoibWlndWVsLmhlcm5hbmRlekBmb25hc2EuZ292LmNsIiwidXNlcm5hbWUiOiJtaWd1ZWwuaGVybmFuZGV6IiwidGlwb191c3VhcmlvIjoiTkEiLCJydXRfcHJlc3RhZG9yIjoiIiwiaW5zdGl0dWNpb24iOiIiLCJyb2xlcyI6W119LCJpYXQiOjE2NzIzMjc0NjAsImV4cCI6MTY3MjMzMTA2MCwiaXNzIjoiRm9uZG8gTmFjaW9uYWwgZGUgU2FsdWQifQ.WKq6_MvycrMMd_I3gyvkjW0JeNV52IBEbIdaD2Kb5vA"

  const capture = useCallback(() => {
    
    const imageSrc = webcamRef.current.getScreenshot();
    setCaptura(imageSrc);
    // updateCaptura(imageSrc);
  
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
        console.log({ response});
        setDatosPersonales(response);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
      callDatosMedicos(rut);
  };

  const callDatosMedicos = (rut) => {
    let rutDV = rut.split("-")[0]
    let DV = rut.split("-")[1]
    setLoading(true);
    var raw = JSON.stringify({
      "Rut": rutDV,
      "DV": DV,
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
        console.log({ response});
        setAntecedentesSigges(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };


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
    setShowWebcam(true);
    setInterval(true)
    limpiarDatos();
  };


  return (
    <div >
      <div className="container-camara" style={{display:"flex", justifyContent:"center",alignItems:"center",width:"100%", marginTop:"20px"}}>
          {showWebcam ? (
            <Webcam
                ref={webcamRef}
                delay={300}
                onError={handleError}
                videoConstraints={modo}
                autoFocus = {true}
                zoom = {8}
            ></Webcam>
            ) : (
              <button className="btn btn-success btn-lg" onClick={handleButtonClick} id="botnCap">Leer codeQR  <Camera/></button>
              
          )}  
      </div>

     
      <div className="container-tabla">
        <div className="card-header" style={{color: "white"}}>Resultados</div>
            <div className="card-body">
              <table class="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <th scope="row">Nombre: {datosPersonales.nombres}</th>
                        <th scope="row">Rut: {rutBuscado}</th>
                        <th scope="row">Comuna: {datosPersonales.glosaComuna}</th>
                        
                        </tr>
                        <tr >
                        <th scope="row">Apellidos: {datosPersonales.apellidoPaterno}<span>  </span>{datosPersonales.apellidoMaterno}</th>
                        <th scope="row">Direccion: {datosPersonales.direccionPaciente}</th>
                        <th scope="row">Grupo: {datosPersonales.grupoIngreso}</th>
                        </tr>
                        
                        
                        
                    </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}

export default Muestreo;


