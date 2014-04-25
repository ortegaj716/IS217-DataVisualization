
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//This will be called by Ajax
exports.mongo = function(req, res){

	var mongoose = require('../node_modules/mongoose');
	mongoose.connect('mongodb://localhost/facebookDB');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback(){

		console.log("Connected!");
		
		//Let's get started
		//Our Schema
		var Schema = mongoose.Schema;
		var facebookSchema = new Schema({
		
			Country: String,
			TotalRequests: Number,
			AccountsRequested: Number,
			Percent: Number
		});
		
		//Our Model
		var DataModel = mongoose.model('DataModel',facebookSchema,'fbData');

		//Let's try printing something...
		DataModel.find(function(err, results){
			if(err) return console.error(err);
			console.log(results);
		});

	});

//Just for now, browser needs something to receive
res.send("OK");

};
