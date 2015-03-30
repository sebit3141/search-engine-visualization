//get bold the query string
/*
$(function() {
	$("p").highlight(["car", "a"]);
});
*/

$(function() {
	var queryStr = document.getElementById("input-query").value;
	var myHilitor = new Hilitor("hilitor"); 
	
	myHilitor.apply(queryStr);
});