import React from 'react';
import { Link } from 'react-router-dom';

const StaffHome = () => {
    
    const logoutSubmit = () => {
        localStorage.clear();
    }
    
    return (
        <>
            <h1>Staff Home Page</h1>
            <Link to="/"><button onClick={logoutSubmit} style={{padding: "10px 25px", marginBottom: "20px", fontSize: "1.25rem", fontWeight: "bold", borderRadius: "25px", cursor: "pointer"}}>CLICK TO LOGOUT</button></Link>
        </>
    )
}

export default StaffHome;