import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
   BrowserRouter,
   Routes,
   Route,
   Link
} from "react-router-dom";



import './Style.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
function App() {

 
   return (
      <BrowserRouter>
      <div>
         <header className="App-header">
            <Link to="/">PIZZA PALACE</Link>
         </header>
         <main>
            <Routes>
               <Route path="/product/:id" element={<ProductScreen/>}></Route>
               <Route path="/" element={<HomeScreen/>}></Route>
            </Routes>
           
         </main>
      </div>
      </BrowserRouter>
   )
}

export default App;
