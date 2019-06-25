import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'

class App extends Component {

  state = {
    city: "",
    latitude: "",
    longitude: ""
  }

  loadCountry = async () => {
    const response = await fetch('https://ipapi.co/json/')
    const countryInfo = await response.json()
    this.setState({ city: countryInfo.city, latitude: countryInfo.latitude, longitude: countryInfo.longitude });
  };

  render() {
    return (
      <div>
        <div> {this.state.city}</div>
        <Button onClick={this.loadCountry}>Request data</Button>
      </div>
    )
  }
}



export default App;
