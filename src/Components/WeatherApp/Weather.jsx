import { useState, useEffect, useRef } from "react";

import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const Weather = () => {
  const [location, setLocation] = useState("London");
  const [weather, setweather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=cab17f76fe22aee7901648adae61999e`
      );
      const data = await response.json();
      if (data.main) setweather(data);
      console.log(data);
    } catch (error) {
      console.log("error", error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  if (!weather) {
    return <div>Loading....</div>;
  }

  return (
    <div className="container">
      <form className="top-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="cityInput"
          name="location"
          value={location}
          placeholder="Search"
          onChange={handleLocationChange}
        ></input>
        <button type="submit" className="search-icon">
          <img src={search_icon} alt="Search Icon" />
        </button>
      </form>
      <div className="weather-img">
        <img src={cloud_icon} alt="Cloud Icon" />
      </div>
      <div className="weather-temp">{Math.floor(weather.main.temp)}°c</div>
      <div className="weather-location">{weather.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" />
          <div className="data">
            <div className="humidity-percent">{weather.main.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" />
          <div className="data">
            <div className="wind-speed">
              {Math.floor(weather.wind.speed)} km/h
            </div>
            <div className="text">Wind-Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
