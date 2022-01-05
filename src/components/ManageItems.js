import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";

const ManageItems = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const [items, setItems] = useState([]);

    const getItems = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/items');
        console.log(res.data)
        setItems(res.data);
    }

    useEffect(() => {
        getItems();
    }, []);


    return (
        <div className='manage-items-page'>
            <h1>Menu Items</h1><br />
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
                                    <a className='item-btn-edit'>EDIT</a>
                                    <a className='item-btn-dlt'>DELETE</a>
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