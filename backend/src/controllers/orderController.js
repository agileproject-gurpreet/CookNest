const db = require("../config/db");

exports.placeOrder = async (req, res) => {
  const { total, paymentMethod } = req.body;

  const result = await db.query(
    "INSERT INTO orders(total_amount, payment_method) VALUES($1,$2) RETURNING *",
    [total, paymentMethod]
  );

  res.status(201).json(result.rows[0]);
};

exports.getOrders = async (req, res) => {
  const result = await db.query(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  res.json(result.rows);
};
