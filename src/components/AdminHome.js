import React from 'react';
import jwt_decode from "jwt-decode";
import "../App.css";
import { Link } from 'react-router-dom';

const AdminCard = (props) => {
    return (
        <div className='admin-card'>
            <img className='admin-card-img' src={props.img} alt='card-action' />
            <h3>{props.actionName}</h3>
        </div>
    );
}

const AdminHome = () => {
    
    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);
        var username = decoded.name;
    }

    const logoutSubmit = () => {
        localStorage.removeItem('tokenStore');
    }

    return(
        <div className='main'>
            <br /><br/>
            <h1>Admin Home Page</h1>
            <h2>Welcome, {username}</h2>

            <br /><br/>

            <div className='admin-cards-container'>
                <AdminCard img="https://icons-for-free.com/iconfiles/png/512/users+icon-1320186917379515742.png" actionName="Get Users" />
                <AdminCard img="https://www.nicepng.com/png/detail/263-2632565_open-healthy-food-icon-png.png" actionName="Manage Items" />
                <AdminCard img="https://cdn-icons-png.flaticon.com/128/3496/3496155.png" actionName="View Orders" />
                <AdminCard img="https://www.arbox.com/wp-content/uploads/2018/11/report-icon.png" actionName="Generate Report" />
            </div>

            <br /><br />

            <button className="admin-logout-btn" onClick={logoutSubmit}><Link to="/">Click to Logout</Link></button>
        </div>
            
    );
}

export default AdminHome;