const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

router.get("/", foodController.getFoods);

module.exports = router;