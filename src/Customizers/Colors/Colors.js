import React from 'react'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import baseUrl from '../../Variables';
import { useRef } from 'react';
import { Modal, Button } from "react-bootstrap";


const Colors = () => {

    useEffect(() => {
        const addcategory = document.getElementById('colors')
        addcategory.classList.add('active')

        const category = document.getElementById('customs')
        category.classList.remove('collapsed')

        const CatContent = document.getElementById('customs-nav')
        CatContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')
    });

    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([])


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fileData, setFileData] = useState({
        color_name: '',
        color_code: ''
    })

    const handleChange = (event) => {
        setFileData({
            ...fileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setFileData({
            ...fileData,
            [event.target.name]: event.target.files[0],
        });
    };

    const formSubmit = () => {
        Swal.fire({
            title: 'Uploading...',
            icon: 'info',
            toast: true,
            timer: 5000,
            position: 'bottom-right',
            timerProgressBar: true,
            showConfirmButton: true,
        })
        const formData = new FormData();
        formData.append("color_name", fileData.color_name);
        formData.append("color_code", fileData.color_code);

        try {
            axios.post(baseUrl + "/add-colors/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Color Added Successfully...',
                    width: '550px',
                })
                fetchData();
                handleClose();
            });
        } catch (error) {
            console.log(error);
        }
    };

    const dataFetchedRef = useRef(false);
    const fetchData = () => {
        try {
            axios.get(baseUrl + "/all-colors/").then((res) => {
                setData(res.data.data);
                setFilteredData(res.data.data);
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


    const deleteColor = (id) => {
        try {
            axios.delete(baseUrl + "/delete-color/" + id + "/").then((res) => { fetchData() });
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "60px",
            style: {
                fontWeight: 'bold',
            }
        },
        {
            name: "Color Name",
            selector: (row) => row.color_name,
            sortable: true,
        },
        {
            name: "Color Code",
            selector: (row) => row.color_code,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) =>
                <div>
                    <button className='btn btn-sm btn-danger' onClick={(e) => { deleteColor(row.id) }}>Delete</button>
                </div>
        }

    ]

    useEffect(() => {
        const result = data.filter((d) => {
            try {
                const regex = new RegExp(search, 'i');
                return regex.test(d.color_name);
            } catch (error) {
                return false;
            }
        });
        setFilteredData(result);
    }, [search]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>All Categories</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item">Customizer</li>
                            <li className="breadcrumb-item active">Colors</li>
                        </ol>
                    </nav>
                    <div className="col-lg-2">
                        <Button variant="primary" className="btn btn-primary d-none d-lg-block m-l-15 text-white" onClick={handleShow}>
                            <i className="fa fa-plus-circle"></i>Add Colors
                        </Button>
                    </div>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <Modal className="custom-modal" show={show} onHide={handleClose} >
                        <Modal.Header >
                            <Modal.Title>
                                <h4 className="modal-title" id="myModalLabel">Add New Color</h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form-horizontal">
                                <div className='row mt-1'>
                                    <div className="col-md-5">
                                        <label htmlFor="color_name" className="form-label">Color Name</label>
                                    </div>
                                    <div className="col-md-7">
                                        <input name="color_name" onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Color Name" required="" />
                                    </div>
                                </div>
                                {/* <div className='row mt-1'>
                                    <div className='col-md-5'>
                                        <label htmlFor="color_code" className="form-label">Color Code</label>
                                    </div>
                                    <div className='col-md-7'>
                                        <input name="color_code" onChange={handleChange} className='form-control' type="color" />
                                    </div>
                                </div> */}

                                <div className='row mt-1'>
                                    <div className='col-md-5'>
                                        <label for="color_code" className="form-label">Color Code</label>
                                    </div>
                                    <div className='col-md-7'>
                                        <select name="color_code" onChange={handleChange} className="form-select">
                                            <option value="">Select Color</option>
                                            <option value="ff0000">Red</option>
                                            <option value="ffff00">Yellow</option>
                                            <option value="0000ff">Blue</option>
                                            <option value="00ff00">Green</option>
                                            <option value="d84daa">Pink</option>
                                            <option value="eedfc8">Warm White</option>
                                            <option value="ffffff">White</option>
                                            <option value="4c94a8">Icy Blue</option>
                                            <option value="ffa500">Orange</option>
                                            <option value="800080">Purple</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" className="btn btn-info waves-effect" onClick={formSubmit} >
                                Save
                            </Button>
                            <Button variant="danger" className="btn btn-default waves-effect" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="card ">
                        <div className="card-body">
                            <DataTable
                                // title="All Reporters"
                                fixedHeader
                                columns={columns}
                                data={filteredData.slice(0)}
                                pagination
                                fixedHeaderScrollHeight='450px'
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input
                                        type="text"
                                        placeholder="Search Colour Name"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className='w-25 form-control'
                                    />}
                                subHeaderAlign="left"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Colors

