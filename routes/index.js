
/*
 * GET home page.
 */



//Mongoose stuff

var mongoose = require('../node_modules/mongoose');
mongoose.connect('mongodb://localhost/facebookDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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


//Exports!
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//This will be called by Ajax
exports.mongo = function(req, res){
	
	
		//Using lean?
		DataModel.find().lean().exec(function (err, results) {
			console.log(results);
			res.send(results);
		});

	//});

};
