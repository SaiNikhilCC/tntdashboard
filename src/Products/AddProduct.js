import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../Variables';

const AddProduct = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCatgories] = useState([]);

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
    }, []);

    let navigate = useNavigate();

    const [Data, setData] = useState({
        product_title: "",
        description: "",
        sku_code: "",
        actual_price: "",
        selling_price: "",
        available_quantity: "",
        category: "",
        sub_category: "",
        height: "",
        weight: "",
        color: "",
        font: "",
        width: "",
        thumbnail: "",
        size_lable_1: "",
        size_lable_2: "",
        size_lable_3: "",
        size_lable_4: "",
        size_lable_5: "",
        size_height_1: "",
        size_height_2: "",
        size_height_3: "",
        size_height_4: "",
        size_height_5: "",
        size_width_1: "",
        size_width_2: "",
        size_width_3: "",
        size_width_4: "",
        size_width_5: "",
        size_actual_price_1: 0,
        size_actual_price_2: 0,
        size_actual_price_3: 0,
        size_actual_price_4: 0,
        size_actual_price_5: 0,
        size_selling_price_1: 0,
        size_selling_price_2: 0,
        size_selling_price_3: 0,
        size_selling_price_4: 0,
        size_selling_price_5: 0
    })

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

    const [showSecondRow, setShowSecondRow] = useState(false);

    const handleSecondRow = () => {
        setShowSecondRow(true);
    }

    console.log(Data)


    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        


       

        formData.append('product_title', Data.product_title);
        formData.append('description', Data.description);
        formData.append('sku_code', Data.sku_code);
        formData.append('available_quantity', Data.available_quantity);
        formData.append('category', Data.category);
        formData.append('sub_category', Data.sub_category);
        formData.append('thumbnail', Data.thumbnail);



        if (Data.size_width_1 === "") {
            formData.append('size_width_1',"");
        }else{
            formData.append('size_width_1', Data.size_width_1);
        }
        if (Data.size_width_2 === '') {
            formData.append('size_width_2',"");
        }else{
            formData.append('size_width_2', Data.size_width_2);
        }
        if (Data.size_width_3 === '') {
            formData.append('size_width_3',"");
        }else{
            formData.append('size_width_3', Data.size_width_3);
        }
        if (Data.size_width_4 === '') {
            formData.append('size_width_4',"");
        }else{
            formData.append('size_width_4', Data.size_width_4);
        }
        if (Data.size_width_5 === "") {
            formData.append('size_width_5'," ");
        }else{
            formData.append('size_width_5', Data.size_width_5);
        }

        formData.append('size_lable_1', Data.size_lable_1);
        formData.append('size_lable_2', Data.size_lable_2);
        formData.append('size_lable_3', Data.size_lable_3);
        formData.append('size_lable_4', Data.size_lable_4);
        formData.append('size_lable_5', Data.size_lable_5);

        formData.append('size_height_1', Data.size_height_1);
        formData.append('size_height_2', Data.size_height_2);
        formData.append('size_height_3', Data.size_height_3);
        formData.append('size_height_4', Data.size_height_4);
        formData.append('size_height_5', Data.size_height_5);

        // formData.append('size_width_1', Data.size_width_1);
        // formData.append('size_width_2', Data.size_width_2);
        // formData.append('size_width_3', Data.size_width_3);
        // formData.append('size_width_4', Data.size_width_4);
        // formData.append('size_width_5', Data.size_width_5);


        formData.append('size_actual_price_1', Data.size_actual_price_1);
        formData.append('size_actual_price_2', Data.size_actual_price_2);
        formData.append('size_actual_price_3', Data.size_actual_price_3);
        formData.append('size_actual_price_4', Data.size_actual_price_4);
        formData.append('size_actual_price_5', Data.size_actual_price_5);

        formData.append('size_selling_price_1', Data.size_selling_price_1);
        formData.append('size_selling_price_2', Data.size_selling_price_2);
        formData.append('size_selling_price_3', Data.size_selling_price_3);
        formData.append('size_selling_price_4', Data.size_selling_price_4);
        formData.append('size_selling_price_5', Data.size_selling_price_5);

        if (Data.category_name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Category Required!!!',
                width: '550px',
            })
        }


        else if (Data.available_quantity <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Available Quantity Cannot Be Negative or Zero',
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: true,
            })
        }

        else {
            try {
                axios.post(baseUrl + "/add-product/", formData, {
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
                        navigate('/product-details/' + res.data.product_id)
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
                                        <input onChange={handleChange} name="product_title" type="title" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <textarea onChange={handleChange} name="description" className="form-control" ></textarea>
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
                                                    <option value="">Select Category</option>
                                                    {categories && categories.map((cat, index) => <option key={index} value={cat.id}>{cat.category}</option>)}
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
                                                <select name="sub_category" onChange={handleChange} className="form-select" required="">
                                                    <option value="">Select Sub-Category</option>
                                                    {subCategories && subCategories.map((cat, index) => <option key={index} value={cat.id}>{cat.sub_category}</option>)}
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
                                            <input onChange={handleChange} name="sku_code" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-5 row mb-3">
                                        <label htmlFor="available_quantity" className="col-form-label">Available Qunatity</label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} name="available_quantity" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <u><h3 className='mt-1 mb-4'>Product Dimensions And Pricing : </h3></u>
                                <div className='row'>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_lable_1" className="col-form-label">Size-1 Lable  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} name="size_lable_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_height_1" className="col-form-label">Size-1 Height  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} name="size_height_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2 row mb-3">
                                        <label htmlFor="size_width_1" className="col-form-label">Size-1 Width  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} name="size_width_1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_actual_price_1" className="col-form-label">Size-1 Actual Price  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} min="1" name="size_actual_price_1" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3 row mb-3">
                                        <label htmlFor="size_selling_price_1" className="col-form-label">Size-1 Selling Price  <span className='text-danger'>  (Required*)</span></label>
                                        <div className="col-sm-10">
                                            <input onChange={handleChange} min="1" name="size_selling_price_1" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                {Data.size_width_1 && Data.size_height_1 && Data.size_lable_1 && Data.size_actual_price_1 && Data.size_selling_price_1 &&
                                    <div className='row'>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_lable_2" className="col-form-label">Size-2 Lable</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_lable_2" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_height_2" className="col-form-label">Size-2 Height</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_height_2" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_width_2" className="col-form-label">Size-2 Width</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_width_2" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_actual_price_2" className="col-form-label">Size-2 Actual Price </label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_actual_price_2" type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_selling_price_2" className="col-form-label">Size-2 Selling Price</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_selling_price_2" type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {Data.size_width_2 && Data.size_height_2 && Data.size_lable_2 && Data.size_actual_price_2 && Data.size_selling_price_2 &&
                                    <div className='row'>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_lable_3" className="col-form-label">Size-3 Lable</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_lable_3" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_height_3" className="col-form-label">Size-3 Height</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_height_3" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_width_3" className="col-form-label">Size-3 Width</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_width_3" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_actual_price_3" className="col-form-label">Size-3 Actual Price </label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_actual_price_3" type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_selling_price_3" className="col-form-label">Size-3 Selling Price</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_selling_price_3" type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                }

                                {Data.size_width_3 && Data.size_height_3 && Data.size_lable_3 && Data.size_actual_price_3 && Data.size_selling_price_3 &&

                                    <div className='row'>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_lable_4" className="col-form-labe4">Size-4 Lable</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_lable_4" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_height_4" className="col-form-label">Size-4 Height</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_height_4" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_width_4" className="col-form-label">Size-4 Width</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_width_4" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_actual_price_4" className="col-form-label">Size-4 Actual Price </label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_actual_price_4" type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_selling_price_4" className="col-form-label">Size-4 Selling Price</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_selling_price_4" type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                }
                                {Data.size_width_4 && Data.size_height_4 && Data.size_lable_4 && Data.size_actual_price_4 && Data.size_selling_price_4 &&

                                    <div className='row'>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_lable_5" className="col-form-label">Size-5 Lable</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_lable_5" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_height_5" className="col-form-label">Size-5 Height</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_height_5" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 row mb-3">
                                            <label htmlFor="size_width_5" className="col-form-label">Size-5 Width</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} name="size_width_5" type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_actual_price_5" className="col-form-label">Size-5 Actual Price </label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_actual_price_5" type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 row mb-3">
                                            <label htmlFor="size_selling_price_5" className="col-form-label">Size-5 Selling Price</label>
                                            <div className="col-sm-10">
                                                <input onChange={handleChange} min="1" name="size_selling_price_5" type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                }
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

export default AddProduct





        // if (Data.size_width_1 === '') {
        //     formData.append('size_width_1','');
        // }else{
        //     formData.append('size_width_1', Data.size_width_1);
        // }
        // if (Data.size_width_2 === '') {
        //     formData.append('size_width_2','');
        // }else{
        //     formData.append('size_width_2', Data.size_width_2);
        // }
        // if (Data.size_width_3 === '') {
        //     formData.append('size_width_3','');
        // }else{
        //     formData.append('size_width_3', Data.size_width_3);
        // }
        // if (Data.size_width_4 === '') {
        //     formData.append('size_width_4','');
        // }else{
        //     formData.append('size_width_4', Data.size_width_4);
        // }
        // if (Data.size_width_5 === '') {
        //     formData.append('size_width_5','');
        // }else{
        //     formData.append('size_width_5', Data.size_width_5);
        // }



        // if (Data.size_height_1 === '') {
        //     formData.append('size_height_1','');
        // }else{
        //     formData.append('size_height_1', Data.size_height_1);
        // }
        // if (Data.size_height_2 === '') {
        //     formData.append('size_height_2','');
        // }else{
        //     formData.append('size_height_2', Data.size_height_2);
        // }
        // if (Data.size_height_3 === '') {
        //     formData.append('size_height_3','');
        // }else{
        //     formData.append('size_height_3', Data.size_height_3);
        // }
        // if (Data.size_height_4 === '') {
        //     formData.append('size_height_4','');
        // }else{
        //     formData.append('size_height_4', Data.size_height_4);
        // }
        // if (Data.size_height_5 === '') {
        //     formData.append('size_height_5','');
        // }else{
        //     formData.append('size_height_5', Data.size_height_5);
        // }


        // if (Data.size_lable_5 === '') {
        //     formData.append('size_lable_5','');
        // }else{
        //     formData.append('size_lable_5', Data.size_lable_5);
        // }
        // if (Data.size_lable_4 === '') {
        //     formData.append('size_lable_4','');
        // }else{
        //     formData.append('size_lable_4', Data.size_lable_4);
        // }
        // if (Data.size_lable_3 === '') {
        //     formData.append('size_lable_3','');
        // }else{
        //     formData.append('size_lable_3', Data.size_lable_3);
        // }
        // if (Data.size_lable_2 === '') {
        //     formData.append('size_lable_2','');
        // }else{
        //     formData.append('size_lable_2', Data.size_lable_2);
        // }
        // if (Data.size_lable_1 === '') {
        //     formData.append('size_lable_1','');
        // }else{
        //     formData.append('size_lable_1', Data.size_lable_1);
        // }