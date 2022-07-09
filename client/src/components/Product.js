import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
function Product(props) {
    const { Pizza } = props;
   
    return (
        <div>
            <Card className="product">
                <Link to={`/product/${Pizza.id}`}>
                    <img src={Pizza.image} alt={Pizza.name} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${Pizza.id}`} style={{textDecoration:'none'}}>
                        <Card.Text style={{color:'black'}} className="text-center">{Pizza.name}</Card.Text>
                    </Link>
                    <div className="product-varient">
                    <Card.Text> <span>Varient</span>:{Pizza.varients[0]}</Card.Text>
                        <Card.Text>Rs {Pizza.prices[0].small}</Card.Text>
                    </div>
                    <Button variant="danger" className="text-center"> Add to Cart</Button>
                </Card.Body>
        </Card>
      
        </div>
    )
}

export default Product
