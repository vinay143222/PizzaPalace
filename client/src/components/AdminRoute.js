import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function AdminRoute({ childern }) {
    const { state } = useContext(Store);
    const { userInfo } = state;
    return userInfo && userInfo.isAdmin ? childern : < Navigate to = "/signin" / > ;
}