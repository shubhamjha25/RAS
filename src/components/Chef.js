import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

toast.configure()

const Chef = () => {

    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');

    const logoutSubmit = () => {
        localStorage.clear();
    }

    const notify = (msg) => {
        toast.success(msg, {
            position: 'top-right', autoClose: 6550, hideProgressBar: true, closeOnClick: false, 
            pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
        });
    }

    const markAsPrepared = async (orderId) => {
        const res = await axios.put(`https://ras-api-server.herokuapp.com/api/orders/statusUpdate/${orderId}`, 
            { "status": "prepared" },
            {headers: {token: token}}
        );
        
        notify('Order Marked as Prepared!');
        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    const getOrders = async () => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/orders/getOrders`,
            {headers: {token: token}}, 
            );
        setOrders(res.data);
        if(res.data !== null) {
            setTotalOrder(res.data.length);
        }
    }
    
    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <div className="customer-home-container">
                <h1>Chef Dashboard</h1><br />
                <Link to="/"><button onClick={logoutSubmit} style={{padding: "10px 25px", marginBottom: "20px", fontSize: "1.25rem", fontWeight: "bold", borderRadius: "25px", cursor: "pointer"}}>CLICK TO LOGOUT</button></Link>
                <br /><br />
                {
                    totalOrder
                        ?
                            <>
                                <table className='order-table'>
                                    <tr>
                                        <th className='order-table-heading'>S. No.</th>
                                        <th className='order-table-heading'>Order Id</th>
                                        <th className='order-table-heading'>Order Details</th>
                                        <th className='order-table-heading'>Ordered By</th>
                                        <th className='order-table-heading'>Date</th>
                                        <th className='order-table-heading'>Amount (INR)</th>
                                        <th className='order-table-heading'>Status</th>
                                        <th className='order-table-heading'>Action</th>
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
                                                <td className='order-table-values'>{order.username}</td>
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
                                                {
                                                    order.status === "pending"
                                                        ?
                                                            <td className='order-table-values'><button onClick={() => markAsPrepared(order._id)} className='mark-as-prepared-btn'>MARK AS PREPARED</button></td>
                                                        :
                                                            <td className='order-table-values'><strong>N/A</strong></td>
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
        </>
    )
}

export default Chef;