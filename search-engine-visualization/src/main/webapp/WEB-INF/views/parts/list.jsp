<!-- .jsp items -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ include file="../layout/_taglib.jsp"%>

<table class="table table-bordered table-hover table-striped">
	<thead>
	</thead>
	<tbody id="hilitor">
		<c:forEach items="${resultDTO}" var="result" begin="0" end="9">
			<tr>
				<td>
					<h5>
						<span><c:out value="${result.rank}" /> | </span> <a
							href='<spring:url value="${result.url}" />' target="_blank">
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
		<tr class="loadNextRow">
			<td class="loadNextColumn" colspan="2">
				<div style="text-align: center">
					<strong> <a
						href="<spring:url value='' />${noscriptNextPageUrl}"
						class="loadButton">load next 10 items</a>
					</strong>
				</div>
			</td>
		</tr>
	</tbody>
</table>