import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "991abfe98a5b1cbcd90f5eee7c796443";

export const fetchWeather = async (query) => {
  try {
    const { data } = await axios.get(URL, {
      params: {
        ...query,
        units: "metric",
        APPID: API_KEY,
      },
    });
    return data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
