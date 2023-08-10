import React from 'react';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import baseUrl from '../../Variables';
import { Modal, Button } from 'react-bootstrap';
import image_base_url from '../../ImageVariable';

const Shapes = () => {
    useEffect(() => {
        const addcategory = document.getElementById('shapes');
        addcategory.classList.add('active');

        const category = document.getElementById('customs');
        category.classList.remove('collapsed');

        const CatContent = document.getElementById('customs-nav');
        CatContent.classList.add('show');

        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('collapsed');
    });

    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shapeData, setShapeData] = useState({
        shape_name: '',
        shape_image: '',
        shape_price: '',
    });

    const handleChange = (event) => {
        setShapeData({
            ...shapeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        setShapeData({
            ...shapeData,
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
        });
        const formData = new FormData();
        formData.append('shape_image', shapeData.shape_image);
        formData.append('shape_name', shapeData.shape_name);
        formData.append('shape_price', shapeData.shape_price);

        try {
            axios
                .post(baseUrl + '/add-shape/', formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Image Uploaded Succesfully...',
                        width: '550px',
                    });
                    fetchData();
                    handleClose();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = () => {
        try {
            axios.get(baseUrl + '/all-shapes/').then((res) => {
                setData(res.data.data);
                setFilteredData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteShape = (id) => {
        try {
            axios.delete(baseUrl + '/delete-shape/' + id + '/').then((res) => {
                fetchData();
            });
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            width: '60px',
            style: {
                fontWeight: 'bold',
            },
        },
        {
            name: 'Shape Name',
            selector: (row) => row.shape_name,
            sortable: true,
        },
        {
            name: 'Shape Image',
            cell: (row) => (
                <div>
                    <img width="100" src={image_base_url + row.shape_image} alt="Shape" />
                </div>
            ),
        },
        {
            name: 'Price',
            selector: (row) => row.shape_price,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                            deleteShape(row.id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const result = data.filter((d) => {
            return d.shape_name.toLowerCase().includes(search.toLowerCase());
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
                            <li className="breadcrumb-item">
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item">Customizer</li>
                            <li className="breadcrumb-item active">Shapes</li>
                        </ol>
                    </nav>
                    <div className="col-lg-2">
                        <Button
                            variant="primary"
                            className="btn btn-primary d-none d-lg-block m-l-15 text-white"
                            onClick={handleShow}
                        >
                            <i className="fa fa-plus-circle"></i>Add Shapes
                        </Button>
                    </div>
                </div>
                <section className="section dashboard">
                    <Modal className="custom-modal" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>
                                <h4 className="modal-title" id="myModalLabel">
                                    Add New Shape
                                </h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form-horizontal">
                                <div className="row mt-1">
                                    <div className="col-md-5">
                                        <label htmlFor="shape_name" className="form-label">
                                            Shape Name
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <input
                                            name="shape_name"
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Shape Name"
                                            required=""
                                        />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-5">
                                        <label htmlFor="shape_price" className="form-label">
                                            Shape Price
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <input
                                            name="shape_price"
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Shape Price"
                                            required=""
                                        />
                                    </div>
                                </div>
                                <div className="row mt-1">
                                    <div className="col-md-5">
                                        <label htmlFor="shape_image" className="form-label">
                                            Shape Image
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <input
                                            name="shape_image"
                                            onChange={handleFileChange}
                                            className="form-control"
                                            type="file"
                                            accept=".png"
                                        />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="primary"
                                className="btn btn-info waves-effect"
                                onClick={formSubmit}
                            >
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                className="btn btn-default waves-effect"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="card ">
                        <div className="card-body">
                            <DataTable
                                fixedHeader
                                columns={columns}
                                data={filteredData.slice(0)}
                                pagination
                                fixedHeaderScrollHeight="450px"
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input
                                        type="text"
                                        placeholder="Search Shape Name"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-25 form-control"
                                    />
                                }
                                subHeaderAlign="left"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Shapes;


