//Fun with jQuery!

var mapData = {};
var dm = {};

$(document).ready(function(){

	$.getJSON("http://localhost:3000/mongo", function(data) {
	/*
		var items = [];
		$.each(data, function(key,val){
			items.push("<li id='" + key + "'>" + val + "</li>" );
		});

		$("<ul/>", {
			"class": "myNewList",
			html: items.join("")
		}).appendTo("body");
	*/

		var mapData = data;

		console.log("OK");

		console.log(mapData);

		dm = {
			element: document.getElementById('container'),
	
			fills: {
				defaultFill: 'rgb(240,240,240)',
				'low': 'rgb(199,233,255)',
				'some': 'rgb(137,207,250)',
				'high': 'rgb(0,156,255)',
				'veryHigh': 'rgb(0,112,181)'
			},
	
			data: mapData[0],
	
			geographyConfig: {
	
				popupTemplate: function(geo, data) {
					//console.log(data);
					//console.log(mapData);
					
					if(data == null)
						return '<div class="hoverinfo"><strong>' + geo.properties.name + '</strong></div>';

					//Wow look at this mess

					return '<div class="hoverinfo"><strong>' + geo.properties.name + '</strong><ul><li>Total Requests: ' + data.TotalRequests + '</li><li>User Accounts Requested: ' + data.AccountsRequested + '</li><li>Percent of Requests Fulfilled: ' + data.Percent + '</li></ul></div>';

					//return '<div class="hoverinfo"><strong>' + geo.properties.name + ' ' + ' ' + data.Percent + '</strong></div>';
				}
				
			}
	
		};

		$("#container").datamaps(dm);

	});

});
