import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import AdminNavbar from './AdminNavbar';

const GetUsers = () => {

    const [totalUsers, setTotalUsers] = useState(0);
    const [usersByMonth, setUsersByMonth] = useState([]);
    const [users, setUsers] = useState([]);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const getUsers = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/users?new=true',
            {headers: {token: token}}, 
            );
        setUsers(res.data);
        setTotalUsers(res.data.length);
    }

    const getUsersByMonth = async () => {
        const res = await axios.get('https://ras-api-server.herokuapp.com/api/users/stats',
            {headers: {token: token}}, 
            );
        setUsersByMonth(res.data);
    }

    useEffect(() => {
        getUsers();
        getUsersByMonth();
    }, []);

    return (
            <div className='reports-page'>
                <AdminNavbar /><br />
                <h1>User Analytics</h1><hr />
                <br />
                <h3>Total Number of Users Registered in the System: {totalUsers}</h3>

                <br /><br />

                <h3>List of Users</h3>
                <table className='list-of-users'>
                    <tr>
                        <th className='user-table-heading'>S. No.</th>
                        <th className='user-table-heading'>Username</th>
                        <th className='user-table-heading'>User Type</th>
                        <th className='user-table-heading'>Registered On</th>
                    </tr>
                    {
                    users.map((user, key) => {
                        return (
                            <tr>
                                <td className='user-table-values'>{key+1}</td>
                                <td className='user-table-values'>{user.username}</td>
                                {
                                    user.isAdmin
                                        ?
                                            <td className='user-table-values'>ADMIN</td>
                                        :
                                            user.isStaff.state
                                                ?
                                                    user.isStaff.staffType === "chef"
                                                        ?
                                                            <td className='user-table-values'>STAFF / CHEF</td>
                                                        :
                                                            <td className='user-table-values'>STAFF / WAITER</td>
                                                : 
                                                    <td className='user-table-values'>CUSTOMER</td>
                                }
                                <td className='user-table-values'>{user.createdAt}</td>
                            </tr>
                        )
                        
                    })}
                </table>

                <br /><br />
                <h3>Monthly Data</h3>
                <h4>Number of Users Registered On The Month of - </h4>
                {
                    usersByMonth.map(user => {
                        return (
                            <p>{monthNames[user._id - 1]}: {user.total}</p>
                        )
                    })
                }
            </div>
    );
}

export default GetUsers;