<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="_taglib.jsp"%>

<!-- JS -->

<!-- js.jQuery 
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.js"></script>
-->

<!-- js.bootstrap: Latest compiled and minified JavaScript 
<script	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
-->

<!-- js.Custom
<script src="resources/js/highlight/jquery.highlight-5.js"></script>
<script src="resources/js/highlight/jquery.highlight.js"></script>
-->

<!-- js.Custom: glabal scope (namespace) -->
<script>
	var ns = ns || {};
	ns.sev = ns.sev || {};
	ns.sev.resultDTOListJSON = ${resultDTOListJSON};
</script>

<script src="resources/js/scripts.js"></script>
<script src="resources/js/highlight/hilitor-bold.js"></script>