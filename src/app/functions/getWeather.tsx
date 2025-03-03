export const getWeather = async (city: string) => {
    const apiKey = "43b8f9d9b40b4fd39e411853252702";
    const apiUrl = "http://api.weatherapi.com/v1";

    if (!apiKey || !apiUrl) {
      throw new Error("Falta la API Key o la URL en .env.local");
    }
  
    const response = await fetch(`${apiUrl}/current.json?key=${apiKey}&q=${city}&aqi=no&lang=es`);
    const data = await response.json();
  
    if (data.error) {
      throw new Error(data.error.message);
    }
  
    return data;
  };