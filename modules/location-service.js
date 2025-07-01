import { CONFIG, ERROR_MESSAGES } from "./config.js"

export const getCoords = () => new Promise((resolve, reject) => {

  const fallbackToIp = async () => {
    try {
   
      const response = await fetch(CONFIG.IP_API_URL)
      if(!response.ok)
         throw new Error('Ip location failed')
      const data = await response.json()

      resolve({
        latitude: data.latitude,
        longitude: data.longitude,
        source: 'ip',
        accuracy: 'city' 
      })
    } catch (error) {
   
      reject(error)
    }
  }

  if (!navigator.geolocation) {
    return fallbackToIp()
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
    
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: 'gps',
        accuracy: 'precise'
      })
    },
    (error) => {
      console.warn('Geolocation failed:', error.message)

      let errMessage = ERROR_MESSAGES.LOCATION_UNAVAILABLE
      switch(error.code){
        case error.PERMISSION_DENIED:
            errMessage = ERROR_MESSAGES.LOCATION_DENIED
            break;
        case errMessage.POSITION_UNAVAILABLE:
             errMessage = ERROR_MESSAGES.LOCATION_UNAVAILABLE
             break
        case error.TIMEOUT:
             errMessage = 'Timeout on detection'
      }
      console.log('Trying IP fallback after GPS error',errMessage)
      fallbackToIp()
    },
    {
   
      timeout: 20000,
      enableHighAccuracy: true,
      maximumAge: 10000
    }
  )
})