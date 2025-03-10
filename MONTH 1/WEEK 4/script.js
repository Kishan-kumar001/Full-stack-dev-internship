function getWeather() {
  let city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  fetch(geoUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        document.getElementById("weatherResult").innerHTML = "City not found!";
        document.getElementById("weatherResult").style.display = "block";
        return;
      }

      let lat = data.results[0].latitude;
      let lon = data.results[0].longitude;
      getWeatherData(lat, lon, city);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("weatherResult").innerHTML =
        "Error fetching location data!";
      document.getElementById("weatherResult").style.display = "block";
    });
}

function getWeatherData(lat, lon, city) {
  let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      let weather = data.current_weather;
      let weatherHTML = `
                <h2>${city}</h2>
                <p>🌡 Temperature: ${weather.temperature}°C</p>
                <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
            `;

      document.getElementById("weatherResult").innerHTML = weatherHTML;
      document.getElementById("weatherResult").style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("weatherResult").innerHTML =
        "Error fetching weather data!";
      document.getElementById("weatherResult").style.display = "block";
    });
}
