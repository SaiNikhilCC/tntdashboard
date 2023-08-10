import '../Chats/chat.css'
import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../Variables';
import { Modal, Button } from "react-bootstrap";
import image_base_url from '../ImageVariable';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {

    useEffect(() => {
        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('collapsed');
        const chat = document.getElementById('notifications');
        chat.classList.remove('collapsed');
    }, [])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();

    const [notificationData, setNotificationData] = useState({
        title: "",
        body: "",
        type: "",
        image: ""
    })

    const [data, setData] = useState([]);
    const handleChange = (event) => {
        setNotificationData({
            ...notificationData,
            [event.target.name]: event.target.value
        })
    }

    const formSubmit = (event) => {

        const apiUrl = 'https://fcm.googleapis.com/fcm/send';
        const authorizationKey = 'key=AAAABzaZByw:APA91bFQd4ObGL3yGePHbFOf9rhWIN6HaLplsbe95mS15tlgrbPq5s7HY_8E3_PFo7jZK0PIw4kcoOKndl_ZSR5WD1eZQTJTVtsjFy91X0aN0-guXXvLedUa3jitqCzecPbN9rheGU9U';

        const headers = {
            'Authorization': `${authorizationKey}`,
            'Content-Type': 'application/json'
        };

        const payload = {
            to: `/topics/${notificationData.type}`,
            notification: {
                title: notificationData.title,
                body: notificationData.body
            },
            data: {
                type: notificationData.type,
                image: notificationData.image
            }
        };

        axios.post(apiUrl, payload, { headers })
            .then(response => {
                console.log('Notification sent successfully:', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Notification Sent Succesfully...',
                    width: '550px',
                })
                document.getElementById('title').value="";
                document.getElementById('type').value="";
                document.getElementById('image').value="";
                document.getElementById('body').value="";
            })
            .catch(error => {
                console.error('Error sending notification:', error);
            });

    }

    return (
        <>
            <Header />
            <Sidebar />

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Notifications</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Notifications</li>
                        </ol>
                    </nav>
                </div>
                <div className='ms-2 mt-5 row'>
                    <div className='col-md-5'>
                        <from className="form-horizontal">
                            <div className='row mt-1'>
                                <div className="col-lg-8">
                                    <label htmlFor="order_status" className="col-form-label">Select Notification Type</label>
                                    <select name="type" id="type" onChange={handleChange} className="form-select" required="">
                                        <option value="">-- Select --</option>
                                        <option value="stories">Stories</option>
                                        <option value="banners">Banners</option>
                                        <option value="customizers">Customizer</option>
                                        <option value="categories">Categories</option>
                                        <option value="logos">Logo</option>
                                        <option value="products">All Products</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-1'>
                                <div className="col-lg-8">
                                    <label htmlFor="title" className="col-form-label">Title</label>
                                    <input name="title" id="title" type='text' onChange={handleChange} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1'>
                                <div className="col-lg-8">
                                    <label htmlFor="body" className="col-form-label">Body</label>
                                    <input name="body" id="body" type='text' onChange={handleChange} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1'>
                                <div className="col-lg-8">
                                    <label htmlFor="image" className="col-form-label">Image URL</label>
                                    <input name="image" id="image" type='text' onChange={handleChange} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1'>
                                <div className="col-lg-8">
                                    <button type='button' className='btn btn-primary mt-3' onClick={formSubmit}>Submit</button>
                                </div>
                            </div>
                        </from>
                    </div>
                    <div className='col-md-7'>
                        <img height="600" src="../../assets/images/notification_img.jpg" />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Notifications;



