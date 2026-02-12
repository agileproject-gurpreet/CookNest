const foodRepo = require("../repositories/foodRepository");

exports.listFoodItems = async () => {
  return foodRepo.getAllFoodItems();
};

exports.getFoodItemById = async (id) => {
  return foodRepo.getFoodItemById(id);
};