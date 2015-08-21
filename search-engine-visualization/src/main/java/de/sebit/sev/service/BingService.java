package de.sebit.sev.service;

import java.util.ArrayList;
import java.util.List;

import net.billylieurance.azuresearch.AzureSearchResultSet;
import net.billylieurance.azuresearch.AzureSearchWebQuery;
import net.billylieurance.azuresearch.AzureSearchWebResult;

import org.springframework.stereotype.Service;

import de.sebit.sev.dto.ResultDTO;

@Service
public class BingService {

	private static final String appId = "QEHfz7IB7f4m3UNuc1Uyu6NaE2W0eXBlrWsLMWzH6wU";
	private AzureSearchWebQuery query;
	
	public BingService() {
		query = new AzureSearchWebQuery();
        query.setAppid(appId);   
        query.setMarket("en-US");
        query.setPerPage(50);
        System.out.println("Initiate-BingService"); 
	}
	
	/**
	 * Get SERPs (as DTO) from the search engine Bing. 
	 * @param queryString user query 
	 * @param page define the number of pages for the SERPs (one page equal to 50 SERPs)
	 * @return return a SERP List (as DTO) 
	 */
	public List<ResultDTO> getBingResultDTOList(String queryString, int page) {
		List<ResultDTO> resultDTOList = new ArrayList<ResultDTO>();
		int j = 1;

		//set query for search
		query.setQuery(queryString);
		
		//add results to the list
		for (int i=1; i<=page ; i++) {
           query.setPage(i);
           query.doQuery();
           AzureSearchResultSet<AzureSearchWebResult> ars = query.getQueryResult();
           for (AzureSearchWebResult result : ars) {
        	   ResultDTO resultDTO = new ResultDTO();
        	   //get result
        	   resultDTO.setRank(j);
        	   resultDTO.setTitle(result.getTitle());
        	   resultDTO.setDisplayUrl(result.getDisplayUrl());
        	   resultDTO.setUrl(result.getUrl());
        	   resultDTO.setDescription(result.getDescription());
        	   resultDTO.setQuery(queryString);

        	   //add result to List
        	   resultDTOList.add(resultDTO);

        	   j++;
           }
        }	 		
		return resultDTOList; 
	}
}
