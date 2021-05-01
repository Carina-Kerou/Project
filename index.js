// show time & date

function checkTime(time) {
  let now = new Date(time);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let actualTime = `${day} ${hours}:${minutes}`;
  return actualTime;
}

let now = new Date();
let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = checkTime(now);

// show weather
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feelslike").innerHTML = Math.round(
    response.data.main.feels_like
  );
}
function searchCity(city) {
  let apiKey = "dec1516f5dc346e2b00239080e42316d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  //let input = document.querySelector("#search-input");
  //let city = document.querySelector(".city");
  //city.innerHTML = `${input.value}`;
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "dec1516f5dc346e2b00239080e42316d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

//function showFahrenheit(event) {
//let temperature = document.querySelector(".temperature");
//let fahrenheit = Math.round((17 * 9) / 5 + 32);
//temperature.innerHTML = `${fahrenheit}`;
//}

//function showCelsius(event) {
//let temperature = document.querySelector(".temperature");
//let celsius = Math.round(((63 - 32) * 5) / 9);
//temperature.innerHTML = `${celsius}`;
//}

//let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
//fahrenheitTemperature.addEventListener("click", showFahrenheit);

//let celsiusTemperature = document.querySelector("#celsius-link");
//celsiusTemperature.addEventListener("click", showCelsius);

searchCity("Zurich");
