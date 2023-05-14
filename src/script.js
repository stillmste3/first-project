function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#time");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);
function showFTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = "75,2°F";
}
let fahrenheitTemperature = document.querySelector("#degrees");
fahrenheitTemperature.addEventListener("click", showFTemperature);
function showTemp(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let temperatureUnit = document.querySelector("#degrees");
  temperatureUnit.innerHTML = `${temperatureElement}°C`;
  document.querySelector(".place").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `💧 ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `🌬️ ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector(".sky").innerHTML = response.data.weather[0].main;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "33de4fe03ae9604e4f03b1ba6b20de58";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(api).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let foreCast = response.data.weather[0].description;
  let humidityUnit = response.data.main.humidity;
  let speed = Math.round(response.data.wind.speed);
  let description = document.querySelector(".sky");
  description.innerHTML = `${foreCast}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `💧 ${humidityUnit}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `🌬️ ${speed}km/h`;
  let temp = document.querySelector("#degrees");
  temp.innerHTML = `${temperature}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}
let button = document.querySelector(".location");
button.addEventListener("click", getCurrentPosition);
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#query");
  let units = "metric";
  let apiKey = "33de4fe03ae9604e4f03b1ba6b20de58";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;
  axios.get(api).then(showWeather);
}
let form = document.querySelector("#form");
form.addEventListener("submit", search);
