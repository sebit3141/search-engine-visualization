<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="./layout/_taglib.jsp"%>

<%@ page session="false"%>

<!-- Body: search results  items -->
<div id="main" class="container">
	<div class="cluster">
		<div class="page-header">
			<h2>Result Visualization<small></small></h2>
		</div>
		<ul class="nav nav-tabs">
			<li class="active" id="tab-word-cloud"><a aria-expanded="false" href="#word-cloud"
				data-toggle="tab">Key Word Refinement</a></li>
			<li class="" id="tab-tree"><a aria-expanded="true" href="#tree"
				data-toggle="tab">Tree</a></li>
			<li class="" id="tab-radial-tree"><a aria-expanded="true" href="#radial-tree"
				data-toggle="tab">Radial Tree</a></li>
			<li class="" id="tab-force-graph"><a aria-expanded="true" href="#force-graph"
				data-toggle="tab">Cluster Graph</a></li>	
			<li class="" id="tab-force-search-graph"><a aria-expanded="true" href="#force-search-graph"
				data-toggle="tab">Search Graph</a></li>
			<li class="" id="tab-force-cluster-nodes"><a aria-expanded="true" href="#force-cluster-nodes"
				data-toggle="tab">Cluster Nodes</a></li>
		</ul>
		<div id="clusterTabContent" class="tab-content">
			<div class="tab-pane fade active in" id="word-cloud">
				<br>
				<div id="draw-word-cloud"></div>
			</div>
			<div class="tab-pane fade" id="tree">
				<br>
				<div id="draw-tree"></div>
			</div>
			<div class="tab-pane fade" id="radial-tree">
				<br>
				<div id="draw-radial-tree"></div>				
			</div>
			<div class="tab-pane fade" id="force-graph">
				<br>
				<div id="draw-force-graph"></div>
			</div>
			<div class="tab-pane fade" id="force-search-graph">
				<br>
				<div id="draw-force-search-graph"></div>
			</div>
			<div class="tab-pane fade" id="force-cluster-nodes">
				<br>
				<div id="draw-force-cluster-nodes"></div>
			</div>
		</div>
	</div>
	<div class="serps">
		<div class="page-header">
			<h2>Search Engine Result Pages<small></small></h2>
		</div>
		<div class="tab-pane fade active in" id="list">
			<br>
			<%@ include file="./parts/list.jsp"%>
		</div>
	</div>
</div>