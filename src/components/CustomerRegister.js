import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import {toast} from 'react-toastify';

toast.configure();

const CustomerRegister = () => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({...user, [name]:value});
        setErr('');
    }

    const notify = (msg) => {
        if(msg === 'Registration Successful') {
            toast.success(msg, {
                position: 'top-right', autoClose: 3550, hideProgressBar: true, closeOnClick: false, 
                pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
            });
        }
        else {
            toast.error(msg, {
                position: 'top-right', autoClose: 3550, hideProgressBar: true, closeOnClick: false, 
                pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
            });
        }
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('https://ras-api-server.herokuapp.com/api/auth/register',{
                username: user.username,
                email: user.email,
                password: user.password
            });
            setUser({username: '', email: '', password: ''});
            notify('Registration Successful');
            return navigate('/customer/login');
        } catch (err) {
            console.log(err);
            setErr(err.response.data);
            notify(err.response.data);
        }
    }

    return(
        <div className='admin-login-page-container'>
            <h1>Customer Registration</h1><br />

            <h3>Welcome to RAS!</h3>
            <h4>First things first. Lets create a new account and get started</h4>

            <br /><br />

            <form onSubmit={registerSubmit} method="post" className = "log-form">
                <div className="group log-input">
                    <input type="text" id = "username" name = "username" placeholder = "Username" required value={user.username} onChange={onChangeInput} />
                </div>

                <br />

                <div className="group log-input">
                    <input type="email" id = "email" name = "email"  placeholder = "E-Mail" required value={user.email} onChange={onChangeInput} />
                </div>

                <br />

                <div className="group log-input">
                    <input type="password" id = "password" name = "password"  placeholder = "Password" required value={user.password} autoComplete="true" onChange={onChangeInput} />
                </div>

                <br />

                {
                    // err ? <><p className='log-form-err'>{err}</p><br /></> : <br />
                }
                
                <div className="container-log-btn">
                    <button type="submit" name = "btn_submit" className="log-form-btn">
                    <span>REGISTER</span>
                    </button>
                </div>
            </form>
            <br />
            <h3>Already Have an Account? <br /><br /> <Link className='customer-auth-btn' to="/customer/login">LOGIN HERE</Link></h3>
        </div>
    );
}

export default CustomerRegister;