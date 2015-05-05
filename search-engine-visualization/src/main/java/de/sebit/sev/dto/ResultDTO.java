package de.sebit.sev.dto;

public class ResultDTO {

		//@Id
		private Integer rank;
		
		private String title;
		
		private String description;
		
		private String displayUrl;
		
		private String url;
		
		private String query;

		public String getQuery() {
			return query;
		}

		public void setQuery(String query) {
			this.query = query;
		}

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
}