import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../../public/assets/img/bghero.jpg";
import { BsBag } from "react-icons/bs";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  console.log(SidebarContext);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
        } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="" />
          </div>
        </Link>

        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
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
