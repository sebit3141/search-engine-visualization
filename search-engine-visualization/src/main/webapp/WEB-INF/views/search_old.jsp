<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="./layout/_taglib.jsp"%>

<!-- .html document items -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<%@ include file="./layout/_head.jsp"%>
	</head>
	<body>
		<div class="navbar navbar-default navbar-fixed-top">
			<div class="container">
				<a href="<spring:url value="/" />" class="navbar-brand"><tiles:getAsString name="title" /></a>          	
	          	<form action="<spring:url value="/search" />" method="GET"
	          		style="padding: 8px 0 8px 0;">
					<div class="input-group" style="max-width: 470px;">
						<input value="${queryString}" name="query" id="input-query" type="text" class="form-control" placeholder="Search">
						<div class="input-group-btn">
							<button class="btn btn-default btn-primary" type="submit">
								<i class="glyphicon glyphicon-search"></i>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div id="main" class="container">
			<ul class="nav nav-tabs">
			  <li class="active"><a aria-expanded="true" href="#home" data-toggle="tab">Home</a></li>
			  <li class=""><a aria-expanded="false" href="#profile" data-toggle="tab">Profile</a></li>
			  <li class=""><a aria-expanded="false" href="#disabled" data-toggle="tab">Disabled</a></li>
			  <li class="dropdown">
			    <a aria-expanded="false" class="dropdown-toggle" data-toggle="dropdown" href="#">
			      Dropdown <span class="caret"></span>
			    </a>
			    <ul class="dropdown-menu">
			      <li><a href="#dropdown1" data-toggle="tab">Action</a></li>
			      <li class="divider"></li>
			      <li><a href="#dropdown2" data-toggle="tab">Another action</a></li>
			    </ul>
			  </li>
			</ul>
			<div id="myTabContent" class="tab-content">
			  <div class="tab-pane fade active in" id="home">
			    <br>
			    <table class="table table-bordered table-hover table-striped">
					<thead>
					</thead>
					<tbody id="hilitor">
						<c:forEach items="${results}" var="result">
							<tr>
								<td>
									<h5>
										<a href='<spring:url value="${result.url}" />'> 
											<c:out value="${result.title}" />
										</a>	
									</h5>
									<p class="text-success">
										<c:out value="${result.displayUrl}" />
									</p>
									<p>
										<c:out value="${result.description}" />
									</p>
								</td>
								<td><a href='<spring:url value="${result.displayUrl}" />'
									class="btn btn-danger triggerRemove"> remove </a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			  </div>
			  <div class="tab-pane fade" id="profile">
			    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
			  </div>
			  <div class="tab-pane fade" id="disabled">
			    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
			  </div>
			  <div class="tab-pane fade" id="dropdown1">
			    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
			  </div>
			  <div class="tab-pane fade" id="dropdown2">
			    <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
			  </div>
			</div>	
		</div>	
	</body>
</html>