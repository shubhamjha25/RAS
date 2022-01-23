import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import "../App.css";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Payment from './Payment';

const CustomerCart = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token) {
        isAuth = true;
        var decoded = jwt_decode(token);
        var userId = decoded.id;
        var username = decoded.name
    }

    const [genPayment, setGenPayment] = useState(false);
    const PROCEED = 'Proceed To Checkout 👉🏻';
    const BACK = 'Go Back';
    const navigate = useNavigate();

    const [totalAmount, setTotalAmount] = useState(50);

    const [cart, setCart] = useState({});

    const getCart = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/carts/find/${userId}`,
            {headers: {token: token}}
        );
        setCart(res.data);
        if(res.data) {
            var amt = 0;
            for(let i=0; i<res.data.items.length; i++) {
                amt += res.data.items[i].price*res.data.items[i].quantity;
            }
            setTotalAmount(totalAmount => totalAmount + amt);
        }
    }

    const deleteCart = async id => {
        try {
            if(token){
                await axios.delete(`https://ras-api-server.herokuapp.com/api/carts/${id}`, {
                    headers: {token: token}
                });
            }
        } catch (error) {
            window.location.href = "../customer/home";
        }
    }

    const handlePlusClick = async (itemId) => {
        for(let i=0; i<cart.items.length; i++) {
            if(itemId === cart.items[i].itemId) {
                cart.items[i].quantity += 1;
                break;
            }
        }
        const updatedCart = await axios.put(`https://ras-api-server.herokuapp.com/api/carts/${cart._id}`, cart, 
            {headers: {token: token}},
            )
        console.log('cart updated');
        setCart(updatedCart.data)
        return window.location.assign('../customer/cart');  
    }

    const handleMinusClick = async (itemId) => {
        for(let i=0; i<cart.items.length; i++) {
            if(itemId === cart.items[i].itemId) {
                cart.items[i].quantity -= 1;
                if(cart.items[i].quantity === 0) {
                    cart.items.splice(i, 1);
                }
                break;
            }
        }
        const updatedCart = await axios.put(`https://ras-api-server.herokuapp.com/api/carts/${cart._id}`, cart, 
            {headers: {token: token}},
            )
        if(updatedCart.data.items.length === 0) {
            deleteCart(updatedCart.data._id);
            console.log('Updated Cart Deleted');
        }
        console.log('cart updated');
        setCart(updatedCart.data)
        return window.location.assign('../customer/cart');
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
                                                                <td className='order-table-values'>
                                                                    {cartItem.quantity} <br /><br />
                                                                    <div className='cart-action-btn-container'>
                                                                        <button className='cart-action-btn' onClick={() => handleMinusClick(cartItem.itemId)}>-</button>
                                                                        <button className='cart-action-btn' onClick={() => handlePlusClick(cartItem.itemId)}>+</button>
                                                                    </div>
                                                                </td>
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
                                            <h3>Subtotal: {totalAmount - 50}</h3>
                                            <h3>Other Taxes: 50</h3><br />
                                            <h3>Order Total: INR {totalAmount}</h3><br /><br />
                                            <a onClick={() => setGenPayment(!genPayment)} className='checkout-btn'>
                                                {
                                                    genPayment ? BACK : PROCEED 
                                                }
                                            </a>
                                        </div>
                                    </div>
                                :
                                <h1>No Items Added in The Cart</h1>
                            }
                            </div>
                        :
                            <h1>No Items Added in The Cart</h1>
                }
                {
                    genPayment
                        ?
                            <Payment token={token} userId={userId} username={username} cartId={cart._id} items={cart.items} amount={totalAmount} />
                        :
                            <></>
                }
            </div>
        </>
    );
}

export default CustomerCart;