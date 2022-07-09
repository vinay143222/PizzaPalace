import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

import {Link} from 'react-router-dom';

import axios from 'axios';
function Home() {
    const [pizzas,setpizza]=useState([]);

    useEffect(() => {
        const fetchData=async()=>{
            const result=await axios.get('/api/products');
            setpizza(result.data);
        };
        fetchData();
    }, [])
    console.log(pizzas)
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>PIZZA MENU</h1>
            <div className="products">
                {pizzas.map((Pizza) => {
                    return (
                        <div className="product">
                            <Link to={`/product/${Pizza.id}`}>
                                <img src={Pizza.image} alt={Pizza.name} />
                            </Link>
                            <div className="product-info">
                                <p>{Pizza.name}</p>
                                <div className="product-varient">
                                <h6><span>Varient</span>:{Pizza.varients[0]}</h6>
                                <h6>Rs {Pizza.prices[0].small}</h6>
                                     </div>
                                <Button variant="danger"> Add to Cart</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;