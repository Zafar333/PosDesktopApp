import React, { useEffect, useState } from "react";
import "./allSales.css";
import axios from "axios";
import { Button } from "antd";

const AllSales = () => {
  const [allSalesData, setAllSalesData] = useState();

  useEffect(() => {
    getAllDataApiFun();
  }, []);
  async function getAllDataApiFun() {
    try {
      let res = await axios.get("http://localhost:4000/allSalesData");
      if (res?.status == 200) {
        setAllSalesData(res?.data?.allSales);
      }
    } catch (error) {
      alert(error);
    }
  }
  // delete AllSalesTableDataFun to delete data from database function start is here
  async function allSalesTableDataDeleteFun(date) {
    try {
      let res = await axios.delete(
        `http://localhost:4000/removeDataAllSales/${date}`
      );
      if (res?.status == 200) {
        alert(res?.data?.msg);
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  // delete AllSalesTableDataFun to delete data from database function end is here
  return (
    <div>
      <div className="allSalesContainer">
        <div className="allSalesTextLogo">All Sales Data Table</div>
        <div className="allSalesTableView">
          <table className="allSalesTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Company Name</th>
                <th>Product Name</th>
                <th>Product Qunatity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Cash Status</th>
                <th>Paid Amount</th>
                <th>Grand Total</th>
                <th>Remaining Amount</th>
                <th>Description</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {allSalesData ? (
                allSalesData?.map((item, ind) => (
                  <tr key={ind}>
                    <td>{ind}</td>
                    <td>{item?.customername}</td>
                    <td>{item?.companyname}</td>
                    <td>
                      <div className="tableCell">
                        {item?.products.map((item2) => (
                          <div className="tableChildCell">{item2}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="tableCell">
                        {item?.quantity.map((item2) => (
                          <div className="tableChildCell">{item2}</div>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="tableCell">
                        {item?.unitprice.map((item2) => (
                          <div className="tableChildCell">{item2}</div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="tableCell">
                        {item?.total.map((item2) => (
                          <div className="tableChildCell">{item2}</div>
                        ))}
                      </div>
                    </td>

                    <td>{item?.cashstatus}</td>
                    <td>{item?.paidamount}</td>
                    <td>{item?.grandtotal}</td>
                    <td>{item?.grandtotal - item?.paidamount}</td>
                    <td>
                      <div className="tableCell">
                        {item?.description.map((item2) => (
                          <div className="tableChildCell">{item2}</div>
                        ))}
                      </div>
                    </td>
                    <td>{item?.contactnumber}</td>

                    <td>{item?.address}</td>
                    <td>{item?.puredate}</td>
                    <td>
                      <Button
                        danger
                        onClick={() => allSalesTableDataDeleteFun(item.date)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={"18"}>No Record</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllSales;
