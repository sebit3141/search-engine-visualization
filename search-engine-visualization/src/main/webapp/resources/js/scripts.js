/*
 * - Namespace 
 */
//-declare namespace
var ns = ns || {};
ns.sev = ns.sev || {};
//-declare global scope
ns.sev.currentPage = 1;
ns.sev.serpsPerPage = 10;
//--Solr
ns.sev.solrURL = "http://localhost:5000/sevCore/clustering?wt=json";
ns.sev.resultSolrJSON = {};
ns.sev.resultClusterTree = {};

/*
 * - JavaScript auto call 
 */
$(function() {
	//-AJAX: Solr Clustering
	ns.sev.ajaxSolrClustering();
	
	//-bold the query string
	ns.sev.setQueryStringBold();
	
	//-event handler
	$(".loadButton").click(ns.sev.loadNextPageClient);
})

/*
 * - AJAX: Solr Clustering
 */

ns.sev.ajaxSolrClustering = function() {
	$.ajax({
		url: ns.sev.solrURL,
		dataType: 'jsonp',
		jsonp: 'json.wrf',
		success: function(response){
			ns.sev.resultSolrJSON = response;
			ns.sev.afterAJAX();
		},
		error: function (xhr, err) {
            console.log(xhr);
            console.log(err);
        }
	});
}

/*
 * - JS function call after AJAX (Solr Clostering)
 */
ns.sev.afterAJAX = function() {
	//-D3 visualization
	//--graph
	//$("#li_graph").click(ns.sev.graphD3());
	ns.sev.graphD3();
	//--tree
	ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
	ns.sev.drawD3Tree(ns.sev.resultClusterTree);
}

/*
 * - Bold query string
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

//Graph 
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

//Tree
ns.sev.getClusterTree = function(resultSolr) {
	//set clusterRoot
	var clusterRoot = {"name":"", "children":[]};
	clusterRoot.name = resultSolr.response.docs[0].query;
	resultSolr.clusters.forEach(function(clustersItem) {
		//set clusterLabel
		var clusterLabel = {"name":"", "children":[]};
		clusterLabel.name = clustersItem.labels[0];
		clustersItem.docs.forEach(function(docsItem) {
			//set clusterDoc
			var clusterDoc = {"name":"", "title":"", "description":"", "displayUrl":"", "url":"", "query":""};
			clusterDoc.name = docsItem;
			clusterLabel.children.push(clusterDoc);
		});
		clusterRoot.children.push(clusterLabel);
	});
	
	return clusterRoot;
}

ns.sev.drawD3Tree = function(clusterTree) {
	var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 800 - margin.top - margin.bottom;

	var i = 0,
	duration = 750,
	root;

	var tree = d3.layout.tree()
	.size([height, width]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("div.tree").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	root = clusterTree;
	root.x0 = height / 2;
	root.y0 = 0;

	function collapse(d) {
		if (d.children) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
	}

	root.children.forEach(collapse);
	update(root);

	d3.select(self.frameElement).style("height", "800px");

	function update(source) {

		// Compute the new tree layout.
		var nodes = tree.nodes(root).reverse(),
		links = tree.links(nodes);

		// Normalize for fixed-depth.
		nodes.forEach(function(d) { d.y = d.depth * 180; });

		// Update the nodes…
		var node = svg.selectAll("g.node")
		.data(nodes, function(d) { return d.id || (d.id = ++i); });

		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("g")
		.attr("class", "node")
		.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
		.on("click", click);

		nodeEnter.append("circle")
		.attr("r", 1e-6)
		.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

		nodeEnter.append("text")
		.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
		.text(function(d) { return d.name; })
		.style("fill-opacity", 1e-6);

		// Transition nodes to their new position.
		var nodeUpdate = node.transition()
		.duration(duration)
		.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

		nodeUpdate.select("circle")
		.attr("r", 4.5)
		.style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

		nodeUpdate.select("text")
		.style("fill-opacity", 1);

		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
		.duration(duration)
		.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
		.remove();

		nodeExit.select("circle")
		.attr("r", 1e-6);

		nodeExit.select("text")
		.style("fill-opacity", 1e-6);

		// Update the links…
		var link = svg.selectAll("path.link")
		.data(links, function(d) { return d.target.id; });

		// Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
		.attr("class", "link")
		.attr("d", function(d) {
			var o = {x: source.x0, y: source.y0};
			return diagonal({source: o, target: o});
		});

		// Transition links to their new position.
		link.transition()
		.duration(duration)
		.attr("d", diagonal);

		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
		.duration(duration)
		.attr("d", function(d) {
			var o = {x: source.x, y: source.y};
			return diagonal({source: o, target: o});
		})
		.remove();

		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

//	Toggle children on click.
	function click(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		update(d);
	}
}