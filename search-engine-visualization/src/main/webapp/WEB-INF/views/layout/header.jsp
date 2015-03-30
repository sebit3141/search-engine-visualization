<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="_taglib.jsp"%>

<!-- Header: search items -->
<div class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<a href='<spring:url value="/" />' class="navbar-brand">SEV</a>
		<form action='<spring:url value="/search" />' method="GET"
			style="padding: 8px 0 8px 0;">
			<div class="input-group" style="max-width: 470px;">
				<input value="${queryString}" name="query" id="input-query"
					type="text" class="form-control" placeholder="Search">
				<div class="input-group-btn">
					<button class="btn btn-default btn-primary" type="submit">
						<i class="glyphicon glyphicon-search"></i>
					</button>
				</div>
			</div>
		</form>
	</div>
</div>