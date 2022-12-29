import React from "react";
import "./weathercard.css";

function WeatherCard({ name, country, temp, icon, description }) {
  return (
    <div className="city">
      <h2 className="city-name">
        <span>{name}</span> <sup>{country}</sup>{" "}
      </h2>{" "}
      <div className="city-temp">
        {" "}
        {Math.round(temp)} <sup>&deg;C</sup>
      </div>
      <div className="info">
        <img
          className="city-icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />{" "}
        <p>{description}</p>{" "}
      </div>
    </div>
  );
}

export default WeatherCard;
