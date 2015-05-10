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
        query.setMarket("de-DE");
        query.setPerPage(50);
        System.out.println("----------------------BingService"); 
	}

//->
	public void search() {  
		//AzureSearchWebQuery query = new AzureSearchWebQuery();        
        query.setQuery("Mond");
        
 // The results are paged. You can get 50 results per page max.
 // This example gets 150 results
        int j = 0;
        for (int i=2; i<=2 ; i++) {
           query.setPage(i);
           query.doQuery();
           AzureSearchResultSet<AzureSearchWebResult> ars = query.getQueryResult();
           for (AzureSearchWebResult result : ars) {
        	j++;
            System.out.println("id: " + j); 
            System.out.println(result.getId());
            System.out.println(result.getTitle());
            System.out.println(result.getUrl());
            System.out.println(result.getDisplayUrl());
            System.out.println(result.getDescription()); 
            System.out.println(query.getAdditionalUrlQuery());
            System.out.println(query.getAppid());
            System.out.println(query.getPath());
            System.out.println(query.getQuery());
            System.out.println(query.getQueryExtra());
            System.out.println(query.getQueryPath());
            System.out.println(query.getUrlQuery());
            System.out.println("----------------------"); 
           }
        }
	}
//<-
	
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

        	   System.out.println("------------" + resultDTOList.size());
        	   System.out.println(resultDTO.getRank());
        	   System.out.println(resultDTO.getTitle());
        	   System.out.println(resultDTO.getUrl());
        	   System.out.println(resultDTO.getDisplayUrl());
        	   System.out.println(resultDTO.getDescription()); 

        	   j++;
           }
        }	 		
		return resultDTOList; 
	}
}
