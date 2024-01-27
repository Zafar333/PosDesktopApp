import React, { useRef } from "react";
import "./printPage.css";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";

const PrintPage = () => {
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <div ref={printRef} className="printPageContainer">
        <div>I am print</div>
      </div>
    </div>
  );
};

export default PrintPage;
