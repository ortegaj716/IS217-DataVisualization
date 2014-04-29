var express = require('express'),
   fs = require('fs'),
   routes = require('./routes'),
   user = require('./routes/user'),
   http = require('http'),
   csv = require('csv'),
   path = require('path');
var records = new Array();
var app = express();
var records = [];


app.configure(function () {
   app.set('port', process.env.PORT || 3000);
   app.set('views', __dirname + '/views');
   app.set('view engine', 'jade');
   app.use(express.favicon());
   app.use(express.logger('dev'));
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(app.router);
   app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
   app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/mongo', routes.mongo);
app.get('/users', user.list);

app.get('/setupDB', function(req,res){
	var insert = {};

	csv(records)
	   .from.stream(fs.createReadStream(__dirname + '/facebook_converted.txt'), {
	   columns: true
	})
	.on('record', function (row, index) {
	   //console.log(row.Country);
		var color = {};
		if(row.Percent >= 0)
			color = 'low';
		if(row.Percent >= 25)
			color = 'some';
		if(row.Percent >= 50)
			color = 'high';
		if(row.Percent >= 75)
			color = 'veryHigh';
	   	insert[row.Country] = {
			Percent : row.Percent,
			TotalRequests : row.TotalRequests,
			AccountsRequested : row.AccountsRequested,
			fillKey: color
	   	}

	   	console.log(insert[row.Country]);

	   	//console.log(row);
	})

	   .on('end', function (count) {
	   var MongoClient = require('mongodb').MongoClient;
	   // Connect to the db
	   MongoClient.connect("mongodb://localhost/facebookDB", function (err, db) {
	      var collection = db.collection('fb3')
		records.push(insert);
	
	      collection.insert(records, function (err, doc) {
	         console.log(doc);
	      });
	
	   });
	   console.log('Number of lines: ' + count);
	res.send('Number of lines: ' + count);
	});
	
});

http.createServer(app).listen(app.get('port'), function () {
   console.log("Express server listening on port " + app.get('port'));
});
