import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'

export default function Checkoutsteps(props) {
    return (
        <Row className="checkout-steps">
          <Col className={props.step1?'active':''}>Sign-In</Col> 
          <Col className={props.step2?'active':''}>Shipping</Col> 
          <Col className={props.step3?'active':''}>Payment</Col> 
          <Col className={props.step4?'active':''}>Place Order</Col> 
        </Row>
    )
}
