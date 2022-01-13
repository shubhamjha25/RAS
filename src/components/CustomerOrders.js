import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import SendFeedback from './SendFeedback';

const CustomerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    if(isAuth == true)
    {
        var decoded = jwt_decode(token);
        var id = decoded.id;
        var username = decoded.name;
    }
    

    const getOrders = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/orders/userOrder/${id}`,
            {headers: {token: token}}, 
            );
        setOrders(res.data);
        console.log(res.data)
        if(res.data !== null) {
            setTotalOrder(res.data.length);
        }
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="customer-home-container">
                <h1>Your Orders</h1>
                <br />
                {
                    totalOrder
                        ?
                            <>
                                <table className='order-table'>
                                    <tr>
                                        <th className='order-table-heading'>S. No.</th>
                                        <th className='order-table-heading'>Order Id</th>
                                        <th className='order-table-heading'>Order Details</th>
                                        <th className='order-table-heading'>Date</th>
                                        <th className='order-table-heading'>Amount (INR)</th>
                                        <th className='order-table-heading'>Status</th>
                                    </tr>
                                    {
                                    orders.map((order, key) => {
                                        return (
                                            <tr>
                                                <td className='order-table-values'>{key+1}</td>
                                                <td className='order-table-values'>{order._id}</td>
                                                <td className='order-table-values'>
                                                    {
                                                        order.items.map(orderItem => {
                                                            return (
                                                                <p>{orderItem.quantity} {orderItem.title}</p>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className='order-table-values'>{order.createdAt}</td>
                                                <td className='order-table-values'>{order.amount}</td>
                                                {
                                                    order.status === 'pending'
                                                        ?
                                                            <td className='order-table-values'><strong className='pending-btn'>{order.status}</strong></td>
                                                        :
                                                            order.status === 'completed'
                                                                ?
                                                                    <td className='order-table-values'><strong className='completed-btn'>{order.status}</strong></td>
                                                                :
                                                                    <td className='order-table-values'><strong className='prepared-btn'>{order.status}</strong></td>
                                                }
                                            </tr>
                                        )
                                        
                                    })}
                                </table>
                                <SendFeedback token={token} userId={id} username={username} />
                            </>
                        :
                            <h2>No Orders Found</h2>
                }
            </div>
        </>
    );
}

export default CustomerOrders;