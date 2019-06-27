import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import WeatherForecast from './WeatherForecast';
import WeatherForecastForm from './WeatherForecastForm';


class App extends Component {

  state = {
    cityInfo: {
      city: "",
      latitude: "",
      longitude: ""
    },
    weatherInfo: {
      weather: "",
      weatherCode: "",
      temperature: ""
    }

  }

  loadCountry = async () => {
    const response = await fetch('https://ipapi.co/json/');
    const cityData = await response.json();
    this.setState({
      cityInfo: {
        city: cityData.city,
        latitude: cityData.latitude,
        longitude: cityData.longitude
      }
    });
  };

  loadWeather1 = async () => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${this.state.cityInfo.city}&key=f7deebe0f69843849fbac329bf36ad07`);
    const weatherData = await response.json();
    this.setState({
      weatherInfo: {
      temperature: weatherData.data[0].temp,
      weather: weatherData.data[0].weather.description,
      weatherCode: weatherData.data[0].weather.code
      }
    });
  };

  loadWeather2 = async () => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInfo.city}&units=metric&appid=860ae597957b496c4198358824ce99f1`);
    const weatherData = await response.json();
    this.setState({
      weatherInfo: {
        weather: weatherData.weather[0].description,
        weatherCode: weatherData.weather[0].id,
        temperature: weatherData.main.temp
      }
    });
  };

  componentDidMount() {
    this.loadCountry();
  }

  render() {
    return (
      <div>
        <Header city={this.state.cityInfo.city} />
        <WeatherForecastForm
          city={this.state.cityInfo.city}
          loadWeather1={this.loadWeather1}
          loadWeather2={this.loadWeather2} />
        {this.state.weatherInfo.weather &&
          <WeatherForecast
            temperature={this.state.weatherInfo.temperature}
            weather={this.state.weatherInfo.weather}
            weatherCode={this.state.weatherInfo.weatherCode} />}
      </div>
    )
  }
}

export default App;
