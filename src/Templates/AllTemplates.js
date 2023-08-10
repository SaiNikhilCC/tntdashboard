import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import baseUrl from '../Variables';
import image_base_url from '../ImageVariable';

const AllTemplates = () => {
    useEffect(() => {
        const addcategory = document.getElementById('alltemplates');
        addcategory.classList.add('active');

        const category = document.getElementById('templates');
        category.classList.remove('collapsed');

        const CatContent = document.getElementById('templates-nav');
        CatContent.classList.add('show');

        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('collapsed');
    }, []);

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = () => {
        try {
            axios.get(baseUrl + '/all-customizable-templates/').then(res => {
                setData(res.data.data);
                setFilteredData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDistrict = (id) => {
        try {
            axios.delete(baseUrl + '/delete-template/' + id + '/').then(res => {
                fetchData();
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (filteredData.length === 0) fetchData();
    }, [filteredData]);

    useEffect(() => {
        const result = data.filter((d) => {
          try {
            const regex = new RegExp(search, 'i');
            return regex.test(d.title);
          } catch (error) {
            return false;
          }
        });
        setFilteredData(result);
      }, [search]);

    const [shapeData, setShapeData] = useState({
        emoji: ''
    })


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
        })
        const formData = new FormData();
        formData.append("emoji", shapeData.emoji);

        try {
            axios.post(baseUrl + "/add-template/", formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Image Uploaded Succesfully...',
                    width: '550px',
                })
                fetchData();
                handleClose();
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
            name: 'Title',
            cell: (row) => (
                <div>
                    <p>{row.title}</p>
                </div>
            ),
        },
        {
            name: 'Template',
            cell: (row) => (
                <div>
                    <img width='100' src={image_base_url + row.template_image} />
                </div>
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className='btn btn-sm btn-danger'
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

    return (
        <>
            <Header />
            <Sidebar />
            <main id='main' className='main'>
                <div className='pagetitle'>
                    <h1>All Templates</h1>
                    <nav>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <Link to={'/dashboard'}>Dashboard</Link>{' '}
                            </li>
                            <li className='breadcrumb-item'>Templates</li>
                            <li className='breadcrumb-item active'>All Templates</li>
                        </ol>
                    </nav>
                    <div className='col-lg-2'>
                        <Button
                            variant='primary'
                            className='btn btn-primary d-none d-lg-block m-l-15 text-white'
                            onClick={handleShow}
                        >
                            <i className='fa fa-plus-circle'></i>Add Template
                        </Button>
                    </div>
                </div>
                <section className='section dashboard'>
                    <Modal className='custom-modal' show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title>
                                <h4 className='modal-title' id='myModalLabel'>
                                    Add New Template
                                </h4>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className='form-horizontal'>
                                <div className='row mt-1'>
                                    <div className='col-md-5'>
                                        <label for='emoji' className='form-label'>
                                            Template Name
                                        </label>
                                    </div>
                                    <div className='col-md-7'>
                                        <input
                                            name='emoji'
                                            onChange={handleFileChange}
                                            className='form-control'
                                            type='file'
                                            accept='.png'
                                        />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant='primary'
                                className='btn btn-info waves-effect'
                                onClick={formSubmit}
                            >
                                Save
                            </Button>
                            <Button
                                variant='danger'
                                className='btn btn-default waves-effect'
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='card'>
                        <div className='card-body'>
                            <DataTable
                                fixedHeader
                                columns={columns}
                                data={filteredData.slice(0)}
                                pagination
                                fixedHeaderScrollHeight='450px'
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input
                                        type='text'
                                        placeholder='Search Template Name'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className='w-25 form-control'
                                    />
                                }
                                subHeaderAlign='left'
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AllTemplates;





