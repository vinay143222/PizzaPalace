import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Checkoutsteps from './Checkoutsteps'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentScreen() {
    const navigate=useNavigate();
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart:{shippingAddress,paymentMethod},}=state;
    
    const [PaymentMethodName,setPaymentMethod]=useState(paymentMethod||'PayPal')
    useEffect(() => {
        if(!shippingAddress.address)
        {
            navigate('/shipping');
        }
    },[shippingAddress,navigate])
    const submitHandler=(e)=>{
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD',payload:PaymentMethodName});
        localStorage.setItem('paymentMethod',PaymentMethodName);
        navigate('/placeorder')
    }
    return (
        <div>
            <Checkoutsteps step1 step2 step3></Checkoutsteps>
            <div className="container small-container">
                <Helmet>
                    <title>Payment</title>
                </Helmet>
                <h1 className="my-3" style={{ textAlign: 'center' }}>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                     <div className="mb-3">
                        <Form.Check type="radio" 
                        id="PayPal" 
                        label="PayPal"
                         value="PayPal"
                          checked={PaymentMethodName==='PayPal'} 
                          onChange={(e) =>setPaymentMethod(e.target.value)}>

                        </Form.Check>
                     </div>
                     
                     
                     <div className="mb-3">
                        <Button type="submit">Continue</Button>
                     </div>
                </Form>
            </div>
        </div>
    )
}
