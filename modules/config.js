export const MOCK_DATA = {
  name: 'FallbackCity',
  coord: {
    lon: 29,
    lat: 49.4
  },
  main: {
    temp: 28,
    feels_like: 27,
    temp_min: 22,
    temp_max: 28,
    pressure: 1013,
    humidity: 60,
    sea_level: 1015,
    grnd_level: 1008
  },
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "THIS ARE NOT REAL INFORMATIONS!",
      icon: "10d"
    }
  ],
  visibility: 10000,
  wind: {
    speed: 5,
    deg: 180,
    gust: 7
  },
  sys: {
    type: 1,
    id: 1234,
    country: "RO",
    sunrise: 1687852800,
    sunset: 1687906800
  }
}

export const CONFIG = {
  API_KEY: '040da6b484828f330abb15b418b09130', 
  API_BASE_URL: 'https://api.openweathermap.org/data/2.5/' ,
  IP_API_URL: 'https://ipapi.co/json',
  DEFAULT_UNITS: 'metric' ,
  DEFAULT_LANG: 'ro',

  MAX_HISTORY_ITEMS: 10,
  STORAGE_KEYS: {
    SEARCH_HISTORY: 'weather_search_history',
    USER_PREFERENCES: 'weather_user_prefs',
  },
  LOGGING: {
    ENABLED: true,
    LEVEL: 'debug', // 'debug', 'info', 'warn', 'error'
    MAX_LOGS: 100,
  },
}

export const API_ENDPOINTS = {
  CURRENT_WEATHER: 'https://api.openweathermap.org/data/2.5/weather' ,
  FORECAST: 'https://pro.openweathermap.org/data/2.5/forecast/hourly' ,

}


export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'The city does not exit!',
  NETWORK_ERROR: 'Internet problems!',
  SERVER_ERROR: 'Server doesnt work!',
  INVALID_API:'Api is invalid!',
  LOCATION_UNAVAILABLE: 'Location can not be accesed',
  LOCATION_DENIED: 'Acces denied to location'
}
