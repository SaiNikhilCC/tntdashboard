import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../Variables';
import { useParams } from 'react-router-dom';
import image_base_url from '../ImageVariable';

const Editbanner = () => {



    var banner_id = useParams()

    let navigate = useNavigate();
    const [Data, setData] = useState({
        title: '',
        description: ''
    })


    useEffect(() => {
        try {
            axios.get(baseUrl + '/particular-banner/' + banner_id.id + '/').then((res) => {
                setData(res.data.data[0])
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleChange = (event) => {
        setData({
            ...Data,
            [event.target.name]: event.target.value
        })
    }

    const [file, setFile] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);

    function uploadSingleFile(e) {
        setFile([...file, ...e.target.files]);
        console.log("file", file);
    }

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', '');
        formData.append('description','');
        formData.append('title', 'title');
        formData.append('description', 'description');
        if (file.length !== 0) {
            Array.from(file).forEach(item => {
                formData.append("banner", item);
            })
        }
        try {
            axios.put(baseUrl + "/edit-banner/"+banner_id.id+"/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Banner Updated Succesfully...',
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
                                        <input defaultValue={Data.title} onChange={handleChange} name="title" type="title" className="form-control" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="type" className="col-sm-2 col-form-label">Banner Description</label>
                                    <div className="col-sm-10">
                                        <input defaultValue={Data.description} onChange={handleChange} name="description" type="title" className="form-control" />
                                    </div>
                                </div> */}

                                {/* ================================================================================================================================================================ */}
                                {/* File Upload */}
                                <div className="row mb-3">
                                    <label htmlFor="image" className="col-sm-2 col-form-label">Upload Image</label>
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
                                <div>
                                    <h5>Previous Image</h5>
                                    <img src={image_base_url+Data.banner} alt={Data.banner} />
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

export default Editbanner