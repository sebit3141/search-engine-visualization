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
	private String urlString = urlHerokuSolrClustering;
	//Solr Client
	SolrClient solrClient;
	
	public SolrService() {
		solrClient = new HttpSolrClient(urlString);
	}
	
	/**
	 * (Deprecated method)
	 * <p>
	 * Get the http status code from a specific URL.
	 * @param urlString URL to get the http status code
	 * @return return the http status code
	 * @throws IOException 
	 */
	@SuppressWarnings("unused")
	private int getStatusCode(String urlString) {
		int statusCode = 0;
		HttpURLConnection connection;
		
		try {
			URL url = new URL(urlString);
			
			connection = (HttpURLConnection)url.openConnection();
			connection.setRequestMethod("GET");
			connection.connect();
	
			statusCode = connection.getResponseCode();	
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return statusCode;
	}
	
	/**
	 * Get the http status code from a specific URL.
	 * @param urlString URL to get the http status code
	 * @return return the http status code
	 * @throws IOException 
	 */
	@SuppressWarnings("unused")
	private int getStatusCode2(String urlString) {
		int statusCode;
		
		HttpClient client = new DefaultHttpClient();
		HttpGet response = new HttpGet(urlString);
		HttpResponse httpResp = null;
		
		try {
			httpResp = client.execute(response);
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		statusCode = httpResp.getStatusLine().getStatusCode();
		
		return statusCode;	
	}
	
	/**
	 * (invalid method)
	 * <p>
	 * Get a indexed result list with clusters into JSON format.
	 * @return return JSON string (with search results and clusters) 
	 * @throws SolrServerException 
	 * @throws IOException  
	 */
	public String getResultListClusterJSON() {
		String resultListClusterJSON = "test";
		
		SolrQuery parameters = new SolrQuery();
		parameters.set("qt", "/clustering");
		parameters.set("clustering", "true");
		//parameters.set("q", "ipod");
		parameters.set("wt", "json");
		QueryResponse response = null;

		try {
			response = solrClient.query(parameters);	

		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		JsonService jsonService = new JsonService();
		resultListClusterJSON = jsonService.getJSONfromNamedList(response.getResponse());
			
		return resultListClusterJSON;
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
