const db = require("../config/db");

exports.createUser = (u) =>
  db.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [u.name, u.email, u.password]
  );

exports.findByEmail = (email) =>
  db.query("SELECT * FROM users WHERE email=$1", [email]);