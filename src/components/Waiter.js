import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Waiter = () => {

    const [orders, setOrders] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const logoutSubmit = () => {
        localStorage.clear();
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
                <h1>Waiter Dashboard</h1><br />
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
                                                    order.status === "prepared"
                                                        ?
                                                            <td className='order-table-values'><button className='mark-as-completed-btn'>MARK AS COMPLETED</button></td>
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

export default Waiter;