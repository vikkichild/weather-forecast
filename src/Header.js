import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand className="navbar-text" href="#home">weather forecast</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <p className="navbar-text">your city is {props.city}</p>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;