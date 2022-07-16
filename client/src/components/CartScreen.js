import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {Store} from '../Store';
import {Helment} from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from './MessageBox';
import { Link} from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import '../Style.css';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
function CartScreen() {
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const { cart:{cartItems}, }=state;
   const navigate=useNavigate()
  
   const UpdateCartHandler=async(item,quantity)=>{
       const {data}=await axios.get(`/api/products/${item._id}`);
         
        if(data.countInStock<quantity)
        {
            window.alert('Sorry Product is out of Stock')
            return ;
        }
         ctxDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}});
   }
   const removeItemHandler=async(item)=>{
     ctxDispatch({type:'CART_REMOVE_ITEM',payload:item})
   }
   const CheckoutHandler=()=>{
    navigate('/signin?redirect=/shipping');
   }
    
    return (
        <div>
            <Helmet><title>PIZZA Cart</title></Helmet>
            <h1>PIZZA CART</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length===0?(
                    <MessageBox variant="danger">Cart is Empty <Link to="/">Go to Shopping</Link></MessageBox>):
                    (<ListGroup>
                        {cartItems.map((item)=>{
                            return (
                        <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={3}>
                                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnali"/>
                                    <Link to={`/product/${item._id}`} style={{color:'black',textDecoration:'none'}}><p>{item.name}</p></Link>
                                </Col>
                                <Col md={3}>
                                    <Button variant="light" disabled={item.quantity===1} onClick={()=>UpdateCartHandler(item, item.quantity-1)}>
                                        <i className="fas fa-minus-circle"></i>
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button variant="light" disabled={item.quantity===item.countInStock} onClick={()=>UpdateCartHandler(item, item.quantity+1)}>
                                        <i className="fas fa-plus-circle"></i>
                                    </Button>
                                   
                                </Col>
                                 <Col md={3}>Rs{item.prices*item.quantity}</Col>
                                 
                                 <Col md={1}>
                                    <Button variant="light" onClick={()=>removeItemHandler(item)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                 </Col>
                            </Row>
                        </ListGroup.Item>)})}
                    </ListGroup>)
}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                 <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>SubTotal ({cartItems.reduce((a,c)=>a+c.quantity,0)} {''}items)
                    RS :{cartItems.reduce((a,c)=>a+c.prices*c.quantity,0)}</h3>
                    
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                    <Button type="button" variant="danger" disabled={cartItems.length===0} onClick={CheckoutHandler}>Proceed to Checkout</Button>
                    </div>
                  </ListGroup.Item>
                 </ListGroup>
                 </Card.Body>
</Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
