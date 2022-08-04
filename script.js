let currentDate = document.querySelector("#date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];
let date = currentTime.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[currentTime.getMonth()];
currentDate.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "752a3b7c84950701295b5755aa7ad901";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "752a3b7c84950701295b5755aa7ad901";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentD").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "752a3b7c84950701295b5755aa7ad901";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(position);
  axios.get(apiUrl).then(displayWeather);
}
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#currentD");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentD");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="col-2 sat">
        <div class="day">${formatForecastDate(forecastDay.dt)}</div>
        <img src= "http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png" alt="">
        <br />
        <span class="maxtemp">${Math.round(
          forecastDay.temp.max
        )}°C</span> <span class="mintemp">${Math.round(
          forecastDay.temp.min
        )}°C</span>
      `;
      forecastHtml = forecastHtml + ` </div>`;

      forecastElement.innerHTML = forecastHtml;
    }
  });
}

let searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", handleSubmit);

let currentLokationButton = document.querySelector("#currentLokationButton");
currentLokationButton.addEventListener("click", displayCurrentLocation);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celciusTemperature = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", displayCelciusTemperature);

searchCity("Kyiv");
