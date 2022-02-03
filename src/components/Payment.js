import React from "react";
import { useNavigate } from "react-router";
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";
import LOGO from '../logo.png';
import {toast} from 'react-toastify';

toast.configure();

const Payment = (props) => {

    const navigate = useNavigate();

    const notify = (msg) => {
        toast.success(msg, {
            position: 'top-right', autoClose: 6550, hideProgressBar: true, closeOnClick: false, 
            pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
        });
    }

    const deleteCart = async id => {
        try {
            if(props.token){
                await axios.delete(`https://ras-api-server.herokuapp.com/api/carts/${id}`, {
                    headers: {token: props.token}
                });
            }
        } catch (error) {
            window.location.href = "/customer/home";
        }
    }

    const generateOrder = async () => {   
        const orderBody = {
            userId: props.userId,
            username: props.username,
            items: props.items,
            amount: props.amount
        }
        const res = await axios.post('https://ras-api-server.herokuapp.com/api/orders/', orderBody, {headers: {token: props.token}});
        localStorage.setItem('orderId', res.data._id);
        deleteCart(props.cartId);
        notify('Order Placed! 🥳')
        navigate('/customer/orderSuccess')
    }

    const onToken = (token) => {
        console.log("STRIPE TOKEN = ", token);
        generateOrder();
    }

    return (
        <>
            <div>
                <h1>MAKE PAYMENT</h1><br />
                <h2>(Select Payment Type)</h2><br />
                <button 
                    onClick={generateOrder} 
                    style={{border: 'none', width: 120, borderRadius: 5, padding: "20px", marginRight: '20px', backgroundColor: "black", color: "white", cursor: 'pointer'}}>
                        CASH
                </button>
                <StripeCheckout
                    name="RAS" description="Restaurant-Automation-System" panelLabel="Pay Now"
                    token={onToken} stripeKey={process.env.REACT_APP_STRIPE_KEY} image={LOGO}
                    >
                    <button 
                        style={{border: 'none', width: 120, borderRadius: 5, padding: "20px", backgroundColor: "black", color: "white", cursor: 'pointer'}}>
                            CARD
                    </button>
                    <br /><br />
                </StripeCheckout>
            </div>
            
           
        </>
    );
}

export default Payment;