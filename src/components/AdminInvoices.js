import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminInvoices = () => {

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

    const generateInvoice = async (orderId) => {
        localStorage.setItem('orderId', orderId);
        window.location.assign(`../admin/invoices/${orderId}`);
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <div className='reports-page'>
                <AdminNavbar />
                <h1>Invoices</h1><hr /><br />
                {
                    totalOrder>0
                        ?
                            <>
                                <table className='list-of-orders'>
                                    <tr>
                                        <th className='order-table-heading'>S. No.</th>
                                        <th className='order-table-heading'>Order Id</th>
                                        <th className='order-table-heading'>Ordered By</th>
                                        <th className='order-table-heading'>Amount</th>
                                        <th className='order-table-heading'>Status</th>
                                        <th className='order-table-heading'>Invoice</th>
                                    </tr>
                                    {
                                    orders.map((order, key) => {
                                        return (
                                            order.status === "completed"
                                                ?
                                                        <tr>
                                                        <td className='order-table-values'>{key+1}</td>
                                                        <td className='order-table-values'>{order._id}</td>
                                                        <td className='order-table-values'>{order.username}</td>
                                                        <td className='order-table-values'>{order.amount}</td>
                                                        <td className='order-table-values'><strong style={{color: "#04AA6D"}}>{order.status}</strong></td>
                                                        <td className='order-table-values'><button onClick={() => generateInvoice(order._id)} style={{margin: "10px 0",padding: "10px 12px", color: "blue"}} className='download-bill-btn'>GENERATE INVOICE</button></td>
                                                    </tr>
                                                :
                                                    <></>
                                        )
                                        
                                    })}
                                </table>
                            </>
                        :
                            <h2>No Invoices Found</h2>
                }
                </div>
        </>
    );
}

export default AdminInvoices;