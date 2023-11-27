import MainNavbar from './components/headers/MainNavbar';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

import './App.css';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import AdminDashboard from './pages/AdminDashboard';
import { ProductProvider } from './ProductContext';
import Shop from './pages/Shop';
import Logout from './pages/Logout';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  const [userDetails, setUserDetails] = useState({})
  const [productList, setProductList] = useState([])

  const unsetUser = () => {
    localStorage.clear();
  }

  const unsetProductList = () => {
    productList([])
  }

  useEffect(() => {
    console.log(user);
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      method: 'GET', 
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('from app',data)
      if (typeof data._id !== "undefined") {
        setUserDetails(data)
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {

        setUser({
            id: null,
            isAdmin: null
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
    console.log(localStorage);
  }, [])


  return (
    <UserProvider value={{ user, setUser, unsetUser, userDetails, setUserDetails }}>
      <ProductProvider value={{ productList, setProductList, unsetProductList }} >
        <Router>
          <Container className='p-0' fluid>
              <MainNavbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" exact element={<Login/>}/>
                  <Route path="/adminDashboard" element={<AdminDashboard/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/logout" element={<Logout/>}/>
                  <Route path="/shop" element={<Shop/>}/>
                  <Route path="/orderHistory" element={<OrderHistory/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  
              </Routes>
          </Container>
        </Router>
      </ProductProvider>
    </UserProvider>  
  );
}

export default App;


