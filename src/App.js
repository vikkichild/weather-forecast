import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './Header';
import WeatherForecast from './WeatherForecast';
import WeatherForecastForm from './WeatherForecastForm';


class App extends Component {

  state = {
    cityInfo: null,
    weatherInfo: null,
    cachedDateCityInfo: null,
    cachedDateWeatherInfo: null
  }

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
    }
  }

  loadCityInfo = async () => {
    const response = await fetch('https://ipapi.co/json/');
    const cityData = await response.json();
    this.setState({
      cityInfo: {
        city: cityData.city,
        latitude: cityData.latitude,
        longitude: cityData.longitude
      },
      cachedDate: Date.now()
    });
    localStorage.setItem("cityInfo", JSON.stringify(this.state.cityInfo));
    localStorage.setItem("cachedDateCityInfo", this.state.cachedDateCityInfo);

  };

  loadWeather1 = async () => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${this.state.cityInfo.city}&key=f7deebe0f69843849fbac329bf36ad07`);
    const weatherData = await response.json();
    this.setState({
      weatherInfo: {
        temperature: weatherData.data[0].temp,
        weather: weatherData.data[0].weather.description,
        weatherCode: weatherData.data[0].weather.code
      },
      cachedDateWeatherInfo: Date.now()
    });
    localStorage.setItem("weatherInfo", JSON.stringify(this.state.weatherInfo));
    localStorage.setItem("cachedDateWeatherInfo", this.state.cachedDateWeatherInfo);
  };

  loadWeather2 = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInfo.city}&units=metric&appid=860ae597957b496c4198358824ce99f1`);
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
  };

  checkWeatherCache1(){
    const cachedWeatherInfo = localStorage.getItem("weatherInfo");
    const cachedDate = localStorage.getItem("cachedDateWeatherInfo");
    const currentDate = Date.now();
    if (cachedWeatherInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + 7200000;
      console.log(cachedDate);
      if (checkedDate > currentDate) {
        this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) })
        console.log(checkedDate);
      } else {
        this.loadWeather1();
      }
    } else {
      this.loadWeather1();
    }
  };

  checkWeatherCache2(){
    const cachedWeatherInfo = localStorage.getItem("weatherInfo");
    const cachedDate = localStorage.getItem("cachedDateWeatherInfo");
    const currentDate = Date.now();
    if (cachedWeatherInfo && cachedDate) {
      const checkedDate = Number(cachedDate) + 7200000;
      console.log(cachedDate);
      if (checkedDate > currentDate) {
        this.setState({ weatherInfo: JSON.parse(cachedWeatherInfo) })
        console.log(checkedDate);
      } else {
        this.loadWeather2();
      }
    } else {
      this.loadWeather2();
    }
  };

  render() {
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
    )
  }
}

export default App;
