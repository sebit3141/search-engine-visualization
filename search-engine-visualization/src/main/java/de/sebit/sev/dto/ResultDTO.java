package de.sebit.sev.dto;

import org.apache.solr.client.solrj.beans.Field;

public class ResultDTO {

	@Field("id")
	private Integer rank;
	@Field
	private String title;
	@Field
	private String description;
	@Field
	private String displayUrl;
	@Field
	private String url;
	@Field
	private String query;

	public Integer getRank() {
		return rank;
	}
	public void setRank(Integer rank) {
		this.rank = rank;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDisplayUrl() {
		return displayUrl;
	}
	public void setDisplayUrl(String displayUrl) {
		this.displayUrl = displayUrl;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
}