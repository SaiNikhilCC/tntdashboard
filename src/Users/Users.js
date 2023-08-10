import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import baseUrl from '../Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { CSVLink } from 'react-csv';
import CsvDownloadButton from 'react-json-to-csv';
import image_base_url from '../ImageVariable';

const Users = () => {

  const [filteredOrderData, setFilteredUsersData] = useState([]);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const allusers = document.getElementById('allusers')
    allusers.classList.add('active')

    const products = document.getElementById('users')
    products.classList.remove('collapsed')

    const prodnavContent = document.getElementById('users-nav')
    prodnavContent.classList.add('show')

    const dashboard = document.getElementById('dashboard')
    dashboard.classList.add('collapsed')
  }, []);
  
  const columns = [
    {
      name: 'User ID',
      cell: row => <div className='row ms-2'>{row.uid.slice(10)}</div>,
    },
    {
      name: 'Name',
      cell: row => <div className='row ms-2'>{row.name}</div>,
    },
    {
      name: 'User Contact No',
      cell: row => <div className='row ms-2'>{row.phone}</div>,
    },
    {
      name: 'Registered On',
      cell: row => <div className='row ms-2'>{row.created_date}</div>,
    }
  ];

  const fetchData = () => {
    try {
      axios.get(baseUrl + '/all-users/').then(res => {
        setUsers(res.data.data);
        setFilteredUsersData(res.data.data);
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

  const columnsss = [
    {
      label: 'UID',
      key: 'uid',
    },
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Phone',
      key: 'phone',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Registered On',
      key: 'created_date',
    }
  ];

  const csvData = users.map(user => {
    return {
      'uid': user.uid,
      'name': user.name,
      'phone':user.phone ,
      'email': user.email,
      'registered':user.created_date
    };
  });

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="card-body">
          <div className="pagetitle">
            <div className='row'>
              <div className="col-lg-10">
                <h1>users</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/dashboard"}>Dashboard</Link> </li>
                    <li className="breadcrumb-item"><Link to={"/all-product"}>All users</Link> </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          {/* <ParticularProductImages /> */}

          <DataTable
            title="All users"
            fixedHeader
            columns={columns}
            data={filteredOrderData.slice(0).reverse()}
            pagination
            fixedHeaderScrollHeight='450px'
            highlightOnHover
            subHeader
            subHeaderComponent={
              <>
                <input
                  type="text"
                  placeholder="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='w-25 form-control me-5'
                />
                <div className='ms-5'>
                  <CSVLink data={csvData} headers={columnsss} filename="users.csv">
                    <div className='btn btn-primary'>Download</div>
                  </CSVLink>
                </div>
              </>
            }
            subHeaderAlign="left"
          />
        </div>
      </main>
    </div>
  )
}

export default Users







