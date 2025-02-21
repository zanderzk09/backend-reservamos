import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRouter from "./routes/weather.js";
import placesRouter from "./routes/places.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/places', placesRouter);
app.use('/api/weather', weatherRouter )

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
