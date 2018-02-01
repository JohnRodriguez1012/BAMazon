// Dependencies
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'bamazon', 
});

var inventoryUpdate = [];
var addedProduct = [];

connection.connect();

//Menu

var managerOptions = {
	properties:{
		mOptions:{
			description: colors.cyan('Key in one of the following options: 1) View Products 2) View Inventory 3) Add Inventory 4) Add Product')
		},
	},
};


prompt.start();

prompt.get(managerOptions, function(err, res){
	if(res.mOptions == 1){
		ProductView();
	} else if(res.mOptions == 2){
		InventoryView();
	} else if(res.mOptions == 3){
		NewInventory();
	} else if(res.mOptions ==4){
		NewProduct();
	} else {
		console.log('Unfortunately, that is not an option.');
		connection.end();
	}
});

//View Products
var ProductView = function(){
	//connects to the mysql database called products and returns the information from that database
	connection.query('SELECT * FROM products', function(err, res){
		console.log('');
		console.log('Products for Sale')
		console.log('');	

		//this creates a table outline in the node app to organize the data
		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['green'],
				compact: false,
				colAligns: ['center'],
			}
		});

		//this loops through the mysql connection and for each item that is returned, the information is then pushed to the table
		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
			);
		}

		//this console.logs the table and then ends the mysql query connection
		console.log(table.toString());
		connection.end();
	})
};

//View Inventory
var InventoryView = function(){


	connection.query('SELECT * FROM products WHERE stock_quantity < 100', function(err, res){
		console.log('');
		console.log('Running pretty low on a few things');
		console.log('');

		var table = new Table({
			head: ['Item Id#', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
			style: {
				head: ['blue'],
				compact: false,
				colAligns: ['center'],
			}
		});

		for(var i=0; i<res.length; i++){
			table.push(
				[res[i].item_id, res[i].product_name, res[i].DepartmentName, res[i].Price, res[i].StockQuantity]
			);
		}

		console.log(table.toString());
		connection.end();
	})
};

//New Inventory
var NewInventory = function(){

	var addInventory = {
		properties:{
			inventoryID: {
				description: colors.green('What is the ID number of the product you want to add inventory for?')
			},
			inventoryAmount:{
				description: colors.yellow('How many would you like to add?')
			}
		},
	};

	prompt.start();

	//get the information entered in response to the prompt above
	prompt.get(addInventory, function(err, res){

		//creates a variable for the answers to the prompt questions
		var inventoryAdded = {
			inventoryAmount: res.inventoryAmount,
			inventoryID: res.inventoryID,
		}

		//pushes the responses to the inventoryUpdate array created at the top of this page
		inventoryUpdate.push(inventoryAdded);

		//connect to the mysql database Products and sets the stock quanitity to the number entered in the prompt above + the current stock quantity for a specific item iD
		connection.query("UPDATE Products SET StockQuantity = (StockQuantity + ?) WHERE ItemID = ?;", [inventoryUpdate[0].inventoryAmount, inventoryUpdate[0].inventoryID], function(err, result){

			if(err) console.log('error '+ err);

			//then this selects the newly updated information from the mysql database so we can console.log a confirmation to the user with the updated stock amount
			connection.query("SELECT * FROM Products WHERE item_id = ?", inventoryUpdate[0].inventoryID, function(error, resOne){
				console.log('');
				console.log('The new updated stock quantity for id# '+inventoryUpdate[0].inventoryID+ ' is ' + resOne[0].stock_quantity);
				console.log('');
				connection.end();
			})

		})
	})
};

//creates the function for the last option above
var NewProduct = function(){
	//creates the variable newProduct which contains the questions that are to be prompted to the user
	var addProduct = {
		properties: {
			newproduct_name:{ description: colors.gray('Please enter the name of the product you wish to add')},
			newdepartment_name: { description: colors.gray('What department does this item belong in?')},
			newprice: { description: colors.gray('Please enter the price of the item in the format of 00.00')},
			newstock_quantity: { description: colors.gray('Please enter a stock quantity for this item')},
		}
	}

	prompt.start();

	//gets the responses for the prompt above
	prompt.get(newProduct, function(err, res){

		//creates a variable for the responses to be logged to
		var addingProduct = {
			newproduct_name: res. newproduct_name,
			newdepartment_name: res.newdepartment_name,
			newprice: res.newprice,
			newstock_quantity: res.newstock_quantity,

		};

		//pushes the variable and the response data to the addedProduct array defined at the top of this page
		addingProduct.push(newItem);

		//connects to mysql and inserts the responses to the prompt into the mysql database to create a new product within the database
		connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?);', [addingProduct[0].newproduct_name, addingProduct[0].newdepartment_name, addingProduct[0].newprice, addingProduct[0].newstock_quantity], function(err, result){

			if(err) console.log('Error: ' + err);

			console.log('New item added! Hope it sells!');
			console.log(' ');
			console.log('Item name: ' + addingProduct[0].newproduct_name);
			console.log('Department: ' + addingProduct[0].newdepartment_name);
			console.log('Price: $' + addingProduct[0].newprice);
			console.log('Stock Quantity: ' + addingProduct[0].newstock_quantity);

			connection.end();
		})
	})
};