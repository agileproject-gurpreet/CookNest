const userRepo = require("../repositories/userRepository");

exports.register = async (user) => {
  const result = await userRepo.createUser(user);
  return result.rows[0];
};

exports.login = async ({ email, password }) => {
  const result = await userRepo.findByEmail(email);
  const user = result.rows[0];
  return user && user.password === password ? user : null;
};