package de.sebit.sev.controller;

import java.util.List;
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
	
	@Autowired
	private SearchService searchService;
		
	/**
	 * control the search service with the incoming query parameter
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public String search(@RequestParam(value="query", required=false) String query, Model model) {
		//call service
		//-get Bing results and save it to resultDTOList
		List<ResultDTO> resultDTOList = searchService.bingService.getBingResultDTOList(query, 2);
		//-add resultDTOList to Solr
		searchService.solrService.addListToSolrCore(resultDTOList);

		//add to Model
		model.addAttribute("queryString", query); // View access: header.jsp

		//call View
		return "search";
	}
}
