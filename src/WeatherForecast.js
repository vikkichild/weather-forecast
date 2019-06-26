import React from 'react';
import Card from 'react-bootstrap/Card'

function WeatherForecast(props) {

    let weatherImgUrl;
    console.log(props.weatherCode)

    switch (props.weatherCode) {
        case 200 || 201 || 202:
            weatherImgUrl = "/images/1.png";
            break;
        case 230 || 231 || 232 || 233:
            weatherImgUrl = "/images/2.png";
            break;
        case 300 || 301 || 302:
            weatherImgUrl = "/images/3.png";
            break;
        case 500 || 501 || 502 || 511 || 520 || 522 || 900:
            weatherImgUrl = "/images/4.png";
            break;
        case 521:
            weatherImgUrl = "/images/6.png";
            break;
        case 600 || 610 || 621:
            weatherImgUrl = "/images/7.png";
            break;
        case 601 || 602 || 622 || 623:
            weatherImgUrl = "/images/8.png";
            break;
        case 610:
            weatherImgUrl = "/images/5.png";
            break;
        case 611 || 612:
            weatherImgUrl = "/images/9.png";
            break;
        case 700 || 711 || 721 || 731 || 741 || 751:
            weatherImgUrl = "/images/10.png";
            break;
        case 800:
            weatherImgUrl = "/images/11.png";
            break;
        case 801 || 802:
            weatherImgUrl = "/images/12.png";
            break;
        case 803 || 804:
            weatherImgUrl = "/images/14.png";
            break;
        default:
            weatherImgUrl = "/images/12.png"
    }

    return (
        <Card style={{ width: '10rem', margin: '2%' }}>
            <Card.Header>Current Weather</Card.Header>
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