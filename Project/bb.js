function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let input = document.querySelector("#cityInput");
  city.innerHTML = input.value;
}

l;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);

  let currentDegrees = document.querySelector(".currentDegrees");
  currentDegrees.innerHTML = `${temperature}°C`;
}

let apiKey = "752a3b7c84950701295b5755aa7ad901";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Stuttgart&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showTemperature);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", displayCurrentLocation);

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
currentDate.innerHTML = `${day} ${date} ${month} ${hours} : ${minutes}`;

function search(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#searchForm");

searchForm.addEventListener("submit", search);
function displayDegrees(response) {
  let cityInput = document.querySelector("#cityInput");
  let apiKey = "752a3b7c84950701295b5755aa7ad901";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityInput}&appid=${apiKey}`;
}
let currentDegrees = document.querySelector("#currentD");
currentDegrees.innerHTML = `hey ${response.data.main.temp}`;

axios.get(apiUrl).then(displayDegrees);
