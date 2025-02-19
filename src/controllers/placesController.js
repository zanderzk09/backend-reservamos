import axios from "axios";
import { toLowerCase } from "../utils/index.js";

export const getPlaces = async (req, res) => {

  try {

    const response = await axios.get(`https://search.reservamos.mx/api/v2/places`);

    return response.data.filter(place => place.result_type === "city");

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error al obtener los lugares." });
  }
}

export const getPlacesByName = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        message: "Se requiere un parámetro 'q' en la consulta.",
      });
    }

    const lowerQuery = toLowerCase(q);

    const response = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${lowerQuery}`);

    const cities = response.data.filter(place => place.result_type === "city" && place.ascii_display === lowerQuery);


    return res.json(cities);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error al obtener los lugares." });
  }
}


export const getPlacesByPopularity = async (req, res) => {

  try {
    const places = await getPlaces();

    const sortedCities = places.sort((a, b) => b.popularity - a.popularity);

    const topCities = sortedCities.slice(0, 7);

    return res.json(topCities);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error al obtener las ciudades." });
  }
}

