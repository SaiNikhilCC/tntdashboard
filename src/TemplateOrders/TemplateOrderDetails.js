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


const TemplateOrderDetails = () => {

    var order_id = useParams();

    useEffect(() => {
        const allorders = document.getElementById('alltemplateorders')
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
            axios.get(baseUrl + "/particular-logo-order-details/" + order_id.id + "/").then((res) => {
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


    let navigate = useNavigate();


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
                                    <div className="col-lg-4 pt-2 mt-4">
                                        <h1>Order Details</h1>
                                        <h5>Order ID : {getData.id}</h5>
                                        <h5>Text : {getData.text}</h5>
                                        <h5>E-mail : {getData.email}</h5>
                                        {/* <h5>Is Delivered : {getData.is_delivered ? <span>Yes</span> : <span>No</span>}</h5> */}
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

                                </div>
                                <hr />
                                <div className='row mt-3'>
                                    <div className="col-lg-6 pt-2 ">
                                        <h2 className='mt-4'>Template</h2>
                                        {getData.template_product &&
                                            <div class=" me-2 mt-2 pt-2" style={{ width: "30rem" }}>
                                                <img src={image_base_url + getData.template_product.template_image} />
                                                <div className="col-lg-6 mt-2 ms-3">
                                                    <div className='row'>
                                                        <h5 className='col-lg-4'>Name:</h5>
                                                        <h5 className='col-lg-8'>{getData.template_product.title}</h5>
                                                    </div>
                                                </div>
                                            </div>
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

export default TemplateOrderDetails













