export const elements = {
   
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
    if(errorElem){
       const errorParagraph = errorElem.firstChild;
        errorParagraph.textContent = message;
        errorElem.style.display = 'block'
      document.querySelector('#informations')?.classList.add('hidden');
    }else {
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

export const displayWeather = (MOCK_DATA) =>{
     elements.sys.cityInput.textContent = MOCK_DATA.sys.country
     elements.main.temp.textContent = `${Math.round(MOCK_DATA.main.temp - 273.15)} °C`
     elements.main.feelslike.textContent = `${Math.round(MOCK_DATA.main.feels_like - 273.15)} °C`
     elements.main.humidity.textContent = `${MOCK_DATA.main.humidity} %`
     elements.main.pressure.textContent = `${MOCK_DATA.main.pressure} hPa`
     elements.weather.description.textContent = MOCK_DATA.weather.description
     elements.visibility.textContent =`${MOCK_DATA.visibility} m`
     if(MOCK_DATA.wind?.speed){
        const speedkm = MOCK_DATA.wind.speed * 3.6;
        elements.wind.textContent = `${speedkm} km/h`;
     }
     else elements.wind.textContent = `N/A`

     if(MOCK_DATA.sys?.sunrise){
        const miliseconds = new Date(MOCK_DATA.sys.sunrise*1000);
        const hours = miliseconds.getHours().toString().padStart(2, '0');
        const minutes = miliseconds.getMinutes().toString().padStart(2, '0');
        elements.sys.sunrise.textContent  = `${hours}:${minutes} AM`
     }

     if(MOCK_DATA.sys?.sunset){
        const miliseconds = new Date(MOCK_DATA.sys.sunset * 1000);
        const hours = miliseconds.getHours().toString().padStart(2, '0');
        const minutes = miliseconds.getMinutes().toString().padStart(2, '0');
        elements.sys.sunset.textContent  = `${hours}:${minutes} PM`
     }

     elements.weather.type.textContent = `${MOCK_DATA.weather[0].main}: `
     if(MOCK_DATA.weather[0].main === 'Rain') elements.weather.type.textContent  += '🌧️'
     if(MOCK_DATA.weather[0].main === 'Clear') elements.weather.type.textContent  += '☀️'
     if(MOCK_DATA.weather[0].main === 'Clouds') elements.weather.type.textContent  += '☁️'
}