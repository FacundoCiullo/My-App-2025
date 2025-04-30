import CartWidget from "./CartWidget";
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Theme from "../js/theme"
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
  <>
    {['md'].map((expand) => (
      <Navbar 
        key={expand} 
        bg="dark" 
        variant="dark" 
        expand={expand} 
        className="mb-3"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">

            <i className="bi bi-boxes"></i>
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" aria-current="page" to={"/destacados"}>Categorias</NavLink>
              <NavLink className="nav-link" aria-current="page" to={"/"}>Productos</NavLink>
            </Nav>

            <CartWidget />

            <Nav>
              <div className="d-flex justify-content-center">
                <Theme />{/* Swich modo oscuro */}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    ))}
  </>
  );
}
  
export default NavBar;
