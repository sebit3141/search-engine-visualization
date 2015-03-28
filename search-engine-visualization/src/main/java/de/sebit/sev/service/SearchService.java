package de.sebit.sev.service;

import java.util.ArrayList;
import java.util.List;

import net.billylieurance.azuresearch.AzureSearchResultSet;
import net.billylieurance.azuresearch.AzureSearchWebQuery;
import net.billylieurance.azuresearch.AzureSearchWebResult;

import org.springframework.stereotype.Service;

import de.sebit.sev.entity.ResultEntity;

@Service
public class SearchService {

	private static final String appId = "QEHfz7IB7f4m3UNuc1Uyu6NaE2W0eXBlrWsLMWzH6wU";
	private AzureSearchWebQuery query;
	
	public SearchService() {
		query = new AzureSearchWebQuery();
        query.setAppid(appId);   
        query.setMarket("de-DE");
        query.setPerPage(5);
        System.out.println("----------------------SearchService"); 
	}
	
	public void search() {  
		//AzureSearchWebQuery query = new AzureSearchWebQuery();        
        query.setQuery("Mond");
        
 // The results are paged. You can get 50 results per page max.
 // This example gets 150 results
        int j = 0;
        for (int i=1; i<=1 ; i++) {
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
	
	public List<ResultEntity> searchBing(String queryString) {
		List<ResultEntity> resultList = new ArrayList<ResultEntity>();
		int j = 1;

		//set query for search
		query.setQuery(queryString);
		
		//add results to the list
		for (int i=1; i<=1 ; i++) {
           query.setPage(i);
           query.doQuery();
           AzureSearchResultSet<AzureSearchWebResult> ars = query.getQueryResult();
           for (AzureSearchWebResult result : ars) {
    		ResultEntity resultEntity = new ResultEntity();
        	//get result
    		resultEntity.setRank(j);
        	resultEntity.setTitle(result.getTitle());
        	resultEntity.setDisplayUrl(result.getDisplayUrl());
        	resultEntity.setUrl(result.getUrl());
        	resultEntity.setDescription(result.getDescription());
        	
        	//add result to List
        	resultList.add(resultEntity);
        	
            System.out.println("------------" + resultList.size());
            System.out.println(resultEntity.getRank());
            System.out.println(resultEntity.getTitle());
            System.out.println(resultEntity.getUrl());
            System.out.println(resultEntity.getDisplayUrl());
            System.out.println(resultEntity.getDescription()); 
        	
            j++;
           }
        }	 		
		return resultList; 
	}
}
