import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const GenerateReport = () => {

    const [orders, setOrders] = useState([]);
    const [sales, setSales] = useState([]);
    const [totalOrder, setTotalOrder] = useState(0);
    const [currentIncome, setCurrentIncome] = useState(0);
    const [prevIncome, setPrevIncome] = useState(0);
    const [percentage, setPercentage] = useState(0);

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
        const res = await axios.get('http://localhost:5000/api/orders/income',
            {headers: {token: token}},
            );
            setSales(res.data);
            console.log(res.data);
    }

    const calculateSales = () => {
        const date = new Date();
        let currentMonth = date.getMonth()+1;
        var prevMonth;
        if(currentMonth === 1)
            prevMonth = 12;
        else
            prevMonth = currentMonth - 1;

        sales.map(sale => {
            if(sale._id === currentMonth)
                setCurrentIncome(sale.total);
            if(sale._id === prevMonth)
                setPrevIncome(sale.total)
        });
    }

    const calculatePercentage = () => {
        setPercentage(20);
    }
    

    useEffect(() => {
        getOrders();
        getSales();
        calculateSales();
        calculatePercentage();
    }, []);

    return (
        <div className='reports-page'>
            <h1>Sales Report</h1><br /><br />
            <h3>Total Income Generated (Lifetime) : { totalIncome() }</h3><br />
            <h3>Total Number of Orders : {totalOrder}</h3><br />
            <h3>Income Generated in the Current Month = {currentIncome}</h3><br />
            <h3>Income Generated in the Last Month = {prevIncome}</h3><br />
            <h3>Sales Percentage = {percentage}%</h3>
        </div>
    );
}

export default GenerateReport;