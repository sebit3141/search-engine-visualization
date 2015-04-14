package de.sebit.sev.service;

import java.util.List;

import org.apache.commons.logging.Log;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.sebit.sev.dto.ResultDTO;

@Service
public class JsonService {
	
	/**
	 * Convert a DTO list in a JSON string. 
	 * @param dtoList get a DTO as list which convert into a JSON string
	 * @return return a JSON string
	 * @throws JsonProcessingException 
	 */
	public String getJSONfromDTO(List<ResultDTO> dtoList) {
		String json = null;
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			json = mapper.writeValueAsString(dtoList);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return json;
	}
}