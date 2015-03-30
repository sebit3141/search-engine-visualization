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
	<body style="margin-top: 0px;">
		<div class="container">
		      <div class="row">	       
		        <div class="col-lg-12 text-center v-center">
		          <h1>Search Engine Visualization</h1>
		          <br><br><br>
		          <form class="col-lg-12" role="form" action="<spring:url value="/search" />" method="GET" >
		            <div class="input-group" style="width:340px;text-align:center;margin:0 auto;">
		            <input name="query" class="form-control input-lg" placeholder="Search" type="text">
		              <span class="input-group-btn">
		              	<button class="btn btn-lg btn-primary" type="submit">OK</button>
		              </span>
		            </div>
		          </form>
		        </div>   
		      </div>
		</div> 
	</body>
</html>