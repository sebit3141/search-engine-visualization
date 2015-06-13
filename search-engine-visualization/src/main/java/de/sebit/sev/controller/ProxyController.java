package de.sebit.sev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import de.sebit.sev.service.ProxyService;

@Controller
public class ProxyController {
	
	@Autowired
	private ProxyService proxyService;
	
	/**
	 * control proxy service (AJAX handling). 
	 */
	@ResponseBody
	@RequestMapping(value = "/ajax", method = RequestMethod.GET)
	public String getDomain(@RequestParam(value="url", required=false) String url) {
        System.out.println("ajax - url: " + url);

        return proxyService.getDomainContent(url);
	}
}
