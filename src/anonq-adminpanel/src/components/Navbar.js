import React from 'react';
import '../styling/Navbar.css';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";



function Navigationbar() {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Nav className="container-fluid">
        <Navbar.Brand>
          <Link to="/">
            <img src='/images/logo.png' alt="error" width="100" height="50" className="d-inline-block align-top" />
          </Link>
        AnonQ Admin Panel
      </Navbar.Brand>
      </Nav>
    </Navbar>
  );
}
export default Navigationbar;