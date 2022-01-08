import React from 'react';
import Navbar from './Navbar';
import '../App.css';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <>
            <Navbar />
            <div className='customer-home-container'>
                <h1>ORDER SUCCESS!</h1>
                <h2>Your Order is Being Prepared ...</h2>
                <p>(Please Press The Button Below</p>
                <br />
                <Link to="/customer/orders"><button className='log-form-btn' style={{width: '20%'}}>PROCEED</button></Link>
            </div>
        </>
    );
}

export default OrderSuccess;