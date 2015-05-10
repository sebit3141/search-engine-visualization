package de.sebit.sev.service;

import java.util.List;

import org.apache.solr.common.util.NamedList;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.sebit.sev.dto.ResultDTO;

@Service
public class JsonService {
	
	/**
	 * Convert a list in a JSON string. 
	 * @param list (with <POJO> elements) convert into a JSON string
	 * @return return a JSON string
	 * @throws JsonProcessingException 
	 */
	public String getJSONfromList(List<?> list) {
		String json = null;
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			json = mapper.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return json;
	}
	
	/**
	 * Convert a list in a JSON string. 
	 * @param namedList (with <POJO> elements) convert into a JSON string
	 * @return return a JSON string
	 * @throws JsonProcessingException 
	 */
	public String getJSONfromNamedList(NamedList<?> namedList) {
		String json = null;
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			json = mapper.writeValueAsString(namedList);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return json;
	}
}