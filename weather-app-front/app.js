const form = document.getElementById("weather-form");
const errorMessage = document.getElementById("errorMessage");

const app = {
  map: null,

  init: () => {
    console.log("App initialized");
    app.getFormWeatherCityData();
    app.mapInit();
  },

  getFormWeatherCityData: () => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const formJSON = Object.fromEntries(formData.entries());

      const response = await fetch("http://localhost:3000/weather-by-city", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJSON),
      });

      const data = await response.json();

      if (data.status === "error") {
        app.formErrorMessage(data.message);
        return;
      } else {
        errorMessage.textContent = "";
        app.updateMap(data.cityData.lat, data.cityData.lon, data.cityData.temperature, data.cityData.cityName);
      }
    });
  },

  mapInit: () => {
    app.map = L.map("map", { zoomControl: false }).setView([20, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(app.map);
  },

  updateMap: (lat, lon, temperature, city) => {
    app.map.flyTo([lat, lon], 9);
    L.marker([lat, lon]).addTo(app.map).bindPopup(`Il fait actuellement ${temperature}°C à ${city}`).openPopup();
  },

  formErrorMessage: (message) => {
    errorMessage.textContent = "";
    errorMessage.textContent = message;
  },
};

document.addEventListener("DOMContentLoaded", app.init);
