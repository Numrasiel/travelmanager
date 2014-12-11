package com.travelmanager.web;
import com.travelmanager.domain.EndPoint;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/endpoints")
@Controller
@RooWebScaffold(path = "endpoints", formBackingObject = EndPoint.class)
public class EndPointController {
}
