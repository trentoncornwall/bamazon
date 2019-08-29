# bamazon

DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price INT NOT NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Mug", "Kitchen", 9.99, 123),
("Keyboard", "Technology", 124.99, 30),
("Mouse", "Technology", 49.99, 60),
("Knife", "Kitchen", 31.24, 15),
("Lamp", "Home Decor", 29.99, 20),
("Pillow", "Home Decor", 9.99, 20),
("Large Rug", "Home Decor", 199.99, 30),
("Medium Rug", "Home Decor", 139.99, 15),
("Small Rug", "Home Decor", 99.99, 10),
("Intel CPU", "Technology", 299.99, 5),
("GPU", "Technology", 399.99, 4);
