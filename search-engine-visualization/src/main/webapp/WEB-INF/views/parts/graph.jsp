<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/_taglib.jsp"%>

<div class="graph">
	<div id="viz"></div>

	<script>

  // sample data array
  var sample_data = [
    {"value": 100, "name": "alpha"},
    {"value": 70, "name": "beta"},
    {"value": 40, "name": "gamma"},
    {"value": 15, "name": "delta"},
    {"value": 5, "name": "epsilon"},
    {"value": 1, "name": "zeta"}
  ];

  // instantiate d3plus
  var visualization = d3plus.viz()
    .container("#viz")  // container DIV to hold the visualization
    .data(sample_data)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id("name")         // key for which our data is unique on
    .size("value")      // sizing of blocks
    .draw();            // finally, draw the visualization!

</script>
</div>