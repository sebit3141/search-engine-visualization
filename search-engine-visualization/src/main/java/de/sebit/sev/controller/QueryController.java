package de.sebit.sev.controller;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import de.sebit.sev.dto.ResultDTO;
import de.sebit.sev.service.JsonService;
import de.sebit.sev.service.SearchService;

@Controller
public class QueryController {
	
	private static final Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	@Autowired
	private SearchService searchService;
	
	@Autowired
	private JsonService jsonService;
	/**
	 * Control the incoming query parameter.
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String search(@RequestParam(value="query", required=false) String query, Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		List<ResultDTO> resultDTO = searchService.searchBing(query, 2);
		String jsonResult = jsonService.getJSONfromDTO(resultDTO);
		
		model.addAttribute("resultDTO", resultDTO);
		model.addAttribute("queryString", query);
		model.addAttribute("jsonResult", jsonResult);
		//System.out.println("/search______________: " + jsonResult );

		return "search";
	}

	/**
	 * Control the query for the next SERPs (AJAX handling). 
	 */
	@ResponseBody
	@RequestMapping(value = "/page/{page}")
	public List<ResultDTO> getPageLatest(@PathVariable int page) {
        System.out.println("ajax______________page: " + page);

        return searchService.searchBing("home", page);
	}
}
