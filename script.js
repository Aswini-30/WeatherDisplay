const apiKey =  "5ba69b4a6276b1d057c8cf8108ac0701";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherData = document.getElementById("weatherData");
  const cityName = document.getElementById("cityName");
  const temp = document.getElementById("temp");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const icon = document.getElementById("weatherIcon");
  const error = document.getElementById("error");

  if (!city) {
    error.textContent = "Please enter a city.";
    weatherData.classList.add("hidden");
    return;
  }

  error.textContent = "";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then(data => {
      cityName.textContent = data.name;
      temp.textContent = data.main.temp;
      description.textContent = data.weather[0].description;
      humidity.textContent = data.main.humidity;

      // Weather icons (optional, based on description)
      const weatherMain = data.weather[0].main.toLowerCase();
      if (weatherMain.includes("cloud")) icon.className = "fas fa-cloud";
      else if (weatherMain.includes("rain")) icon.className = "fas fa-cloud-showers-heavy";
      else if (weatherMain.includes("clear")) icon.className = "fas fa-sun";
      else if (weatherMain.includes("snow")) icon.className = "fas fa-snowflake";
      else icon.className = "fas fa-cloud-sun";

      weatherData.classList.remove("hidden");
    })
    .catch(err => {
      error.textContent = err.message;
      weatherData.classList.add("hidden");
    });
}
