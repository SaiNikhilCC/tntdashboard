import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import baseUrl from '../Variables';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddCoupon = () => {

    useEffect(() => {
        const addcategory = document.getElementById('addcoupon')
        addcategory.classList.add('active')

        const category = document.getElementById('coupons')
        category.classList.remove('collapsed')

        const CatContent = document.getElementById('coupons-nav')
        CatContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')
    });

    let navigate = useNavigate()

    const [Data, setData] = useState({
        coupon_code: '',
        coupon_description: '',
        discount_percentage:'',
        min_price_for_coupon_avail:'',
        max_price:'',
        no_of_days_valid:'',
        no_of_coupons:''
    });

    const handleChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.files[0],
        });
    };

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
        formData.append('coupon_code', Data.coupon_code)
        formData.append("coupon_description", Data.coupon_description);
        formData.append("discount_percentage", Data.discount_percentage);
        formData.append("min_price_for_coupon_avail", Data.min_price_for_coupon_avail);
        formData.append("max_price", Data.max_price);
        formData.append("no_of_days_valid", Data.no_of_days_valid);
        formData.append("no_of_coupons", Data.no_of_coupons);

        try {
            axios.post(baseUrl + "/add-coupons/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Category Added Succesfully...',
                        width: '550px',
                    })
                    navigate('/all-coupons')
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Add Coupon</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Coupon</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Coupon</h5>
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Coupon Code</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="coupon_code" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Coupon Description</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="coupon_description" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Discount Percentage</label>
                                    <div className="col-sm-10">
                                        <input type="number" name="discount_percentage" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Minimum Price To Avail Coupon</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="min_price_for_coupon_avail" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Max Price</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="max_price" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">No of Days Coupon is Valid</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="no_of_days_valid" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">No of Coupons</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="no_of_coupons" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Submit Button</label>
                                    <div className="col-sm-10">
                                        <button type="submit" onClick={submitForm} className="btn btn-primary">Submit Form</button>
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

export default AddCoupon