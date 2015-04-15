<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/_taglib.jsp"%>

<div class="graph">
	<div id="mynetwork">graph</div>
<!-- 
	<script type="text/javascript">
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
		var options = {
			width : '400px',
			height : '400px'
		};
		
		$("#graph").addClass("active"); 
		var network = new vis.Network(container, data, options);
		//network.on('stabilized', $("#graph").removeClass("active"));
		$("canvas").ready($("#graph").removeClass("active"));
		//network.setSize('500px', '600px');
	</script>
-->
</div>