import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AddMenuItems = () => {

    var isAuth = false;
    var token = localStorage.getItem('tokenStore');
    if(token)
        isAuth = true;

    const [item, setItem] = useState({
        title: '',
        desc: '',
        img: '',
        price: 0,
    });

    const navigate = useNavigate();

    const onChangeInput = e => {
        const {name, value} = e.target;
        setItem({...item, [name]:value});
    }

    const addItem = async e => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tokenStore');
            if(token){
                const {title, desc, img, price} = item;
                const newItem = {
                    title, desc, img, price
                }

                await axios.post('https://ras-api-server.herokuapp.com/api/items', newItem, {
                    headers: {token: token}
                });
                
                return navigate('/admin/items');
            }
        } catch (err) {
            console.log(err.response.data);
            alert(err.response.data);
            window.location.href = "../admin/home";
        }
    }

    return (
        <div className='manage-items-page'>
            <AdminNavbar />
            <h1>Add Menu Item</h1><br/>

            <form onSubmit={addItem}>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="title">Item Name</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="title" name="title" placeholder="Item Name" required value={item.title} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="author">Short Description</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="desc" name="desc" placeholder="Item Description Here ..." required value={item.desc} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="img">Image URL</label>
                    </div>
                    <div className="col-75">
                        <input type="text" id="img" name="img" placeholder="Link of a relatable image for your item" required value={item.img} onChange={onChangeInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="content">Price</label>
                    </div>
                    <div className="col-75">
                    <input type="text" id="price" name="price" placeholder="The Price of Your Dish" required value={item.price} onChange={onChangeInput} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <button className="item-post" type="submit">ADD</button>
                </div>
            </form>
        </div>
    )
}

export default AddMenuItems;