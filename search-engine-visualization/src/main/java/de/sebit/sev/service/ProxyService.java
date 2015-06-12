package de.sebit.sev.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Service;

@Service
public class ProxyService {
	/**
	 * Get the http status code from a specific URL.
	 * @param url URL to get the http status code
	 * @return return the http status code
	 * @throws IOException 
	 */
	public String getDomainContent(String url) {
		String content = null;

		HttpClient client = new DefaultHttpClient();
		HttpGet response = new HttpGet(url);
		HttpResponse httpResp = null;

		try {
			httpResp = client.execute(response);

			BufferedReader rd = new BufferedReader(
					new InputStreamReader(httpResp.getEntity().getContent()));

			StringBuffer result = new StringBuffer();
			String line = "";
			while ((line = rd.readLine()) != null) {
				result.append(line);
			}

			content = result.toString();

		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return content;
	}
}