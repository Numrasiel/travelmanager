var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var puntoInicio;
var puntoFin;
var distancia;

var WMS_URL = 'http://sitpa-servicios.cartografia.asturias.es/WMS_CARTOGRAFIA/Request.aspx?';
var WMS_Layers = 'Edificio_publico_o_singular';
var markersArray = [];
var TileWMS = function(coord, zoom) {
	var proj = map.getProjection();
	var zfactor = Math.pow(2, zoom);
	var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 256
			/ zfactor, coord.y * 256 / zfactor));
	var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 256
			/ zfactor, (coord.y + 1) * 256 / zfactor));
	var bbox = top.lng() + "," + bot.lat() + "," + bot.lng() + "," + top.lat();

	var myURL = WMS_URL
			+ "SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG%3A4326&WIDTH=640&HEIGHT=480&FORMAT=image/png&TRANSPARENT=TRUE";
	myURL += "&LAYERS=" + WMS_Layers;
	myURL += "&BBOX=" + bbox;
	return myURL;
};

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();

	var latlng = new google.maps.LatLng(43.354810, -5.851805);
	var misOpciones = {
		zoom : 14,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("mapa"), misOpciones);
	directionsDisplay.setMap(map);
	// kml de colegios
	ctaLayer = new google.maps.KmlLayer(
			'https://dl.dropboxusercontent.com/u/24187586/colegios.kml');

	if (document.getElementById('colegios').checked) {
		ctaLayer.setMap(map);

	}

	$('#colegios').click(function() {
		ctaLayer.setMap($(this).is(':checked') ? map : null);
	});

	// overlay de edificios de interés
	var overlayOptions = {
		getTileUrl : TileWMS,
		tileSize : new google.maps.Size(256, 256)
	};

	overlayWMS = new google.maps.ImageMapType(overlayOptions);
	map.overlayMapTypes.push(overlayWMS);

	if (document.getElementById('lugaresInteres').checked) {
		overlayWMS.setOpacity(1);
	} else {
		overlayWMS.setOpacity(0);
	}

	$('#lugaresInteres').click(function() {
		if (document.getElementById('lugaresInteres').checked) {
			overlayWMS.setOpacity(1);
		} else {
			overlayWMS.setOpacity(0);
		}
	});

	$('#colegios,#lugaresInteres').removeAttr('disabled');
}

// Calcula la ruta
function calcularRuta(start, end, mode) {
	// Si la ruta es de mayor distancia de la que se ha puesto como tope se
	// calculará una ruta en automovil, de otro modo se calculará una ruta a
	// pie-->
	var peticion;
	if (mode == 1) {
		peticion = {
			origin : start,
			destination : end,
			travelMode : google.maps.TravelMode.WALKING,
		};
		alert("Se va a mostrar una ruta a pie.");
	} else {
		peticion = {
			origin : start,
			destination : end,
			travelMode : google.maps.TravelMode.DRIVING,
		};
		alert("Se va a mostrar una ruta en vehículo.");
	}

	directionsService.route(peticion, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}

	});

}

// Calcula las coordenadas del punto de inicio
function coordenadasInicio(lat, lng) {
	puntoInicio = new google.maps.LatLng(lat, lng);
}

// Calcula las coordenadas del punto de fin
function coordenadasFin(lat, lng, start, end, distanciaMax) {
	puntoFin = new google.maps.LatLng(lat, lng);
	//la distancia se calcula aquí por cuestiones de funcionamiento, aunque su lugar natural sería la funcioncalcularDistancia	
	distancia = google.maps.geometry.spherical.computeDistanceBetween(
			puntoInicio, puntoFin);
	document.getElementById("distancia").innerHTML = mostrarDosDecimales(distancia)
			+ " metros";

	if (distanciaMax > distancia) {
		calcularRuta(start, end, 1);
	} else {
		calcularRuta(start, end, 0);
	}
}

// Deja solo los dos primeros decimales de un numero
function mostrarDosDecimales(numero) {
	var flotante = parseFloat(numero);
	var resultado = Math.round(flotante * 100) / 100;
	return resultado;
}

// Calcula la distancia
function calcularDistancia(start, end, distanciaMax) {
	var url = "http://maps.googleapis.com/maps/api/directions/json?origin=";
	url += start;
	url += "&destination=";
	url += end;
	url += "&sensor=false";

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address' : start
	}, function(results, status) {
		lat = (results[0].geometry.location.lat());
		lng = (results[0].geometry.location.lng());
		coordenadasInicio(lat, lng);
	});
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address' : end
	}, function(results, status) {
		lat = (results[0].geometry.location.lat());
		lng = (results[0].geometry.location.lng());
		coordenadasFin(lat, lng, start, end, distanciaMax);
	});
	
}