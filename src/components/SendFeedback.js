import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {toast} from 'react-toastify';

toast.configure()

const SendFeedback = (props) => {

    const navigate = useNavigate();

    const [feedbackBody, setFeedbackBody] = useState({
        userId: props.userId,
        username: props.username,
        message: '',
        rating: ''
    });

    const onChangeInput = e => {
        const { name, value } = e.target;
        setFeedbackBody({...feedbackBody, [name]:value});
    }

    const notify = () => {
        toast.success('Feedback Sent', {
            position: 'bottom-right', autoClose: 5550, hideProgressBar: true, closeOnClick: false, 
            pauseOnHover: true, draggable: false, progress: undefined, theme: 'colored'
        });
    }

    const feedbackSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('https://ras-api-server.herokuapp.com/api/feedbacks/new', feedbackBody, 
                {headers: {token: props.token}}
                );
            setFeedbackBody({message: '', rating: ''});
            notify();
            return navigate('/customer/orders')
        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    return (
        <>
            <div>
                <br /><br /><hr /><br />
                <h1>HOW WAS YOUR EXPERIENCE WITH US?</h1>
                <h2>Help Us Know How We Can Improve!</h2><br />

                <form onSubmit={feedbackSubmit} method="post" className = "feedback-form">
                    <div className="group log-input">
                        <textarea id="message" name="message" placeholder="Your Message ..." style={{width: "325px", height: "100px" }} required value={feedbackBody.message} onChange={onChangeInput}></textarea>
                    </div>

                    <br />

                    <div className="group log-input">
                        <input type="number" id = "rating" name = "rating"  placeholder = "Rate Us (Out of 5)" min={1} max={5} required value={feedbackBody.rating} onChange={onChangeInput} />
                    </div>

                    <br />

                    <div className="container-log-btn">
                        <button type="submit" name = "btn_submit" className="log-form-btn">
                        <strong>SEND FEEDBACK</strong>
                        </button>
                    </div>
                </form>

            </div>
            
           
        </>
    );
}

export default SendFeedback;