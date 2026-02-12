const db = require("../config/db");

exports.getAllFoodItems = async () => {
  return db.query("SELECT * FROM food_items");
};

exports.getFoodItemById = async (id) => {
  return db.query("SELECT * FROM food_items WHERE id = $1", [id]);
};