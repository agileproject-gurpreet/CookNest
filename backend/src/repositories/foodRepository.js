const db = require("../config/db");

exports.getAllFoodItems = async () => {
  return db.query("SELECT * FROM food_items");
};