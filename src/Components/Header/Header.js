import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css"

function Header({city}) {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand className="navbar-text" href="/">weather forecast</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <p className="navbar-text">your city is {city}</p>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;