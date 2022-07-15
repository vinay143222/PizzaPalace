import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {   BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Style.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import {LinkContainer} from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
function App() {
const {state}=useContext(Store);
const {cart}=state;
 
   return (
      <BrowserRouter>
      <div className="d-flex flex-column site-container">
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
