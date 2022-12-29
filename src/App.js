import React, { useState, useEffect } from "react";

import { fetchWeather } from "./api";
import "./App.css";
import { Loader, SearchBar, Toaster, WeatherCard } from "./component";
import { TOAST } from "./constants";
import { emitToast } from "./helpers";

const App = () => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          (async () => {
            setLoading(true);
            try {
              const data = await fetchWeather({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              });
              setWeather(data);
            } catch (e) {
              console.log(e);
              emitToast(TOAST.ERROR, e.message);
            }
            setLoading(false);
          })();
        },
        (e) => {
          emitToast(
            TOAST.ERROR,
            "We can't give your location's weather maybe you denied the GeolocationAPI permission 🙀."
          );
          emitToast(
            TOAST.INFO,
            "Make sure you allow the Geolocation API to retrieve your location's Weather."
          );
        }
      );
    } else {
      emitToast(
        TOAST.WARNING,
        "Geolocation API not available we can't give your location's weather please update your browser."
      );
    }
  }, []);

  return (
    <div className="main-container">
      <Toaster />
      <SearchBar setWeather={setWeather} setLoading={setLoading} />
      {loading ? (
        <Loader />
      ) : (
        weather.main && (
          <WeatherCard
            name={weather.name}
            country={weather.sys.country}
            temp={weather.main.temp}
            icon={weather.weather[0].icon}
            description={weather.weather[0].description}
          />
        )
      )}
    </div>
  );
};

export default App;
