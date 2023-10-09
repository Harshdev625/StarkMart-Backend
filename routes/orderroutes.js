const express = require("express");

const { fetchOrderByUser, createOrder, deleteFromOrder, updateOrder } = require("../controllers/orderscontrollers");
const router = express.Router();
router
  .post("/", createOrder)
  .get("/", fetchOrderByUser)
  .delete("/:id", deleteFromOrder)
  .patch("/:id", updateOrder);
exports.router = router;
