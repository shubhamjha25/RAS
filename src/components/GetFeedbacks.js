import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import AdminNavbar from './AdminNavbar';

const GetFeedbacks = () => {

    const [feedbacks, setFeedbacks] = useState([]);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const getFeedbacks = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/feedbacks/all/',
            {headers: {token: token}}, 
            );
        setFeedbacks(res.data);
        setTotalFeedbacks(res.data.length);
        // Average Rating Calculation
        var sum = 0;
        for(let i=0; i<res.data.length; i++) {
            sum += res.data[i].rating;
        }
        var avg = sum/res.data.length;
        setAverageRating(parseFloat(avg).toFixed(2));
    }

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <div className='reports-page'>
            <AdminNavbar />
            <h1>User Feedbacks</h1><hr /><br />
            
            {
                feedbacks.length !== 0 
                    ?
                        <>
                            <h3>Total Number of Feedbacks Recieved : {totalFeedbacks}</h3><br />
                            <h3>List of Feedbacks</h3><br />
                        
                            <table className='list-of-orders'>
                                <tr>
                                    <th className='order-table-heading'>S. No.</th>
                                    <th className='order-table-heading'>Feedback ID</th>
                                    <th className='order-table-heading'>Given By</th>
                                    <th className='order-table-heading'>Feedback Message</th>
                                    <th className='order-table-heading'>Rating <br /> (Out of 5)</th>
                                </tr>
                                {
                                feedbacks.map((feedback, key) => {
                                    return (
                                        <tr>
                                            <td className='order-table-values'>{key+1}</td>
                                            <td className='order-table-values'>{feedback._id}</td>
                                            <td className='order-table-values'>{feedback.username}</td>
                                            <td className='order-table-values'>{feedback.message}</td>
                                            <td className='order-table-values'>{feedback.rating}</td>
                                        </tr>
                                    )
                                    
                                })}
                            </table>
                            <br />
                            <h3>Avergage Rating: {averageRating}</h3>
                        </>
                    :
                        <h2>No Feedbacks Recieved</h2>

            }
        </div>
    );
}

export default GetFeedbacks;