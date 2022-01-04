import React from 'react';
import { Link } from 'react-router-dom';

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
            <br /><br />
            <h1>Restaurant Automation System (RAS)</h1>
            <br />
            <h3>(Select User Type)</h3>
            <br /> <br />
            <div className='main-card-container'>
                <Link to="/customer"><Card userType="Customer" img="https://cdn3.iconfinder.com/data/icons/business-finance-line-5/32/client-2-512.png" /></Link>
                <Link to="/admin"><Card userType="Admin" img="https://cdn2.iconfinder.com/data/icons/mobile-banking-ver-1a/100/1-11-512.png" /></Link>
            </div>
        </div>
    );
}

export default Main;