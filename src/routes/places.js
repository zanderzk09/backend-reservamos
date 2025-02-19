import express from "express";
import {  getPlacesByName, getPlacesByPopularity } from "../controllers/placesController.js"; 

const placesRouter = express.Router();


placesRouter.get("/city", getPlacesByName);

placesRouter.get("/popularity", getPlacesByPopularity);




export default placesRouter;

