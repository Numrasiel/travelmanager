// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.travelmanager.web;

import com.travelmanager.domain.EndPoint;
import com.travelmanager.web.EndPointController;
import java.io.UnsupportedEncodingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriUtils;
import org.springframework.web.util.WebUtils;

privileged aspect EndPointController_Roo_Controller {
    
    @RequestMapping(method = RequestMethod.POST, produces = "text/html")
    public String EndPointController.create(@Valid EndPoint endPoint, BindingResult bindingResult, Model uiModel, HttpServletRequest httpServletRequest) {
        if (bindingResult.hasErrors()) {
            populateEditForm(uiModel, endPoint);
            return "endpoints/create";
        }
        uiModel.asMap().clear();
        endPoint.persist();
        return "redirect:/endpoints/" + encodeUrlPathSegment(endPoint.getId().toString(), httpServletRequest);
    }
    
    @RequestMapping(params = "form", produces = "text/html")
    public String EndPointController.createForm(Model uiModel) {
        populateEditForm(uiModel, new EndPoint());
        return "endpoints/create";
    }
    
    @RequestMapping(value = "/{id}", produces = "text/html")
    public String EndPointController.show(@PathVariable("id") Long id, Model uiModel) {
        uiModel.addAttribute("endpoint", EndPoint.findEndPoint(id));
        uiModel.addAttribute("itemId", id);
        return "endpoints/show";
    }
    
    @RequestMapping(produces = "text/html")
    public String EndPointController.list(@RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, Model uiModel) {
        if (page != null || size != null) {
            int sizeNo = size == null ? 10 : size.intValue();
            final int firstResult = page == null ? 0 : (page.intValue() - 1) * sizeNo;
            uiModel.addAttribute("endpoints", EndPoint.findEndPointEntries(firstResult, sizeNo));
            float nrOfPages = (float) EndPoint.countEndPoints() / sizeNo;
            uiModel.addAttribute("maxPages", (int) ((nrOfPages > (int) nrOfPages || nrOfPages == 0.0) ? nrOfPages + 1 : nrOfPages));
        } else {
            uiModel.addAttribute("endpoints", EndPoint.findAllEndPoints());
        }
        return "endpoints/list";
    }
    
    @RequestMapping(method = RequestMethod.PUT, produces = "text/html")
    public String EndPointController.update(@Valid EndPoint endPoint, BindingResult bindingResult, Model uiModel, HttpServletRequest httpServletRequest) {
        if (bindingResult.hasErrors()) {
            populateEditForm(uiModel, endPoint);
            return "endpoints/update";
        }
        uiModel.asMap().clear();
        endPoint.merge();
        return "redirect:/endpoints/" + encodeUrlPathSegment(endPoint.getId().toString(), httpServletRequest);
    }
    
    @RequestMapping(value = "/{id}", params = "form", produces = "text/html")
    public String EndPointController.updateForm(@PathVariable("id") Long id, Model uiModel) {
        populateEditForm(uiModel, EndPoint.findEndPoint(id));
        return "endpoints/update";
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "text/html")
    public String EndPointController.delete(@PathVariable("id") Long id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, Model uiModel) {
        EndPoint endPoint = EndPoint.findEndPoint(id);
        endPoint.remove();
        uiModel.asMap().clear();
        uiModel.addAttribute("page", (page == null) ? "1" : page.toString());
        uiModel.addAttribute("size", (size == null) ? "10" : size.toString());
        return "redirect:/endpoints";
    }
    
    void EndPointController.populateEditForm(Model uiModel, EndPoint endPoint) {
        uiModel.addAttribute("endPoint", endPoint);
    }
    
    String EndPointController.encodeUrlPathSegment(String pathSegment, HttpServletRequest httpServletRequest) {
        String enc = httpServletRequest.getCharacterEncoding();
        if (enc == null) {
            enc = WebUtils.DEFAULT_CHARACTER_ENCODING;
        }
        try {
            pathSegment = UriUtils.encodePathSegment(pathSegment, enc);
        } catch (UnsupportedEncodingException uee) {}
        return pathSegment;
    }
    
}
