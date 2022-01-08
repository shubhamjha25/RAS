import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "../App.css";
import Navbar from './Navbar';

const CustomerCart = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token) {
        isAuth = true;
        var decoded = jwt_decode(token);
        var userId = decoded.id;
    }

    const [totalAmount, setTotalAmount] = useState(50);

    const [cart, setCart] = useState({});

    const getCart = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/carts/find/${userId}`,
            {headers: {token: token}}
        );
        setCart(res.data);
        
    }

    useEffect(() => { 
        getCart();
    }, []);

    return (
        <>
            <Navbar />
            <div className='customer-home-container'>
                {
                    cart
                        ?
                            <div>
                            {
                                cart.items 
                                ?
                                    <div className='cart-container'>
                                        {
                                            <div>
                                                <h1>Your Cart Contains</h1><br />
                                                <table className='list-of-cart'>
                                                    <tr>
                                                        <th className='order-table-heading'>S. No.</th>
                                                        <th className='order-table-heading'>Item</th>
                                                        <th className='order-table-heading'>Quantity</th>
                                                        <th className='order-table-heading'>Rate</th>
                                                        <th className='order-table-heading'>Amount</th>
                                                    </tr>
                                                    {
                                                    cart.items.map((cartItem, key) => {
                                                        return (
                                                            <tr>
                                                                <td className='order-table-values'>{key+1}</td>
                                                                <td className='order-table-values'><br /><img className='cart-img' src={cartItem.img} /> <br /> {cartItem.title} </td>
                                                                <td className='order-table-values'>{cartItem.quantity}</td>
                                                                <td className='order-table-values'>{cartItem.price}</td>
                                                                <td className='order-table-values'>{cartItem.price*cartItem.quantity}</td>
                                                            </tr>
                                                        )
                                                        
                                                    })}
                                                </table>  
                                                <br />
                                            </div>
                                        }
                                        <div className='order-summary'>
                                            <h1>ORDER SUMMARY</h1><hr /><br />
                                            <h3>Subtotal: {totalAmount}</h3>
                                            <h3>Other Taxes: 50</h3><br />
                                            <h3>Order Total: {totalAmount}</h3><br />
                                            <a>Checkout Now 👉🏻</a>
                                        </div>
                                    </div>
                                :
                                <h1>No Items Added in The Cart</h1>
                            }
                            </div>
                        :
                            <h1>No Items Added in The Cart</h1>
                }
            </div>
        </>
    );
}

export default CustomerCart;