import React, { useContext, useReducer, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
const reducer=(state,action)=>{
  switch(action.type){
    case 'UPDATE_REQUEST': return { ...state, loadingUpdate: true};
    case 'UPDATE_SUCCESS':return {...state,loadingUpdate:false};
    case 'UPDATE_FAIL':return {...state,loadingUpdate:false};
    default : return state;
  }
}
function ProfileScreen() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name,setName]=useState(userInfo.name);
    const [email,setEmail]=useState(userInfo.email);
    const [password,setPassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
    const [{loadingUpdate},dispatch]=useReducer(reducer,{
        loadingUpdate:false,
    })
    const submitHandler= async(e)=>{
           e.preventDefault();
           try {
            const { data}=await axios.put('/api/users/profile',{
                name,
                email,
                password
            },{
                headers:{authorization:`Bearer${userInfo.token}`}
            });
            dispatch({type:'UPDATE_SUCCESS'});
            ctxDispatch({type:'USER_SIGNIN',payload:data});
            localStorage.setItem('userInof',JSON.stringify(data));
            toast.success('User Updated SUccessFully')
           } catch (error) {
              dispatch({type:'FETCH_FAIL'});
              toast.error(error);
           }

    }
    return (
        <div className="container small-container">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 style={{ textAlign: 'center' }}>User ProfileScreen</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
             <Form.Label>Name</Form.Label>
             <Form.Control value={name} onChange={(e) =>setName(e.target.value)} required >
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Label>Email</Form.Label>
             <Form.Control value={email} onChange={(e) =>setEmail(e.target.value)} required>
             </Form.Control>
             </Form.Group>
             <Form.Group>
             <Form.Label>Password</Form.Label>
             <Form.Control value={password} onChange={(e) =>setPassword(e.target.value)} required type="password">
             </Form.Control>
             </Form.Group>
              <Form.Group>
             <Form.Label>ConfirmPassword</Form.Label>
             <Form.Control value={confirmPassword} onChange={(e) =>setconfirmPassword(e.target.value)} required type="password">
             </Form.Control>
             </Form.Group>
             <div className="mb-3">
                <Button type="submit" variant="danger">Update</Button>
             </div>
            </Form>
        </div>
    )
}

export default ProfileScreen
