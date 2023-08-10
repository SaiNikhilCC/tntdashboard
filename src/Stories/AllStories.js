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

const AllStories = () => {

    useEffect(() => {
        const allstories = document.getElementById('allstory')
        allstories.classList.add('active')

        const stories = document.getElementById('stories')
        stories.classList.remove('collapsed')

        const storynavcontent = document.getElementById('stories-nav')
        storynavcontent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')
    }, []);

    const [getData, setData] = useState([])
    const dataFetchedRef = useRef(false);
    const fetchData = () => {
        try {
            axios.get(baseUrl + "/all-stories/").then((res) => {
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


    const deleteStory = (id) => {
        try {
            axios.delete(baseUrl + "/delete-story/"+id+"/").then(window.location.reload());
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
                        <h1>All Stories</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                                <li className="breadcrumb-item active">All Stories</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="tab-content pt-2" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <section className="section dashboard">
                                <div className="row align-items-top">
                                    <div className="row">
                                        {getData && getData.slice(0).reverse().map((d, index) =>
                                            <>
                                                <div className="card d-flex col-md-3 p-2" key={index}>
                                                    {
                                                        d.type == 'image' &&
                                                        <div>
                                                            <img
                                                                className="d-block w-100"
                                                                src={image_base_url + d.img_video}
                                                                alt="Image One"
                                                            />
                                                        </div>
                                                    }
                                                    {
                                                        d.type === 'video' &&
                                                        <ReactPlayer
                                                            url={d.img_video}
                                                            width="100%"
                                                            height="100%"
                                                            controls
                                                        />
                                                    }
                                                    <div className="card-body">
                                                        <h5 className="card-title text-center">{d.title}</h5>
                                                        <p className="card-text text-center">
                                                            {/* <Link to={`/edit-story/${d.id}`} className="btn btn-info me-5">Edit</Link> */}
                                                            <button onClick={()=>deleteStory(d.id)} className="btn btn-danger ms-5">Delete</button>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='col-md-1'></div>
                                            </>
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

export default AllStories