import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
  const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'FETCH_REQUEST': return {...state,loading:true};
        case 'FETCH_SUCCESS':return {...state,pizzas:action.payload,loading:false};
        case 'FETCH_FAIL':return {...state,loading:false,error:action.payload};
        default: return state;
    }
}
export default function Categoryitem() {
    const params=useParams();
    const {category}=params;
   
const [{loading,error,pizzas,},dispatch]=useReducer(reducer,{
    pizzas:[],
    loading:true,
    error:[],

  })
  useEffect(() => {

           const fetchData=async()=>{
            dispatch({type:'FETCH_REQUEST'});
            try {
                 const {data}=await axios.get(`/api/products/search/?category=${category}`);
                 console.log(data)
                 dispatch({type:'FETCH_SUCCESS',payload:data})
            } catch (error) {
                dispatch({type:'FETCH_FAIL',payload:error.message})
            }
           
           
        };
        fetchData();
  },[category])
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{category} Pizzas</h1>
                 <Row>
                            {pizzas.map((Pizza) => {
                                return (
                                    <Col key={Pizza.id} sm={6} md={4} lg={3} className="mb-3">
                                     <Card className="product">
                                        <Card.Title>{Pizza.name}</Card.Title>
                                        <Card.Body>
                                            <Link to={`/product/${Pizza._id}`}>
                                            <img src={Pizza.image} alt={Pizza.name}/>
                                            </Link>
                                        </Card.Body>
                                        <Card.Text>{Pizza.description}</Card.Text>
                                        
                                     </Card>
                                    </Col>
                                )

                            })
                            }
                        </Row>
           
        </div>
    )
}
