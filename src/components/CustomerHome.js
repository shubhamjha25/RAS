import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {

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

    return(
        <>
            <Navbar />
            <div className='customer-home-container'>
                <h2>Here's What We Have For You 👇🏻</h2><br />
                
                <div className='c-menu-items-container'>
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
                                        <Link to={`/admin/items/edit/${item._id}`} className='item-btn-add-cart'>ADD TO CART</Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <br />
            </div>
        </>
    );
}

export default Home;