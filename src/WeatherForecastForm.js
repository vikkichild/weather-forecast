import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class WeatherForecastForm extends Component {

    state = {
        selectedForecast: ""
    };

    handleForcastChange = event => {
        this.setState({
            selectedForecast: event.target.value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getWeatherForecast(this.state.selectedForecast)();
        console.log("You have submitted:", this.state.selectedForecast)
    }

    getWeatherForecast(option) {
        const loadForecast1 = this.props.loadWeather1;
        const loadForecast2 = this.props.loadWeather2;
        let forecastCompany = {
            "weatherForecast1": loadForecast1,
            "weatherForecast2": loadForecast2
        }
        return forecastCompany[option];
    }

    render() {
        return (
            <Jumbotron>
                <h1>Hello, I know you are from {this.props.city}!</h1>
                <p> I can tell what is the weather now. </p>
                <p>Choose what weather forecast you want to use:</p>
                <Form onSubmit={this.handleFormSubmit}>
                    <div key={`custom-radio`} className="mb-3">
                        <Form.Check
                            custom
                            type={`radio`}
                            value={`weatherForecast1`}
                            label={`Weatherbit`}
                            id={`custom-radio-1`}
                            checked={this.state.selectedForecast === "weatherForecast1"}
                            onChange={this.handleForcastChange}
                        />
                        <Form.Check
                            custom
                            type={`radio`}
                            value={`weatherForecast2`}
                            label={`Open Weather Map`}
                            id={`custom-radio-2`}
                            checked={this.state.selectedForecast === "weatherForecast2"}
                            onChange={this.handleForcastChange}
                        />
                    </div>
                    <Button variant="primary" type="submit">Check the weather</Button>
                </Form>

            </Jumbotron>
        )
    }
}

export default WeatherForecastForm;