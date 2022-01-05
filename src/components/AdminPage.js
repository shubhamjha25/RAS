import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminPage = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value});
        setErr('');
    }

    const adminLoginSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('https://ras-api-server.herokuapp.com/api/auth/login',{
                username: user.username,
                password: user.password
            });
            if(!res.data.isAdmin) {
                setErr("Only The Admin is Allowed To Access");
                return;
            }
            setUser({username: '', password: ''});
            localStorage.setItem('tokenStore', res.data.accessToken);
            return navigate('/admin/home');
        } catch (err) {
            console.log(err);
            setErr(err.response.data);
        }
    }

    return(
        <div className='admin-login-page-container'>
            <h1>Admin Login</h1>
            <h3>Enter The Required Credentials</h3>

            <br /><br />

            <form onSubmit={adminLoginSubmit} method="post" className = "log-form">
                <div className="group log-input">
                    <input type="text" id = "username" name = "username" placeholder = "Username" required value={user.username} onChange={onChangeInput} />
                </div>

                <br />

                <div className="group log-input">
                    <input type="password" id = "password" name = "password"  placeholder = "Password" required value={user.password} autoComplete="true" onChange={onChangeInput} />
                </div>

                <br />

                {
                    err ? <><p className='log-form-err'>{err}</p><br /></> : <br />
                }
                
                <div className="container-log-btn">
                    <button type="submit" name = "btn_submit" className="log-form-btn">
                    <span>Login as Admin</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminPage;