"use client";

import { useState } from "react";
import { getWeather } from "./functions/getWeather";

export default function Home() {
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState<string[]>([]); 
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});


  const fetchWeather = async () => {
    if (!searchCity.trim()) return; 
    if (cities.includes(searchCity)) return; 

    try {
      const data = await getWeather(searchCity);
      setCities([...cities, searchCity]);
      setWeatherData((prev) => ({ ...prev, [searchCity]: data }));
      setSearchCity("");
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  };

  const removeCity = (city: string) => {
    setCities(cities.filter((c) => c !== city));
    setWeatherData((prev) => {
      const newData = { ...prev };
      delete newData[city];
      return newData;
    });
  };

  


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md flex mb-6">
        <input
          type="text"
          placeholder="Ingresa una ciudad..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Buscar
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {cities.map((city, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-lg w-80 text-center relative">
            <button
              onClick={() => removeCity(city)}
              className=  "absolute top-2 right-2 bg-red-500 text-white px-2 py-2 rounded-full"
            >
            </button>

            {weatherData[city] && 
              <>
                <h2 className="text-xl font-bold">
                  {weatherData[city].location.name}{weatherData[city].location.region && <>, {weatherData[city].location.region}</>}, {weatherData[city].location.country}
                </h2>
                <p>{weatherData[city].current.condition.text}</p>
                <img
                  src={weatherData[city].current.condition.icon}
                  alt="Icono del clima"
                  className="mx-auto"
                />
                <p className="text-2xl font-bold">{weatherData[city].current.temp_c}°C</p>
                <p className="text font-light">Porcentaje de humedad: {weatherData[city].current.humidity}%</p> 
              </>
            }
          </div>
        ))}
      </div>
    </div>
  );
}