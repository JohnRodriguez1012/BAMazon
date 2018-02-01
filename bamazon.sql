CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(60) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(60),
department_name TEXT(60),
price integer(60),
stock_quanity INTEGER(60),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Delicious Protein Shake', 'Health', 29.99, 3133);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Fake Vitamins: They Really Do Not Work', 'Health',99.99, 99);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Pepperoni ZAAAAA', 'Food', 9.99, 673);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Vegan Stuph', 'Food', 17.90, 487);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('SUPER OVERLORD GAME SYSTEM', 'Electronics', 24760.63, 7);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Regular Computer', 'Electronics', 199.86, 1000000);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Ill Fitting Hipster Clothes', 'Clothes', 279.50, 89);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Clothes That Will Fit', 'Clothes', 15.99, 65238);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('Intrument You WIll Probably Use Once a Month', 'Music', 189.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ('That One Song Stuck in Your Head', 'Music', .50, 99999999);

Select * from products;