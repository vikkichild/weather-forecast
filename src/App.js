import React, { Component, Fragment } from "react";
import Header from "./Components/Header";
import WeatherForecast from "./Components/WeatherForecast";
import WeatherForecastForm from "./Components/WeatherForecastForm";
import ErrorAlert from "./Components/ErrorAlert";


class App extends Component {

  state = {
    cityInfo: null,
    weatherInfo: null,
    cachedDateCityInfo: null,
    cachedDateWeatherInfo: null,
    error: null
  };

  componentDidMount() {
    const cachedCityInfo = localStorage.getItem("cityInfo");
    const cachedDate = localStorage.getItem("cachedDateCityInfo");
    const currentDate = Date.now();
    if (cachedCityInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + 7200000;
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
      const response = await fetch("https://ipapi.co/json/");
      const cityData = await response.json();
      this.setState({
        cityInfo: {
          city: cityData.city,
          latitude: cityData.latitude,
          longitude: cityData.longitude
        },
        cachedDateCityInfo: Date.now()
      });
      localStorage.setItem("cityInfo", JSON.stringify(this.state.cityInfo));
      localStorage.setItem("cachedDateCityInfo", this.state.cachedDateCityInfo);
    } catch {
      this.setState({ ...this.state, error: "Error in loading city information." });
    };
  };

  loadWeather1 = async () => {
    try {
      const apiKey = "f7deebe0f69843849fbac329bf36ad07";
      const weatherServiceUrl = `https://api.weatherbit.io/v2.0/current?city=${this.state.cityInfo.city}&key=${apiKey}`;
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
      localStorage.setItem("weatherInfo", JSON.stringify(this.state.weatherInfo));
      localStorage.setItem("cachedDateWeatherInfo", this.state.cachedDateWeatherInfo);
    } catch {
      this.setState({ ...this.state, error: "Error in loading Weatherbit." });
    };
  };

  loadWeather2 = async () => {
    try {
      const apiKey = "860ae597957b496c4198358824ce99f1";
      const tempUnit = "metric"
      const weatherServiceUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInfo.city}&units=${tempUnit}&appid=${apiKey}`;
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
      localStorage.setItem("weatherInfo", JSON.stringify(this.state.weatherInfo));
      localStorage.setItem("cachedDateWeatherInfo", this.state.cachedDateWeatherInfo);
    } catch {
      this.setState({ ...this.state, error: "Error in loading Open Weather Map." });
    }
  };

  checkWeatherCache1 = () => {
    const cachedWeatherInfo = localStorage.getItem("weatherInfo");
    const cachedDate = localStorage.getItem("cachedDateWeatherInfo");
    const cacheSelectedForecast = localStorage.getItem("selectedForecast");
    const currentDate = Date.now();
    if (cachedWeatherInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + 7200000;
      if (cacheSelectedForecast === "weatherForecast1") {
        if (checkedDate > currentDate) {
          this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) });
        } else {
          this.loadWeather1();
        }
      } else {
        this.loadWeather1();
      }
    } else {
      this.loadWeather1();
    }
  };

  checkWeatherCache2 = () => {
    const cachedWeatherInfo = localStorage.getItem("weatherInfo");
    const cachedDate = localStorage.getItem("cachedDateWeatherInfo");
    const cacheSelectedForecast = localStorage.getItem("selectedForecast");
    const currentDate = Date.now();
    if (cachedWeatherInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + 7200000;
      if (cacheSelectedForecast === "weatherForecast2") {
        if (checkedDate > currentDate) {
          this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) });
        } else {
          this.loadWeather2();
        }
      } else {
        this.loadWeather2();
      }
    } else {
      this.loadWeather2();
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
                checkWeatherCache1={this.checkWeatherCache1}
                checkWeatherCache2={this.checkWeatherCache2} />
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
