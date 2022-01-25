import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

    const isAuthenticated = localStorage.getItem('tokenStore');
       
    return (
        isAuthenticated 
            ? 
                <Outlet />       
            : 
                <Navigate to={{ pathname: '/authError' }} />    
    )
    
}

export default PrivateRoute;