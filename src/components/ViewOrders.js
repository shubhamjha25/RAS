import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import AdminNavbar from './AdminNavbar';

const ViewOrders = () => {

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
            <AdminNavbar />
            <h1>Orders</h1><hr /><br />
            {
                totalOrder>0
                    ?
                        <>
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
                                            {
                                                order.status === 'pending'
                                                    ?
                                                        <td className='order-table-values'><strong style={{color: "red"}}>{order.status}</strong></td>
                                                    :
                                                        order.status === 'completed'
                                                            ?
                                                                <td className='order-table-values'><strong style={{color: "#04AA6D"}}>{order.status}</strong></td>
                                                            :
                                                                <td className='order-table-values'><strong style={{color: "#9B870C"}}>{order.status}</strong></td>
                                            }
                                        </tr>
                                    )
                                    
                                })}
                            </table>
                        </>
                    :
                        <h2>No Orders Found</h2>
            }
            
        </div>
    );
}

export default ViewOrders;