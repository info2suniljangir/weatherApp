import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./TempApp";
import axios from "axios";

const Forecast = () => {

  const { cityName, apiKey } = useContext(UserContext);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(
          //the list is too long so it takes time to load data
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            cityName +
            "&cnt=4&units=metric&appid=" +
            apiKey
        );
        setForecastData(response.data.list);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecastData();
  }, [cityName, apiKey]);

  return (
    <div>
      <h1>Weather Forecast</h1>
      {forecastData.map((forecast) => (
        <div key={forecast.dt}>
          <p>Date/Time: {forecast.dt_txt}</p>
          <p>Temperature: {forecast.main.temp}</p>
          <p>Weather: {forecast.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Forecast;
