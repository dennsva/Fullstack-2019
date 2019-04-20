import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export const Weather = ({ city }) => {

  const [weather, setWeather] = useState({ condition: {} });
  const key='a9fd88cdb1334b2080e145345192004'

  console.log(`Looking for weather in ${city}`);

  useEffect(() => {
    Axios
      .get(`http://api.apixu.com/v1/current.json?key=${key}&q=${city}`)
      .then(response => {
        setWeather(response.data.current);
        console.log(`Loaded weather in ${city}`);
      });
  }, []);

  console.log(weather);

  return (<div>
    <h3>Weather in {city}</h3>
    <p>Temperature: {weather.temp_c} °C</p>
    <p>Wind: {Math.round(weather.wind_kph / 3.6 * 100) / 100} m/s</p>
    <img src={weather.condition.icon} alt={city} />
  </div>);
};