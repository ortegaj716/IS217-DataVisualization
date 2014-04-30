
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
	Country:{
		TotalRequests: Number,
		AccountsRequested: Number,
		Percent: Number
	}
});
	
//Our Model
var DataModel = mongoose.model('DataModel',facebookSchema,'fb3');


//Exports!
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

//Bar graph
exports.bar = function(req, res){
  res.render('bar', { title: 'Express' });
}

//This will be called by Ajax
exports.mongo = function(req, res){
	
	
		//Using lean
		DataModel.find().lean().exec(function (err, results) {
			res.send(results);
		});

	//});

};
