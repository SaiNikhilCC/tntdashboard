

import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import baseUrl from '../Variables';
import image_base_url from '../ImageVariable';


const AllTemplateOrders = () => {

    useEffect(() => {
        const allorders = document.getElementById('alltemplateorders')
        allorders.classList.add('active')

        const products = document.getElementById('orders')
        products.classList.remove('collapsed')

        const prodnavContent = document.getElementById('orders-nav')
        prodnavContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')
    }, []);


    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    const dataFetchedRef = useRef(false);
    const fetchData = () => {
        try {
            axios.get(baseUrl + '/all-logo-orders/').then((res) => {
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
            name: 'Template',
            selector: (row) => row.template_product.title,
            sortable: true
        },
        {
            name: 'Logo',
            cell: (row) => (
                <div>
                    <img width="100" src={image_base_url + row.template_product.template_image} alt='img' />
                </div>
            ),
        },
        {
            name: 'Characters',
            selector: (row) => row.text,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Link to={`/template-order-details/${row.id}`} className="btn btn-sm btn-info">
                        View
                    </Link>
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
                    <h1>All Template Orders</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to={'/dashboard'}>Dashboard</Link>{' '}
                            </li>
                            <li className="breadcrumb-item">Templates</li>
                            <li className="breadcrumb-item active">Orders</li>
                        </ol>
                    </nav>
                </div>
                {/* <!-- End Page Title --> */}
                <section className="section dashboard">
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

export default AllTemplateOrders;





