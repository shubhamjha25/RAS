import React from 'react';
import '../App.css';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import LOGO from '../logo.png';

toast.configure();

function Navbar() {

    const notify = () => {
        toast.warning('Logout Successful', {
            position: 'top-right', autoClose: 3550, hideProgressBar: true, closeOnClick: false, 
            pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
        });
    }

    const logoutSubmit = () => {
        localStorage.clear();
        notify();
    }

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;
    else
        isAuth = false;

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);
        var username = decoded.name;
    }

    return (
        <section className="navbar">
            <div className="logo">    
                <Link to="/customer/home" style={{ textDecoration: 'none', color: 'black' }}><img src={LOGO} className="ras-brand" /></Link>
            </div>
            <ul className="nav-list">         
                <>
                    <li className="current-user-info">Welcome, <strong>{username}</strong></li>
                    <li><Link to="/customer/home" className="nav-link" style={{ textDecoration: 'none', color: 'black' }}>Home</Link></li>
                    <li><Link to="/customer/cart" className="nav-link" style={{ textDecoration: 'none', color: 'black' }}>Cart</Link></li>
                    <li><Link to="/customer/orders" className="nav-link" style={{ textDecoration: 'none', color: 'black' }}>Your Orders</Link></li>
                    <li className="nav-link" onClick={logoutSubmit}><Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Logout</Link></li>
                </>         
            </ul>
        </section>
    )
}

export default Navbar;