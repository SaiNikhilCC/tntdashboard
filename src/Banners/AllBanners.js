import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import baseUrl from '../Variables';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player'
import image_base_url from '../ImageVariable';

const AllBanners = () => {
    


    useEffect(() => {

        const allstories = document.getElementById('allbanners')
        allstories.classList.add('active')

        const stories = document.getElementById('banners')
        stories.classList.remove('collapsed')

        const storynavcontent = document.getElementById('banners-nav')
        storynavcontent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')

    }, []);

    
    const [getData, setData] = useState([])
    const dataFetchedRef = useRef(false);

    const fetchData = () => {
        try {
            axios.get(baseUrl + "/all-banner/").then((res) => {
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

    const deleteBanner = (id) => {
        try {
            axios.delete(baseUrl + "/delete-banner/"+id+"/").then(window.location.reload());
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="card-body">
                    <div className="pagetitle">
                        <h1>All Banners</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                                <li className="breadcrumb-item active">All Banners</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="tab-content pt-2" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <section className="section dashboard">
                                <div className="row align-items-top">
                                    <div className="row">
                                        {getData && getData.slice(0).reverse().map((d, index) =>
                                            <div className="card d-flex col-md-6 col-sm-6 col-lg-3 p-2" key={index}>
                                                <div>
                                                    <img
                                                        className="d-block w-100"
                                                        src={image_base_url + d.banner}
                                                        alt="Image One"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    {/* <h5 className="text-center">Category : {d.category.category}</h5> */}
                                                    {/* <p className='text-center'>SUb-Category : {d.sub_category.sub_category}</p> */}
                                                    <p className="card-text text-center d-flex gap-2 justify-content-center">
                                                        <Link to={"/edit-banner/"+d.id} className="btn btn-info me-5">Edit</Link>
                                                        <button onClick={()=>deleteBanner(d.id)} className="btn btn-danger">Delete</button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AllBanners















