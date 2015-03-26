package de.sebit.sev.service;

import net.billylieurance.azuresearch.AzureSearchResultSet;
import net.billylieurance.azuresearch.AzureSearchWebQuery;
import net.billylieurance.azuresearch.AzureSearchWebResult;

import org.springframework.stereotype.Service;

@Service
public class ParseBingSearchService {

	public void search() {  
		AzureSearchWebQuery aq = new AzureSearchWebQuery();        
        aq.setAppid("QEHfz7IB7f4m3UNuc1Uyu6NaE2W0eXBlrWsLMWzH6wU");        
        aq.setQuery("Mond");
        aq.setMarket("de-DE");
        aq.setPerPage(50);
        
 // The results are paged. You can get 50 results per page max.
 // This example gets 150 results
        int j = 0;
        for (int i=1; i<=1 ; i++) {
           aq.setPage(i);
           aq.doQuery();
           AzureSearchResultSet<AzureSearchWebResult> ars = aq.getQueryResult();
           for (AzureSearchWebResult result : ars) {
        	j++;
            System.out.println("id: " + j); 
            System.out.println(result.getId());
            System.out.println(result.getTitle());
            System.out.println(result.getUrl());
            System.out.println(result.getDisplayUrl());
            System.out.println(result.getDescription()); 
            System.out.println("----------------------"); 
           }
        }
	}
	
	public void search1() {
        System.out.println("search1"); 
	}
}
