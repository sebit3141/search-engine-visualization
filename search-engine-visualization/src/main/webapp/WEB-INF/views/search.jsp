<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="./layout/_taglib.jsp"%>

<!-- Body: search results  items -->
<div id="main" class="container">
	<div class="cluster">
		<div class="page-header">
			<h2>Result Clustering<small></small></h2>
		</div>
		<ul class="nav nav-tabs">
			<li class="active"><a aria-expanded="false" href="#tree"
				data-toggle="tab">Tree</a></li>
			<li class=""><a aria-expanded="true" href="#treemap"
				data-toggle="tab">Treemap</a></li>
			<li class=""><a aria-expanded="true" href="#circle"
				data-toggle="tab">Circle</a></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade active in" id="tree">
				<br>
				<%@ include file="./parts/tree.jsp"%>
			</div>
			<div class="tab-pane fade" id="treemap">
				<br>
				<%@ include file="./parts/treemap.jsp"%>
			</div>
			<div class="tab-pane fade" id="circle">
				<br>
				<%@ include file="./parts/circle.jsp"%>
			</div>
		</div>
	</div>
	<div class="serps">
		<div class="page-header">
			<h2>Search Engine Result Pages<small></small></h2>
		</div>
		<ul class="nav nav-tabs">
			<li class="active"><a aria-expanded="false" href="#list"
				data-toggle="tab">List</a></li>
			<li class="" id="li_graph"><a aria-expanded="true" href="#graph"
				data-toggle="tab">Graph</a></li>
			<li class="dropdown"><a aria-expanded="false"
				class="dropdown-toggle" data-toggle="dropdown" href="#">
					Dropdown <span class="caret"></span>
			</a>
				<ul class="dropdown-menu">
					<li><a href="#dropdown1" data-toggle="tab">Action</a></li>
					<li class="divider"></li>
					<li><a href="#dropdown2" data-toggle="tab">Another action</a></li>
				</ul></li>
		</ul>
		<div id="myTabContent" class="tab-content">
			<div class="tab-pane fade active in" id="list">
				<br>
				<%@ include file="./parts/list.jsp"%>
			</div>
			<div class="tab-pane fade" id="graph">
				<br>
				<%@ include file="./parts/graph.jsp"%>
			</div>
			<div class="tab-pane fade" id="dropdown1">
				<p>Etsy mixtape wayfarers, ethical wes anderson tofu before they
					sold out mcsweeney's organic lomo retro fanny pack lo-fi
					farm-to-table readymade. Messenger bag gentrify pitchfork tattooed
					craft beer, iphone skateboard locavore carles etsy salvia banksy
					hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify
					squid 8-bit cred pitchfork.</p>
			</div>
			<div class="tab-pane fade" id="dropdown2">
				<p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
					art party before they sold out master cleanse gluten-free squid
					scenester freegan cosby sweater. Fanny pack portland seitan DIY,
					art party locavore wolf cliche high life echo park Austin. Cred
					vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
					farm-to-table VHS viral locavore cosby sweater.</p>
			</div>
		</div>
	</div>
</div>