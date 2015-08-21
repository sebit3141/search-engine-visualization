package de.sebit.sev.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.springframework.stereotype.Service;

import de.sebit.sev.dto.ResultDTO;

@Service
public class SolrService {
		
	//URL (inactive)
	private String urlLocalSolr = "http://localhost:8983/solrClient/searchClustering";
	private String urlLocalSolrClustering = "http://localhost:5000/sevCore";
	private String urlHerokuSolrClustering = "https://solr-clustering.herokuapp.com/sevCore";
	
	//URL (active)
	//private String urlString = urlLocalSolrClustering;
	private String urlString = urlHerokuSolrClustering;
	
	//Solr Client
	SolrClient solrClient;
	
	public SolrService() {
		solrClient = new HttpSolrClient(urlString);
	}
		
	/**
	 * Add a list with POJO elements to the Solr core (indexing).
	 * @param list list which will index to the Solr core
	 * @throws SolrServerException 
	 * @throws IOException  
	 */
	public void addListToSolrCore(List<?> list) {
	    try {
	    	//delete current indexed data (Solr Core)
			solrClient.deleteByQuery( "*:*" );

			//add data to the solr core (indexing)
	    	UpdateResponse rsp;
			rsp = solrClient.addBeans(list);
			solrClient.commit();

	    } catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
