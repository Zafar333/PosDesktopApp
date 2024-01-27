import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
// import Quagga from "quagga";
// import QrReader from "react-qr-reader";

const Qrcode = () => {
  const [data, setdata] = useState("hello world");
  const [size, setsize] = useState(100);
  const [qr, setqr] = useState();

  const [scannedResult, setScannedResult] = useState("");

  //   const handleScan = (data) => {
  //     if (data) {
  //       setScannedResult(data);
  //     }
  //   };

  //   const handleError = (err) => {
  //     console.error(err);
  //   };

  //   useEffect(() => {
  //     setqr(
  //       `http://api.qrserver.com/v1/create-qr-code/?data=${data}!&size=${size}x${size}`
  //     );
  //   }, [data, size]);
  return (
    <div>
      {data ? <QRCode size={500} value={data} /> : <h1>No qr</h1>}
      {/* <img src={qr} alt="img" /> */}

      <div>
        {/* <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p>Scanned Result: {scannedResult}</p> */}
      </div>
    </div>
  );
};

export default Qrcode;
