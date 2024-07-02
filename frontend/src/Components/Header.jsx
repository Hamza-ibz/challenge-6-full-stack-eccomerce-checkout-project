import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.jpg";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isActive ? "bg-white shadow-md" : "bg-gray-200"
        } py-4 fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo and Home Link */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-lg font-semibold text-gray-800">Your App Name</span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex-grow flex justify-center">
          <nav className="flex space-x-6 border border-gray-300 rounded-md overflow-hidden">
            <Link
              to="/"
              className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="text-gray-800 px-4 py-3 text-lg font-medium border border-transparent rounded-md hover:bg-[#fed7aa] hover:text-gray-900 transition duration-300"
            >
              Login
            </Link>
          </nav>
        </div>

        {/* Cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative flex items-center"
        >
          <BsBag className="text-3xl text-gray-800" />
          <div className="bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -right-2 -top-2">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;



// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouseChimney, faUser, faBookmark, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons'; // Import faKey icon
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import { useState, useEffect } from 'react';
// import InfoModal from './utils/InfoModal';

// const Header = ({ favouritePlace, resetFavourites }) => {

//   return (
//     <header>
//       <Navbar bg="dark" key='xl' expand='xl' className="bg-primary-subtle mb-3">
//         <Container fluid>
//           <Navbar.Brand as={Link} to="/">WeatherWhenever</Navbar.Brand>
//           <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
//           <Navbar.Offcanvas
//             id={`offcanvasNavbar-expand-${'xl'}`}
//             aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
//                 Offcanvas
//               </Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav>
//                 <Nav.Link as={Link} to="/" style={{ marginLeft: '3rem' }}>
//                   <FontAwesomeIcon icon={faHouseChimney} /> Home
//                 </Nav.Link >

//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
