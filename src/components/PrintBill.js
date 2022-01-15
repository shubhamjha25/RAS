import React, { useState, useEffect } from "react";
import axios from "axios";
import LOGO from '../logo.png';

const PrintBill = () => {

    const billId = localStorage.getItem('orderId');
    const [order, setOrder] = useState({});

    const getOrderDetails = async (billId) => {
        const res = await axios.get(`https://ras-api-server.herokuapp.com/api/orders/find/${billId}`)
        if(res.data) {
            setOrder(res.data);
        }
    }

    useEffect(() => {
        getOrderDetails(billId);
    }, [])

    return (
        <>
            <div className="bill-container">
                <div className="bill-top">
                    <div className="bill-top-left">
                        <img src={LOGO} />
                    </div>
                    <div className="bill-top-right">
                        <h1>RAS</h1>
                        <h2>137, VIP Rd, Poddar Vihar</h2>
                        <h3>Kolkata, West Bengal - 700052</h3>
                        <h3>+91 9876543210</h3>
                        <h3>admin@ras.com</h3>
                    </div>
                </div>
                <hr /><br />
                <div className="bill-title">
                    <h3>INVOICE</h3>
                </div>
                <br /><hr /><br />
                <div className="bill-info">
                    <h3>CUSTOMER NAME: {order.username}</h3>
                    <h3>Bill No. : {order._id}</h3>       
                </div>
                <br />
                <div className="bill-date-time">
                    <h3>{order.createdAt}</h3><br />
                </div>
                <br />
                <div>
                    <table className='list-of-bill'>
                        <tr>
                            <th className='xyz'>S. No</th>
                            <th className='xyz'>Particulars</th>
                            <th className='xyz'>Quantity</th>
                            <th className='xyz'>Rate</th>
                            <th className='xyz'>Amount</th>
                        </tr>
                        {
                            order.items
                                ?
                                    order.items.map((orderItem, key) => {
                                        return (
                                            <tr>
                                                <td className='saza'>{key+1}</td>
                                                <td className='saza'>{orderItem.title}</td>
                                                <td className='saza'>{orderItem.quantity}</td>
                                                <td className='saza'>{orderItem.price}.00</td>
                                                <td className='saza'>{orderItem.quantity*orderItem.price}.00</td>
                                            </tr>
                                        )
                                    })
                                :
                                    <></>
                        }
                    </table>
                </div>
                <br />
                <div>
                    <table className="bill-amount-table">
                        <tr>
                            <td><strong>Subtotal</strong></td>
                            <td>{order.amount- 50}.00</td>
                        </tr>
                        <tr>
                            <td><strong>Taxes</strong></td>
                            <td>50.00</td>
                        </tr>
                        <tr>
                            <td><strong>Total (Rs.)</strong></td>
                            <td>{order.amount}.00</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <br />
                    <h3>GST NO 27AADFH5037N319</h3>
                    <h4>E. & O.E.</h4>
                </div>
                <br /><hr /><br />
                <div className="bill-footer">
                    <h3>Thank you for your visit.</h3>
                    <h3>Have a nice day!</h3>
                </div>
            </div>
        </>
    )
}

export default PrintBill;