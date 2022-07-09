import React, { useEffect, useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button';

import {Link} from 'react-router-dom';

import axios from 'axios';
const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'FETCH_REQUEST': return {...state,loading:true};
        case 'FETCH_SUCCESS':return {...state,pizzas:action.payload,loading:false};
        case 'FETCH_FAIL':return {...state,loading:false,error:action.payload};
        default: return state;
    }
}
function Home() {
  const [{loading,error,pizzas,},dispatch]=useReducer(reducer,{
    pizzas:[],
    loading:true,
    error:[],

  })

    useEffect(() => {
        const fetchData=async()=>{
            dispatch({type:'FETCH_REQUEST'});
            try {
                 const result=await axios.get('/api/products');
                 dispatch({type:'FETCH_SUCCESS',payload:result.data})
            } catch (error) {
                dispatch({type:'FETCH_FAIL',payload:error.message})
            }
           
           
        };
        fetchData();
    }, [])
   
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>PIZZA MENU</h1>
            <div className="products">
                
                {
                 loading ? (<div>Loading ...</div>):(
                pizzas.map((Pizza) => {
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
                }))}
                
            </div>
            
        </div>
    )
}

export default Home;