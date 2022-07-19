import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {   BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Style.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
function App() {
const {state,dispatch:ctxDispatch}=useContext(Store);
const {cart,userInfo}=state;
 const signoutHandler=()=>{
   ctxDispatch({type:'USER_SIGNOUT'});
   localStorage.removeItem('userInfo');
 }

   return (
      <BrowserRouter>
      <div className="d-flex flex-column site-container">
         <ToastContainer position="bottom-center" limit={1}/>
         <header className="App-header">
            <Navbar bg="white" variant="white">
            <Container>
              
               <LinkContainer to="/">
                  <Navbar.Brand>PIZZA PALACE</Navbar.Brand>
               </LinkContainer>
               <Nav className="me-right">
                <Link to="/cart" className="nav-link" style={{color:'black'}}>
                  Cart
                  {cart.cartItems.length>0&&(<Badge pill bg="danger">{cart.cartItems.reduce((a,c)=>a + c.quantity,0)}</Badge>)}
                </Link>
                {userInfo ?(
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                     <LinkContainer to="/profile">
                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                     </LinkContainer>
                     <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>My Order</NavDropdown.Item>
                     </LinkContainer>
                     <NavDropdown.Divider/>
                     <Link className="dropdown-list" to="#signout" onClick={signoutHandler}>Logout</Link>
                  </NavDropdown>
                ):(
                  <Link to="/signin" className="nav-link" style={{color:'black'}}>
                  
               SignIn</Link>
                )}
               </Nav>
            </Container>
            </Navbar>
            
         </header>
         <main>
            <Container>
            <Routes>
               <Route path="/cart" element={<CartScreen/>}></Route>
               <Route path="/product/:id" element={<ProductScreen/>}></Route>
               <Route path="/" element={<HomeScreen/>}></Route>
               <Route path="/signin" element={<SigninScreen/>}></Route>
            </Routes>
           </Container>
         </main>
         <footer>
            <div className="text-center">All rights reserved</div>
         </footer>
      </div>
      </BrowserRouter>
   )
}

export default App;
