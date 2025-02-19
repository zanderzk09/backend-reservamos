import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const apiWeather = axios.create({
  baseURL: process.env.OPENWEATHER_API_URL, 
  params: {
    appid: process.env.OPENWEATHER_API_KEY 
  }
});
