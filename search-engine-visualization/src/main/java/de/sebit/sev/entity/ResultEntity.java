package de.sebit.sev.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

//@Entity
public class ResultEntity {

		//@Id
		private Integer rank;
		
		private String title;
		
		private String description;
		
		private String displayUrl;
		
		private String url;

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