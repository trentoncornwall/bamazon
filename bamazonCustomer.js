// depends
const mysql = require("mysql");
const inquirer = require("inquirer");
const columnify = require("columnify");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_DB"
});

let inventory = [];

//* Initial connection *//
connection.connect(err => {
	if (err) throw err;
	mainMenu();
});

//* Inquirer Menus *//
function mainMenu() {
	inquirer
		.prompt([{
			type: "list",
			name: "choice",
			message: "Select One:",
			choices: ["Customer", "Manager"]
		}])
		.then((answers, err) => {
			switch (answers.choice) {
				case "Customer":
					customer();
					break;
				case "Manager":
					manager();
					break;
				default:
					break;
			}
		});
}

function manager() {
	inquirer
		.prompt([{
			type: "list",
			name: "choice",
			message: "Select One:",
			choices: [
				"View Products for Sale",
				"View Low Inventory",
				"Add to Inventory",
				"Add New Product"
			]
		}])
		.then((answers, err) => {
			switch (answers.choice) {
				case "View Products for Sale":
					managerViewAll();
					break;
				case "View Low Inventory":
					managerViewLow();
					break;
				case "Add to Inventory":
					managerAddInv();
					break;
				case "Add New Product":
					managerNewProd();
					break;

				default:
					break;
			}
		});
}

function managerViewAll() {
	selectAll();
	return mainMenu();
}

function managerViewLow() {
	connection.query(
		"SELECT * FROM products WHERE stock_quantity <= 5",
		(err, res) => {
			if (err) throw err;
			printNeat(res);
		}
	);
}

function managerAddInv() {
	selectAll();
	inquirer
		.prompt([{
				type: "input",
				name: "itemid",
				message: `Insert ITEM_ID you'd like to add:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			},
			{
				type: "input",
				name: "amount",
				message: `How many units:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			}
		])
		.then(response => {
			resItem = parseInt(response.itemid, 10);
			resAmount = parseInt(response.amount, 10);
			inventory.forEach(element => {
				if (element.item_id === resItem) {
					newAmount = element.stock_quantity + resAmount;
					return add(resItem, newAmount);
				}
			});
		});
}

function managerNewProd() {
	inquirer
		.prompt([{
				type: "input",
				name: "itemname",
				message: `Product Name:`
			},
			{
				type: "input",
				name: "department",
				message: "Department:"
			},
			{
				type: "input",
				name: "price",
				message: `Price:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			},
			{
				type: "input",
				name: "stock",
				message: `Amount:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			}
		])
		.then(response => {
			product_name = response.itemname;
			department = response.department;
			price = parseInt(response.price, 10);
			stock = parseInt(response.stock, 10);
			connection.query(
				`INSERT INTO products SET ?`, {
					product_name: product_name,
					department_name: department,
					price: price,
					stock_quantity: stock
				},
				(err, res) => {
					if (err) throw err;
					console.log(`\nAdded ${stock} of ${product_name} to Products`);
				}
			);
		});
}

function customer() {
	selectAll();
	inquirer
		.prompt([{
				type: "input",
				name: "itemid",
				message: `Insert ITEM_ID of your purchase:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			},
			{
				type: "input",
				name: "amount",
				message: `How many units:`,
				validate: value => {
					if (isNaN(value)) {
						return truefalse;
					}
					return true;
				}
			}
		])
		.then(response => {
			resItem = parseInt(response.itemid, 10);
			resAmount = parseInt(response.amount, 10);
			inventory.forEach(element => {
				if (element.item_id === resItem) {
					if (resAmount <= element.stock_quantity) {
						purchaseCost = element.price * resAmount;
						newAmount = element.stock_quantity - resAmount;
						return buy(resItem, newAmount, purchaseCost);
					} else {
						console.log(`\nInsufficient quantity!\n`);
					}
				}
			});
		});
}

function add(resitem, newAmount) {
	connection.query(
		`UPDATE products SET stock_quantity=${newAmount} WHERE item_id=${resitem}`,
		(err, res) => {
			if (err) throw err;
			selectAll();
		}
	);
}

function buy(item, newAmount, purchaseCost) {
	connection.query(
		`UPDATE products SET stock_quantity=${newAmount} WHERE item_id=${item}`,
		(err, res) => {
			if (err) throw err;
			console.log(`\nTotal Cost: $ ${purchaseCost}\n`);
		}
	);
}

function printNeat(x) {
	console.log("\n\n");
	console.log(
		columnify(x, {
			config: {
				item_id: {
					align: "right"
				}
			},
			columnSplitter: " | ",
			columns: [
				"item_id",
				"product_name",
				"department_name",
				"price",
				"stock_quantity"
			]
		})
	);
	console.log("\n\n");
}

function selectAll() {
	connection.query("SELECT * FROM products", (err, res) => {
		if (err) throw err;
		inventory = [];

		function PopInv(
			item_id,
			product_name,
			department_name,
			price,
			stock_quantity
		) {
			this.item_id = item_id;
			this.product_name = product_name;
			this.department_name = department_name;
			this.price = price;
			this.stock_quantity = stock_quantity;

			this.pushInv = function () {
				inventory.push({
					item_id: this.item_id,
					product_name: this.product_name,
					department_name: this.department_name,
					price: this.price,
					stock_quantity: this.stock_quantity
				});
			};
		}

		res.forEach(element => {
			var ele = new PopInv(
				element.item_id,
				element.product_name,
				element.department_name,
				element.price,
				element.stock_quantity
			);
			ele.pushInv();
		});

		printNeat(res);
	});
}