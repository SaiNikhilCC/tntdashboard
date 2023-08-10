import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import baseUrl from '../../Variables';
import { Modal, Button } from 'react-bootstrap';
import image_base_url from '../../ImageVariable';
import axios from 'axios';

const Emojis = () => {
    useEffect(() => {
        const addcategory = document.getElementById('emojis');
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
        emoji: '',
        emoji_price: '',
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
        formData.append('emoji', shapeData.emoji);
        formData.append('emoji_price', shapeData.emoji_price);

        try {
            axios
                .post(baseUrl + '/add-emoji/', formData, {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Image Uploaded Successfully...',
                        width: '550px',
                    });
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
            axios.get(baseUrl + '/all-emojis/').then((res) => {
                setData(res.data.data);
                setFilteredData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        fetchData();
    }, []);

    const deleteDistrict = (id) => {
        try {
            axios
                .delete(baseUrl + '/delete-emoji/' + id + '/')
                .then((res) => {
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
            name: 'Emoji',
            cell: (row) => (
                <div>
                    <img width="100" src={image_base_url + row.emoji} alt={row.id} />
                </div>
            ),
        },
        {
            name: 'Price',
            selector: (row) => row.emoji_price,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                            deleteDistrict(row.id);
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
            return d.category.toLowerCase().match(search.toLowerCase());
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
                                <Link to={'/dashboard'}>Dashboard</Link>{' '}
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
                            <i className="fa fa-plus-circle"></i>Add Emoji
                        </Button>
                    </div>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
                    <Modal className="custom-modal" show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>
                                <h4 className="modal-title" id="myModalLabel">
                                    Add New Emoji
                                </h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="form-horizontal">
                                <div className="row mt-1">
                                    <div className="col-md-5">
                                        <label htmlFor="emoji" className="form-label">
                                            Emoji
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <input
                                            name="emoji"
                                            onChange={handleFileChange}
                                            className="form-control"
                                            type="file"
                                            accept=".png"
                                        />
                                    </div>
                                </div>

                                <div className="row mt-1">
                                    <div className="col-md-5">
                                        <label htmlFor="emoji_price" className="form-label">
                                            Emoji Price
                                        </label>
                                    </div>
                                    <div className="col-md-7">
                                        <input
                                            name="emoji_price"
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
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
                                // title="All Reporters"
                                fixedHeader
                                columns={columns}
                                data={filteredData.slice(0)}
                                pagination
                                fixedHeaderScrollHeight="600px"
                                highlightOnHover
                                // subHeader
                                // subHeaderComponent={
                                //     <input
                                //         type="text"
                                //         placeholder="search"
                                //         value={search}
                                //         onChange={(e) => setSearch(e.target.value)}
                                //         className="w-25 form-control"
                                //     />
                                // }
                                subHeaderAlign="left"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Emojis;





