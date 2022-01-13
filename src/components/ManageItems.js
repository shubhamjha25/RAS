import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const ManageItems = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const [items, setItems] = useState([]);

    const getItems = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/items');
        setItems(res.data);
    }

    useEffect(() => {
        getItems();
    }, []);

    const deleteItem = async (id) =>{
        try {
            if(token){
                await axios.delete(`https://ras-api-server.herokuapp.com/api/items/${id}`, {
                    headers: {token: token}
                });
                getItems();
            }
        } catch (error) {
            window.location.href = "/admin";
        }
    }


    return (
        <div className='manage-items-page'>
            <AdminNavbar />
            <h1>Menu Items</h1><br />
            <Link to="/admin/items/add" className='add-item-link'>Click Here to Add an Item</Link><br /><br />
            <h3>Here are the available items</h3><br />
            <div className='menu-items-container'>
                {
                    items.map( (item) => {
                        return (
                            <div className='item-card'>
                                <img className='item-card-img' src={item.img} alt="food-avatar" />
                                <h3>{item.title}</h3>
                                <h4>{item.desc}</h4>
                                <br />
                                <h4>INR <strong>{item.price}</strong></h4><br />
                                <div className='item-btn-container'>
                                    <Link to={`/admin/items/edit/${item._id}`} className='item-btn-edit'>EDIT</Link>
                                    <a className='item-btn-dlt' onClick={() => deleteItem(item._id)}>DELETE</a>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>

    );
}

export default ManageItems;