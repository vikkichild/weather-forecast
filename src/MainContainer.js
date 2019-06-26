import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

function MainContainer(props) {
    return (
        <Jumbotron>
            <h1>Hello, I know you are from {props.city}!</h1>
            <p>
                I can tell what is the weather now. </p>
            <p>
                <Button variant="primary" onClick={props.loadWeather}>Check the weather</Button>
            </p>
        </Jumbotron>
    )
}

export default MainContainer;