import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WEATHER_FORECAST_TYPE, SELECTED_WEATHER_FORECAST } from "../const";


class WeatherForecastForm extends Component {

    state = {
        selectedForecast: WEATHER_FORECAST_TYPE.WEATHERBIT
    };

    handleForecastChange = event => {
        this.setState({
            selectedForecast: event.target.value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getWeatherForecast(this.state.selectedForecast)();
        localStorage.setItem(SELECTED_WEATHER_FORECAST, this.state.selectedForecast);
    };

    getWeatherForecast(option) {
        const loadForecast1 = this.props.checkCacheWeatherbit;
        const loadForecast2 = this.props.checkCacheOpenWeatherMap;
        let forecastCompany = {
            [WEATHER_FORECAST_TYPE.WEATHERBIT]: loadForecast1,
            [WEATHER_FORECAST_TYPE.OPEN_WEATHER_MAP]: loadForecast2
        }
        return forecastCompany[option];
    };

    render() {
        return (
            <Jumbotron>
                <h1>Hello, I know you are from {this.props.city}!</h1>
                <p> I can tell what is the weather now. </p>
                <p> Choose what weather forecast service you want to use: </p>
                <Form onSubmit={this.handleFormSubmit}>
                    <div key="custom-radio" className="mb-3">
                        <Form.Check
                            custom
                            type="radio"
                            value={WEATHER_FORECAST_TYPE.WEATHERBIT}
                            label="Weatherbit"
                            id="custom-radio-1"
                            checked={this.state.selectedForecast === WEATHER_FORECAST_TYPE.WEATHERBIT}
                            onChange={this.handleForecastChange}
                        />
                        <Form.Check
                            custom
                            type="radio"
                            value={WEATHER_FORECAST_TYPE.OPEN_WEATHER_MAP}
                            label="Open Weather Map"
                            id="custom-radio-2"
                            checked={this.state.selectedForecast === WEATHER_FORECAST_TYPE.OPEN_WEATHER_MAP}
                            onChange={this.handleForecastChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">Check the weather</Button>
                </Form>
            </Jumbotron>
        );
    };
};

export default WeatherForecastForm;