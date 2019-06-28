import React from "react";
import Card from "react-bootstrap/Card";
import weatherCodeData from "./weatherCodeData";
import "./WeatherForecast.css";

function getWeatherImgUrl(code) {
    let imgUrl = weatherCodeData;
    return imgUrl[code];
};

function WeatherForecast({temperature, weather, weatherCode}) {

    let weatherImgUrl = getWeatherImgUrl(weatherCode);
    let temp = Math.round(temperature);

    return (
        <Card border="primary" className="card-container">
            <Card.Header className="card-header">Current Weather</Card.Header>
            <Card.Img variant="top" src={weatherImgUrl} />
            <Card.Body>
                <Card.Title>{temp}℃</Card.Title>
                <Card.Text className="weather-text">
                    {weather}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default WeatherForecast;