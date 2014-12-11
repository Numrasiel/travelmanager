package com.travelmanager.web;

import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.support.FormattingConversionServiceFactoryBean;
import org.springframework.roo.addon.web.mvc.controller.converter.RooConversionService;

import com.travelmanager.domain.EndPoint;
import com.travelmanager.domain.StartPoint;


/**
 * A central place to register application converters and formatters. 
 */
@RooConversionService
public class ApplicationConversionServiceFactoryBean extends FormattingConversionServiceFactoryBean {

	@Override
	protected void installFormatters(FormatterRegistry registry) {
		super.installFormatters(registry);
		// Register application converters and formatters
	}
	
	public Converter<StartPoint, String> getStartPointToStringConverter() {
		return new org.springframework.core.convert.converter.Converter<StartPoint, String>() {
			public String convert(StartPoint target) {
				//return new StringBuilder().append(target.getName()).toString();
				String ret=target.getName();
				if(!target.getAddress().contains(ret)){
					ret+=" "+target.getAddress();
				}
				return ret;//new StringBuilder().append(target.getName()+" "+target.getAddress()+" ").toString();
			}
		};
	}
	public Converter<EndPoint, String> getEndPointToStringConverter() {
		return new org.springframework.core.convert.converter.Converter<EndPoint, String>() {
			public String convert(EndPoint target) {
				//return new StringBuilder().append(target.getName()).toString();
				String ret=target.getName();
				if(!target.getAddress().contains(ret)){
					ret+=" "+target.getAddress();
				}
				return ret;//new StringBuilder().append(target.getName()+" "+target.getAddress()+" ").toString();
			}
		};
	}
}
