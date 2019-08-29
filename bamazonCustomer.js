// depends
const mysql = require("mysql");
const inquirer = require("inquirer");
const columnify = require("columnify");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "rootpassword",
	database: "bamazon_DB"
});

//* Initial connection *//
connection.connect(err => {
	if (err) throw err;
	selectAlL();
	mainMenu();
	connection.end();
});

//* Inquirer Menus *//
function mainMenu() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "choice",
				message: "Select One:",
				choices: ["Customer", "Manager", "Supervisor"]
			}
		])
		.then((answers, err) => {
			switch (answers.choice) {
				case "Customer":
					customer();
					break;
				case "Manager":
					break;
				case "Supervisor":
					break;
				default:
					break;
			}
		});
}
function customer() {
	inquirer
		.prompt([
			{
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
			console.log(`You'd like to by: ${response.itemid}`);
		});
}

function printNeat(x) {
	console.log(
		columnify(x, {
			config: { item_id: { align: "right" } },
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
}

function selectAll() {
	connection.query("SELECT * FROM products", (err, res) => {
		if (err) throw err;
		printNeat(res);
	});
}
