<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="_taglib.jsp"%>

<%@ page session="false"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="_head.jsp"%>
</head>

<body>
	<div id="wrapper">
		<!-- Navigation -->
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">

			<tiles:insertAttribute name="header" />

			<tiles:insertAttribute name="menu" />

			<!-- /.navbar-collapse -->
		</nav>
		<div id="page-wrapper">
			<div class="container-fluid">

				<tiles:insertAttribute name="body" />

			</div>
			<!-- /.container-fluid -->
		</div>
		<!-- /#page-wrapper -->
	</div>
</body>
</html>
