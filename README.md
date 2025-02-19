# CHALLENGE BACKEND RESERVAMOS


_En este proyecto cree una api que combina las funcionalidades de la api de OpenWeather para obtener el clima y la funcionalidad de la api de Reservamos para obtener las ciudaes, ambas permiten recibir el clima de la ciudades más populares_


### Instalación 🔧


- _Instala los modulos de node_

```
 npm install
```

- _En el proyecto está un archivo .env.example con las variables de entorno, sólo debes de editar el archivo a .env para poder usarlo_

```
 npm run dev
```

- _Ya puedes probar el frontend en el navegador_


## Construido con 🛠️

- NodeJS
- JavaScript
- Axios
- CORS
- express


## Autor ✒️

_Alexander Arrazate_

## Notas sobre la IA

_Usé chatGPT para realizar algunas de las tareas más compleja como saber exactamente como iterar a través de la respueta que genera la API de OpenWeather y así desestructurar las propiedades_

- PROMPTS: 
- 1
```
Necesito una función que me devuelva los siguientes valores de main y de weather:
      "main": {
        "temp": 296.76,
        "feels_like": 296.98,
        "temp_min": 296.76,
        "temp_max": 297.87,
        "pressure": 1015,
        "sea_level": 1015,
        "grnd_level": 933,
        "humidity": 69,
        "temp_kf": -1.11
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        } 
esto es lo que regresa la API:       
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
... resto del JSON
```
- 2
```
Simplifica esta funcioón lo mas posible, eliminando cosas innecesarias y redudantes sin perder funciónalidad: 
export const getCurrentWeather = async () => {

  try {
    const weatherData = await axios.get(
      https://api.openweathermap.org/data/2.5/forecast?lat=25.6866142&lon=-100.3161126&appid=418d5c266716e5286e1afe642c7ec951
    );

    const data = weatherData.data.list;
    const today = moment().format('YYYY-MM-DD'); 

    const todayWeather = data.filter(item => moment(item.dt_txt).format('YYYY-MM-DD') === today);

    const weatherInfo = todayWeather.map(item => ({
      temperatura: item.main.temp,
      humedad: item.main.humidity,
      clima: item.weather[0].description,
      icono: item.weather[0].icon,
      hora: moment(item.dt_txt).format('HH:mm') 
    }));
... resto del código
```

- 3
```
Ahora necesito que valores anteriores de lat y long funcionen en esta funcuón para obtener el clima de la ciudad con esa lat y long: 
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
...resto del código
```
   