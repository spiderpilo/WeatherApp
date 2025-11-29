import React, { useEffect, useState } from "react";
import './index.css';

export default function App() {
  // store data once we get it
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      // (1) use a fixed location first — Long Beach, CA
      const latitude = 33.7701;
      const longitude = -118.1937;

      // (2) build our API URL
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", latitude);
      url.searchParams.set("longitude", longitude);
      url.searchParams.set(
        "daily",
        "temperature_2m_max,temperature_2m_min"
      ); // today's high & low
      url.searchParams.set("current_weather", "true"); // current temp
      url.searchParams.set("timezone", "auto");

      console.log("Requesting:", url.toString());

      // (3) fetch the data
      const res = await fetch(url);
      const data = await res.json();

      console.log("Response:", data);

      // (4) extract what we need
      const current = data.current_weather.temperature;
      const high = data.daily.temperature_2m_max[0];
      const low = data.daily.temperature_2m_min[0];

      // (5) save to state
      setWeather({ current, high, low });
    }

    fetchWeather();
  }, []);

  // (6) show something while loading
  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  // (7) once data is ready, show it
  return (
    <div className="app">
      <div className="weather-container">
       <h1>Weather Forecast</h1>
      <p>Current Temperature: {weather.current}°C</p>
      <p>High: {weather.high}°C</p>
      <p>Low: {weather.low}°C</p> 
      <p>Enter Longitude: </p>
      <textarea name="value" id=""></textarea>
      <p>Enter latitude: </p>
      <textarea name="" id=""></textarea>
      <button>Update</button>
      </div>
    </div>
  );
}