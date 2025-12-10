import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Long Beach");
  const [searchCity, setSearchCity] = useState("");

  async function fetchCoordinates(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      alert("City not found");
      return null;
    }

    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      name: data.results[0].name,
    };
  }

  async function fetchWeatherByCoords(latitude, longitude) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set(
      "daily",
      "temperature_2m_max,temperature_2m_min"
    );
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("timezone", "auto");

    const res = await fetch(url);
    const data = await res.json();

    const current = data.current_weather.temperature;
    const high = data.daily.temperature_2m_max[0];
    const low = data.daily.temperature_2m_min[0];

    setWeather({ current, high, low });
  }

  // Load Long Beach on first mount
  useEffect(() => {
    async function init() {
      const coords = await fetchCoordinates(city);
      if (coords) {
        await fetchWeatherByCoords(coords.latitude, coords.longitude);
      }
    }
    init();
  }, []);

  async function handleUpdate() {
    const coords = await fetchCoordinates(searchCity);
    if (!coords) return;

    setCity(coords.name);
    await fetchWeatherByCoords(coords.latitude, coords.longitude);
  }

  if (!weather) return <div>Loading weather data...</div>;

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather Forecast for {city}</h1>

        <p>Current Temperature: {weather.current}°C</p>
        <p>High: {weather.high}°C</p>
        <p>Low: {weather.low}°C</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}
