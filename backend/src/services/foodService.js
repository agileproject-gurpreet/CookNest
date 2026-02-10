const foodRepo = require("../repositories/foodRepository");

exports.listFoodItems = async () => {
  return foodRepo.getAllFoodItems();
};