import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "../App.css";
import Navbar from './Navbar';
import {toast} from 'react-toastify';

toast.configure();

const Home = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token) {
        isAuth = true;
    }

    if(isAuth == true) {
        var decoded = jwt_decode(token);
        var id = decoded.id;
    }

    const [cart, setCart] = useState({});
    const [cartUpdated, setCartUpdated] = useState(false);
    const [items, setItems] = useState([]);
    
    const notify = (msg) => {
        toast.success(msg, {
            position: 'top-right', autoClose: 2500, hideProgressBar: true, closeOnClick: false, 
            pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
        });
    }

    const getItems = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/items');
        setItems(res.data);
    }

    const addToCart = async (item) => {
        const getCart = await axios.get(`https://ras-api-server.herokuapp.com/api/carts/find/${id}`,
            {headers: {token: token}},
            );
        setCart(getCart.data);
        // if cart is initially empty, create a new cart
        if(!getCart.data) {
            const cartBody = {
                userId: id,
                items: [
                    {
                        itemId: item._id,
                        title: item.title,
                        img: item.img,
                        quantity: 1,
                        price: item.price
                    }
                ]
            }
            const newCart = await axios.post('https://ras-api-server.herokuapp.com/api/carts/', cartBody, 
                {headers: {token: token}}
                );
            console.log('new cart created');
            notify('Item Added To Cart');
            return setCart(newCart.data);
        }
        // if cart exists, check for the item in the cart
        if(getCart.data) 
        {
            setCart(getCart.data)
            for(let i=0; i<getCart.data.items.length; i++) {
                // if item found, increase the quantity by 1
                if(item._id === getCart.data.items[i].itemId) {
                    getCart.data.items[i].quantity += 1;
                    const updatedCart = await axios.put(`https://ras-api-server.herokuapp.com/api/carts/${getCart.data._id}`, getCart.data, 
                    {headers: {token: token}},
                    )
                    console.log('cart updated');
                    setCart(updatedCart.data)
                    notify('Item Quantity Updated');
                    return setCartUpdated(true)
                }
            }
            // if item not found, add it to the cart
            if(!cartUpdated)
            {
                const itemObject = {
                        itemId: item._id,
                        title: item.title,
                        img: item.img,
                        quantity: 1,
                        price: item.price
                }
                getCart.data.items.push(itemObject);
                const updatedCart = await axios.put(`https://ras-api-server.herokuapp.com/api/carts/${getCart.data._id}`, getCart.data, 
                    {headers: {token: token}},
                    )
                console.log('cart updated');
                setCart(updatedCart.data)
                notify('Item Added To Cart');
                return setCartUpdated(true)
            }    
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
                                        <a onClick={() => addToCart(item)} className='item-btn-add-cart'>ADD TO CART</a>
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