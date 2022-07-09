import React from 'react'
import Button from 'react-bootstrap/Button';
import Pizzas from '../data';
import {Link} from 'react-router-dom';
function Home() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>PIZZA MENU</h1>
            <div className="products">
                {Pizzas.map((Pizza) => {
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