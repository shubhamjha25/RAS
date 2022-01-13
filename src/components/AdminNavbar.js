import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function AdminNavbar() {

    return (
            <Link to="/admin/home"><button style={{padding: "10px 25px", marginBottom: "20px", fontSize: "1.25rem", fontWeight: "bold", borderRadius: "25px", cursor: "pointer"}}>BACK TO DASHBOARD</button></Link>
    )
}

export default AdminNavbar;