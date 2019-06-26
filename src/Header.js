import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">WEATHER</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    YOUR CITY IS MINSK
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;