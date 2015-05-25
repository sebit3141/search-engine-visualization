/*
 * -Namespace 
 */
//--declare namespace
var ns = ns || {};
ns.sev = ns.sev || {};
//--declare global scope
ns.sev.currentPage = 1;
ns.sev.serpsPerPage = 10;
ns.sev.clusters = [];
//---Solr
ns.sev.solrURL = "http://localhost:5000/sevCore/clustering?wt=json";
ns.sev.resultSolrJSON = {};
ns.sev.resultClusterTree = {};

/*
 * -JS function auto calls
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
 * -AJAX: Solr Clustering
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
 * -JS function calls: after AJAX (Solr Clostering)
 */
ns.sev.afterAJAX = function() {
	//-D3 visualization
	//--graph
	//$("#li_graph").click(ns.sev.graphD3());
	ns.sev.graphD3();
	//--tree
	ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
	ns.sev.drawD3Tree(ns.sev.resultClusterTree);
	$("li#tab-tree").click( function(){
		//-remove special svg
		$("div#draw-tree svg").remove();
		//-draw layout
		ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
		ns.sev.drawD3Tree(ns.sev.resultClusterTree);
		//-refresh the SERPs table
		ns.sev.refreshSerps();
	});
	//--radial tree
	$("li#tab-radial-tree").click( function(){
		//remove special svg
		$("div#draw-radial-tree svg").remove();
		//-draw layout
		ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
		ns.sev.drawD3TreeRadial(ns.sev.resultClusterTree);
		//-refresh the SERPs table
		ns.sev.refreshSerps();
	});
	//--responsive
	ns.sev.responsiveD3();
}

/*
 * -Bold query string
 */
ns.sev.setQueryStringBold = function() {
	var queryStr = document.getElementById("input-query").value;
	var myHilitor = new Hilitor("hilitor"); 
	
	myHilitor.apply(queryStr);
}

/*
 * -Load next SERPs (Button: load next ...)
 */
//---arguements:
//----e (Object) (event)
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
 * -D3 Visualization
 */

//--Graph 
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

//--Tree Layout
//---set input Object for tree layouts
//---arguements:
//----resultSolr (Object) (input data for appropriate input data for tree layout)
//---return: clusterRoot (Object) (input data for tree layout)
ns.sev.getClusterTree = function(resultSolr) {
	//set clusterRoot
	var clusterRoot = {"name":"", "children":[], "docs":[]};
	clusterRoot.name = resultSolr.response.docs[0].query;
	clusterRoot.docs = resultSolr.response.docs;
	resultSolr.clusters.forEach(function(clustersItem) {
		//set clusterLabel
		var clusterLabel = {"name":"", "children":[], "docs":[]};
		clusterLabel.name = clustersItem.labels[0];
		clusterLabel.docs = clustersItem.docs;
		clustersItem.docs.forEach(function(docsItem) {
			//set clusterDoc
			var clusterDoc = {"rank":"", "title":"", "description":"", "displayUrl":"", "url":"", "query":""};
			clusterDoc.rank = resultSolr.response.docs[docsItem-1].rank;
			clusterDoc.title = resultSolr.response.docs[docsItem-1].title;
			clusterDoc.description = resultSolr.response.docs[docsItem-1].description;
			clusterDoc.displayUrl = resultSolr.response.docs[docsItem-1].displayUrl;
			clusterDoc.url = resultSolr.response.docs[docsItem-1].url;
			clusterDoc.query = resultSolr.response.docs[docsItem-1].query;
			clusterLabel.children.push(clusterDoc);
		});
		clusterRoot.children.push(clusterLabel);
	});
	
	return clusterRoot;
}
//---tree
//---arguements:
//----clusterTree (Object) (input data for define nodes and links)
ns.sev.drawD3Tree = function(clusterTree) {
	var margin = {top: 20, right: 120, bottom: 20, left: 120};
	var width = parseInt(d3.select("div.cluster").style('width'), 10);
	var areaRatio = .5;
	var height = width * areaRatio;
	var widthMargin = width - margin.right - margin.left;
	var heightMargin = height - margin.top - margin.bottom;

	var i = 0;
	var duration = 500;
	var root;
	
	//-layout
	var tree = d3.layout.tree()
		.size([heightMargin, widthMargin]);

	//-accessor function
	var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.y, d.x]; });

	//-svg container
	var svg = d3.select("div#draw-tree").append("svg")
		.style("width", width + "px")
		.style("height", height + "px")
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//-define root
	root = clusterTree;
	root.x0 = heightMargin / 2;
	root.y0 = 0;
	
	//-call collapse
	root.children.forEach(collapse);
	
	//-call drawing
	update(root);

	//set ability to collapse
	function collapse(d) {
		if (d.children) {
			d._children = d.children;
			d._children.forEach(collapse);
			d.children = null;
		}
	}
		
	//update layout
	function update(source) {

		//-Compute the new tree layout.
		var nodes = tree.nodes(root).reverse();
		var links = tree.links(nodes);

		//-Normalize for fixed-depth.
		nodes.forEach(function(d) { (d.depth < 2) ? 
				(d.y = d.depth * width * .3) : 
					(d.y = d.depth * width * .2); });

		//-Update the nodes…
		var node = svg.selectAll("g.node")
			.data(nodes, function(d) { return d.id || (d.id = ++i); });

		//--Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("g")
			.attr("class", function(d) {return  d.url ? "node leaf" : "node innerNode";})
			.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
			.on("click", toggleNodeOnClick);

		nodeEnter.append("circle")
			.attr("r", 1e-6)
			.attr("style", function(d) { 
	    		var h = 120,s,l = .80;
	    		var colorStroke, colorFill;

	    		if (d.docs) {
	    			s = ( (root.docs.length + 1) - d.docs[0] ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
	    			d._children ? colorFill = colorStroke : colorFill = "#fff";
	    		} else if (d.rank) {
	    			s =  ( (root.docs.length + 1) - d.rank ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
					colorFill = "#fff";
	    		}
				return ("stroke: " + colorStroke + "; fill: " + colorFill); 
			});

		//--append text to child nodes: hyperlink or plain text
		var leaf = svg.selectAll("g.leaf")
		.append("a")
			.attr("xlink:href", function(d) { return d.url; })
			.attr("target", function(d) { return "_blank"; })		
		.append("text")
			.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
			.style("fill-opacity", 1e-6)
			.text(function(d) { return d.title; })
			.on("click", ns.sev.ahrefFocusOnClick)
			.on("mouseover", ns.sev.tooltipShow)
			.on("mouseout", ns.sev.tooltipHide);
		
		var innerNode = svg.selectAll("g.innerNode")
		.append("text")
			.attr("x", function(d) { return d.children || d._children ? -10 : 10; })
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
			.style("fill-opacity", 1e-6)
			.text(function(d) { return d.name; })
			.on("mouseover", ns.sev.tooltipShow)
			.on("mouseout", ns.sev.tooltipHide);
		
		//--Transition nodes to their new position.
		var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

		nodeUpdate.select("circle")
			.attr("r", 4.5)
			.attr("style", function(d) { 
	    		var h = 120,s,l = .80;
	    		var colorStroke, colorFill;

	    		if (d.docs) {
	    			s = ( (root.docs.length + 1) - d.docs[0] ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
	    			d._children ? colorFill = colorStroke : colorFill = "#fff";
	    		} else if (d.rank) {
	    			s =  ( (root.docs.length + 1) - d.rank ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
					colorFill = "#fff";
	    		}
				return ("stroke: " + colorStroke + "; fill: " + colorFill); 
			});

		nodeUpdate.select("text")
			.style("fill-opacity", 1);

		//--Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
			.remove();

		nodeExit.select("circle")
			.attr("r", 1e-6);

		nodeExit.select("text")
			.style("fill-opacity", 1e-6);

		//-Update the links…
		var link = svg.selectAll("path.link")
			.data(links, function(d) { return d.target.id; });

		//--Enter any new links at the parent's previous position.
		link.enter().insert("path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {x: source.x0, y: source.y0};
				return diagonal({source: o, target: o});
			})
			.attr("style", function(d) { 
				    		var h = 120,s,l = .80;
				    		if (d.target.docs) {
				    			s = ( (root.docs.length + 1) - d.target.docs[0] ) / 100;
				    		} else if (d.target.rank) {
				    			s =  ( (root.docs.length + 1) - d.target.rank ) / 100;
				    		}
			    			return ("stroke: " + d3.hsl(h,s,l).toString()); 
			});

		//--expand: Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", diagonal);

		//--collapse: Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {x: source.x, y: source.y};
				return diagonal({source: o, target: o});
			})
			.remove();

		//-Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}

	//on.click: toggle children  
	function toggleNodeOnClick(d) {
		if (d.children) {
		//-collapse
			d._children = d.children;
			d.children = null;
			
			//--cluster the SERPs (remove docs)
			if (d.depth == 1) {
				var cluster = {name: d.name, docs: d.docs};
				ns.sev.clusterPages(cluster, false);
			}
		} else {
		//-expand
			d.children = d._children;
			d._children = null;
		
			//--cluster the SERPs (add docs)
			if (d.depth == 1) {
				var cluster = {name: d.name, docs: d.docs};
				ns.sev.clusterPages(cluster, true);
			}
		}
		update(d);
	}
	
	//on.mouseOver: get infobox (only leaf nodes) 
	function mouseOverInfobox(d) {
		//-verify leaf node
		if (!d.rank) {return}
		//-function main statement
		var foreignO = svg.append('foreignObject')
			.attr({
		        "width": width/3,
				"class": "svg-foreignO"
			});
		//-div
		var div = foreignO.append('xhtml:div')
			.append('div')
			.attr("class", "infobox");
		//--h5
		var h5 = div.append("h5")
		h5.append("span")
			.html(d.rank + " | ");
		h5.append("a")
			.html(d.title);
		//--p
		div.append("p")
			.attr("class", "text-success")
			.html(d.displayUrl);
		//--p
		div.append("p")
			.html(d.description);
		
		//set height
		var foHeight = div[0][0].getBoundingClientRect().height;
		foreignO.attr("height", foHeight);
		
		//set position
		var padding = 50;
		var infoboxHeight = foHeight + padding + 5;
		if ( (d.x + infoboxHeight) > height && infoboxHeight < d.x ) {
		//-infobox max bottom
			foreignO.attr({
	            "x": d.y + padding,
	            "y": d.x - padding - foHeight
			});
		} else if ( (d.x + infoboxHeight) > height && infoboxHeight > d.x ) {
		//-infobox max top
			foreignO.attr({
	            "x": 0,
	            "y": 0
			});			
		} else {
			foreignO.attr({
	            "x": d.y + padding,
	            "y": d.x + padding
			});
		}
	}
	
	//on.mouseOut: remove infobox
	function mouseOutInfobox(d) {
		//-verify leaf node
		if (!d.rank) {return}
		//-function main statement
        svg.selectAll('.svg-foreignO').remove()
	}
}

//---radial Tree 
//---arguements:
//----clusterTree (Object) (input data for define nodes and links)
ns.sev.drawD3TreeRadial = function(clusterTree) {
	var root = clusterTree;
	
	var width = parseInt(d3.select("div.cluster").style('width'), 10);
	var areaRatio = .6;
	var height = width * areaRatio;
	var radius = height * .3;

	//-layout
	var tree = d3.layout.tree()
		.size([360, radius])
		.separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

	//-accessor function
	var diagonal = d3.svg.diagonal.radial()
		.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

	//-svg container
	var svg = d3.select("div#draw-radial-tree").append("svg")
		.attr("width", width)
		.attr("height", height)
	.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	//-call drawing
	update(root);
	
	//-compute layout
	function update(root) {
		//-runs the tree layout: compute nodes and links
		var nodes = tree.nodes(root),
		links = tree.links(nodes);
	
		//-define link elements
		var link = svg.selectAll(".link")
			.data(links)
		.enter().append("path")
			.attr("class", "link")
			.attr("d", diagonal)
			.attr("style", function(d) { 
	    		var h = 120,s,l = .80;
	    		if (d.target.docs) {
	    			s = ( (root.docs.length + 1) - d.target.docs[0] ) / 100;
	    		} else if (d.target.rank) {
	    			s =  ( (root.docs.length + 1) - d.target.rank ) / 100;
	    		}
				return ("stroke: " + d3.hsl(h,s,l).toString()); 
			});
	
		//-define node elements
		var node = svg.selectAll(".node")
			.data(nodes)
		.enter().append("g")
			.attr("class", function(d) { return d.url ? "node leaf" : "node innerNode"; })
			.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });
	
		node.append("circle")
			.attr("r", 4.5)
			.attr("style", function(d) { 
	    		var h = 120,s,l = .80;
	    		var colorStroke;
	
	    		if (d.docs) {
	    			s = ( (root.docs.length + 1) - d.docs[0] ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
	    		} else if (d.rank) {
	    			s =  ( (root.docs.length + 1) - d.rank ) / 100;
	    			colorStroke = d3.hsl(h,s,l).toString();
	    		}
				return ("stroke: " + colorStroke); 
			});
	
		//--add text to node elements
		var leaf = svg.selectAll("g.leaf")
		.append("a")
			.attr("xlink:href", function(d) { return d.url; })
			.attr("target", function(d) { return "_blank"; })		
		.append("text")
			.attr("dy", ".31em")
			.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
			.attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
			.text(function(d) { return ns.sev.truncateString(d.title, radius * .7); })
			.on("click", ns.sev.ahrefFocusOnClick)
			.on("mouseover", ns.sev.tooltipShow)
			.on("mouseout", ns.sev.tooltipHide);
		
		var innerNode = svg.selectAll("g.innerNode")
		.append("text")
			.attr("dy", ".31em")
			.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
			.attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
			.text(function(d) { return ns.sev.truncateString(d.name, radius * .5); })
			.on("mouseover", ns.sev.tooltipShow)
			.on("mouseout", ns.sev.tooltipHide);
	}
}

//--D3 ahref focus on click
//---arguements:
//----d (Object) (d3 datum)
ns.sev.ahrefFocusOnClick = function(d) {
	//-verify leaf node
	if (!d.url) {return}
	//-function statement
    d3.select(this)
    	.attr("style", "fill: #23527c; text-decoration: underline");
}

//--D3 svg-text truncate 
//---arguements:
//----textString (String) (full text string)
//----width (Number) (max width of textString)
ns.sev.truncateString = function(textString, width) {
		var words = textString.split(/\s+/).reverse();
		var word;
		var line = [];
		while (word = words.pop()) {
			line.push(word);
			if (line.join(" ").length * 8 > width) {
				line.pop();
				line.push(" ...");
				
				return line.join(" ");
			}
		}
		return line.join(" ");
}

//--tooltip (infobox for SERPs)
//---arguements:
//----d (Object) (d3 datum)
//----i (Number) (index)
ns.sev.tooltipShow = function(d, i) {
	//-function main statement
	var html = '';
	var templ = '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>';
	
	//-verify nodes to set html 
	if (d.depth == 0) {
	//--root
		html += "<p>Search keyword: <span class='text-success'><strong>" + d.name + "</strong></span></p>";
	} else if (d.depth == 1) {
	//--inner node
		html += "<h5>Category: <span class='text-success'><strong>" + d.name + "</strong></span></h5>";
		html += "<p><span class='text-success'><strong>" + d.docs.length + "</strong></span> result pages</p>";
	} else if (d.depth == 2) {
	//--leaf
		html += "<h5>";
			html += "<span>" + d.rank + " | </span>";
			html += "<a href=''> " + d.title + " </a>";
		html += "</h5>";
		html += "<p class='text-success'>" + d.displayUrl + "</p>";
		html += "<p>" + d.description + "</p>";
	}
	
	//set tooltip options
    $(this).tooltip({
        title: html,
        template: templ,
        html: true,
        container: 'div#clusterTabContent',
        placement: 'auto'
    }).tooltip('show');
}

//--remove/hide tooltip (infobox)
//---arguements:
//----d (Object) (d3 datum)
//----i (Number) (index)
ns.sev.tooltipHide = function(d, i) {
    $(this).tooltip('hide');
}

//--D3 responsive
ns.sev.responsiveD3 = function() {
	var resizeTimer;
	
	//window resize
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(doneResizing, 500);
	});
	//D3-functions
	function doneResizing(){
		//-remove all svg elements
		d3.selectAll("svg").remove();
		
		//-update the active d3 layout
		if ( $("div#tree").css("display") == "block" ){
		//--update tree		
			ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
			ns.sev.drawD3Tree(ns.sev.resultClusterTree);
		} else if ( $("div#radial-tree").css("display") == "block" ) {
		//--update radial tree		
			ns.sev.resultClusterTree = ns.sev.getClusterTree(ns.sev.resultSolrJSON);
			ns.sev.drawD3TreeRadial(ns.sev.resultClusterTree);
		}
			
		//-refresh the SERPs table
		ns.sev.refreshSerps();
	}
}

//--clustered SERPs
//---arguements:
//----cluster (Object) (docs to add or remove from clusteredPages)
//----isAdded (boolean) (true: add to clusteredPages[]; false remove from clusteredPages[])
ns.sev.clusterPages = function(cluster, isToAdd) {
	//-update the cluster labels
	if (isToAdd) {
	//--add cluster
		ns.sev.clusters.push(cluster);
	} else {
	//--remove cluster
		ns.sev.clusters.every(function(item, index, array) {
			if (item.name == cluster.name) {
				ns.sev.clusters.splice(index, 1);
				
				return false;
			} else {
				return true;
			}
		}); 
	}
	
	//evaluate empty ns.sev.clusters
	if (ns.sev.clusters.length == 0) {
		ns.sev.refreshSerps();
		return;
	}
	
	//-get sorted docs union 
	var docs = [];
	ns.sev.clusters.forEach(function(item) {
		docs = _.union(docs, item.docs);
	});
	docs.sort(function(a, b) {return a-b});
	
	//-update the SERPs
	var html = '';
	docs.forEach(function(item) {
		html += "<tr>";
			html += "<td>";
				html += "<h5>";
					html += "<span>" + ns.sev.resultSolrJSON.response.docs[item-1].rank + " | </span>";
					html += "<a href='" + ns.sev.resultSolrJSON.response.docs[item-1].url + "' target='_blank'> " 
						+ ns.sev.resultSolrJSON.response.docs[item-1].title + " </a>";
				html += "</h5>";
				html += "<p class='text-success'>" + ns.sev.resultSolrJSON.response.docs[item-1].displayUrl + "</p>";
				html += "<p>" + ns.sev.resultSolrJSON.response.docs[item-1].description + "</p>";
			html += "</td>";
			html += "<td></td>";
		html += "</tr>";
	})
	$("tbody#hilitor tr").remove();
	$("table.table").find("tbody#hilitor").append(html);
	
	ns.sev.setQueryStringBold();
}

/*
 * -refresh the table of SERPs
 */
ns.sev.refreshSerps = function() {
	//reinit the global scope 
	ns.sev.currentPage = 1;
	ns.sev.serpsPerPage = 10;
	ns.sev.clusters = [];
	
	//set SERPS
	var html = '';
	for (var i = 0; i < ns.sev.serpsPerPage; i++) {
		html += "<tr>";
			html += "<td>";
				html += "<h5>";
					html += "<span>" + ns.sev.resultSolrJSON.response.docs[i].rank + " | </span>";
					html += "<a href='" + ns.sev.resultSolrJSON.response.docs[i].url + "' target='_blank'> " 
						+ ns.sev.resultSolrJSON.response.docs[i].title + " </a>";
				html += "</h5>";
				html += "<p class='text-success'>" + ns.sev.resultSolrJSON.response.docs[i].displayUrl + "</p>";
				html += "<p>" + ns.sev.resultSolrJSON.response.docs[i].description + "</p>";
			html += "</td>";
			html += "<td></td>";
		html += "</tr>";
	}
	
	//set load Button
	html += '<tr class="loadNextRow">'
		html += '<td colspan="2" class="loadNextColumn">'
			html += '<div style="text-align: center">'
				html += '<strong> <a class="loadButton" href="">load next 10 items</a></strong>'
			html += '</div>'
		html += '</td>'
	html += '</tr>'
	
	//refresh the SERPs table 
	$("tbody#hilitor tr").remove();
	$("table.table").find("tbody#hilitor").append(html);
	
	//-bold the query string
	ns.sev.setQueryStringBold();	

	//-event handler (reassign the Button to the listenr)
	$(".loadButton").click(ns.sev.loadNextPageClient);
}