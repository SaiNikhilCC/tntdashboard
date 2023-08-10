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


const AddSubCategory = () => {

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const addcategory = document.getElementById('addsubcategory')
        addcategory.classList.add('active')

        const category = document.getElementById('subcategory')
        category.classList.remove('collapsed')

        const CatContent = document.getElementById('sub-cat-nav')
        CatContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')


        try {
            axios.get(baseUrl + "/all-category/").then((res) => {
                setCategories(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }

    }, []);

    let navigate = useNavigate()

    const [Data, setData] = useState({
        category: '',
        sub_category: ''
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
        if (Data.category === '') {
            Swal.fire({
                icon: 'error',
                title: 'Selcet Category!!!',
                width: '550px',
            })
        }
        if (Data.sub_category === '') {
            Swal.fire({
                icon: 'error',
                title: 'Sub Category Required!!!',
                width: '550px',
            })
        }
        formData.append('category', Data.category)
        formData.append("sub_category", Data.sub_category);
        try {
            axios.post(baseUrl + "/add-sub-category/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sub Category Added Succesfully...',
                        width: '550px',
                    })
                    navigate('/all-sub-categories')
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
                    <h1>Add Sub Category</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Sub Category</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Sub Category</h5>
                            {/* <!-- General Form Elements --> */}
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select name="category" onChange={handleChange} className="form-select" required="">
                                            <option value="">Select Category</option>
                                            {categories && categories.map((cat, index) =>
                                                <option key={index} value={cat.id}>{cat.category}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Sub Category Name</label>
                                    <div className="col-sm-10">
                                        <input name="sub_category" onChange={handleChange} className="form-control" type="text" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Submit </label>
                                    <div className="col-sm-10">
                                        <button type="submit" onClick={submitForm} className="btn btn-primary">Add Sub-Category</button>
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

export default AddSubCategory