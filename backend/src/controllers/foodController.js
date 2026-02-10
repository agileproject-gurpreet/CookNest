const foodService = require("../services/foodService");

exports.getFoods = async (req, res) => {
  const result = await foodService.listFoodItems();
  res.json(result.rows);
};