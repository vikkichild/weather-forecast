import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import WeatherForecast from './WeatherForecast';
import MainContainer from './MainContainer';


class App extends Component {

  state = {
    city: "",
    latitude: "",
    longitude: "",
    temperature: "",
    weather: "",
    weatherCode: ""
  }

  loadCountry = async () => {
    const response = await fetch('https://ipapi.co/json/');
    const countryInfo = await response.json();
    this.setState({ city: countryInfo.city, latitude: countryInfo.latitude, longitude: countryInfo.longitude });
  };

  loadWeather = async () => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${this.state.city}&key=f7deebe0f69843849fbac329bf36ad07`);
    const weatherInfo = await response.json();
    this.setState({
      ...this.state,
      temperature: weatherInfo.data[0].temp,
      weather: weatherInfo.data[0].weather.description,
      weatherCode: weatherInfo.data[0].weather.code
    });
  };

  componentDidMount() {
    this.loadCountry();
  }

  render() {
    return (
      <div>
        <Header />
        <MainContainer city={this.state.city} loadWeather={this.loadWeather} />
        {this.state.weather &&
          <WeatherForecast temperature={this.state.temperature} weather={this.state.weather} weatherCode={this.state.weatherCode} />}
      </div>
    )
  }
}

export default App;
