const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.post("/", controller.placeOrder);
router.get("/:userId", controller.getOrders);

module.exports = router;