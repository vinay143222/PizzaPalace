import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Link } from 'react-router-dom';
import {PayPalButtons,usePayPalScriptReducer} from '@paypal/react-paypal-js';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST': return { ...state, loading: true, error: '' };
        case 'FETCH_SUCCESS': return { ...state, loading: false, order: action.payload, error: '' };
        case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload };
        case 'PAY_REQUEST':return {...state,loading:true};
        case 'PAY_SUCCESS':return {...state,loadingPay:false,successPay:true};
        case 'PAY_FAIL':return {...state,loading:false};
        case 'PAY_RESET':return{...state,loading:false,successPay:false};
          case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
        default: return state;
    }
}
export default function OrderScreen() {
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const params=useParams();
    const {id:orderId}=params;
    const navigate=useNavigate();
    const {userInfo,paymentMethod}=state;
    const [{ loading, error, order,successPay,loadingPay,loadingDeliver,
      successDeliver }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
        successPay:false,
        loadingPay:false,
     
    })
    const [{isPending},paypalDispatch]=usePayPalScriptReducer();
    const createOrder=(data,actions)=>{
        return actions.order
        .create({
            purchase_units:[{amount:{value:order.totalPrice}},],
        })
        .then((orderId)=>{
            return orderId
        })
    }
    const onApprove=(data,actions)=>{
         return actions.order.capture().then(async function(detalis){
            try {
                dispatch({type:'PAY_REQUEST'});
                const {data}=await axios.put(`/api/orders/${order._id}/pay`,detalis,{
                    headers:{authorization:`Bearer${userInfo.token}`}
                });
                dispatch({type:'PAY_SUCCESS',payload:data});
                toast.success('Order is Paid');
            } catch (error) {
                dispatch({type:'PAY_FAIL',payload:error});
                toast.error(error);
            }
         })
    }
    const onError=(err)=>{
      toast.error(err);
    }
    useEffect(() => {
        const fetchOrder=async()=>{
            try {
                 dispatch({type:'FETCH_REQUEST'});
                 const {data}=await axios.get(`/api/orders/${orderId}`
                 ,{headers:{authorization:`Bearer${userInfo.token}`},
                });
                 console.log(data);
              dispatch({type:'FETCH_SUCCESS',payload:data});

            } catch (error) {
                dispatch({type:'FETCH_FAIL',payload:error})
            }
             
        }
       
        if(!userInfo)
        {
            navigate('/signin')
        }
        if(!order._id||successPay||(order._id&&order._id!==orderId))
        {
            fetchOrder();
            if(successPay)
            {
                dispatch({type:'PAY_RESET'})
            }
        }
        else{
            const loadPayPalScript=async()=>{
              const {data:clientId}=await axios.get('/api/keys/paypal',{
                headers:{authorization:`Bearer${userInfo.token}`}
              });
              paypalDispatch({type:'resetOptions',
              value:{'client-id':clientId,
              currency:'USD'},});
              paypalDispatch({type:'setLoadingStatus',value:'pending'})
            }
            loadPayPalScript();
        }
    },[order,orderId,userInfo,navigate,paypalDispatch,successPay]);
     async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
         headers:{authorization:`Bearer${userInfo.token}`}
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(err);
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }
    return loading ? (<LoadingBox />) : error ?
     (<MessageBox variant="danger">{error}</MessageBox>) : 
     (<div>
         <Helmet>
            <title>Order{orderId}</title>
         </Helmet>
         <h1 className="my-3" style={{ textAlign: 'center' }}>OrderId:{orderId}</h1>
         <Row>
            <Col md={8}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>
                        Delivery
                    </Card.Title>
                    <Card.Text>
                        <strong>Name:</strong>{order.shippingAddress.fullName} <br/>
                        <strong>Address</strong>{order.shippingAddress.address},
                        {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country},
                    </Card.Text>
                    {order.isDelivered?(<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>)
                    :(<MessageBox variant="danger">Not Delivered</MessageBox>)}
                  </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Payment</Card.Title>
                        <Card.Text>
                            <strong>Method:</strong>{order.paymentMethod}
                            </Card.Text>
                            {order.isPaid?(<MessageBox variant="success">Paid at {order.paidAt}</MessageBox>)
                        :(<MessageBox variant="danger">Not Paid</MessageBox>)}
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>
                        Items
                    </Card.Title>
                    <ListGroup variant="flush">
                      {order.orderItems.map((item)=>{
                        return <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnali"/>
                                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                    <span>{item.quantity}</span>
                                </Col>
                                <Col md={3}>
                                    <span>Rs {item.prices}</span>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                      })}

                    </ListGroup>
                  </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>Rs{order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Delivery</Col>
                                <Col>Rs{order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>Rs{order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>TotalPrice</Col>
                                <Col>Rs{order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid&&(
                        <ListGroup.Item>
                           
                          {isPending?(<LoadingBox/>):
                          (<div>

                            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} disabled={paymentMethod==='CashonDelivery'}>

                            </PayPalButtons>
                          </div>)}
                          
                          {loadingPay&&<LoadingBox/>}

                        </ListGroup.Item>
                        )}
                         {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button type="button" onClick={deliverOrderHandler}>
                        Deliver Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
         </Row>
    </div>)
}