import { getCoords } from './modules/location-service.js'
import {
  getWeatherByCoords,
  getCurrentWeatherWithFallback,
  getCurrentWeather,
} from './modules/weather-service.js'
import {
  clearInput,
  showError,
  hideError,
  showLoading,
  hideLoading,
  displayWeather,
  saveUserPreferences,
  loadUserPreferences,
  updateUserPreferences,
  renderHistory,
  addHistoryEventListeners,
} from './modules/ui-controller.js'
import { CONFIG, MOCK_DATA } from './modules/config.js'
import { logger } from './modules/logger.js'
import { historyService } from './modules/history-service.js'

const initializeApp = async () => {
  logger.info('Weather App starting...')
  setupEventListeners()
  loadHistoryOnStart()
  loadUserPreferences()

  logger.info('Weather App initialized successfully')
}


const loadHistoryOnStart = () => {
  const history = historyService.getHistory()
  if (history.length > 0) {
    renderHistory(history)
    logger.info(`Loaded ${history.length} items from history`)
  }
  else {
    const historyList = document.querySelector('#history-list')
    historyList.innerHTML += '<option value="" selected disabled>Choose an option...</option>'
  }
}

const unitSelect = document.querySelector('#unit-select')
const langSelect = document.querySelector('#lang-select')
const preferrenceBtn = document.querySelector('#save-btn')

function resetSaveButton() {
  preferrenceBtn.textContent = 'Save';
  preferrenceBtn.style.backgroundColor = '';
}
preferrenceBtn.addEventListener('click', () => {
  if (localStorage.getItem('preferredUnit') !== null && localStorage.getItem('preferredLanguage') !== null)
    updateUserPreferences(unitSelect.value, langSelect.value)
  else
    saveUserPreferences(unitSelect.value, langSelect.value);
  CONFIG.DEFAULT_UNITS = unitSelect.value;
  CONFIG.DEFAULT_LANG = langSelect.value;
  preferrenceBtn.textContent = 'Saved';
  preferrenceBtn.style.backgroundColor = 'grey'

})

unitSelect.addEventListener('change', resetSaveButton);
langSelect.addEventListener('change', resetSaveButton);

const historyBtn = document.querySelector('#history-btn')
historyBtn.addEventListener('click', () => {
  historyBtn.classList.add('hidden')
  const historySection = document.querySelector('#history-section')
  historySection.classList.remove('hidden')
})

const hideHistoryBtn = document.querySelector('.hide-history-btn')
hideHistoryBtn.addEventListener('click', () => {
  const historySection = document.querySelector('#history-section')
  historySection.classList.add('hidden')
  historyBtn.classList.remove('hidden')

})
const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city)
}

const handleSearch = async () => {
  const informations = document.querySelector('#informations')
  informations.style.display = 'none'
  const cityName = document.querySelector('#search-bar').value.trim();
  
  console.log(cityName)
  hideError()
  try {
    if (!isValidCity(cityName)) {
      logger.warn('Invalid city input', { cityName })
      throw new Error('Insert an valid city name')
    }
    if(isValidCity(cityName)){ 
    const weatherInformation = await getCurrentWeatherWithFallback(cityName)
    if(weatherInformation.name === 'FallbackCity')
    {
      displayWeather(MOCK_DATA)
      logger.warn('This city doesnt exist', {cityName})
    }
    logger.debug('Search initiated', { cityName })
    logger.info('Fetching weather data', { cityName })
    showLoading()
    hideError()
    setTimeout(async function () {
       
     
      console.log(weatherInformation)

      const informations = document.querySelector('#informations')
      informations.style.display = 'block'

      const historySection = document.querySelector('#history-section')
      if (!historySection.classList.contains('hidden'))
        historySection.classList.add('hidden')

      if (historyBtn.classList.contains('hidden'))
        historyBtn.classList.remove('hidden')

      displayWeather(weatherInformation)
      clearInput()
      hideLoading()
      if(weatherInformation.name !== 'FallbackCity'){
      historyService.addLocation(weatherInformation)
      const updatedHistory = historyService.getHistory()
      renderHistory(updatedHistory)
      }

      logger.info('Weather data displayed successfully', {
        city: weatherInformation.name,
        temp: weatherInformation.main.temp,
      })

    }, 2000)
  }
 } catch (error) {
    showError(error)
    logger.error('Failed to fetch weather data', error)
  }
}

const handleHistoryClick = async (event) => {
  const historyList = document.querySelector('#history-list')
  const optionSelected = historyList.options[historyList.selectedIndex]
  console.log(optionSelected.city)
  const city = optionSelected.dataset.city
  const lat = parseFloat(optionSelected.dataset.lat)
  const lon = parseFloat(optionSelected.dataset.lon)

  logger.debug('History item clicked', { city, lat, lon })
  try {
    logger.info('Fetching weather data', { city })

    showLoading()
    hideError()
    setTimeout(async function () {

      const weather = await getWeatherByCoords(lat, lon)
      console.log(weather)
      historyService.addLocation(weather)

      const informations = document.querySelector('#informations')
      informations.style.display = 'block'

      const historySection = document.querySelector('#history-section')
      if (!historySection.classList.contains('hidden'))
        historySection.classList.add('hidden')
       
        if (historyBtn.classList.contains('hidden'))
        historyBtn.classList.remove('hidden')

      hideLoading()
      displayWeather(weather)

      const updatedHistory = historyService.getHistory()
      renderHistory(updatedHistory)

      logger.info('Weather loaded from history', { city })
    }, 2000)
  } catch (error) {
    showError(error)
    logger.error('Failed to load weather from history', error)
  }
}

const handleClearHistory = () => {
  if (confirm('Are you sure that you want to delete all history?')) {
    historyService.clearHistory()
    renderHistory([])
    const historyBtn1 = document.querySelector('#history-btn')
    if (historyBtn1.classList.contains('.hidden'))
      historyBtn1.classList.remove('hidden')
    logger.info('Search history cleared')
  }
}



const setupEventListeners = () => {
  // Submit în form (enter din search field sau click pe buton)
  const searchBtn = document.querySelector('#search-btn')
  searchBtn.addEventListener("click", handleSearch)

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
  addHistoryEventListeners(handleHistoryClick, handleClearHistory)
  const inputSearch = document.querySelector('#search-bar')
}


const mylocationBtn = document.querySelector('#my-location')

mylocationBtn.addEventListener('click', async function () {

  try {
    logger.debug('Fetching your location wheather')
    hideError()
    const informations = document.querySelector('#informations')
    if (informations.style.display === 'block')
      informations.style.display = 'none'
    
    const historySection = document.querySelector('#history-section')
      if (!historySection.classList.contains('hidden'))
        historySection.classList.add('hidden')
     

    showLoading()

    const coords = await getCoords()
    const weather = await getWeatherByCoords(coords.latitude, coords.longitude)

    informations.style.display = 'block'
    if (historyBtn.classList.contains('hidden'))
        historyBtn.classList.remove('hidden')
    hideLoading()
    displayWeather(weather)

    logger.info('Fetching weather for your location succedeed', { weather })

  } catch (error) {
    showError(error)
    logger.error('Failed to fetch weather data',error)
  }

})
initializeApp()





