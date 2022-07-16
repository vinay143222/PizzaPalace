import React, { useContext, useEffect, useReducer } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import {Helmet} from 'react-helmet-async';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Store } from '../Store';
function ProductScreen() {
    const params=useParams();
    const {id}=params;
  
    const {state,dispatch:ctxDispatch}=useContext(Store);
    const {cart}=state;
    const navigate=useNavigate();
    const AddToCart = async()=>{
         
        const existItem=cart.cartItems.find((x)=>x._id===pizzas._id);
        const quantity=existItem ? existItem.quantity+1:1;
        const {data}=await axios.get(`/api/products/${pizzas._id}`);
        if(data.countInStock<quantity)
        {
            window.alert('Sorry Product is out of Stock')
            return ;
        }
     ctxDispatch({type:'CART_ADD_ITEM',payload:{...pizzas,quantity}});
      navigate('/cart');
    }
    const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'FETCH_REQUEST': return {...state,loading:true};
        case 'FETCH_SUCCESS':return {...state,pizzas:action.payload,loading:false};
        case 'FETCH_FAIL':return {...state,loading:false,error:action.payload};
        default: return state;
    }
}
const [{loading,error,pizzas,},dispatch]=useReducer(reducer,{
    pizzas:[],
    loading:true,
    error:[],

  })
useEffect(() => {
        const fetchData=async()=>{
            dispatch({type:'FETCH_REQUEST'});
            try {
                 const result=await axios.get(`/api/products/id/${id}`);
                 dispatch({type:'FETCH_SUCCESS',payload:result.data})
            } catch (error) {
                dispatch({type:'FETCH_FAIL',payload:error.message})
            }
           
           
        };
        fetchData();
    }, [id])
    
    return loading ? (<LoadingBox/>):pizzas ?
    (<div>
        <Row>
            <Col md={6} className="img-large">
                <Card className="product">
                    <Card.Body>
                <img src={pizzas.image} alt={pizzas.name}/>
                </Card.Body>
                </Card>
            </Col>
            <Col md={3}>
                <Card>
                    <Card.Body>
 <ListGroup variant="flush" className="m-3">
                        <ListGroup.Item>
                            <Helmet>
                               <title>{pizzas.name}</title>
                            </Helmet>
                            <h6> PIZZA :<span>{pizzas.name}</span></h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6> RS :{pizzas.prices}</h6>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Description: {pizzas.description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p> Category :{pizzas.category}</p>
                        </ListGroup.Item>
                      
                    </ListGroup>
                    </Card.Body>
                    </Card>
            </Col>
            <Col md={3}>
                   <Card>
                    <Card.Body>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>RS {pizzas.prices}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                {pizzas.countInStock>0 ?<Badge bg="success">available</Badge>
                                : <Badge bg="danger">Unavailable</Badge>}</Col>
                            </Row>
                        </ListGroup.Item>
                        {pizzas.countInStock>0 &&(<ListGroup.Item>
                            <div className="d-grid">
                                <Button variant="danger" onClick={AddToCart}>Add to Cart</Button>
                            </div>
                        </ListGroup.Item>)}
                    </Card.Body>
                   </Card>
                    
            </Col>
        </Row>
    </div>):(<MessageBox variant="danger">{error}</MessageBox>)
}

export default ProductScreen
