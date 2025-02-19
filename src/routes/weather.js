import express from "express";
import { getCurrentWeather, getWeatherByPlace } from "../controllers/weatherControllers.js";

const weatherRouter = express.Router();

weatherRouter.get("/", getWeatherByPlace);

weatherRouter.get("/current", getCurrentWeather);




export default weatherRouter;