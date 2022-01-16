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

    const logoutSubmit = () => {
        localStorage.removeItem('tokenStore');
    }

    return(
        <div className='admin-main'>
            <br /><br/>
            <h1>ADMIN DASHBOARD</h1>

            <br /><br/>

            <div className='admin-cards-container'>
                <Link to="/admin/users"><AdminCard img="https://icons-for-free.com/iconfiles/png/512/users+icon-1320186917379515742.png" actionName="User Analytics" /></Link>
                <Link to="/admin/items"><AdminCard img="https://www.nicepng.com/png/detail/263-2632565_open-healthy-food-icon-png.png" actionName="Manage Items" /></Link>
                <Link to="/admin/orders"><AdminCard img="https://cdn-icons-png.flaticon.com/128/3496/3496155.png" actionName="View Orders" /></Link>
                <Link to="/admin/invoices"><AdminCard img="https://png.pngtree.com/png-vector/20191011/ourlarge/pngtree-invoice-icon-png-image_1817550.jpg" actionName="Invoices" /></Link>
                <Link to="/admin/report"><AdminCard img="https://static.thenounproject.com/png/48895-200.png" actionName="Generate Report" /></Link>
                <Link to="/admin/feedbacks"><AdminCard img="https://static.vecteezy.com/system/resources/thumbnails/002/238/477/small/feedback-icon-free-vector.jpg" actionName="View Feedbacks" /></Link>
            </div>

            <br /><br />

            <button className="admin-logout-btn" onClick={logoutSubmit}><Link to="/">CLICK TO LOGOUT</Link></button>
        </div> 
    );
}

export default AdminHome;