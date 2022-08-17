import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DropDownMenu } from ".";



const NavBar = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')



  const login = () => {

    const token = localStorage.getItem('token')




    if (token) {
      localStorage.setItem('token', '')
      alert('Closing session')
      navigate('/login')
    } else {
      navigate('/login')
      alert('Login to continue')
    }


  }



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

          {
            token ? (
              <Button as={Button} onClick={login} className='me-5 LogginSmallDevices'>
                Log out
              </Button>
            ) : (
              <Button as={Button} onClick={login} className='me-5 LogginSmallDevices'>
                Log in
              </Button>
            )
          }

          <DropDownMenu />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
