import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import AdminNavbar from './AdminNavbar';

const GenerateReport = () => {

    const [orders, setOrders] = useState([]);
    const [sales, setSales] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [currentIncome, setCurrentIncome] = useState(0);
    const [prevIncome, setPrevIncome] = useState(0);

    const date = new Date();
    var currentMonth = date.getMonth()+1;
    var prevMonth;
    if(currentMonth === 1)
        prevMonth = 12;
    else
        prevMonth = currentMonth - 1;

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

    const totalIncome = () => {
        var sum = 0;
        orders.map(order => {
            sum = sum + order.amount;
        });
        return sum;
    }

    const getSales = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/orders/income',
            {headers: {token: token}}, 
            );
        sales.push(res.data);
        console.log(currentMonth, ' & ', prevMonth)
        console.log(sales)
        console.log(sales.length);
        for(let i=0; i<sales[0].length; i++) {
            if(sales[0][i]._id === currentMonth) {
                setCurrentIncome((currentIncome) => currentIncome+sales[0][i].total);
            }
            if(sales[0][i]._id === prevMonth) {
                setPrevIncome((prevIncome) => prevIncome+sales[0][i].total);
            }
        }
        console.log(currentIncome, ' & ', prevIncome)       
    }
    
    useEffect(() => {
        getOrders();
        getSales();
    }, []);

    return (
        <div className='reports-page'>
            <AdminNavbar />
            <h1>Sales Report</h1><hr /><br /><br />
            <h3>Total Income Generated (Lifetime) : INR { totalIncome() }</h3><br />
            <h3>Total Number of Orders : {totalOrder}</h3><br />
            <h3>Income Generated in the Current Month = INR  { currentIncome }</h3><br />
            <h3>Income Generated in the Last Month = INR { prevIncome }</h3><br />
            {
                parseFloat(((currentIncome-prevIncome)/prevIncome)*100).toFixed(2)>0 
                    ?
                        <p className='positive-sales'><strong>+ {parseFloat(((currentIncome-prevIncome)/prevIncome)*100).toFixed(2)} %&emsp;Sales Growth</strong></p> 
                    :
                        <p className='negative-sales'><strong>{parseFloat(((currentIncome-prevIncome)/prevIncome)*100).toFixed(2)} %&emsp;Sales Decline</strong></p>
            }
        </div>
    );
}

export default GenerateReport;