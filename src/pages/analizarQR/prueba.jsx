import React, { useState, useRef } from "react";
import QrReader from "react-web-qr-reader";
import { FaQrcode } from 'react-icons/fa';

function LectorQR() {
  const [facingMode, setFacingMode] = useState("environment");
  const [delay, setDelay] = useState(300);
  const qrReaderRef = useRef(null);

  const handleCameraToggle = () => {
    if (facingMode === "environment") {
      setFacingMode("user");
    } else {
      setFacingMode("environment");
    }
  };

  return (
    <div>
      <div className="container-camara rounded d-print-inline-flex justify-content-center text-center mt-2" style={{ width: "100%" }}>
        <QrReader
          ref={qrReaderRef}
          delay={delay}
          videoConstraints={{ facingMode: facingMode }}
          style={{ width: "100%", height: "100%" }}
        />
        <button className="btn btn-outline-primary rounded d-print-inline-flex mt-2 justify-content-center text-center " onClick={handleCameraToggle} id="botnCap" style={{ width: "100%" }}>
          <FaQrcode className="mr-2" />
          girar QR
        </button>
      </div>
    </div>
  );
}

export default LectorQR;
