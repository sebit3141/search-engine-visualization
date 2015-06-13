package de.sebit.sev.controller;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import de.sebit.sev.dto.ResultDTO;
import de.sebit.sev.service.SearchService;

@Controller
public class QueryController {
	
	private static final Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	@Autowired
	private SearchService searchService;
		
	/**
	 * control the search service with the incoming query parameter
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String search(@RequestParam(value="query", required=false) String query, Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		//call service
		List<ResultDTO> resultDTOList = searchService.bingService.getBingResultDTOList(query, 2);
		String resultDTOListJSON = searchService.jsonService.getJSONfromList(resultDTOList);
		searchService.solrService.addListToSolrCore(resultDTOList);
		
		//add to Model
		model.addAttribute("queryString", query); // View access: header.jsp
		model.addAttribute("resultDTO", resultDTOList);	// View access: search.jsp
		model.addAttribute("resultDTOListJSON", resultDTOListJSON); // View access: footer.jsp
		
		//to delete
		System.out.println("/search - query: " + query);
		System.out.println("/search - resultDTOList: " + resultDTOList);
		System.out.println("/search - resultDTOListJSON: " + resultDTOListJSON);

		//call View
		return "search";
	}
}
