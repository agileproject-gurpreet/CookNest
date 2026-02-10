# CookNest – Local Home-Cooked Food Ordering App

CookNest is a full-stack e-commerce application designed to connect users with local home-cooked food providers. The system demonstrates a layered architecture using React, Node.js, and PostgreSQL.

---

## Tech Stack

- Frontend: React (Create React App)
- Backend: Node.js + Express
- Database: PostgreSQL
- Architecture: Layered (Presentation, Business, Data Access)

---

## Features

- User Registration & Login
- Food Dashboard with Search
- Order Placement
- Dummy Payment Gateway
- Order History Screen

---

## How to Run the Application

### 1. Database Setup

Ensure PostgreSQL is running and create the database tables.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE food_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  price NUMERIC
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT,
  total_amount NUMERIC,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
