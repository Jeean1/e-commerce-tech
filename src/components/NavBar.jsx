import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { DropDownMenu } from ".";


const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand href="/#/" style={{ color: '#f85555' }}>E-commerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">Home</Nav.Link>
            <Nav.Link href="/#/login">Login</Nav.Link>
            <Nav.Link href="/#/purchases">Purchases</Nav.Link>
          </Nav>
          <DropDownMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
