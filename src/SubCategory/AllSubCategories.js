// import React from 'react'

// const AllSubCategories = () => {
//   return (
//     <div>AllSubCategories</div>
//   )
// }

// export default AllSubCategories


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

const AllSubCategories = () => {

  useEffect(() => {
    const addcategory = document.getElementById('allsubcategories')
    addcategory.classList.add('active')

    const category = document.getElementById('subcategory')
    category.classList.remove('collapsed')

    const CatContent = document.getElementById('sub-cat-nav')
    CatContent.classList.add('show')

    const dashboard = document.getElementById('dashboard')
    dashboard.classList.add('collapsed')
  });

  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {

    try {
      axios.get(baseUrl + "/all-sub-categories/").then((res) => {
        setData(res.res.data);
        setFilteredData(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + "/all-category/").then((res) => {
        setCategories(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }

  }, []);


  const handleCategoryChange = (event) => {
    try {
      axios.get(baseUrl + "/particular-category-sub-category-table/" + event.target.value + "/").then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteDistrict = (id) => {
    try {
      axios.delete(baseUrl + "/delete-sub-category/" + id + "/").then(window.location.reload());
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
      name: "Sub Category",
      selector: (row) => row.sub_category,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.category,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) =>
        <div>
          <button className='btn btn-sm btn-danger' onClick={(e) => { deleteDistrict(row.id) }}>Delete</button>
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
          <h1>All Sub Categories</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
              <li className="breadcrumb-item active">All Sub Category</li>
            </ol>
          </nav>
        </div>
        <div>
          <div className="col-md-4">
            <div className="row mb-3">
              <div className="col-sm-10">
                <select name="category" onChange={handleCategoryChange} className="form-select" required="">
                  <option value="">Select Category</option>
                  {categories && categories.map((cat, index) =>
                    <option key={index} value={cat.id}>{cat.category}</option>
                  )}
                </select>

              </div>
            </div>
          </div>
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
                // subHeader
                // subHeaderComponent={
                //   <input
                //     type="text"
                //     placeholder="search"
                //     value={search}
                //     onChange={(e) => setSearch(e.target.value)}
                //     className='w-25 form-control'
                //   />}
                // subHeaderAlign="left"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default AllSubCategories