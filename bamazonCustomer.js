//Dependencies
var mysql = require('mysql');
var prompt = require('prompt');
var colors = require('colors/safe');
var Table = require('cli-table');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'Bamazon', 
});

//Purchasing Array
var purchasingProducts = [];

connection.connect();

connection.query('SELECT item_id, product_name, prices FROM products', function(err, results){
	if(err) console.log(err);

	//Shows Table with COLORS
	var tableOfProducts = new Table({
		head:['item_id','product_name','prices'],
		style: {
			head:['blue'],
			// compact: false,
			colAligns:['center']
		}
	});

	for(var i = 0; i < results.length ; i++){
		tableOfProducts.push(
			[results[i].item_id,results[i].product_name,results.prices]
			);
		}
	console.log(tableOfProducts.toString());

	allowPurchase();
});

var allowPurchase = function(){

	var prodInfo = {
		properties: {
			item_id:{description:colors.yellow('Enter the ID# of the item you wanna purchase!!!')},
			Quantity:{description:colors.green('How many would you like?')}
			},
		};

	prompt.start();

	prompt.get(prodInfo, function(err, res){

		var customerPurchases = {
			item_id: res.item_id,
			Quantity: res.Quantity
		};

	purchasingProducts.push(customerPurchases);

	connection.query('SELECT * FROM products WHERE item_id=?', purchasingProducts[0].item_id),function(err,res){
		if(err) console.log(err,'That ID does not exist yet!');

		if(res[0].stock_quanity < purchasingProducts[0].Quantity){
			console.log('That product is out of stock!');
			connection.end();			
		}

		else if (res[0].stock_quanity < purchasingProducts[0].Quantity){

			console.log('');
			console.log(purchasingProducts[0].Quantity + ' items purchased!');
			console.log(res[0].product_name+ ' ' +res[0].price);

			var total = res[0].price * purchasingProducts[0].Quantity;

				connection.query('UPDATE Departments SET TotalSales = ? WHERE department_name = ?;' [TotalSales, res[0].department_name], function(err,resOne){
					if(err) console.log('error: ' + err);
					return resOne;
				})

			console.log('Total: ' + TotalSales);

			newQuan = res[0].stock_quanity - purchasingProducts[0].Quantity;

			connection.query('UPDATE products SET stock_quanity = '+ newQuan +"WHERE item_id = " purchasingProducts[0].item_id, function(err, res){
				// if(err) throw err;
				// console.log('Problem ', err);
				
				console.log('');
				console.log(colors.cyan('Your order has been processed.  Thank you for shopping with us!'));
				console.log('');

				connection.end();
				})
			};
		}
	})
};