import { useState, useRef, useCallback } from "react";

import Webcam from "react-webcam";

const videoConstraintsTrasera = {
  width: 640,
  height: 640,
  facingMode: { exact: "environment" },
};

const videoConstraintsFrontal = {
  width: 640,
  height: 640,
  facingMode: "user",
};

const ImagenCapturada = ({ data }) => <img alt="hhh" src={`${data}`} />;

function Muestreo() {
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

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [linkMaps, setLinkMaps] = useState("");

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCaptura(imageSrc);
  }, [webcamRef]);

  const buscarCordenadas = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLinkMaps(
        "https://www.google.com/maps/search/?api=1&query=" +
          position.coords.latitude +
          "," +
          position.coords.longitude
      );
      console.log("linkMaps is :", linkMaps);
    });
  };

  const callSubirImagen = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/recibir-imagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        setNombreArchivo(response.file_name);
        buscarCordenadas();
        callDescomponer(response.file_name);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };

  const callDescomponer = (img_file) => {
    setLoading(true);
    let request = { img_file: img_file };
    console.log("request", request);
    fetch(process.env.REACT_APP_WS_DESCOMPONER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log({ response });
        setEstado(response.modelo);
        setNombreArchivo(response.img_final);
        setLabels(response.sub_imagenes);
        setCaptura(response.img_final);
        buscarCordenadas();
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col camera d-felx">
            {!captura && (
              <Webcam
                audio={false}
                height={640}
                screenshotFormat="image/jpeg"
                width={640}
                ref={webcamRef}
                videoConstraints={modo}
              ></Webcam>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mb-3">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-success btn-lg" onClick={capture}>
              <i className="bi bi-camera"></i>
              Capturar
            </button>{" "}
            <button
              className="btn btn-primary"
              onClick={() => {
                if (camara === "TRASERA") {
                  setCamara("FRONTAL");
                  setModo(videoConstraintsFrontal);
                } else {
                  setCamara("TRASERA");
                  setModo(videoConstraintsTrasera);
                }
              }}
            >
              <i className="bi bi-phone-flip"></i>
            </button>
          </div>
        </div>

        {captura && (
          <>
            <div className="row">
              <div className="col camera d-flex">
                <ImagenCapturada data={captura} />
              </div>
            </div>

            <div className="row">
              <div className="col d-flex">
                <div
                  className="btn-group "
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => {
                      setCaptura("");
                    }}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                    Tomar Otra vez
                  </button>

                  <button className="btn btn-primary " onClick={callSubirImagen}>
                  <i class="bi bi-check-lg"></i>
                    Análizar Código
                  </button>

                  {loading && (
                    <button className="btn btn-warning" type="button" disabled>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Procesando...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="card text-white">
          <div className="card-header">Procesamiento</div>
          <div className="card-body">
            <h5 className="card-title">Resultados</h5>
            <table class="table text-light">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">xxxxxx</th>
                      <td>vvvvvv</td>
                    </tr>
                  </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Muestreo;
