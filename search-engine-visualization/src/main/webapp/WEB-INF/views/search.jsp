<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="./layout/_taglib.jsp"%>

<%@ page session="false"%>

<!-- Body: search results  items -->
<div id="main" class="container">
	<div class="cluster">
		<div class="page-header">
			<h2>Result Visualization
				<small>
					<span id="tab-dropdown-cluster-algo" class="dropdown">
						<a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" aria-label="Settings" href="#">
							<span class="glyphicon glyphicon-wrench" aria-hidden="true"></span>
						</a>
						<ul class="dropdown-menu">
							<li class="dropdown-header">Clustering Algorithms</li>
							<li class="divider"></li>
							<li id="tab-lingo" class="active"><a href="#">Lingo</a></li>
							<li id="tab-stc" class=""><a href="#">STC</a></li>
							<li id="tab-kmeans" class=""><a href="#">K-Means</a></li>
						</ul>
					</span>
				</small>
			</h2>
		</div>
		<ul class="nav nav-tabs">
			<li class="active" id="tab-word-cloud"><a aria-expanded="false" href="#word-cloud"
				data-toggle="tab">Search Refinement</a></li>
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
			<table class="table table-bordered table-hover table-striped">
				<thead></thead>
				<tbody id="hilitor"></tbody>
			</table>
		</div>
	</div>
</div>