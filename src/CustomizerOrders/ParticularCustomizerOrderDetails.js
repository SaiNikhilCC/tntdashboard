import React from 'react';
import { Link, useMatch, useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import baseUrl from '../Variables';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import DataTable from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import image_base_url from '../ImageVariable';


const ParticularCustomizerOrderDetails = () => {

    var order_id = useParams();

    useEffect(() => {
        const allorders = document.getElementById('allorders')
        allorders.classList.add('active')

        const products = document.getElementById('orders')
        products.classList.remove('collapsed')

        const prodnavContent = document.getElementById('orders-nav')
        prodnavContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')

    }, []);

    const [getData, setData] = useState([])
    const dataFetchedRef = useRef(false);

    const fetchData = () => {
        try {
            axios.get(baseUrl + "/particular-customizer-order-details/" + order_id.id + "/").then((res) => {
                setData(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData();
    }, []);


    console.log(getData);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let navigate = useNavigate();


    const [postData, setPostData] = useState({
        order_status: ""
    })

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value
        })
    }



    const apiUrl = 'https://fcm.googleapis.com/fcm/send';
    const authorizationKey = 'key=AAAABzaZByw:APA91bFQd4ObGL3yGePHbFOf9rhWIN6HaLplsbe95mS15tlgrbPq5s7HY_8E3_PFo7jZK0PIw4kcoOKndl_ZSR5WD1eZQTJTVtsjFy91X0aN0-guXXvLedUa3jitqCzecPbN9rheGU9U';

    const headers = {
        'Authorization': `${authorizationKey}`,
        'Content-Type': 'application/json'
    };


    const formSubmit = () => {
        const formData = new FormData();

        if (postData.order_status === "2") {
            try {
                axios.post(baseUrl + "/customizer-order-confirmed/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })

                        const payload = {
                            notification: {
                                title: "Your Order Has Been Confirmed",
                                body: "Track Your Order Now!!!",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority: "high",
                            content_available: true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });
                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (postData.order_status === "3") {
            try {
                axios.post(baseUrl + "/customizer-order-shipped/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })

                        const payload = {
                            notification: {
                                title: "Your Order Has Been Shipped",
                                body: "Track Your Order Now!!!",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority: "high",
                            content_available: true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });


                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (postData.order_status === "4") {
            try {
                axios.post(baseUrl + "/customizer-order-on-the-way/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })

                        const payload = {
                            notification: {
                                title: "Your Order Is Out for Delivery",
                                body: "Track Your Order Now!!!",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority: "high",
                            content_available: true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });


                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (postData.order_status === "5") {
            try {
                axios.post(baseUrl + "/customizer-order-delivered/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })
                        const payload = {
                            notification: {
                                title: "Your Order Has Been Delivered",
                                body: "Track Your Order Now!!!",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority: "high",
                            content_available: true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });
                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
        if (postData.order_status === "100") {
            try {
                axios.post(baseUrl + "/customizer-order-returned/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })
                        const payload = {
                            notification: {
                                title: "Order Returned Succesfully",
                                body: "Track Your Order",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority : "high",
                            content_available : true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });

                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        if (postData.order_status === "200") {
            try {
                axios.post(baseUrl + "/customizer-order-cancelled/" + order_id.id + "/", formData, {
                }).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Order Status Updated Succesfully...',
                            width: '550px',
                        })

                        const payload = {
                            notification: {
                                title: "Order Cancelled",
                                body: "Your Order Has Been Cancelled",
                                sound: "default"
                            },
                            data: {
                                type: "customize-order",
                                orderId: order_id.id,
                                image: "https://cdn4.vectorstock.com/i/1000x1000/86/38/packaging-and-wrapping-parcel-neon-glow-icon-vector-46238638.jpg"
                            },
                            priority: "high",
                            content_available: true,
                            to: getData.user.firebase_id
                        };

                        axios.post(apiUrl, payload, { headers })
                            .then(response => {
                                console.log('Notification sent successfully:', response.data);
                            })
                            .catch(error => {
                                console.error('Error sending notification:', error);
                            });
                        navigate(`/all-customizer-orders`);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="card-body">
                    <div className="pagetitle">
                        <div className='row'>
                            <div className="col-lg-10">
                                <h1>All Products</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                                        <li className="breadcrumb-item"><Link to={"/all-orders"}>All Orders</Link> </li>
                                        <li className="breadcrumb-item active">Order Details</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="mt-3">
                            <div className="right-side-pro-detail border p-3 m-0">

                                <div className='row'>
                                    <div className='col-lg-4'>
                                        {getData.order_status === "1" &&
                                            <h2>Order Status : Order Placed</h2>
                                        }
                                        {getData.order_status === "2" &&
                                            <h2>Order Status : Order Confirmed</h2>
                                        }
                                        {getData.order_status === "3" &&
                                            <h2>Order Status : Order Shipped</h2>
                                        }
                                        {getData.order_status === "4" &&
                                            <h2>Order Status : On The Way</h2>
                                        }
                                        {getData.order_status === "5" &&
                                            <h2>Order Status : Delivered</h2>
                                        }
                                        {getData.order_status === "10" &&
                                            <h2>Order Status : Request for Return</h2>
                                        }
                                        {getData.order_status === "20" &&
                                            <h2>Order Status : Request for Cancel</h2>
                                        }
                                        {getData.order_status === "100" &&
                                            <h2>Order Status : Returned</h2>
                                        }
                                        {getData.order_status === "200" &&
                                            <h2>Order Status : Cancelled</h2>
                                        }
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <Button variant="primary" className="btn btn-primary d-none d-lg-block m-l-15 text-white" onClick={handleShow}>
                                                    <i className="fa fa-plus-circle"></i>Change Order Status
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className='row'>
                                    <Modal className="custom-modal" show={show} onHide={handleClose} >
                                        <Modal.Header >
                                            <Modal.Title>
                                                <h4 className="modal-title" id="myModalLabel">Add New Image</h4>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <from className="form-horizontal">
                                                <div className='row mt-1'>
                                                    <div className="col-lg-2"></div>
                                                    <div className="col-lg-8">
                                                        <label htmlFor="order_status" className="col-form-label">Select Order Status</label>
                                                        <select name="order_status" onChange={handleChange} className="form-select" required="">
                                                            <option value="">-- Select --</option>
                                                            <option value="2">Order Confirmed</option>
                                                            <option value="3">Order Shipped</option>
                                                            <option value="4">On The Way</option>
                                                            <option value="5">Delivered</option>
                                                            <option value="100">Returned</option>
                                                            <option value="200">Cancelled</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-2"></div>
                                                </div>
                                            </from>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="primary" className="btn btn-info waves-effect" onClick={formSubmit} >
                                                Save
                                            </Button>
                                            <Button variant="danger" className="btn btn-default waves-effect" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <div className="col-lg-4 pt-2 mt-4">
                                        <h1>Order Details</h1>
                                        <h5>Order ID : {getData.id}</h5>
                                        <h5>Coupon Applied : {getData.is_coupon_applied ? <span>Yes</span> : <span>No</span>}</h5>
                                        <h5>Payment Method : {getData.payment_method}</h5>
                                        <h5>Is Payment Done  : {getData.payment_done ? <span>Yes</span> : <span>No</span>}</h5>
                                        <h5>Is Delivered : {getData.is_delivered ? <span>Yes</span> : <span>No</span>}</h5>
                                    </div>
                                    <div className="col-lg-4 pt-2 mt-4">
                                        {getData.user &&
                                            <>
                                                <h1>User Details</h1>
                                                <h5>Name : {getData.user.name}</h5>
                                                <h5>Email : {getData.user.email}</h5>
                                                <h5>Phone No : {getData.user.phone}</h5>
                                                <h5>Is Verified : {getData.user.is_verified ? <span>Yes</span> : <span>No</span>}</h5>
                                            </>
                                        }
                                    </div>
                                    <div className="col-lg-4 pt-2 mt-4">
                                        {getData.address &&
                                            <>
                                                <h1>Shipping Address</h1>
                                                <h5>Name : {getData.address.full_name}</h5>
                                                <h5>H.no : {getData.address.hno}</h5>
                                                <h5>Street : {getData.address.area_street}</h5>
                                                <h5>City : {getData.address.city}</h5>
                                                <h5>State : {getData.address.state}</h5>
                                                <h5>Pincode : {getData.address.pincode}</h5>
                                            </>
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className='row mt-3'>
                                    <div className="col-lg-6 pt-2 ">
                                        <h2 className='mt-4'>Customized Product</h2>
                                        {getData.customized_product &&
                                            <div class=" me-2 pt-2" style={{ width: "30rem" }}>
                                                <img src={image_base_url + getData.customized_product.image} />
                                                <div className="col-lg-6 mt-2 ms-3">
                                                    <div className='row'>
                                                        <h5 className='col-lg-6'>Text:</h5>
                                                        <h5 className='col-lg-6'>{getData.customized_product.text}</h5>
                                                    </div>
                                                    <div className='row'>
                                                        <h5 className='col-lg-6'>Quantity:</h5>
                                                        <h5 className='col-lg-6'>{getData.customized_product.quantity}</h5>
                                                    </div>
                                                    <div className='row'>
                                                        <h5 className='col-lg-6'>Size:</h5>
                                                        <h5 className='col-lg-6'>{getData.customized_product.size}</h5>
                                                    </div>
                                                    <div className='row'>
                                                        <h5 className='col-lg-6'>Font:</h5>
                                                        <h5 className='col-lg-6'>{getData.customized_product.font.font_name}</h5>
                                                    </div>
                                                    <div className='row'>
                                                        <h5 className='col-lg-6'>Color:</h5>
                                                        <h5 className='col-lg-6'>{getData.customized_product.color.color_name}</h5>
                                                    </div>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                    <div className="col-lg-6 pt-2 mt-4">
                                        {getData.customized_product &&
                                            <>
                                                <h2>Instructions By Customer</h2>
                                                <h5 className='mt-3'>{getData.customized_product.description_by_user} </h5>

                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ParticularCustomizerOrderDetails













