import React, { useState } from 'react'
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import Pizzas from './data';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
function App(props) {
   const [qunatity,setqunatity]=useState(1);
   const [varient,setvarient]=useState('small');
 
   return (
      <div>
         <header className="App-header">
            <a href="/">PIZZA PALACE</a>
         </header>
         <main>
            <h1 style={{textAlign:'center'}}>PIZZA MENU</h1>
            <div className="products">
            {Pizzas.map((Pizza)=>{
               return (
               <div  className="product">
                  <a href={`/product/${Pizza.id}`}>
                  <img src={Pizza.image} alt={Pizza.name}/>
                  </a>
                  <div className="product-info">
                  <p>{Pizza.name}</p>
                  <h6>Rs {Pizza.prices[0].small}</h6>
                  
                  <Button variant="danger"> Add to Cart</Button>
                  </div>
               </div>
               )
            })}
            </div>
         </main>
      </div>
   )
}

export default App;
