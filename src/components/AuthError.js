import React from 'react';
import { Link } from 'react-router-dom';

const AuthError = () => {

    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px"
    }

    return (
        <div style={style}>
            <img src="https://i.vippng.com/png/small/65-650489_png-file-svg-logged-in-icon-png.png" alt="Please Login" />
            <br /><h1>ERROR! You must be logged in to view this content.</h1><br />
            <Link to="/"><button className='log-form-btn' style={{width: "200px"}}>Go Back</button></Link>
        </div>
    );
}

export default AuthError;