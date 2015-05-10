package de.sebit.sev.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
	@Autowired
	public BingService bingService;
	@Autowired
	public JsonService jsonService;
	@Autowired
	public SolrService solrService;
}