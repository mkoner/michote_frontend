import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./header.css"
import Logo from "../../assets/michote-logo.png"

function Header() {
  return (
    <Navbar bg="white" expand="lg" className='navbar-container' fixed="top">
        <Navbar.Brand href="/">
        <img
              src={Logo}
              width="100"
              height="40"
              className="d-inline-block align-top"
              alt="michote logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-dark mr-3 ml-3' href="/about">About us</Nav.Link>
            <Nav.Link className='text-dark mr-3 ml-3' href="/login">Login</Nav.Link>
            <NavDropdown className='text-dark mr-3 ml-3' title="Partners" id="basic-nav-dropdown">
              <NavDropdown.Item className='text-dark' href="/partners">Partners</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='text-dark' href="/partners/login">
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;