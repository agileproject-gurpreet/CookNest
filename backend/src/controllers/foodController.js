const foodService = require("../services/foodService");

exports.getFoods = async (req, res) => {
  const result = await foodService.listFoodItems();
  res.json(result.rows);
};

exports.getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await foodService.getFoodItemById(id);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Food item not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ error: "Failed to fetch food item" });
  }
};