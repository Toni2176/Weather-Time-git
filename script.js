// // COORDS
navigator.geolocation.getCurrentPosition(currentPos);
async function currentPos(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // WEATHER
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={API_KEY}`;

  const locationApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

  await fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const iconCode = data.weather[0].icon.slice(0, -1);
      const finalIcon = `https://openweathermap.org/img/wn/${iconCode}d@2x.png`;
      const temp = Math.round(data.main.temp - 273.15);
      const mainWeather = data.weather[0].main;

      img(finalIcon);
      temperatureFinal(temp);
      main(mainWeather);
    });

  await fetch(locationApiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const city = data.city;
      const country = data.countryName;
      const finalLocation = `${city}, ${country}`;
      finalLoc(finalLocation);
    });
}

// UPDATE HTML
const weatherContainer = document.querySelector(".weather-container");
function img(finalIcon) {
  const icon = document.createElement("img");
  icon.classList.add("weather-icon");
  icon.src = finalIcon;
  weatherContainer.appendChild(icon);
}

function temperatureFinal(temp) {
  const finalTemp = document.createElement("p");
  finalTemp.classList.add("temperature");
  finalTemp.textContent = `${temp}C°`;
  weatherContainer.appendChild(finalTemp);
}

function main(mainWeather) {
  const mainWeath = document.createElement("p");
  mainWeath.classList.add("weather");
  mainWeath.textContent = mainWeather;
  weatherContainer.appendChild(mainWeath);
}

function finalLoc(finalLocation) {
  const loc = document.createElement("p");
  loc.classList.add("location-text");
  loc.textContent = finalLocation;
  weatherContainer.appendChild(loc);
}

function updateClock(html) {
  const clock = document.createElement("p");
  clock.classList.add("time");
  clock.textContent = html;
  timeAndDate.appendChild(clock);
}

function updateDate(html) {
  const seeDate = document.createElement("p");
  seeDate.classList.add("date");
  seeDate.textContent = html;
  timeAndDate.appendChild(seeDate);
}
/* 
<p class="location-text">Kicevo, North Macedonia</p> */

// CLOCK
const timeAndDate = document.querySelector(".date-time-container");

function clock() {
  let time = new Date();
  let hour = time.getHours();
  let minutes = time.getMinutes();

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const html = `${hour}:${minutes}`;
  updateClock(html);
}

clock();

//DATE
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

function date() {
  let d = new Date();
  let day = d.getDay() - 1;
  let date = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  const finalDay = days[day];
  const finalMonth = months[month];
  const html = `${finalDay}, ${date} ${finalMonth} ${year}`;

  updateDate(html);
}
date();
