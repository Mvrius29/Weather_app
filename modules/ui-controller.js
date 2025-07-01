export const elements = {
  date : document.querySelector('#date'),
  main: {
    temp: document.querySelector('#city-temp'),
    humidity: document.querySelector('#humidity'),
    pressure: document.querySelector('#pressure'),
    feelslike: document.querySelector('#feels-like'),
  },
  weather: {
    description: document.querySelector('#location-weather-type'),
    type: document.querySelector('#location-weather-type')
  },

  visibility: document.querySelector('#visibility'),

  wind: document.querySelector('#wind'),
  sys: {
    sunrise: document.querySelector('#sunrise'),
    sunset: document.querySelector('#sunset'),
    cityInput: document.querySelector('#city-input'),
  },

  unitSelect: document.getElementById('unit-select'),
  langSelect: document.getElementById('lang-select')

}


export const showLoading = () => {
  document.querySelector('#loading')?.classList.remove('hidden');
  document.querySelector('#informations')?.classList.add('hidden');
};

export const hideLoading = () => {
  document.querySelector('#loading')?.classList.add('hidden');
  document.querySelector('#informations')?.classList.remove('hidden');

};

export const showError = (message) => {
  const errorElem = document.querySelector('#error')
  if (errorElem) {
    const errorParagraph = errorElem.firstChild;
    errorParagraph.textContent = message;
    errorElem.style.display = 'block'
    document.querySelector('#informations')?.classList.add('hidden');
  } else {
    alert(message);
  }
}

export const hideError = () => {
  const errorElem = document.querySelector('#error');
  if (errorElem) {
    const errorParagraph = errorElem.firstChild;
    errorParagraph.textContent = '';
    errorElem.style.display = 'none'
    document.querySelector('#informations')?.classList.remove('hidden');
  }
};

export const displayWeather = (user) => {
  elements.sys.cityInput.textContent = user.name
  
  /// Temperature 
  let unitSelect
  if (localStorage.getItem('preferredUnit') !== null )
    unitSelect = localStorage.getItem('preferredUnit');
  if(unitSelect === 'imperial')
  {
  elements.main.temp.textContent = `${Math.round(user.main.temp + 273.15)} °F`
  elements.main.feelslike.textContent = `${Math.round(user.main.feels_like + 273.15)} °F`
  }
  else 
  {
     elements.main.temp.textContent = `${user.main.temp } °C`
    elements.main.feelslike.textContent = `${user.main.feels_like } °C`
  }
  elements.main.humidity.textContent = `${user.main.humidity} %`
  elements.main.pressure.textContent = `${user.main.pressure} hPa`
  elements.weather.description.textContent = user.weather.description
  elements.visibility.textContent = `${user.visibility} m`

  const months = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'
];

const today = new Date();

const day = today.getDate(); 
const month = months[today.getMonth()]; 
const year = today.getFullYear();

const dates = `${day} ${month} ${year}`;
elements.date.textContent = `${dates}`
  if (user.wind?.speed) {
    const speedkm = user.wind.speed * 3.6;
    elements.wind.textContent = `${speedkm.toFixed(2)} km/h`;
  }
  else elements.wind.textContent = `N/A`

  if (user.sys?.sunrise) {
    const miliseconds = new Date(user.sys.sunrise * 1000);
    const hours = miliseconds.getHours().toString().padStart(2, '0');
    const minutes = miliseconds.getMinutes().toString().padStart(2, '0');
    elements.sys.sunrise.textContent = `${hours}:${minutes} AM`
  }

  if (user.sys?.sunset) {
    const miliseconds = new Date(user.sys.sunset * 1000);
    const hours = miliseconds.getHours().toString().padStart(2, '0');
    const minutes = miliseconds.getMinutes().toString().padStart(2, '0');
    elements.sys.sunset.textContent = `${hours}:${minutes} PM`
  }

  elements.weather.type.textContent = `${user.weather[0].main}: `
  if (user.weather[0].main === 'Rain') elements.weather.type.textContent += '🌧️'
  if (user.weather[0].main === 'Clear') elements.weather.type.textContent += '☀️'
  if (user.weather[0].main === 'Clouds') elements.weather.type.textContent += '☁️'
}

export const updateTemperatureDisplay = (elements, temperature, unit) => {

  const gradesType = document.querySelector('#unit-select')
  const selectedText = gradesType.options[gradesType.selectedIndex].text
  let symbol
  if (selectedText == 'metric')
    symbol = '°C'
  else
    symbol = '°F'
  elements.temperature.textContent = `${temperature}${symbol}`
}

export const saveUserPreferences = (unit, lang) => {
  const langSelect = document.getElementById('lang-select');
  langSelect.addEventListener('change', () => {
    localStorage.setItem('preferredLanguage', langSelect.value);
  });

  const unitSelect = document.getElementById('unit-select');
  unitSelect.addEventListener('change', () => {
    localStorage.setItem('preferredUnit', unitSelect.value);
  });
}

export const loadUserPreferences = () => {
  //default values
  let unitPref = 'metric'
  let langPref = 'en'
  
  const langSelect = document.getElementById('lang-select');
  const unitSelect = document.getElementById('unit-select');

  
  unitPref = localStorage.getItem('preferredUnit')
  langPref = localStorage.getItem('preferredLanguage')

  if(unitPref)
      unitSelect.value = unitPref
  if(langPref)
      langSelect.value = langPref

  return {
    unit: unitPref,
    lang: langPref,
  }
}

export const updateUserPreferences = () => {
   const langSelect = document.getElementById('lang-select');
   const unitSelect = document.getElementById('unit-select');

   localStorage.setItem('preferredUnit', unitSelect.value);
   localStorage.setItem('preferredLanguage', langSelect.value)
}