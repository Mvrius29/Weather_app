# 🌤️ Weather App - Modern JavaScript Weather Application

> A complete weather application built with vanilla JavaScript, integrating real APIs and modern best practices.

[Demo Live](<https://Mvrius29.github.io/weather-app>) | [Cod Sursă](<https://github.com/Mvrius29/weather-app>)

## 🎯 Despre Proiect


> This is my first complete project and i am so proud of that. It isn't a big application, it s just a weather app, but for me represent my start in my carier of a developer. I tried to make this app a little bit special, in terms of the design, but, in the same time in terms of features and one that i am proud of is the history system. 

## ✨ Funcționalități

### Core Features

- Detailed information

![alt text](image.png)

-History system

![alt text](image-3.png)
![alt text](image-4.png)

-Option to choose the type of desired unit of measurement and the language of the descriptions

![alt text](image-5.png)
![alt text](image-8.png)

### Advanced Features

- Posibility to search in your recent searches to get instant weather informations for the option that you choose from your last searches
- Functionality to get your location weather informations without searching by the name, beacuse you a have a dedicated button that if you press it he gets your location and show to you the informations for the weather
- To search you can press the search button, but, in the same time, you cand search the city just by pressing enter(it is not somenthing advanced but i just wanted to let that here to be known)
- User preferences that are saved in local storage are always loaded when the application is started
- Location of the user has 2 modalities to be found:
     - If the user let the app to acces his location, the app use directly this location
     - If the user dont let the app to acces his location, the app try to find user's location by his IP, and after use the latitude and longitude to get the weather informations
     - If the first to cases failed the app will load some generated informations to continue his actions

### Technical Highlights

- The app try to make the user experience very nice and not to tire him, because of this the interface it's very explicit and isn't loaded with so much buttons and so much diiferent uselles informations or descriptions. The buttons have simple and to the point names to can be easily understood by the user. 

## 🛠️ Tehnologii Utilizate

### Frontend

- **Vanilla JavaScript (ES6+)** - Modular architecture
- **CSS3** - Responsive and modern design
- **HTML5** - Semantic structure

### APIs & Services

- **OpenWeatherMap API** - Real-time weather data
- **Geolocation API** - Automatic location detection
- **IP Geolocation API** - Location fallback

### Tools & Workflow

- **Git/GitHub** - Version control and collaboration
- **VS Code** - Development environment
- **GitHub Pages** - Free hosting



## 🏗️ Arhitectura Aplicației

### Structura Fișierelor

```
weather-app/
├── index.html              # Entry point
├── styles.css              # Styling principal
├── app.js                  # Orchestrarea aplicației
├── modules/
│   ├── config.js           # Configurare centralizată
│   ├── weather-service.js  # Integrare API meteo
│   ├── location-service.js # Servicii de locație
│   ├── history-service.js  # Istoric și persistență
│   ├── logger.js           # Sistema de logging
│   └── ui-controller.js    # Management interfață
└── README.md
```

### Design Patterns

- **Modular Architecture** - Separation of Responsibilities
- **Service Layer** - Abstraction for external APIs
- **Observer Pattern** - Event-driven updates
- **Singleton Pattern** - Single instances for services

## 📚 What i learned?

### Concepte Tehnice

- API integration
- Errors corect handling
- Better DOM manipulation 
- Improved my CSS and HTML knowledge
- I have much better grasped my basic knowledge of JavaScript
- LocalStorage manipulation 

### Challenges Overcome

One of the interested problems that i faced was to learn how to implement the logger service, because for a begginer, from my perspective, it might be a little bit difficult. Another problem that was interesting was to save and display the history of searches. 
Overall, after i understand how exactly apis works my job become a liitle bit easier, but , like in life, nothing come easy, and in this project i put a lot of work to make him possibile.
PS: I admit that i need to some little things(on visiual), but i will do it in future.:))

