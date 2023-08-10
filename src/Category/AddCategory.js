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


const AddCategory = () => {

    useEffect(() => {
        const addcategory = document.getElementById('addcategory')
        addcategory.classList.add('active')

        const category = document.getElementById('category')
        category.classList.remove('collapsed')

        const CatContent = document.getElementById('cat-nav')
        CatContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')

    });

    let navigate = useNavigate()

    const [Data, setData] = useState({
        category_name: '',
        category_image: ''
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
        formData.append('category', Data.category_name)
        formData.append("category_image", Data.category_image);
        try {
            axios.post(baseUrl + "/add-category/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                console.log(res)
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Category Added Succesfully...',
                        width: '550px',
                    })
                    navigate('/all-categories')
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
                    <h1>Add Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Category</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Category</h5>
                            {/* <!-- General Form Elements --> */}
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Category Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="category_name" onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Category Image</label>
                                    <div className="col-sm-10">
                                        <input name="category_image" onChange={handleFileChange} className="form-control" type="file" id="formFile" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Submit Button</label>
                                    <div className="col-sm-10">
                                        <button type="submit" onClick={submitForm} className="btn btn-primary">Submit Form</button>
                                    </div>
                                </div>
                            </form>
                            {/* <!-- End General Form Elements --> */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AddCategory