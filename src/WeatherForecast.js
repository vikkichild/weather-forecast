import React from 'react';
import Card from 'react-bootstrap/Card'
import weatherCodeData from './weatherCodeData'

function WeatherForecast(props) {

    function getWeatherImgUrl(code) {
        let imgUrl = weatherCodeData;
        return imgUrl[code];
    }

    let weatherImgUrl = getWeatherImgUrl(props.weatherCode);

    return (
        <Card border="primary" style={{ width: '11rem', margin: '2%' }}>
            <Card.Header style={{ color: '#007bff', fontWeight: 'bold' }}>Current Weather</Card.Header>
            <Card.Img variant="top" src={weatherImgUrl} />
            <Card.Body>
                <Card.Title>{props.temperature}</Card.Title>
                <Card.Text>
                    {props.weather}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default WeatherForecast;