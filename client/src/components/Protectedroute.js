import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function Protectedroute({ childern }) {
    const {state}=useContext(Store);
    const {userInfo}=state;
    return userInfo ? childern : < Navigate to = "/signin" / > ;
}