# bamazon

-make shift node amazon project created to better understand node.js & MySQL, acts like a backend tool to purchase items from a table of products, or manage the products.

## To Start

1. install dependeces: npm i
2. create a MySQL database, sample at the end of this ReadMe
3. add your password to bamazonCustomer.js line 10
4. run: node bamazonCustomer.js

## How it runs:

You'll be given two choices:

1. Customer
2. Manager

1.a - Purchase Items - input item_id & amount to purchase
2.a - View Products for Sale - View all products
2.b - View Low Inventory - Views only products with stock quantity less then 5
3.c - Add to Inventory - Purchase more items for a current product
4.d - Add a new Product - Add a new product, department, price, and stock quantity

## Sample DB:

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
