import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from '../logo.png';

const Card = (props) => {
    return (
        <div className='main-card'>
            <img className='main-card-img' src={props.img} alt='user-avatar' />
            <h3>{props.userType}</h3>
        </div>
    );
}

const Main = () => {
    return (
        <div className='main'>
            <img src={LOGO} className='ras-logo' />
            <h1>Restaurant Automation System (RAS)</h1>
            <br />
            <h3>(Select User Type)</h3>
            <div className='main-card-container'>
                <Link to="/customer/login"><Card userType="Customer" img="https://www.clipartmax.com/png/full/86-865575_dinner-eating-food-lunch-meal-people-restaurant-eating-dinner-icon-png.png" /></Link>
                <Link to="/staff/login"><Card userType="Staff" img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjAY8pdueayjQaeRs-d5oAGkNZGD9YtaFNyg&usqp=CAU" /></Link>
                <Link to="/admin"><Card userType="Admin" img="https://cdn-icons-png.flaticon.com/512/2206/2206368.png" /></Link>
            </div>
        </div>
    );
}

export default Main;