// import('./modules/config.js').then((config) => {
//   console.log('MOCK_DATA:', config.MOCK_DATA)
// })

// import('./modules/weather-service.js').then((service) => {
//   console.time('weather-test')
//   service.getCurrentWeather('Cluj').then((data) => {
//     console.timeEnd('weather-test') // ~1000ms?
//     console.log('Received data:', data)
//     console.log('City updated?', data.name === 'Cluj')
//   })
// })

// import('./modules/ui-controller.js').then((ui) => {
//   ui.showLoading();

//   setTimeout(() => {
//     import('./modules/config.js').then((config) => {
//       ui.displayWeather(config.MOCK_DATA);
//       ui.hideLoading();
//     });
//   }, 3000);
// });

import { showLoading, hideLoading, showError, displayWeather, hideError } from './modules/ui-controller.js';
import { MOCK_DATA } from './modules/config.js';

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

const handleSearch = async () => {
  // Validează input
  // Arată loading
  // Apelează weather service
  // Ascunde loading, arată rezultat
  // Gestionează erorile
  const informations = document.querySelector('#informations')
  informations.style.display = 'none'
  hideError()
   const cityName = document.querySelector('#search-bar').value.trim()
   if(isValidCity(cityName)){
      showLoading()
       hideError()
      setTimeout(() => {
         
        const informations = document.querySelector('#informations')
        informations.style.display = 'block'

          displayWeather(MOCK_DATA)
          hideLoading()
      }, 2000)
   }
   else {
     showError('Introduceti un nume valid de oras!')
   }
}

const isValidCity = (city) => {
  // Gol? Prea scurt? Conține cifre/simboluri?
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\\s-]+$/.test(city)
}
setupEventListeners()