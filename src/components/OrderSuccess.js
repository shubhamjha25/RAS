import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {

    const [ orderSummary, setOrderSummary ] = useState({});

    const orderId = localStorage.getItem('orderId')

    const getOrderSummary = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/orders/find/${orderId}`);
        setOrderSummary(res.data);
    }

    useEffect(() => {
        getOrderSummary();
    }, [])

    return (
        <>
            <Navbar />
            <div className='customer-home-container'>
                {
                    orderId 
                        ?
                            <>
                            <h1>THANKS! Order #{orderId}</h1>
                            <h2>Your Order is Being Prepared ...</h2>
                            <br />
                            <h2>ORDER DETAILS</h2><br />
                            <div className='order-success-container'> 
                                <div>
                                    <table className='list-of-cart'>
                                        <tr>
                                            <th className='order-table-heading'>S. No</th>
                                            <th className='order-table-heading'>Item Details</th>
                                            <th className='order-table-heading'>Quantity</th>
                                            <th className='order-table-heading'>Rate</th>
                                            <th className='order-table-heading'>Amount</th>
                                        </tr>
                                        {
                                            orderSummary.items
                                                ?
                                                    orderSummary.items.map((orderItem, key) => {
                                                        return (
                                                            <tr>
                                                                <td className='order-table-values'>{key+1}</td>
                                                                <td className='order-table-values'>{orderItem.title}</td>
                                                                <td className='order-table-values'>{orderItem.quantity}</td>
                                                                <td className='order-table-values'>{orderItem.price}</td>
                                                                <td className='order-table-values'>{orderItem.quantity*orderItem.price}</td>
                                                            </tr>
                                                        )
                                                    })
                                                :
                                                    <></>
                                        }
                                    </table>
                                </div>
                                <div>
                                    <h2>ORDER SUMMARY</h2><hr /><br />
                                    <h3>Subtotal: {orderSummary.amount - 50}</h3>
                                    <h3>Other Taxes: 50</h3><br />
                                    <h3>Order Total: INR {orderSummary.amount}</h3><br /><br />
                                </div>
                            </div>
                            <Link to="/customer/orders"><button onClick={() => localStorage.removeItem('orderId')} className='log-form-btn' style={{width: '20%'}}>PROCEED</button></Link>
                            </>
                        :
                            <h2>Please Place An Order</h2>
                }
            </div>
        </>
    );
}

export default OrderSuccess;