import { getCoords } from './modules/location-service.js'
import {
  getCurrentWeather,
  getWeatherByCoords,
  getCurrentWeatherWithFallback,
} from './modules/weather-service.js'
import {
  showError,
  hideError,
  showLoading,
  hideLoading,
  displayWeather,
  saveUserPreferences,
  loadUserPreferences,
  updateTemperatureDisplay,
  updateUserPreferences,
} from './modules/ui-controller.js'
import { CONFIG } from './modules/config.js'

const unitSelect = document.querySelector('#unit-select')
const langSelect = document.querySelector('#lang-select')
const preferrenceBtn = document.querySelector('#save-btn')

function  resetSaveButton() {
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

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\\s-]+$/.test(city)
}

const handleSearch = async () => {
  const informations = document.querySelector('#informations')
  informations.style.display = 'none'
  hideError()

  const cityName = document.querySelector('#search-bar').value.trim()
  try{
     if (!isValidCity(cityName)) 
        throw new Error('Introduceti un numae valid de oras')
   
    showLoading()
    hideError()
    setTimeout(async function ()  {
      const weather = await getCurrentWeatherWithFallback(cityName)
      console.log(weather)
      const informations = document.querySelector('#informations')
      informations.style.display = 'block' 
      hideLoading()
      displayWeather(weather)
     
    }, 2000)
  }catch(error){
    showError(error)
  }
}

const setupEventListeners = () => {
  // Submit în form (enter din search field sau click pe buton)
  const searchBtn = document.querySelector('#search-btn')
  searchBtn.addEventListener("click",handleSearch)

  searchBtn.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
}


const mylocationBtn = document.querySelector('#my-location')

mylocationBtn.addEventListener('click', async function () {
  
  try{
  hideError()
  const informations = document.querySelector('#informations')
  if(informations.style.display === 'block')
  informations.style.display = 'none'
   
  showLoading()
  
  const coords = await getCoords()
  const weather = await getWeatherByCoords(coords.latitude,coords.longitude)
  
  informations.style.display = 'block'
  hideLoading()
  displayWeather(weather)
  
  }catch(error){
    showError(error)
  }
  
})
setupEventListeners()