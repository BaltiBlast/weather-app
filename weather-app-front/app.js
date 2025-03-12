const form = document.getElementById("weather-form");
const errorMessage = document.getElementById("errorMessage");
const temperature = document.getElementById("temperature");

const app = {
  init: () => {
    console.log("App initialized");
    app.getFormWeatherCityData();
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
        app.weatherByCity(data.message);
      }
    });
  },

  formErrorMessage: (message) => {
    errorMessage.textContent = "";
    temperature.textContent = "";
    errorMessage.textContent = message;
  },

  weatherByCity: (message) => {
    errorMessage.textContent = "";
    temperature.textContent = "";
    temperature.textContent = message;
  },
};

document.addEventListener("DOMContentLoaded", app.init);
