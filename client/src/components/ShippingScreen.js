import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import '../Style.css';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Checkoutsteps from './Checkoutsteps';
const ShippingScreen = () => {
    const navigate=useNavigate()
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {userInfo,cart:{shippingAddress},}=state;
    const [fullName, setFullName] = useState(shippingAddress.fullName||'');
    const [address, setaddress] = useState(shippingAddress.address||'');
    const [city, setcity] = useState(shippingAddress.city||'');
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode||'');
    const [country, setcountry] = useState(shippingAddress.country||'');
    useEffect(() => {
        if(!userInfo)
        {
            navigate('/signin?redirect=/shipping');
        }
    },[userInfo,navigate])
    const submitHandler = (e) => {
        e.preventDefault();
       ctxDispatch({type:'SAVE_SHIPPING_ADDRESS',payload:{fullName,address,city,postalCode,country}});
       localStorage.setItem('shippingAddress',JSON.stringify({fullName,address,city,postalCode,country}));
       navigate('/payment');
    }
    return (

        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <Checkoutsteps step1 step2></Checkoutsteps>
            <div className="container small-container">
            <h1 className="my-3" style={{textAlign: 'center' }}>Shipping Address</h1>
            <Card className="shipping-card">
                <Form onSubmit={submitHandler} className="container">
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label style={{padding:'10px'}}><h6>Full Name</h6></Form.Label>
                        <Form.Control value={fullName} onChange={(e) => { setFullName(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label style={{padding:'10px'}}><h6>Address</h6></Form.Label>
                        <Form.Control value={address} onChange={(e) => { setaddress(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label style={{padding:'10px'}}><h6>City</h6></Form.Label>
                        <Form.Control value={city} onChange={(e) => { setcity(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label style={{padding:'10px'}}><h6>PostalCode</h6></Form.Label>
                        <Form.Control value={postalCode} onChange={(e) => { setpostalCode(e.target.value) }} required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label style={{padding:'10px'}}><h6>Country</h6></Form.Label>
                        <Form.Control value={country} onChange={(e) => { setcountry(e.target.value) }} required></Form.Control>
                    </Form.Group>

                    <div className="mb-3">
                        <Button variant="danger" type="submit">Continue</Button>
                    </div>
                </Form>
            </Card>
            </div>
        </div>

    )
}
export default ShippingScreen;
