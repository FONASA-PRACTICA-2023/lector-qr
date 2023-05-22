import React, { useState, useRef } from 'react';
import QrReader from "react-web-qr-reader";

function QRScanner() {
  const [qrData, setQrData] = useState('');
  const qrReaderRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const toggleCamera = () => {
    if (qrReaderRef.current) {
      qrReaderRef.current.openImageDialog();
    }
  };

  return (
    <div>
      <h2>QR Scanner</h2>
      <QrReader
        ref={qrReaderRef}
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        showViewFinder={false}
        legacyMode={true}
        facingMode="environment"
        resolution={1200}
        autoScan={true}
      />
      <button onClick={toggleCamera}>Toggle Camera</button>
      <p>Scanned Data: {qrData}</p>
    </div>
  );
}

export default QRScanner;
