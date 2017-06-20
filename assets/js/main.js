//se muestra en el div con el id
function initMap(){
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5, //muestra lvl de profundidad
    center: {lat: -9.1191427, lng: -77.0349046},//contiene longitud y latitud que queremos que se muestre nuestro mapa
    mapTypeControl: false,
    zoomControl: false, 
    streetViewControl: false
  });

  //solo se ejecuta funcionExito cuando el usuario comparte ubicacion y error cuando no.
  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }
  document.getElementById("encuentrame").addEventListener("click", buscar);

  var latitud,longitud;

  //se obtiene latitud o longitud
  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var imga = "https://www.broomfield.org/images/CivicAlerts/1/ThumbNails/blue%20heading%20icons_bike_50x50_AspectPreserved_thumb.png";
    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map,
      icon: imga
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }

  //muestra mensaje si falla en busca de la geolocalizacion.
  var funcionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  //Librería gmps.
  var inputOrigen =(document.getElementById('input-origen'));    
  var autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen);
  autocompleteOrigen.bindTo('bounds', map);

  var inputDestino = document.getElementById("input-destino");
  var autocompleteDestino = new google.maps.places.Autocomplete(inputDestino);
  autocompleteDestino.bindTo('bounds', map);

  //Calcula indicaciones y las devuelve en coordenadas
  var directionsService = new google.maps.DirectionsService;
  //Representa las coordenadas, estos dos son objetos de google.
  var directionsDisplay = new google.maps.DirectionsRenderer;
  
  directionsDisplay.setMap(map);
  var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
  //obtener ruta
  document.getElementById('input-origen').addEventListener('change', onChangeHandler);
  document.getElementById('input-destino').addEventListener('change', onChangeHandler);

  var imga = "https://www.broomfield.org/images/CivicAlerts/1/ThumbNails/blue%20heading%20icons_bike_50x50_AspectPreserved_thumb.png";
  //function que calcula ruta con las value de los inputs.
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: document.getElementById('input-origen').value,
            destination: document.getElementById('input-destino').value,
            travelMode: 'DRIVING'//tipo de viaje
        },  
        function(response, status) {
             if (status === 'OK') {
                document.getElementById("ruta").addEventListener("click", function(){
                directionsDisplay.setDirections(response);
            })
              }
         });
    }
}