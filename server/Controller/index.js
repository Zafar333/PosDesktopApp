const { pool1 } = require("../Database/index.js");
// uploadUserOrderData function to save customer order data in database function is start here
exports.uploadUserOrderData = async (req, res) => {
  const database = await pool1.connect();
  // console.log("result2", req?.body);
  let arrayData = req?.body?.orderProduct;
  let result2;

  try {
    for (const item of arrayData) {
      result2 = await database.query(
        "insert into productOrders(productName,productQuantity,unitPrice,tax,discount,description,total,grandTotal,customerName,companyName,contactNumber,cashStatus,paidAmount,date,address,puredate) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
        [
          item?.productName,
          item?.productQuantity,
          item?.unitPrice,
          item?.tax,
          item?.discount,
          item?.description,
          item?.sum,
          req.body?.totalAmount,
          req.body?.customerName,
          req.body?.companyName,
          req.body?.contactNumber,
          req.body?.cashStatus,
          req.body?.paidAmount,
          req.body?.date,
          req.body?.address,
          req.body?.puredate,
        ]
      );
    }

    if (result2?.rowCount > 0) {
      res.json({ msg: "Order Save successfully" });
    }
  } catch (error) {
    // console.log("uuuerror", error.message);
    res.json({ error: error?.messsage });
  } finally {
    database.release();
  }
};
// uploadUserOrderData function to save customer order data in database function is end here

// getTodaySalesData function to get or retreive toaday sales data from database function is start here
exports.getTodaySalesData = async (req, res) => {
  let database = await pool1.connect();
  let result;
  try {
    result = await database.query(
      "SELECT  date,puredate,grandtotal,customername,companyname,contactnumber,cashstatus,paidamount,address, array_agg(productname) AS products,array_agg(total) AS total,array_agg(productquantity) AS quantity,array_agg(unitprice) AS unitprice,array_agg(description) AS description FROM productorders GROUP BY date,puredate,grandtotal,customername,companyname,contactnumber,cashstatus,paidamount,address  ORDER BY date"
    );
    if (result.rows.length > 0) {
      res.json({ todaySalesData2: result?.rows });
      // console.log("result", result?.rows);
    }
  } catch (error) {
    res.json(error);
  } finally {
    database.release();
  }
};
// getTodaySalesData function to get or retreive toaday sales data from database function is end here

// getAllSalesData function to get or retreive all sales data from database function is start here
exports.getAllSalesData = async (req, res) => {
  let database = await pool1.connect();
  let result;
  try {
    result = await database.query(
      "SELECT date,puredate,grandtotal,customername,companyname,contactnumber,cashstatus,paidamount,address, array_agg(productname) AS products,array_agg(total) AS total,array_agg(productquantity) AS quantity,array_agg(unitprice) AS unitprice,array_agg(description) AS description FROM productorders GROUP BY date,puredate,grandtotal,customername,companyname,contactnumber,cashstatus,paidamount,address  ORDER BY date"
    );
    if (result.rows.length > 0) {
      res.json({ allSales: result?.rows });
      // console.log("result", result?.rows);
    }
  } catch (error) {
    res.json(error);
  } finally {
    database.release();
  }
};
// getTodaySalesData function to get or retreive toaday sales data from database function is end here

// DeleteTodaySalesData function delete toaday sales data from database function is start here
exports.deleteTodaySalesData = async (req, res) => {
  let dataDelete = new Date(req?.params?.date);

  const database = await pool1.connect();
  let result;
  try {
    result = await database.query("delete from productorders where date=$1", [
      dataDelete,
    ]);

    if (result.rowCount > 0) {
      res.json({ msg: "data deleted sucessfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    database.release();
  }
};
// DeleteTodaySalesData function delete toaday sales data from database function is end here

// DeleteAllSalesData function delete toaday sales data from database function is start here

exports.deleteAllSalesData = async (req, res) => {
  let dataDelete = new Date(req?.params?.date);

  const database = await pool1.connect();
  let result;
  try {
    result = await database.query("delete from productorders where date=$1", [
      dataDelete,
    ]);

    if (result.rowCount > 0) {
      res.json({ msg: "data deleted sucessfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  } finally {
    database.release();
  }
};
// DeleteAllSalesData function delete toaday sales data from database function is end here
