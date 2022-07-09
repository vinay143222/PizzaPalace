import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
function App() {
    return (
     <div>
      <header className="App-header">
         <a href="/">PIZZA PALACE</a>
      </header>
      <main>
         list Products
      </main>
     </div>
    )
}

export default App;
