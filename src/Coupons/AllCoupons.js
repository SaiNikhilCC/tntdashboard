import React from 'react'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import baseUrl from '../Variables';
import { useRef } from 'react';

const AllCoupons = () => {

    useEffect(() => {
        const addcategory = document.getElementById('allcoupons')
        addcategory.classList.add('active')

        const category = document.getElementById('coupons')
        category.classList.remove('collapsed')

        const CatContent = document.getElementById('coupons-nav')
        CatContent.classList.add('show')

        const dashboard = document.getElementById('dashboard')
        dashboard.classList.add('collapsed')
    });

    let navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        try {
            axios.get(baseUrl + "/get-coupons/").then((res) => {
                setData(res.data.data);
                setFilteredData(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteDistrict = (id) => {
        try {
            axios.delete(baseUrl + "/delete-coupon/"+id+"/").then(window.location.reload());
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
            name: "Coupon Code",
            selector: (row) => row.coupon_code,
            sortable: true,
        },
        {
            name: "No of Coupons",
            selector: (row) => row.no_of_coupons,
            sortable: true,
        },
        {
            name: "Discount Percentage",
            selector: (row) => row.discount_percentage + "%",
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) =>
                <div>
                    <Link className='btn btn-sm btn-info' to={`/edit-coupon/${row.id}`} >Edit</Link>
                    <button className='ms-2 btn btn-sm btn-danger' onClick={(e) => {deleteDistrict(row.id)} }>Delete</button>
                </div>
        }

    ]



    useEffect(() => {
        const result = data.filter(d => {
            return d.category.toLowerCase().match(search.toLowerCase());
        })
        setFilteredData(result)
    }, [search])



    return (

        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>All Coupons</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                            <li className="breadcrumb-item active">All Coupons</li>
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
                                data={filteredData.slice(0).reverse()}
                                pagination
                                fixedHeaderScrollHeight='450px'
                                highlightOnHover
                                subHeader
                                subHeaderComponent={
                                    <input
                                        type="text"
                                        placeholder="search"
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

export default AllCoupons