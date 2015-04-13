/*
 * - JS auto call 
 */
$(function() {
	//global scope
	sev = {};
	sev.ns = {};
	sev.ns.currentPage = 1;
	
	//bold the query string
	setQueryStringBold();
	
	//event handler
	$(".loadButton").click(loadNextPage);
	
})

/*
 * - get bold the query string
 */

/*
$(function() {
	$("p").highlight(["car", "a"]);
});
*/

function setQueryStringBold() {
	var queryStr = document.getElementById("input-query").value;
	var myHilitor = new Hilitor("hilitor"); 
	
	myHilitor.apply(queryStr);
}

/*
 * - get next SERPs
 */
function loadNextPage(e) {
	if(e != null) {
		e.preventDefault();
	}
	startRefresh();
	
	var nextPage = sev.ns.currentPage + 1;
	var url = "/search-engine-visualization/page/" + nextPage + ".json";
	
	$.getJSON( url, function( data ) {
		var html = "";
		$.each(data, function(key, value) {
			html += "<tr>";
				html += "<td>";
					html += "<h5>";
						html += "<a href='/'>"; 
							html += value.title;
						html += "</a>";
					html += "</h5>"
					html += "<p class='text-success'>";
						html += value.displayUrl;
					html += "</p>"
					html += "<p>"
						html += value.description;
					html += "</p>";
				html += "</td>";
					html += "<td>";		
					html += "</td>";
			html += "</tr>";
		});
		$("table.table").find("tr.loadNextRow").before(html);
		finishRefresh();
	});
	sev.ns.currentPage++;
}

function startRefresh() {
	$(".loadButton").css("display","none");
	$(".loadButton").after("<i class='fa fa-refresh fa-spin'  style='color:#337ab7'></i>")
}

function finishRefresh() {
	$(".loadButton").css("display","inline");
	$(".fa-spin").remove()
}
