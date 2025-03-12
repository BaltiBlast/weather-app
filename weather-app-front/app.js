const app = {
  init: () => {
    console.log("App initialized");
    app.getFormWeatherCity();
  },

  getFormWeatherCity: () => {
    const form = document.getElementById("weather-form");

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
      console.log(data);
    });
  },
};

document.addEventListener("DOMContentLoaded", app.init);
