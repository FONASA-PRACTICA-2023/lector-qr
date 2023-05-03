import { useState, useRef } from "react";
import QrReader from "react-web-qr-reader";
import { FaQrcode } from 'react-icons/fa';

const videoConstraintsTrasera = {
  width: 350,
  height: 350,
  facingMode: { exact: "environment" },
  focusMode: "continuous",
  frameRate: 60,
};

function LectorQR() {
  

  const qrReaderRef = useRef(null);

  return (
    <div >
      <div className="container-camara rounded d-print-inline-flex justify-content-center text-center mt-2" style={{ width: "100%" }}>
          <QrReader
            delay={300}
            ref={qrReaderRef}
            videoConstraints={videoConstraintsTrasera}
            style={{ width: "100%", height: "100%" }}
          />
      </div>
      
      </div>
  );
}

export default LectorQR;

