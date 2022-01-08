import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "../App.css";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token) {
        isAuth = true;
    }

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);
        var id = decoded.id;
    }

    const [cart, setCart] = useState([]);

    const [items, setItems] = useState([]);

    const getItems = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/items');
        setItems(res.data);
    }

    const addToCart = async (itemId) => {
        const getCart = await axios.get(`https://ras-api-server.herokuapp.com/api/carts/find/${id}`,
            {headers: {token: token}},
            );
        setCart([...cart, getCart.data]);
        console.log('after first get-cart req:');
        console.log(cart);
        // if cart exists
        if(!cart) {
            const cartBody = {
                userId: id,
                items: [
                    {
                        itemId: itemId
                    }
                ]
            }
            const newCart = await axios.post('https://ras-api-server.herokuapp.com/api/carts/', cartBody, 
                {headers: {token: token}}
                );
            console.log('new cart created');
            setCart([...cart, newCart.data])
            console.log(newCart.data);
        }
        else {
            // construct cart body
            const cartBody = {
                userId: id,
                items: [
                    {
                        itemId: itemId,
                    }
                ]
            }
            // update request
            const updatedCart = await axios.put(`https://ras-api-server.herokuapp.com/api/carts/${cart._id}`, cartBody, 
                {headers: {token: token}},
                )
            console.log('cart updated');
            console.log(updatedCart.data);
        }
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
                                        <a onClick={() => addToCart(item._id)} className='item-btn-add-cart'>ADD TO CART</a>
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