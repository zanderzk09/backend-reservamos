import axios from "axios";
import { apiWeather } from "../api/apiWeather.js";

export const getCurrentWeather = async (req, res) => {
  try {
    const { data } = await apiWeather.get("", {
      params: { lat: 25.6866, lon: -100.3161 },
    });

    const today = new Date().toISOString().split("T")[0];

    const weatherInfo = data.list
      .filter(({ dt_txt }) => dt_txt.startsWith(today))
      .map(({ main, weather, dt_txt }) => ({
        temp: main.temp,
        humidity: main.humidity,
        weather: weather[0].description,
        icon: weather[0].icon,
        hour: dt_txt.split(" ")[1].slice(0, 5),
      }));

    res.json(weatherInfo);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error al obtener los datos del clima" });
  }
};




export const getWeatherByPlace = async (req, res) => {


  const { lat, long } =  req.query
  
  console.log(lat, long)

  try {
    const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=418d5c266716e5286e1afe642c7ec951`);

    const data = weatherData.data.list;


    const weatherInfo = data.map(item => {
      return {
        date: item.dt_txt.split(" ")[0], 
        temp: item.main.temp,
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        weather: item.weather[0].description,
        icon: item.weather[0].icon
      };
    });
    
    


    res.json(weatherInfo);

  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Error al obtener los datos del clima" });
  }
};
