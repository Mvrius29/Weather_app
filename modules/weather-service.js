import { API_ENDPOINTS, MOCK_DATA, CONFIG, ERROR_MESSAGES } from './config.js';



export const buildUrl = (endpoint, params = {}) => {
  
  const url = new URL(endpoint, CONFIG.API_BASE_URL)
  url.searchParams.set('appid', CONFIG.API_KEY)
  url.searchParams.set('units', CONFIG.DEFAULT_UNITS)
  url.searchParams.set('lang', CONFIG.DEFAULT_LANG)

  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '' && (typeof value !== 'string' || value.length > 0)) {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}


export const makeRequest = async (url) => {
  try {
    const response = await fetch(url)
    console.log(response.ok)
    
    if (response.ok === false) {
      if (response.status === 401)
        throw new Error(ERROR_MESSAGES.INVALID_API)

      if (response.status === 404)
        throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND)

      if (response.status === 500)
        throw new Error(ERROR_MESSAGES.SERVER_ERROR)

      throw new Error('Unexpected error')

    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Internet problems");
    }

    throw error;
  }
};

export const getCurrentWeather = async (city) => {

  try {
    const url = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
    const response = await makeRequest(url)
    return response

  } catch (error) {
    console.log(`EROARE: ${error}`)
    throw error
  }
}

export const getCurrentWeatherWithFallback = async (city) => {
  try {

    return await getCurrentWeather(city)
  } catch (error) {
  
    console.warn('Using fallback data due to:', error.message)
    return {
      ...MOCK_DATA,
      isFallback: true,
      fallbackReason: error.message,
    }
  }
}

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const apiUrl = buildUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
    const data = await makeRequest(apiUrl);
    return data;
  } catch (error) {
    console.error(`ERROR: ${error}`);
    throw error;
  }
};
