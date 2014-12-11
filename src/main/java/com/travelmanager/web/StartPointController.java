package com.travelmanager.web;
import com.travelmanager.domain.StartPoint;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/startpoints")
@Controller
@RooWebScaffold(path = "startpoints", formBackingObject = StartPoint.class)
public class StartPointController {
}
