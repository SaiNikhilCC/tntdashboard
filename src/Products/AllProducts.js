import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import baseUrl from '../Variables';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import image_base_url from '../ImageVariable';


const AllProducts = () => {




    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const allorders = document.getElementById('allproducts');
        allorders.classList.add('active');

        const products = document.getElementById('products');
        products.classList.remove('collapsed');

        const prodnavContent = document.getElementById('components-nav');
        prodnavContent.classList.add('show');

        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('collapsed');
        try {
            axios.get(baseUrl + "/all-category/").then((res) => {
                setCategories(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const [getData, setData] = useState([]);
    const dataFetchedRef = useRef(false);
    const fetchData = () => {
        try {
            axios.get(baseUrl + "/all-products/").then((res) => {
                setData(res.data.data);
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

    const [showAllPosts, setShowAllPosts] = useState(true)

    // ================================= Handling Category Posts =================================================================================

    const [showCategoryPosts, setShowCategoryPosts] = useState(false);

    const handleCategoryPosts = (cat_id) => {
        setShowAllPosts(false);
        setShowCategoryPosts(true);
        try {
            axios.get(baseUrl + "/particular-category-products/" + cat_id + "/").then((res) => {
                setData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowAllProductsTab = () => {
        setShowAllPosts(true);
        setShowCategoryPosts(false);
        try {
            axios.get(baseUrl + "/all-products/").then((res) => {
                setData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }
    // ======================================  Particular Product Details =========================================================================

    const handleDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(baseUrl + "/delete-product/" + id + "/").then((res) => {
                if (res.data.status == 200) {
                    try {
                        axios.get(baseUrl + "/all-products/").then((res) => {
                            setData(res.data.data);
                        });
                    } catch (error) {
                        console.log(error);
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Deleted Succesfully',
                        toast: true,
                        timer: 3000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: true,
                    })
                }
            })
          }
        });
      };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="card-body">
                    <div className="pagetitle">
                        <h1>All Products</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                                <li className="breadcrumb-item active">All Products</li>
                            </ol>
                        </nav>
                    </div>
                    {/* <!-- Default Tabs --> */}
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button onClick={handleShowAllProductsTab} className="nav-link active text-dark" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All</button>
                        </li>
                        {categories && categories.map((cat, index) =>
                            <li className="nav-item" role="presentation">
                                <button onClick={(e) => { handleCategoryPosts(cat.id) }} key={index} className="nav-link text-dark" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">{cat.category}</button>
                            </li>
                        )}
                    </ul>
                    <div className="tab-content mt-2" id="myTabContent">
                        {showAllPosts &&
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <section className="section dashboard">
                                    <div className="row align-items-top">
                                        <div className="row">
                                            {getData && getData.slice(0).reverse().map((d, index) =>
                                                <div className="card d-flex col-md-4 col-lg-3 p-2 col-sm-6" key={index}>
                                                    <div>
                                                        <img className="d-block w-100" src={image_base_url + d.thumbnail} />
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{d.product_title}</h5>
                                                        <h6 className="card-text mb-2">Remaining Stock : {d.available_quantity}</h6>
                                                        <p className="card-text d-flex gap-3">
                                                            <Link to={`/product-details/${d.id}`} className="btn btn-primary">View</Link>
                                                            <Link to={`/edit-product/${d.id}`} className="btn btn-info">Edit</Link>
                                                            <button onClick={(e) => { handleDelete(d.id) }} className=" btn btn-danger text-dark">Delete</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        }
                        {showCategoryPosts &&
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <section className="section dashboard">
                                    <div className="row align-items-top">
                                        <div className="row">
                                            {getData.length === 0 &&
                                                <div>
                                                    <div className='row mt-5 gap-3'>
                                                        <div className='col-lg-4'></div>
                                                        <div className='col-lg-4'>
                                                            <h2 className='mb-2'>No Products In This Category</h2>
                                                            <img src="assets/images/product-not-found.jpg" />
                                                        </div>
                                                        <div className='col-lg-4'></div>
                                                    </div>
                                                </div>
                                            }
                                            {getData && getData.slice(0).reverse().map((d, index) =>
                                                <div className="card d-flex col-md-6 col-sm-6 col-lg-3  p-2 product-card" key={index}>
                                                    <div>
                                                        <img className="d-block w-100" src={image_base_url + d.thumbnail} />
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{d.product_title}</h5>
                                                        <h6 className="card-text mb-2">Remaining Stock : {d.available_quantity}</h6>
                                                        <p className="card-text d-flex gap-3">
                                                            <Link to={`/product-details/${d.id}`} className="btn btn-primary">View</Link>
                                                            <Link to={`/edit-product/${d.id}`} className="btn btn-info ms-3">Edit</Link>
                                                            <button onClick={(e) => { handleDelete(d.id) }} className="ms-3 btn btn-danger text-dark">Delete</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        }
                    </div>
                </div>

            </main>
        </>
    )
}

export default AllProducts