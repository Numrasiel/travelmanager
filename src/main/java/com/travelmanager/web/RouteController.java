package com.travelmanager.web;
import com.travelmanager.domain.Route;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/routes")
@Controller
@RooWebScaffold(path = "routes", formBackingObject = Route.class)
public class RouteController {
}
