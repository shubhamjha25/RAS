import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const GetFeedbacks = () => {

    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const getOrders = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/orders/',
            {headers: {token: token}}, 
            );
        setOrders(res.data);
        setTotalOrder(res.data.length);
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className='reports-page'>
            <h1>Orders</h1><hr /><br />
            <h3>Total Number of Orders (Lifetime): {totalOrder}</h3><br />
            <h3>List of Orders</h3><br />
            <table className='list-of-orders'>
                <tr>
                    <th className='order-table-heading'>S. No.</th>
                    <th className='order-table-heading'>Order Id</th>
                    <th className='order-table-heading'>Ordered By</th>
                    <th className='order-table-heading'>Date</th>
                    <th className='order-table-heading'>Amount</th>
                    <th className='order-table-heading'>Status</th>
                </tr>
                {
                orders.map((order, key) => {
                    return (
                        <tr>
                            <td className='order-table-values'>{key+1}</td>
                            <td className='order-table-values'>{order._id}</td>
                            <td className='order-table-values'>{order.username}</td>
                            <td className='order-table-values'>{order.createdAt}</td>
                            <td className='order-table-values'>{order.amount}</td>
                            <td className='order-table-values'>{order.status}</td>
                        </tr>
                    )
                    
                })}
            </table>
        </div>
    );
}

export default GetFeedbacks;