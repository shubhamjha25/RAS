import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    
    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px"
    }

    const clearLocalStorage = () => {
        return localStorage.clear();
    }

    return (
        <div style={style}>
            <img src="https://cdn4.iconfinder.com/data/icons/thin-gui-elements-2/24/thin-1550_website_error_missing_404-512.png" style={{width: "25%"}} alt="Please Login" /><br />
            <h1>SORRY! We are unable to find the page you are looking for. ☹️</h1><br />
            <Link to="/"><button onClick={() => clearLocalStorage()} className='log-form-btn' style={{width: "200px"}}>Go Back</button></Link>
        </div>
    );
}

export default Page404;