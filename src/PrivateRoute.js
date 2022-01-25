import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthError from './components/AuthError';

const PrivateRoute = () => {

    const isAuthenticated = localStorage.getItem('tokenStore');
       
    return (
        isAuthenticated 
            ? 
                <Outlet />       
            : 
                <AuthError />    
    )
    
}

export default PrivateRoute;