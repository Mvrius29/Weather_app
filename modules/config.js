export const MOCK_DATA = {
  coord: {
    lon: 26.1,
    lat: 44.4
  },
  main: {
    temp: 284,
    feels_like: 287,
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
      description: "light rain",
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
};
