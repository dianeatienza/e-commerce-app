import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function MainNavbar() {
    const { user } = useContext(UserContext);
    

  return (
    <>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">
            <img
              src='/housethetics-logo.png'
              alt='Housethetics Logo'
              style={{
                width: '100px',
                height: 'auto',
                maxWidth: '100%',
                display: 'block',
                opacity: 0.8,
              }}
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse className='text-uppercase' id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
            {(user && user.isAdmin) && 
              <Nav.Link as={NavLink} to="/adminDashboard" exact>Admin Dashboard</Nav.Link>
            }
            
            <Nav.Link as={NavLink} to="/shop" exact>Shop</Nav.Link>
            {(user.id) && 
            <>
            <Nav.Link as={NavLink} to="/orderHistory" exact>Orders</Nav.Link>
            <Nav.Link as={NavLink} to="/profile" exact>My Account</Nav.Link>
            <Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
            </>}
            {(!user.id) && 
            <>
            <Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
            </>}
          </Nav>
          {(!user.admin)}
          <div className='ml-auto'>
            <Nav.Link as={NavLink} to="/cart" exact>
              <Button className='mx-4 btn-warning p-2'>
                <FaShoppingCart /> View Cart
              </Button>
            </Nav.Link>
          </div>        
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
    
  );
}

export default MainNavbar;