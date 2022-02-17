// getting location name

export class GetCityName {
  // Getting current location of the user
  static getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      GetCityName.getCityName(coordinates);
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  static getCityName(coordinates) {
    let xhr = new XMLHttpRequest();
    let lat = coordinates[0];
    let lng = coordinates[1];

    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.89cdab4cf3d6cd5b42eda206273e30f2&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        document.getElementById("location").value = city;
        return;
      }
    }
  }
}
