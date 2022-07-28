import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Store } from '../Store';

function Product(props) {
    const { Pizza } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state; 
  
    const addtoCartHandler = async (item) => {
        
        const existItem = cartItems.find((x) => x._id === Pizza._id);
         
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${item._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry Product is out of Stock')
            return;
        }
        ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    }


    return (
        <div>
            <Card className="product">
                <Link to={`/product/${Pizza._id}`}>
                    <img src={Pizza.image} alt={Pizza.name} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${Pizza._id}`} style={{ textDecoration: 'none' }}>
                        <Card.Text style={{ color: 'black', }} className="text-center">{Pizza.name}</Card.Text>
                    </Link>
                    <div className="product-varient">
                        <Card.Text> <span>Varient</span>:{Pizza.varients[0]}</Card.Text>
                        <Card.Text>Rs {Pizza.prices}</Card.Text>
                    </div>
                    {Pizza.countInStock === 0 ?
                        <Button variant="light" className="text-center" disabled >Out of Stock</Button> :
                        <Button variant="danger" className="text-center" onClick={() => addtoCartHandler(Pizza)} > Add to Cart</Button>
                    }

                </Card.Body>
            </Card>

        </div>
    )
}

export default Product
