response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  icon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "0fff693ado40fca5c31aa3t915ba61fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function manageSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#weather-input").value;
  searchCity(city);
}

function displayLocation(coordinates) {
  let apiKey = "0fff693ado40fca5c31aa3t915ba61fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", manageSubmit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrent);

searchCity("Krugersdorp");  
