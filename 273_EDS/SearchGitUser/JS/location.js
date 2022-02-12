"use strict";

// const mapElement = document.getElementById(".loc_name");
// mapElement.addEventListener("click", initMap);
// Get user location

function initMap() {
  let options = {
    zoom: 8,
    center: { lat: 42.3601, lng: -71.0589 },
  };

  //New Map
  let map = new google.maps.Map(document.getElementById("map"), options);

  //Add Marker
  var marker = new google.maps.Marker({
    position: { lat: 42.3601, lng: -71.0589 },
    map: map,
  });

  let locInfo = new google.maps.InfoWindow({
    content: `<h3>San Francisco</h3>`,
  });

  marker.addListener("click", function () {
    locInfo.open(map, marker);
  });
}
