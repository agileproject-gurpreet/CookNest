CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price NUMERIC(10,2)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total_amount NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    food_item_id INT REFERENCES food_items(id),
    quantity INT,
    food_name VARCHAR(100),
    food_price NUMERIC(10,2)
);


INSERT INTO public.food_items(
	name, description, price)
	VALUES ('Red Pasta', 'Penne pasta with red sauce', 150),
	('White Pasta', 'Penne pasta with white sauce', 150),
	('Mixed Pasta', 'Penne pasta with red and white sauce', 150);

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'4'::integer, 'Veg Cheese Corn Pizza'::character varying, 'Exotic bread topped with mozzerrela cheese and corns'::text, '350'::numeric)
 returning id;

 INSERT INTO public.food_items (
id, name, description, price) VALUES (
'5'::integer, 'Veg Onion Capsicum Pizza'::character varying, 'Exotic bread topped Onion Capsicum and mozzarella cheese'::text, '350'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'6'::integer, 'Classic Veg Burger'::character varying, 'Grilled veg patty with lettuce, tomato, cheese and sauces'::text, '180'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'7'::integer, 'Double Cheese Burger'::character varying, 'Juicy burger loaded with double cheese slices and sauces'::text, '220'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'8'::integer, 'Spicy Chicken Burger'::character varying, 'Crispy chicken patty with spicy mayo and fresh veggies'::text, '250'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'9'::integer, 'Caesar Salad'::character varying, 'Fresh lettuce with croutons, parmesan and creamy dressing'::text, '210'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'10'::integer, 'Greek Salad'::character varying, 'Tomatoes, olives, cucumber, feta cheese and olive oil'::text, '230'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'11'::integer, 'Fruit Nut Salad'::character varying, 'Seasonal fruits mixed with roasted nuts and honey dressing'::text, '240'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'12'::integer, 'Chocolate Brownie'::character varying, 'Rich chocolate brownie with gooey center'::text, '150'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'13'::integer, 'Walnut Brownie'::character varying, 'Fudgy brownie topped with crunchy walnuts'::text, '170'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'14'::integer, 'Ice Cream Brownie'::character varying, 'Warm brownie served with vanilla ice cream scoop'::text, '210'::numeric)
 returning id;

INSERT INTO public.food_items (
id, name, description, price) VALUES (
'15'::integer, 'Paneer Tikka Wrap'::character varying, 'Grilled paneer cubes wrapped with veggies and mint sauce'::text, '200'::numeric)
 returning id;
