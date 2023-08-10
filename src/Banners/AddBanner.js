import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../Variables';

const AddBanner = () => {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCatgories] = useState([]);

    useEffect(() => {
        const allorders = document.getElementById('addbanner');
        allorders.classList.add('active');

        const products = document.getElementById('banners');
        products.classList.remove('collapsed');

        const prodnavContent = document.getElementById('banners-nav');
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
        title: '',
        description: '',
        category: '',
        sub_category: ''
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

    console.log(file);

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        // formData.append('title', Data.title);
        // formData.append('description', Data.description);
        formData.append('category', Data.category);
        formData.append('sub_category', Data.sub_category);
        formData.append('title', 'title');
        formData.append('description', 'description');
        Array.from(file).forEach(item => {
            formData.append("banner", item);
        })
        try {
            axios.post(baseUrl + "/add-banner/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Banner Created Succesfully...',
                        width: '550px',
                    })
                    navigate('/all-banners')
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
                    <h1>Add Banner</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Banner</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Banner</h5>
                            <form>
                                {/* <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Banner Title</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} name="title" type="title" className="form-control" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="type" className="col-sm-2 col-form-label">Banner Description</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} name="description" type="title" className="form-control" />
                                    </div>
                                </div> */}

                                <div className="row mb-3">
                                    <label htmlFor="category" className="col-sm-2 col-form-label">Select Category</label>
                                    <div className="col-sm-4">
                                        <select name="category" onChange={handleCategoryChange} className="form-select" required="">
                                            <option value="">Select Category</option>
                                            {categories && categories.map((cat, index) => <option key={index} value={cat.id}>{cat.category}</option>)}
                                        </select>
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Select Sub Category</label>
                                    <div className="col-sm-4">
                                        <select name="sub_category" onChange={handleChange} className="form-select" required="">
                                            <option value="">Select Sub-Category</option>
                                            {subCategories && subCategories.map((cat, index) => <option key={index} value={cat.id}>{cat.sub_category}</option>)}
                                        </select>
                                    </div>
                                </div>












                                {/* ================================================================================================================================================================ */}
                                {/* File Upload */}
                                <div className="row mb-3">
                                    <label for="image" className="col-sm-2 col-form-label">Upload Image</label>
                                    <div className="col-sm-10">
                                        <input
                                            type="file"
                                            id="files"
                                            accept="image/*,video/*"
                                            // style={{ visibility: "hidden" }}
                                            disabled={file.length === 5}
                                            className="form-control"
                                            onChange={uploadSingleFile}
                                            multiple
                                        />
                                    </div>
                                </div>







                                <div className="form-group preview" style={imgContanier}>
                                    {file.length > 0 &&
                                        imageURLS.map((imageSrc, index) => (
                                            <span key={imageSrc} style={renderSpan}>
                                                <img src={imageSrc} alt="not fount" style={imgStyle} />
                                                <p style={{ cursor: "pointer" }} onClick={() => deleteFile(index)}>
                                                    X
                                                </p>
                                            </span>
                                        ))}
                                </div>

                                {/* End of File Upload */}
                                {/* ================================================================================================================================================================ */}

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

export default AddBanner