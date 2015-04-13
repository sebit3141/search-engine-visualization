<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="_taglib.jsp"%>

<%@ page session="false"%>

<!-- .html document items -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<%@ include file="./_head.jsp"%>
	</head>
	<body>
		<!-- Header-->
		<tiles:insertAttribute name="header" />
		<!-- Body-->
		<tiles:insertAttribute name="body" />
		<!-- Footer-->
		<tiles:insertAttribute name="footer" />
	</body>
</html>
