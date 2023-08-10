import React from 'react'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostNews from '../Admin/PostNews';

function AllNewsPosts() {
    const baseUrl = "http://127.0.0.1:8000/super-admin";
    // const baseUrl = "https://backend.time2time.news/super-admin";
    // const baseUrl = "https://backendtest.time2time.news/super-admin";

    let navigate = useNavigate();
    const super_admin_id = localStorage.getItem("super_admin_id");

    const [newsPosts, setNewsPosts] = useState([]);
    const [newsCategory, setNewsCategory] = useState([]);
    const [search, setSearch] = useState('');
    const [filterednewsposts, setfilterednewsposts] = useState([])

    useEffect(() => {
        try {
            axios.get(baseUrl + "/non-international-news-post-data/").then((res) => {
                setNewsPosts(res.data.data);
                setfilterednewsposts(res.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(newsPosts);

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
            name: "Title",
            width: "300px",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Category",
            selector: (row) => row.category.category,
            sortable: true,
        },
        
        {
            name: "State",
            selector: (row) => row.state.state_name,
            sortable: true,
            default:"None"
        },
        {
            name: "District",
            selector: (row) => row.district.district_name,
            sortable: true,
            default:"None"
        },
        {
            name: "Mandal",
            selector: (row) => row.mandal.mandal_name,
            sortable: true,
            default:"None"
        },
        {
            name: "Date",
            selector: (row) => row.created_date,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) =>
                <div className='flex'>
                    <Link to={"/edit-news-post/" + row.id} className='btn btn-sm btn-primary mt-1 me-2 '>Edit</Link>
                    <Link to={"/post-details/" + row.id} className='btn btn-sm btn-info mt-1 me-2 '>View</Link>
                </div>
        }
    ]

    useEffect(() => {
        const result = newsPosts.filter(newspost => {
            return newspost.title.toLowerCase().match(search.toLowerCase());
        })
        setfilterednewsposts(result)
    }, [search])

    return (
        <DataTable
            title="Latest News"
            fixedHeader
            columns={columns}
            data={filterednewsposts.slice(0).reverse()}
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
                />
            }
            subHeaderAlign="left"
        />
    )
}

export default AllNewsPosts









