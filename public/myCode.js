//Fun with jQuery!

var mapData = {};
var dm = {};

$(document).ready(function(){
	$("p").click(function(){
		$(this).hide();
	});

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

		console.log("OK");

		console.log(data);

		dm = {
			element: document.getElementById('container'),
	
			fills: {
				defaultFill: 'rgb(240,240,240)'
			},
	
			data: data,
	
			geographyConfig: {
	
				popupTemplate: function(geo, data) {
					return '<div class="hoverinfo"><strong>' + geo.properties.name + '</strong></div>';
				}
				
			}
	
		};

		$("#container").datamaps(dm);

	});

});
