import React from "react";
import { useNavigate } from "react-router";
import StripeCheckout from 'react-stripe-checkout';
import Navbar from "./Navbar";

const Payment = () => {

    const navigate = useNavigate();

    const onToken = (token) => {
        console.log("STRIPE TOKEN = ", token);
        navigate('../customer/orders');
    }

    const handleCashClick = () => {
        return (
            navigate('../customer/orders')
        );
    }

    return (
        <>
            <Navbar />
            <div className="customer-home-container">
                <h1>MAKE PAYMENT</h1><br />
                <h2>(Select Payment Type)</h2><br />
                <button 
                    onClick={handleCashClick} 
                    style={{border: 'none', width: 120, borderRadius: 5, padding: "20px", marginRight: '20px', backgroundColor: "black", color: "white", cursor: 'pointer'}}>
                        CASH
                </button>
                <StripeCheckout
                    name="RAS" description="Restaurant-Automation-System" panelLabel="Pay Now"
                    token={onToken} stripeKey={process.env.REACT_APP_STRIPE_KEY} image="https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_RAS_2016.png"
                    >
                    <button 
                        style={{border: 'none', width: 120, borderRadius: 5, padding: "20px", backgroundColor: "black", color: "white", cursor: 'pointer'}}>
                            CARD
                    </button>
                </StripeCheckout>
            </div>
            
           
        </>
    );
}

export default Payment;