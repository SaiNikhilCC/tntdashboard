import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../Variables';

const AddStory = () => {

    useEffect(() => {

        const allorders = document.getElementById('addstory');
        allorders.classList.add('active');

        const products = document.getElementById('stories');
        products.classList.remove('collapsed');

        const prodnavContent = document.getElementById('stories-nav');
        prodnavContent.classList.add('show');

        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('collapsed');

    }, []);

    let navigate = useNavigate();

    const [Data, setData] = useState({
        title: '',
        type: '',
        thumbnail: ''
    })

    const handleChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.value
        })
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
        // file.forEach(item=>{
        //     alert(item['type'])
        // })
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', Data.title);
        formData.append('type', Data.type);
        formData.append('thumbnail', Data.thumbnail);


        Array.from(file).forEach(item => {
            formData.append("img_video", item);
        })
        try {
            axios.post(baseUrl + "/add-story/", formData, {
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
                    navigate('/all-stories')
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

    const shoeImgInput = useState(false)



    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Add Story</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">Add Story</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <div className="card ">
                        <div className="card-body">
                            <h5 className="card-title">Add New Story</h5>
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-sm-2 col-form-label">Story Title</label>
                                    <div className="col-sm-10">
                                        <input onChange={handleChange} name="title" type="title" className="form-control" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="type" className="col-sm-2 col-form-label">Story Type</label>

                                    <div className="col-sm-3">
                                        <select name="type" onChange={handleChange} className="form-select">
                                            <option value="">Select Story Type</option>
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                        </select>
                                    </div>
                                </div>

                                {/* ================================================================================================================================================================ */}
                                {/* File Upload */}

                                {Data.type === "image" &&
                                    <div className="row mb-3">
                                        <label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
                                        <div className="col-sm-3">
                                            <input
                                                type="file"
                                                id="files"
                                                accept="image/*"
                                                className="form-control"
                                                onChange={uploadSingleFile}
                                            />
                                        </div>
                                    </div>
                                }
                                {Data.type === "video" &&
                                    <div className="row mb-3">
                                        <label htmlFor="image" className="col-sm-2 col-form-label">Upload Video</label>
                                        <div className="col-sm-3">
                                            <input
                                                type="file"
                                                id="files"
                                                accept="video/*"
                                                className="form-control"
                                                onChange={uploadSingleFile}
                                            />
                                        </div>
                                    </div>
                                }

                                {/* End of File Upload */}
                                {/* ================================================================================================================================================================ */}

                                <div className="row mb-3 mt-2">
                                    <label htmlFor="thumbnail" className="col-sm-2 col-form-label">Thumbnail</label>
                                    <div className="col-sm-3">
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

                                <div className="row mb-3 mt-2">
                                    <div className="col-sm-10">
                                        <button onClick={submitForm} type="button" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}

export default AddStory