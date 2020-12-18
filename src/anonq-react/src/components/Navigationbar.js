import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../styling/Navigationbar.css';
import SavedQuestions from "../components/SavedQuestions"
import { Navbar, Nav, Image } from 'react-bootstrap';
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
        AnonQ
      </Navbar.Brand>
       <SavedQuestions /> 
        <Nav.Item className="ml-auto">
          <Link to="/">
            <Image src='/images/home.svg'></Image >
          </Link>
            |
            <Link to="/AskQuestion">
            <Image src='/images/QuestionIcon.svg'></Image >
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
export default Navigationbar;