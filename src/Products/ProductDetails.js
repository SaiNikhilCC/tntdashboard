import React from 'react';
import { Link, useMatch, useParams, useRouteMatch } from 'react-router-dom';
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
import './productdetails.css';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import DataTable from 'react-data-table-component'
import image_base_url from '../ImageVariable';


const ProductDetails = () => {
 

    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [imgsData, setImgsData] = useState({
        image: '',
        color_name: '',
        color_code: ''
    })

    const handleChange = (event) => {
        setImgsData({
            ...imgsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setImgsData({
            ...imgsData,
            [event.target.name]: event.target.files[0],
        });
    };

    useEffect(() => {
        const allorders = document.getElementById('allproducts')
        allorders.classList.add('active')

        const products = document.getElementById('products')
        products.classList.remove('collapsed')

        const prodnavContent = document.getElementById('components-nav')
        prodnavContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')

    }, []);

    const product_id = useParams();
    const [getData, setData] = useState([])
    const dataFetchedRef = useRef(false);
    const fetchData = () => {
        try {
            axios.get(baseUrl + "/product-details/" + product_id.id + "/").then((res) => {
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

    const formSubmit = () => {
        Swal.fire({
            title: 'Uploading...',
            icon: 'info',
            toast: true,
            timer: 5000,
            position: 'bottom-right',
            timerProgressBar: true,
            showConfirmButton: true,
        })
        const formData = new FormData();
        formData.append("color_name", imgsData.color_name);
        formData.append("color_code", imgsData.color_code);
        formData.append("product", product_id.id);
        if (imgsData.image != null) {
            formData.append("image", imgsData.image, imgsData.image.name);
        }
        try {
            axios.post(baseUrl + "/add-product-images-colors/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Image Uploaded Succesfully...',
                    width: '550px',
                })
                navigate(`/product-details/${product_id.id}`);
                // window.location.reload();
                fetchData();
                handleClose();
            });
        } catch (error) {
            console.log(error);
        }
    };


    // Product Images Data Table Data
    const [productImagesdata, setProductImagesData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProductImagesData, setfilteredProductData] = useState([])

    useEffect(() => {
        try {
            axios.get(baseUrl + "/particular-products-images-colors/" + product_id.id + "/").then((res) => {
                setProductImagesData(res.data.data);
                setfilteredProductData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteProductImageData = (id) => {
        try {
            axios.delete(baseUrl + "/delete-product-images-colors/" + id + "/").then(window.location.reload());
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            name: "Color Name",
            width: "750px",
            cell: (row) =>
                <div className='row'>
                    <div className='col-md-10'>{row.color_name}</div>
                    <div className='col-md-2' style={{ width: '20px', height: '20px', borderRadius: '50%', border: "2px solid black", backgroundColor: row.color_code }}></div>
                </div>
        },
        {
            name: "Color Code",
            selector: (row) => row.color_code,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) =>
                <div className='flex'>
                    <div>
                        <button className='btn btn-sm btn-danger' onClick={(e) => { deleteProductImageData(row.id) }}>Delete</button>
                    </div>
                </div>
        }
    ]

    useEffect(() => {
        const result = productImagesdata.filter(d => {
            return d.color_name.toLowerCase().match(search.toLowerCase());
        })
        setfilteredProductData(result)
    }, [search])


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
                                        <li className="breadcrumb-item"><Link to={"/all-product"}>All Products</Link> </li>
                                        <li className="breadcrumb-item active">Product Details</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-2">
                                {/* <button class="btn btn-primary w-50 h-200">Add Images</button> */}
                                <Button variant="primary" className="btn btn-primary d-none d-lg-block m-l-15 text-white" onClick={handleShow}>
                                    <i className="fa fa-plus-circle"></i>Add Images
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div class="row m-0">
                        <Modal className="custom-modal" show={show} onHide={handleClose} >
                            <Modal.Header >
                                <Modal.Title>
                                    <h4 className="modal-title" id="myModalLabel">Add New Image</h4>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <from className="form-horizontal">
                                    <div className='row mt-1'>
                                        <div className='col-md-5'>
                                            <label for="category" className="form-label">Upload Image</label>
                                        </div>
                                        <div className='col-md-7'>
                                            <input name="image" onChange={handleFileChange} className='form-control' type="file" accept="images/*" />
                                        </div>
                                    </div>
                                    <div className='row mt-1'>
                                        <div className="col-md-5">
                                            <label for="color_name" className="form-label">Color Name</label>
                                        </div>
                                        <div className="col-md-7">
                                            <input name="color_name" onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Color Name" required="" />
                                        </div>
                                    </div>
                                    <div className='row mt-1'>
                                        <div className='col-md-5'>
                                            <label for="color_code" className="form-label">Color Code</label>
                                        </div>
                                        <div className='col-md-7'>
                                            <select name="color_code" onChange={handleChange} className="form-select">
                                                <option value="">Select Color</option>
                                                <option value="#ff0000">Red</option>
                                                <option value="#ffff00">Yellow</option>
                                                <option value="#0000ff">Blue</option>
                                                <option value="#00ff00">Green</option>
                                                <option value="#d84daa">Pink</option>
                                                <option value="#eedfc8">Warm White</option>
                                                <option value="#ffffff">White</option>
                                                <option value="#4c94a8">Icy Blue</option>
                                                <option value="#ffa500">Orange</option>
                                                <option value="#800080">Purple</option>
                                            </select>
                                        </div>
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
                        <div class="col-lg-5 left-side-product-box pb-3">
                            {getData.product_images &&
                                <>
                                    <div class="row">
                                        <div class="col-sm">
                                            <div className='row'>
                                                <div className="col-md-4"></div>
                                                <div className='card mt-3 co-md-4'>
                                                    <Carousel slide={false} prevLabel={null} nextLabel={null} >
                                                        {getData.product_images.map((img, index) =>
                                                            <Carousel.Item>
                                                                <img
                                                                    className="d-block w-100"
                                                                    src={image_base_url + img.image}
                                                                    alt="Image One"
                                                                    height={650}
                                                                />
                                                            </Carousel.Item>
                                                        )}
                                                    </Carousel>
                                                </div>
                                                <div className='row'>
                                                    {getData.product_images.map((img, index) =>
                                                        <>
                                                            <div className='ms-2' style={{ width: '25px', height: '25px', borderRadius: '50%', border: "2px solid black", backgroundColor: img.color_code }}></div>
                                                        </>
                                                    )}
                                                </div>
                                                <hr className='mt-5'></hr>
                                                <div className="col-md-8">
                                                    <p>SKU Code : {getData.sku_code}</p>
                                                    <p>Stock Status : {getData.stock_status}</p>
                                                    <p>Available Quanity : {getData.available_quantity}</p>
                                                    <p>No.of Users having in Wishlist : {getData.no_of_wishlists}</p>
                                                    <p>No.of Users having in Cart : {getData.no_of_cart}</p>
                                                    <p>No.of Orders Placed : {getData.no_of_orders}</p>
                                                    <p>No.of Orders Retrned : {getData.no_of_returned}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div class="col-lg-7 mt-3">
                            <div class="right-side-pro-detail border p-3 m-0">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <h2 class="m-0 p-0 mb-2">{getData.product_title}</h2>
                                    </div>
                                    <div class="col-lg-12">
                                        <p class="tag-section">Category :
                                            <a className='me-3' href="">{getData?.category &&
                                                <span>
                                                    {getData.category.category}
                                                </span>
                                            }</a>
                                            Sub Category :

                                            <a href="">{getData.sub_category &&
                                                <span>
                                                    {getData.sub_category.sub_category}
                                                </span>
                                            }</a>
                                        </p>
                                        <hr class="m-0 pt-2 mt-2" />
                                    </div>
                                    <div class="col-lg-12 pt-2 mt-1">
                                        <u><h1 className='mb-4'>Product Details</h1></u>
                                        <div className='row'><h2 className='col-md-3'>Title :</h2> <p className='col-md-8'>{getData.product_title}</p></div>
                                        <div className='row'><h2 className='col-md-3'>Descripion :</h2> <p className='col-md-8'>{getData.description}</p></div>
                                        <hr></hr>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <u><p className='text-dark'>Size - 1</p></u>
                                                <h5>lable : {getData.size_lable_1}</h5>
                                                <h5>Height : {getData.size_height_1}</h5>
                                                <h5>Width : {getData.size_width_1}</h5>
                                                <h5>Actual proce : {getData.size_actual_price_1}</h5>
                                                <h5>Selling Price : {getData.size_selling_price_1}</h5>
                                            </div>
                                            <div className='col-md-4'>
                                                <u><p className='text-dark'>Size - 2</p></u>
                                                <h5>lable : {getData.size_lable_2}</h5>
                                                <h5>Height : {getData.size_height_2}</h5>
                                                <h5>Width : {getData.size_width_2}</h5>
                                                <h5>Actual proce : {getData.size_actual_price_2}</h5>
                                                <h5>Selling Price : {getData.size_selling_price_2}</h5>
                                            </div>
                                            <div className='col-md-4'>
                                                <u><p className='text-dark'>Size - 3</p></u>                                              <h5>lable : {getData.size_lable_3}</h5>
                                                <h5>Height : {getData.size_height_3}</h5>
                                                <h5>Width : {getData.size_width_3}</h5>
                                                <h5>Actual proce : {getData.size_actual_price_3}</h5>
                                                <h5>Selling Price : {getData.size_selling_price_3}</h5>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className='row'>

                                            <div className='col-md-5'>
                                                <u><p className='text-dark'>Size - 4</p></u>
                                                <h5>lable : {getData.size_lable_4}</h5>
                                                <h5>Height : {getData.size_height_4}</h5>
                                                <h5>Width : {getData.size_width_4}</h5>
                                                <h5>Actual proce : {getData.size_actual_price_4}</h5>
                                                <h5>Selling Price : {getData.size_selling_price_4}</h5>
                                            </div>

                                            <div className='col-md-5'>
                                                <u><p className='text-dark'>Size - 5</p></u>
                                                <h5>lable : {getData.size_lable_5}</h5>
                                                <h5>Height : {getData.size_height_5}</h5>
                                                <h5>Width : {getData.size_width_5}</h5>
                                                <h5>Actual proce : {getData.size_actual_price_5}</h5>
                                                <h5>Selling Price : {getData.size_selling_price_5}</h5>
                                            </div>
                                        </div>
                 
                                        <hr class="m-0 pt-2 mt-2" />
                                    </div>
                                    <div class="col-lg-12 mt-3">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <Link to={`/edit-product/${getData.id}`} class="btn btn-info w-50 h-200">Edit</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <ParticularProductImages /> */}
                    <DataTable
                        title="Product Images"
                        fixedHeader
                        columns={columns}
                        data={filteredProductImagesData.slice(0).reverse()}
                        pagination
                        fixedHeaderScrollHeight='450px'
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className='w-25 form-control'
                            />
                        }
                        subHeaderAlign="left"
                    />
                </div>
            </main>
        </>
    )
}

export default ProductDetails













