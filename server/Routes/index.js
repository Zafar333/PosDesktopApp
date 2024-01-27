const express = require("express");
const {
  uploadUserOrderData,
  getAllSalesData,
  getTodaySalesData,
  deleteTodaySalesData,
  deleteAllSalesData,
} = require("../Controller/index.js");

const router = express.Router();
exports.routes = (req, res) => {
  router.post("/userOrderData", uploadUserOrderData);
  router.get("/getTodaySales", getTodaySalesData);
  router.get("/allSalesData", getAllSalesData);
  router.delete("/removeTodaySales/:date", deleteTodaySalesData);
  router.delete("/removeDataAllSales/:date", deleteAllSalesData);

  return router;
};
