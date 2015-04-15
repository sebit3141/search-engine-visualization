/*
 * - JS auto call 
 */
$(function() {
	// global scope
	scripts = {};
	scripts.js = {};
	scripts.js.ns = {};
	scripts.js.ns.currentPage = 1;
	scripts.js.ns.serpsPerPage = 10;
	
	//bold the query string
	setQueryStringBold();
	
	//event handler
	$(".loadButton").click(loadNextPageClient);
	//$("#li_graph").click(network.redraw() );
	//$("#li_graph").click(setNetwork);
	//setNetwork();
})

/*
 * - get bold the query string
 */

/*
$(function() {
	$("p").highlight(["car", "a"]);
});
*/

function setQueryStringBold() {
	var queryStr = document.getElementById("input-query").value;
	var myHilitor = new Hilitor("hilitor"); 
	
	myHilitor.apply(queryStr);
}

/*
 * - get next SERPs
 */
function loadNextPageServer(e) {
	if(e != null) {
		e.preventDefault();
	}
	startRefresh();
	
	var nextPage = scripts.js.ns.currentPage + 1;
	var url = "/search-engine-visualization/page/" + nextPage + ".json";
	
	$.getJSON( url, function( data ) {
		var html = "";
		$.each(data, function(key, value) {
			html += "<tr>";
				html += "<td>";
					html += "<h5>";
						html += "<span>";
							html += value.rank;
						html += "</span>";
						html += "<a href='/'>"; 
							html += value.title;
						html += "</a>";
					html += "</h5>";
					html += "<p class='text-success'>";
						html += value.displayUrl;
					html += "</p>";
					html += "<p>";
						html += value.description;
					html += "</p>";
				html += "</td>";
					html += "<td>";		
					html += "</td>";
			html += "</tr>";
		});
		$("table.table").find("tr.loadNextRow").before(html);
		finishRefresh();
	});
	scripts.js.ns.currentPage++;
	
	//bold the query string
	setQueryStringBold();
}

function loadNextPageClient(e) {
	if(e != null) {
		e.preventDefault();
	}
	startRefresh();
	
	var nextPage = scripts.js.ns.currentPage + 1;
	var value = footer.jsp.ns.jsonResult;
	var html = "";
	var i = scripts.js.ns.currentPage*scripts.js.ns.serpsPerPage;
	var end = i + scripts.js.ns.serpsPerPage;
	
	for (; i < end && value[i] !== undefined ; i ++) {
		html += "<tr>";
			html += "<td>";
				html += "<h5>";
					html += "<span>" + value[i].rank + " | </span>";
					html += "<a href='" + value[i].url + "' target='_blank'> " + value[i].title + " </a>";
				html += "</h5>";
				html += "<p class='text-success'>" + value[i].displayUrl + "</p>";
				html += "<p>" + value[i].description + "</p>";
			html += "</td>";
			html += "<td></td>";
		html += "</tr>";
	}
	$("table.table").find("tr.loadNextRow").before(html);
	finishRefresh();
	scripts.js.ns.currentPage++;
	//bold the query string
	setQueryStringBold();
}

//hide the .loadButton and add a Spinner
function startRefresh() {
	$(".loadButton").css("display","none");
	$(".loadButton").after("<i class='fa fa-refresh fa-spin'  style='color:#337ab7'></i>")
}

//show the .loadButton and remove the Spinner
function finishRefresh() {
	$(".loadButton").css("display","inline");
	$(".fa-spin").remove()
}

/*
 * - vis.org custom functions
 */
//function setNetwork() {
$(function() {	
	// create an array with nodes
	var nodes = [ 
		{id : 1, label : 'Node 1'}, 
		{id : 2, label : 'Node 2'}, 
		{id : 3, label : 'Node 3'}, 
		{id : 4, label : 'Node 4'},
		{id : 5, label : 'Node 5'} 
	];

	// create an array with edges
	var edges = [ 
		{from : 1, to : 2}, 
		{from : 1, to : 3}, 
		{from : 2, to : 4}, 
		{from : 2, to : 5} 
	];

	// create a network
	var container = document.getElementById('mynetwork');
	var data = {
		nodes : nodes,
		edges : edges,
	};

	var network = new vis.Network(container, data, {});
	//network.setSize('500px', '600px');
})

//canvas
$(document).ready( function(){
    //Get the canvas & context 
	var c = $("#mynetwork canvas").first();
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();

    //Run function when browser resizes
    $(window).resize( respondCanvas );

    function respondCanvas(){ 
        c.attr('width', $(container).width() ); //max width
        c.attr('height', $(container).height() ); //max height

        //Call a function to redraw other content (texts, images etc)
        network.redraw();
    }

    //Initial call 
    respondCanvas();

}); 
