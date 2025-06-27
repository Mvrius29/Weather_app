import { MOCK_DATA } from './config.js';

export const getCurrentWeather = async (city) => {
  // Simulează delay API (~1 secundă)
  // Returnează MOCK_DATA cu numele orașului actualizat
  // Gestionează erorile
   try{
   
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            const dataResponse = JSON.parse(JSON.stringify(MOCK_DATA));

            dataResponse.name = city;

            resolve(dataResponse)
        }, 1000)

        
    })
    return data
   } catch(error){
    console.error(`EROARE: ${error}`)
     throw error 
  }
}

export const getWeatherByCoords = async (lat, lon) => {
     try{
   
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            const dataResponse = JSON.parse(JSON.stringify(MOCK_DATA));

            dataResponse.coord.lat = lat;
            dataResponse.coord.lon = lon;

            resolve(dataResponse)
        }, 1000)

       
    })
     return data
   } catch(error){
    console.error(`EROARE: ${error}`)
     throw error 
  }
}