import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faUser, faBookmark, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons'; // Import faKey icon
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react';
import InfoModal from './utils/InfoModal';

const Header = ({ favouritePlace, resetFavourites }) => {

  return (
    <header>
      <Navbar bg="dark" key='xl' expand='xl' className="bg-primary-subtle mb-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">WeatherWhenever</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${'xl'}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link as={Link} to="/" style={{ marginLeft: '3rem' }}>
                  <FontAwesomeIcon icon={faHouseChimney} /> Home
                </Nav.Link >

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
