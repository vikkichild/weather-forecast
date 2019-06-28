import React, { Component, Fragment } from "react";
import Header from "./Components/Header/";
import WeatherForecast from "./Components/WeatherForecast/";
import WeatherForecastForm from "./Components/WeatherForecastForm";
import ErrorAlert from "./Components/ErrorAlert";
import {
  INFO_TYPES,
  CACHED_DATE_TYPES,
  CITY_API, WEATHERBIT_API,
  OPEN_WEATHER_MAP_API,
  WEATHER_FORECAST_TYPE,
  CACHED_TIME,
  SELECTED_WEATHER_FORECAST
} from "./const";


class App extends Component {

  state = {
    cityInfo: null,
    weatherInfo: null,
    cachedDateCityInfo: null,
    cachedDateWeatherInfo: null,
    error: false
  };

  componentDidMount() {
    const cachedCityInfo = localStorage.getItem(INFO_TYPES.CITY);
    const cachedDate = localStorage.getItem(CACHED_DATE_TYPES.CITY_INFO);
    const currentDate = Date.now();
    if (cachedCityInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + CACHED_TIME;
      if (checkedDate > currentDate) {
        this.setState({ cityInfo: JSON.parse(cachedCityInfo) })
      } else {
        this.loadCityInfo();
      }
    } else {
      this.loadCityInfo();
    };
  };

  loadCityInfo = async () => {
    try {
      const response = await fetch(CITY_API.URL);
      const cityData = await response.json();
      this.setState({
        cityInfo: {
          city: cityData.city,
          latitude: cityData.latitude,
          longitude: cityData.longitude
        },
        cachedDateCityInfo: Date.now()
      });
      localStorage.setItem(INFO_TYPES.CITY, JSON.stringify(this.state.cityInfo));
      localStorage.setItem(CACHED_DATE_TYPES.CITY_INFO, this.state.cachedDateCityInfo);
    } catch {
      this.setState({ ...this.state, error: true });
    };
  };

  loadWetherbit = async () => {
    try {
      const weatherServiceUrl = `${WEATHERBIT_API.URL}?city=${this.state.cityInfo.city}&key=${WEATHERBIT_API.KEY}`;
      const response = await fetch(weatherServiceUrl);
      const weatherData = await response.json();
      this.setState({
        weatherInfo: {
          weather: weatherData.data[0].weather.description,
          weatherCode: weatherData.data[0].weather.code,
          temperature: weatherData.data[0].temp
        },
        cachedDateWeatherInfo: Date.now()
      });
      localStorage.setItem(INFO_TYPES.WEATHER, JSON.stringify(this.state.weatherInfo));
      localStorage.setItem(CACHED_DATE_TYPES.WEATHER_INFO, this.state.cachedDateWeatherInfo);
    } catch {
      this.setState({ ...this.state, error: true });
    };
  };

  loadOpenWeatherMap = async () => {
    try {
      const weatherServiceUrl = `${OPEN_WEATHER_MAP_API.URL}?q=${this.state.cityInfo.city}&units=${OPEN_WEATHER_MAP_API.TEMP_UNIT}&appid=${OPEN_WEATHER_MAP_API.KEY}`;
      const response = await fetch(weatherServiceUrl);
      const weatherData = await response.json();
      this.setState({
        weatherInfo: {
          weather: weatherData.weather[0].description,
          weatherCode: weatherData.weather[0].id,
          temperature: weatherData.main.temp
        },
        cachedDateWeatherInfo: Date.now()
      });
      localStorage.setItem(INFO_TYPES.WEATHER, JSON.stringify(this.state.weatherInfo));
      localStorage.setItem(CACHED_DATE_TYPES.WEATHER_INFO, this.state.cachedDateWeatherInfo);
    } catch {
      this.setState({ ...this.state, error: true });
    }
  };

  checkCacheWeatherbit = () => {
    const cachedWeatherInfo = localStorage.getItem(INFO_TYPES.WEATHER);
    const cachedDate = localStorage.getItem(CACHED_DATE_TYPES.WEATHER_INFO);
    const cacheSelectedForecast = localStorage.getItem(SELECTED_WEATHER_FORECAST);
    const currentDate = Date.now();
    if (cachedWeatherInfo &&
      cachedDate &&
      cacheSelectedForecast === WEATHER_FORECAST_TYPE.WEATHERBIT) {
      const checkedDate = Number(cachedDate) + 7200000;
      if (checkedDate > currentDate) {
        this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) });
      } else {
        this.loadWetherbit();
      }
    } else {
      this.loadWetherbit();
    }
  };

  checkCacheOpenWeatherMap = () => {
    const cachedWeatherInfo = localStorage.getItem(INFO_TYPES.WEATHER);
    const cachedDate = localStorage.getItem(CACHED_DATE_TYPES.WEATHER_INFO);
    const cacheSelectedForecast = localStorage.getItem(SELECTED_WEATHER_FORECAST);
    const currentDate = Date.now();
    if (cachedWeatherInfo &&
      cachedDate &&
      cacheSelectedForecast === WEATHER_FORECAST_TYPE.OPEN_WEATHER_MAP) {
      const checkedDate = Number(cachedDate) + 7200000;
      if (checkedDate > currentDate) {
        this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) });
      } else {
        this.loadOpenWeatherMap();
      }
    } else {
      this.loadOpenWeatherMap();
    };
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorAlert />
      )
    } else {
      return (
        <div>
          {this.state.cityInfo &&
            <Fragment>
              <Header city={this.state.cityInfo.city} />
              <WeatherForecastForm
                city={this.state.cityInfo.city}
                checkCacheWeatherbit={this.checkCacheWeatherbit}
                checkCacheOpenWeatherMap={this.checkCacheOpenWeatherMap} />
            </Fragment>}
          {this.state.weatherInfo &&
            <WeatherForecast
              temperature={this.state.weatherInfo.temperature}
              weather={this.state.weatherInfo.weather}
              weatherCode={this.state.weatherInfo.weatherCode} />}
        </div>
      );
    };
  };
};

export default App;
