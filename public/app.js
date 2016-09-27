var map;

var setupMap = function(options){
  map = new Map(options.container,options.center, options.zoom);
  var centerMarker = map.addMarker(options.center);
  var infowindow = new google.maps.InfoWindow({
    content: options.infoString
  });
  centerMarker.addListener('click', function() {
    infowindow.open(map, centerMarker);
  });
  map.addClickEvent();
}

var setMapCenter = function(lat,lng){
  latLng = new google.maps.LatLng(lat, lng);
  map.googleMap.setCenter(latLng);
  map.addMarker(latLng)
}

var handleBatSignalClick = function(){
  setMapCenter(26.357891,127.78378)
  map.googleMap.setZoom(19)
  map.googleMap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
}

var handleWhereAmI = function(){
  if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position) {
      setMapCenter(position.coords.latitude, position.coords.longitude);
    });
    map.googleMap.setZoom(15)
  }
}

var initialize = function(){

  var mapCenterInfo = {
    "container": document.getElementById('map'),
    "center": {lat: 57.3023, lng:-6.35},
    "zoom": 10,
    "infoString":"Awesome distillery"
  }
  setupMap(mapCenterInfo);

  var batSignal = document.getElementById("to-batman")
  batSignal.onclick = handleBatSignalClick;

  var helpMe = document.getElementById("help-im-lost")
  helpMe.onclick = handleWhereAmI;  
}





window.onload = initialize;

