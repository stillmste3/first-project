function formatDate(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.time
                  )}</div>
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    alt=""
                    width="52"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">
                      ${Math.round(forecastDay.temperature.maximum)}&deg;
                    </span>
                    <span class="weather-forecast-temperature-min">
                      ${Math.round(forecastDay.temperature.minimum)}&deg;
                    </span>
                  </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0fff693ado40fca5c31aa3t915ba61fd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  let temperature = document.querySelector("#current-temp");

  celsiusTemperature = response.data.temperature.current;

  temperature.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
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
