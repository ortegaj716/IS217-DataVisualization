//Fun with jQuery!
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
	});
});
