import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



import "./header.css"
import Logo from "../../assets/michote-logo.png"

import { logout as logoutCustomer } from '../../features/customer/customerSlice';
import { logout as logoutPartner} from '../../features/partner/partnerSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { customerIsLoggedIn, loggedInCustomer, customerIsError, customerISuccess, customerIsLoading,
    customerMessage, customerCreated } = useSelector((state) => state.customers);

  const { partnerIsLoggedIn, loggedInPartner, partnerIsError, partnerISuccess, partnerIsLoading,
    partnerMessage, partnerCreated } = useSelector((state) => state.partners);


  const customerLogout = (evt) =>{
    evt.preventDefault();
    dispatch(logoutCustomer());
    navigate("/");
  }

  const partnerLogout = (evt) => {
    evt.preventDefault();
    dispatch(logoutPartner());
    navigate("/");
  }

  return (
    <Navbar bg="white" expand="lg" className='navbar-container fixed-top'>
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
          {!customerIsLoggedIn ? 
          <Nav.Link className='text-dark mr-3 ml-3' href="/login">Login</Nav.Link> : 
          <>
          <Nav.Link className='text-dark mr-3 ml-3' href="/customers/profile">Profile</Nav.Link>
          <Nav.Link className='text-dark mr-3 ml-3' href="/customers/bookings">Bookings</Nav.Link>
          <Nav.Link className='text-dark mr-3 ml-3' href="#" onClick={customerLogout}>Log out</Nav.Link>
          </>
          }
          <NavDropdown className='text-dark mr-3 ml-3' title="Partners" id="basic-nav-dropdown">
            <NavDropdown.Item className='text-dark' href="/partners">Partners</NavDropdown.Item>
            <NavDropdown.Divider />
            {partnerIsLoggedIn ? 
            <>
            <NavDropdown.Item className='text-dark' href="/partners/trips">
              Trips
            </NavDropdown.Item>
            <NavDropdown.Item className='text-dark' href="/partners/profile">
              Account
            </NavDropdown.Item>
            <NavDropdown.Item className='text-dark' href="#" onClick={partnerLogout}>
              Log out
            </NavDropdown.Item>
            </>
            : 
            <NavDropdown.Item className='text-dark' href="/partners/login">
              Login
            </NavDropdown.Item>}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;