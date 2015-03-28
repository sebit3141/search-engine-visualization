<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="./layout/taglib.jsp"%>

<!-- Page Heading -->
<div class="row">
	<div class="col-lg-12">
		<h1 class="page-header">Charts</h1>
		<ol class="breadcrumb">
			<li><i class="fa fa-dashboard"></i> <a href="index.html">Dashboard</a>
			</li>
			<li class="active"><i class="fa fa-bar-chart-o"></i> Charts</li>
		</ol>
	</div>
</div>
<!-- /.row -->
<table class="table table-bordered table-hover table-striped">
	<thead>
		<tr>
			<th>date</th>
			<th>item</th>
		</tr>
	</thead>
	<tbody>
		<c:forEach items="${results}" var="result">
			<tr>
				<td><a href='<spring:url value="${result.url}" />'> <c:out
							value="${result.title}" />
				</a></td>
				<td><a href='<spring:url value="${result.displayUrl}" />'
					class="btn btn-danger triggerRemove"> remove </a></td>
			</tr>
		</c:forEach>
		<!-- /.row -->
	</tbody>
</table>