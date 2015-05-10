/*
 * - Namespace 
 */
//declare namespace
var ns = ns || {};
ns.sev = ns.sev || {};
//declare global scope
ns.sev.currentPage = 1;
ns.sev.serpsPerPage = 10;
ns.sev.solrURL = "http://localhost:5000/sevCore/clustering?wt=json";

/*
 * - JavaScript auto call 
 */
$(function() {
	//bold the query string
	ns.sev.setQueryStringBold();
	
	//event handler
	$(".loadButton").click(ns.sev.loadNextPageClient);

	//D3 visualization
	//$("#li_graph").click(ns.sev.graphD3());
	ns.sev.graphD3();
	
	//AJAX: Solr Clustering
	ns.sev.solrClustering();
})

/*
 * - Bold query string
 */

/*
$(function() {
	$("p").highlight(["car", "a"]);
});
*/

ns.sev.setQueryStringBold = function() {
	var queryStr = document.getElementById("input-query").value;
	var myHilitor = new Hilitor("hilitor"); 
	
	myHilitor.apply(queryStr);
}

/*
 * - Load next SERPs
 */
ns.sev.loadNextPageServer = function(e) {
	if(e != null) {
		e.preventDefault();
	}
	ns.sev.startRefresh();
	
	var nextPage = ns.sev.currentPage + 1;
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
		ns.sev.finishRefresh();
	});
	ns.sev.currentPage++;
	
	//bold the query string
	ns.sev.setQueryStringBold();
}

ns.sev.loadNextPageClient = function(e) {
	if(e != null) {
		e.preventDefault();
	}
	ns.sev.startRefresh();
	
	var nextPage = ns.sev.currentPage + 1;
	var valueJson = ns.sev.resultDTOListJSON;
	var html = "";
	var i = ns.sev.currentPage*ns.sev.serpsPerPage;
	var end = i + ns.sev.serpsPerPage;
	
	for (; i < end && valueJson[i] !== undefined ; i ++) {
		html += "<tr>";
			html += "<td>";
				html += "<h5>";
					html += "<span>" + valueJson[i].rank + " | </span>";
					html += "<a href='" + valueJson[i].url + "' target='_blank'> " + valueJson[i].title + " </a>";
				html += "</h5>";
				html += "<p class='text-success'>" + valueJson[i].displayUrl + "</p>";
				html += "<p>" + valueJson[i].description + "</p>";
			html += "</td>";
			html += "<td></td>";
		html += "</tr>";
	}
	$("table.table").find("tr.loadNextRow").before(html);
	ns.sev.finishRefresh();
	ns.sev.currentPage++;
	//bold the query string
	ns.sev.setQueryStringBold();
}

//hide the .loadButton and add a Spinner
ns.sev.startRefresh = function() {
	$(".loadButton").css("display","none");
	$(".loadButton").after("<i class='fa fa-refresh fa-spin'  style='color:#337ab7'></i>")
}

//show the .loadButton and remove the Spinner
ns.sev.finishRefresh = function() {
	$(".loadButton").css("display","inline");
	$(".fa-spin").remove()
}

/*
 * - D3 Visualization
 */
ns.sev.graphD3 = function() {
	// define links and nodes
	var links = [];
	var k = 10; //ns.sev.resultDTOListJSON.length

	for (var i = 0; i < k ; i ++) {
	  links[i] = {};
	  links[i].source = ns.sev.resultDTOListJSON[i].query;
	  links[i].target = ns.sev.resultDTOListJSON[i].displayUrl;
	}

	var nodes = {};

	// Compute the distinct nodes from the links.
	links.forEach(function(link) {
	  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
	  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
	});

	// define size
	var width = parseInt($(".tab-content").css("width"));
	var height = 300;

	// add layout
	var force = d3.layout.force()
	    .nodes(d3.values(nodes))
	    .links(links)
	    .size([width, height])
	    .linkDistance(60)
	    .charge(-300)
	    .on("tick", tick)
	    .start();

	// add svg 
	var svg = d3.select(".graph").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	// add links 
	var link = svg.selectAll(".link")
	    .data(force.links())
	  .enter().append("line")
	    .attr("class", "link");

	// add nodes
	var node = svg.selectAll(".node")
	    .data(force.nodes())
	  .enter().append("g")
	    .attr("class", "node")
	    .on("mouseover", mouseover)
	    .on("mouseout", mouseout)
	    .call(force.drag);

	// add circle 
	node.append("circle")
	    .attr("r", 8);

	// add text
	node.append("text")
	    .attr("x", 12)
	    .attr("dy", ".35em")
	    .text(function(d) { return d.name; });

	// define tick()
	function tick() {
	  link
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  node
	      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	}

	// define mouse events
	function mouseover() {
	  d3.select(this).select("circle").transition()
	      .duration(750)
	      .attr("r", 16);
	}

	function mouseout() {
	  d3.select(this).select("circle").transition()
	      .duration(750)
	      .attr("r", 8);
	}
}

ns.sev.graphD32 = function() {
	
}

/*
 * - AJAX: Solr Clustering
 */

ns.sev.solrClustering = function() {
	$.ajax({
		url: ns.sev.solrURL,
		dataType: 'jsonp',
		jsonp: 'json.wrf',
		success: function(response){
			ns.sev.resultListClusterJSON = response;
		}
	});
}