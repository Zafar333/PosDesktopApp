import React, { useEffect, useState } from "react";
import "./todaySales.css";
import axios from "axios";
import { Button } from "antd";

const TodaySales = () => {
  const [arrangeData, setArrangeData] = useState();
  // let newDate;
  useEffect(() => {
    getTodaySalesDataFun();
  }, []);

  async function getTodaySalesDataFun() {
    try {
      let res = await axios.get("http://localhost:4000/getTodaySales");
      if (res?.status == 200) {
        setArrangeData(res?.data?.todaySalesData2);
      }
    } catch (error) {
      alert(error);
    }
  }

  async function toDaySalesDataDeleteFun(date) {
    console.log("delete date", date);

    try {
      let res = await axios.delete(
        `http://localhost:4000/removeTodaySales/${date}`
      );
      if (res?.status == 200) {
        alert(res?.data?.msg);
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <div className="todaySalesContainer">
        <p className="todaySalesTextLogo">Today Sales Data Table</p>
        <div className="todaySalesTableView">
          <table className="todaySalesTable">
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
              {arrangeData ? (
                arrangeData?.map((item, ind) => (
                  <tr key={ind}>
                    <td>{ind}</td>
                    <td>{item?.customername}</td>
                    <td>{item?.companyname}</td>
                    <td>
                      <div className="tableCell">
                        {item?.products.map((item2, ind) => (
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
                        onClick={() => toDaySalesDataDeleteFun(item?.date)}
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

export default TodaySales;
