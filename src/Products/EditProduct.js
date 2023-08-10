import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../Variables';

const EditProduct = () => {

    let product_id = useParams();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCatgories] = useState([]);
    const [getData, setGetData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const allorders = document.getElementById('addproduct');
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


        try {
            axios.get(baseUrl + "/product-details/" + product_id.id + "/").then((res) => {
                setGetData(res.data);
            });
        } catch (e) {
            console.log(e);
        }
    }, []);


    console.log(getData)

    const handleChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.value
        })
    }

    const handleCategoryChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.value
        })
        try {
            axios.get(baseUrl + "/particular-category-sub-category-list/" + event.target.value + "/").then((res) => {
                setSubCatgories(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }



    const [Data, setData] = useState({
        product_title: '',
        description: '',
        sku_code: '',
        actual_price: '',
        selling_price: '',
        available_quantity: '',
        category: '',
        sub_category: '',
        height: '',
        weight: '',
        color: '',
        font: '',
        width: '',
        thumbnail: '',

        size_lable_1: '',
        size_lable_2: '',
        size_lable_3: '',
        size_lable_4: '',
        size_lable_5: '',

        size_height_1: '',
        size_height_2: '',
        size_height_3: '',
        size_height_4: '',
        size_height_5: '',

        size_width_1: '',
        size_width_2: '',
        size_width_3: '',
        size_width_4: '',
        size_width_5: '',

        size_actual_price_1: '',
        size_actual_price_2: '',
        size_actual_price_3: '',
        size_actual_price_4: '',
        size_actual_price_5: '',

        size_selling_price_1: '',
        size_selling_price_2: '',
        size_selling_price_3: '',
        size_selling_price_4: '',
        size_selling_price_5: ''
    })



    const [file, setFile] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);

    useEffect(() => {
        if (file.length < 1) return;
        for (let i = 0; i < file.length; i++) {
            if (file[i].size > 9997152) {
                file.pop();
                return alert("Size of file is more than 5MB");
            }
            var reader = new FileReader();
            //Read the contents of Image File.
            reader.readAsDataURL(file[i]);
            reader.onload = function (e) {
                //Initiate the JavaScript Image object.
                var image = new Image();
                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;
                image.onload = function () {
                    //Determine the Height and Width.
                    var height = this.height;
                    var width = this.width;
                    if (height > 2000 || width > 2000) {
                        file.pop();
                        alert("Height and Width must not exceed 100px.");
                    }
                    return true;
                };
            }
        }
        const newImageUrls = [];
        file.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
        console.log(newImageUrls);
    }, [file]);

    function uploadSingleFile(e) {
        setFile([...file, ...e.target.files]);
        console.log("file", file);
    }

    function upload(e) {
        e.preventDefault();
        console.log(file);
    }

    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
        console.log(s);
    }

    const imgContanier = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    };
    const renderSpan = {
        width: "10rem",
        height: "10rem",
        display: "flex",
        // backgroundColor: "blue",
        overflow: "hidden",
    };
    const imgStyle = {
        width: "90%",
        height: "100%",
    };

    console.log(file)

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        if (Data.category_name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Category Required!!!',
                width: '550px',
            })
        }
        if (Data.product_title !== '') {
            formData.append('product_title', Data.product_title);
        }
        if (Data.description !== '') {
            formData.append('description', Data.description);
        }
        if (Data.sku_code !== '') {
            formData.append('sku_code', Data.sku_code);
        }
        if (Data.category !== '') {
            formData.append('category', Data.category);
        }
        if (Data.sub_category !== '') {
            formData.append('sub_category', Data.sub_category);
        }
        if (Data.available_quantity !== '') {
            formData.append('available_quantity', Data.available_quantity);
        }
        if (Data.thumbnail !== '') {
            formData.append('thumbnail', Data.thumbnail);
        }
        if (Data.size_lable_1 !== '') {
            formData.append('size_lable_1', Data.size_lable_1);
        }
        if (Data.size_lable_2 !== '') {
            formData.append('size_lable_2', Data.size_lable_2);
        }
        if (Data.size_lable_3 !== '') {
            formData.append('size_lable_3', Data.size_lable_3);
        }
        if (Data.size_lable_4 !== '') {
            formData.append('size_lable_4', Data.size_lable_4);
        }
        if (Data.size_lable_5 !== '') {
            formData.append('size_lable_5', Data.size_lable_5);
        }
        if (Data.size_height_1 !== '') {
            formData.append('size_height_1', Data.size_height_1);
        }
        if (Data.size_height_2 !== '') {
            formData.append('size_height_2', Data.size_height_2);
        }
        if (Data.size_height_3 !== '') {
            formData.append('size_height_3', Data.size_height_3);
        }
        if (Data.size_height_4 !== '') {
            formData.append('size_height_4', Data.size_height_4);
        }
        if (Data.size_height_5 !== '') {
            formData.append('size_height_5', Data.size_height_5);
        }
        if (Data.size_width_1 !== '') {
            formData.append('size_width_1', Data.size_width_1);
        }
        if (Data.size_width_2 !== '') {
            formData.append('size_width_2', Data.size_width_2);
        }
        if (Data.size_width_3 !== '') {
            formData.append('size_width_3', Data.size_width_3);
        }
        if (Data.size_width_4 !== '') {
            formData.append('size_width_4', Data.size_width_4);
        }
        if (Data.size_width_5 !== '') {
            formData.append('size_width_5', Data.size_width_5);
        }
        if (Data.size_actual_price_1 !== '') {
            formData.append('size_actual_price_1', Data.size_actual_price_1);
        }
        if (Data.size_actual_price_2 !== '') {
            formData.append('size_actual_price_2', Data.size_actual_price_2);
        }
        if (Data.size_actual_price_3 !== '') {
            formData.append('size_actual_price_3', Data.size_actual_price_3);
        }
        if (Data.size_actual_price_4 !== '') {
            formData.append('size_actual_price_4', Data.size_actual_price_4);
        }
        if (Data.size_actual_price_5 !== '') {
            formData.append('size_actual_price_5', Data.size_actual_price_5);
        }
        if (Data.size_selling_price_1 !== '') {
            formData.append('size_selling_price_1', Data.size_selling_price_1);
        }
        if (Data.size_selling_price_2 !== '') {
            formData.append('size_selling_price_2', Data.size_selling_price_2);
        }
        if (Data.size_selling_price_3 !== '') {
            formData.append('size_selling_price_3', Data.size_selling_price_3);
        }
        if (Data.size_selling_price_4 !== '') {
            formData.append('size_selling_price_4', Data.size_selling_price_4);
        }
        if (Data.size_selling_price_5 !== '') {
            formData.append('size_selling_price_5', Data.size_selling_price_5);
        }
        try {
            axios.put(baseUrl + "/edit-product/" + product_id.id + "/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Added Succesfully...',
                        width: '550px',
                    })
                    navigate('/all-product')
                }
                else if (res.data.errors.sku_code) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Product With This SKU Code Already Exists!!!',
                        width: '550px',

                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.files[0],
        });
    };


    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Add Product</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Product</li>
                        </ol>
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Product</h5>
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Product Title</label>
                                    <div className="col-sm-10">
                                        <input defaultValue={getData.product_title} onChange={handleChange} name="product_title" type="title" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea defaultValue={getData.description} onChange={handleChange} name="description" className="form-control" ></textarea>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-md-2'>
                                        <label htmlFor="category" className="col-form-label">Select Category</label>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row mb-3">
                                            <div className="col-sm-10">
                                                <select name="category" onChange={handleCategoryChange} className="form-select" required="">
                                                    {getData.category &&
                                                        <option selected defaultValue="">{getData.category.category} (selected)</option>
                                                    }
                                                    {categories && categories.map((cat, index) =>
                                                        <option key={index} value={cat.id}>{cat.category}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-2'>
                                        <label htmlFor="sub_category" className="col-form-label">Sub-Category</label>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row mb-3">
                                            <div className="col-sm-10">
                                                <select name="sub_category" onChange={handleChange} className="form-select">
                                                    {getData.sub_category &&
                                                        <option defaultValue="">{getData.sub_category.sub_category} (selected)</option>
                                                    }
                                                    {subCategories && subCategories.map((cat, index) =>
                                                        <option key={index} value={cat.id}>{cat.sub_category}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3 mt-2">
                                    <div className="col-sm-6">
                                        <label htmlFor="thumbnail" className="col-form-label">Thumbnail</label>
                                        <input
                                            name="thumbnail"
                                            type="file"
                                            id="thumbnail"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-5 row mb-3">
                                        <label htmlFor="sku_code" className="col-form-label">SKU Code</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.sku_code} onChange={handleChange} name="sku_code" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-5 row mb-3">
                                        <label htmlFor="available_quantity" className="col-form-label">Available Qunatity</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.available_quantity} onChange={handleChange} name="available_quantity" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>



                                <hr></hr>

                                <u><h3 className='mt-1 mb-4'>Product Dimensions And Pricing : </h3></u>

                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_1" className="col-form-label">Size-1 Lable  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_lable_1} onChange={handleChange} name="size_lable_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_1" className="col-form-label">Size-1 Height  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_height_1} onChange={handleChange} name="size_height_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_1" className="col-form-label">Size-1 Width  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_width_1} onChange={handleChange} name="size_width_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_1" className="col-form-label">Size-1 Actual Price  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_actual_price_1} onChange={handleChange} name="size_actual_price_1" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_1" className="col-form-label">Size-1 Selling Price  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_selling_price_1} onChange={handleChange} name="size_selling_price_1" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_2" className="col-form-label">Size-2 Lable</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_lable_2} onChange={handleChange} name="size_lable_2" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_2" className="col-form-label">Size-2 Height</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_height_2} onChange={handleChange} name="size_height_2" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_2" className="col-form-label">Size-2 Width</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_width_2} onChange={handleChange} name="size_width_2" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_2" className="col-form-label">Size-2 Actual Price </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_actual_price_2} onChange={handleChange} name="size_actual_price_2" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_2" className="col-form-label">Size-2 Selling Price</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_selling_price_2} onChange={handleChange} name="size_selling_price_2" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_3" className="col-form-label">Size-3 Lable</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_lable_3} onChange={handleChange} name="size_lable_3" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_3" className="col-form-label">Size-3 Height</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_height_3} onChange={handleChange} name="size_height_3" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_3" className="col-form-label">Size-3 Width</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_width_3} onChange={handleChange} name="size_width_3" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_3" className="col-form-label">Size-3 Actual Price </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_actual_price_3} onChange={handleChange} name="size_actual_price_3" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_3" className="col-form-label">Size-3 Selling Price</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_selling_price_3} onChange={handleChange} name="size_selling_price_3" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_4" className="col-form-labe4">Size-4 Lable</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_lable_4} onChange={handleChange} name="size_lable_4" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_4" className="col-form-label">Size-4 Height</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_height_4} onChange={handleChange} name="size_height_4" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_4" className="col-form-label">Size-4 Width</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_width_4} onChange={handleChange} name="size_width_4" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_4" className="col-form-label">Size-4 Actual Price </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_actual_price_4} onChange={handleChange} name="size_actual_price_4" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_4" className="col-form-label">Size-4 Selling Price</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_selling_price_4} onChange={handleChange} name="size_selling_price_4" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_5" className="col-form-label">Size-5 Lable</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_lable_5} onChange={handleChange} name="size_lable_5" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_5" className="col-form-label">Size-5 Height</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_height_5} onChange={handleChange} name="size_height_5" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_5" className="col-form-label">Size-5 Width</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_width_5} onChange={handleChange} name="size_width_5" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_5" className="col-form-label">Size-5 Actual Price </label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_actual_price_5} onChange={handleChange} name="size_actual_price_5" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_5" className="col-form-label">Size-5 Selling Price</label>
                                        <div className="col-sm-10">
                                            <input defaultValue={getData.size_selling_price_5} onChange={handleChange} name="size_selling_price_5" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3 mt-2">
                                    <div className="col-sm-10">
                                        <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default EditProduct






