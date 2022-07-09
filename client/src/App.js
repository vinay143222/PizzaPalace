import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {   BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './Style.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import {LinkContainer} from 'react-router-bootstrap';
function App() {

 
   return (
      <BrowserRouter>
      <div className="d-flex flex-column site-container">
         <header className="App-header">
            <Navbar bg="white" variant="white">
            <Container>
              
               <LinkContainer to="/">
                  <Navbar.Brand>PIZZA PALACE</Navbar.Brand>
               </LinkContainer>
               
            </Container>
            </Navbar>
            
         </header>
         <main>
            <Container>
            <Routes>
               <Route path="/product/:id" element={<ProductScreen/>}></Route>
               <Route path="/" element={<HomeScreen/>}></Route>
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
