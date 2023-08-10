import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import baseUrl from '../Variables';

const AllOrders = () => {
  const [filteredOrderData, setFilteredOrderData] = useState([]);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allorders = document.getElementById('allorders')
    allorders.classList.add('active')

    const products = document.getElementById('orders')
    products.classList.remove('collapsed')

    const prodnavContent = document.getElementById('orders-nav')
    prodnavContent.classList.add('show')

    const dashboard = document.getElementById('dashboard')
    dashboard.classList.add('collapsed')

  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl + '/all-orders/');
      setOrders(response.data.data);
      setFilteredOrderData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = search.toLowerCase();
    const filteredData = orders.filter(
      (order) =>
        String(order.id).toLowerCase().includes(keyword) ||
        order.user.name.toLowerCase().includes(keyword) ||
        order.user.phone.toLowerCase().includes(keyword)
    );
    setFilteredOrderData(filteredData);
  };

  const handleResetSearch = (e) => {
    e.preventDefault();
    setSearch('');
    setFilteredOrderData(orders);
  };

  const columns = [
    {
      name: 'Order ID',
      cell: row => <div className='row ms-2'>{row.id}</div>,
    },
    {
      name: 'User ID',
      cell: row => <div className='row'>{row.user.name}</div>,
    },
    {
      name: 'User Contact No',
      cell: row => <div className='row'>{row.user.phone}</div>,
    },
    {
      name: 'Status',
      cell: row => (
        <div className='row'>
          {row.order_status === "1" && <p className='badge bg-info'>Placed</p>}
          {row.order_status === "2" && <p className='badge bg-info'>Confirmed</p>}
          {row.order_status === "3" && <p className='badge bg-info'>Shipped</p>}
          {row.order_status === "4" && <p className='badge bg-info'>On The Way</p>}
          {row.order_status === "5" && <p className='badge bg-success'>Delivered</p>}
          {row.order_status === "20" && <p className='badge bg-warning'>Request For Cancel</p>}
          {row.order_status === "10" && <p className='badge bg-warning'>Request For Return</p>}
          {row.order_status === "200" && <p className='badge bg-danger'>Cancelled</p>}
          {row.order_status === "100" && <p className='badge bg-danger'>Returned</p>}
        </div>
      ),
    },
    {
      name: 'no.of items',
      cell: row => <div className='row ms-2'>{row.order_items.length}</div>,
    },
    {
      name: 'Payment Method',
      cell: row => <div className='row ms-2'>{row.payment_method}</div>,
    },
    {
      name: 'Payment Status',
      cell: row => <div className='row ms-2'>{row.payment_done ? "Done" : "Not Yet"}</div>,
    },
    {
      name: 'Coupon',
      cell: row => <div className='row ms-2'>{row.coupon.id ? row.coupon.id : "No Coupon"}</div>,
    },
    {
      name: 'Order Placed Date',
      cell: row => <div className='row ms-2'>{row.order_placedAt.slice(0, 10)}</div>,
    },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex'>
          <Link className='btn btn-primary btn-sm' to={`/particular-order-details/${row.id}/`}>View</Link>
          {/* <Link className='ms-1 btn btn-sm btn-info' to={`/manage-order/${row.id}/`}>Edit</Link> */}
        </div>
      ),
    },
  ];

  const columnsss = [
    {
      label: 'Order ID',
      key: 'id',
    },
    {
      label: 'Status',
      key: 'order_status',
    },
    {
      label: 'No. of Items',
      key: 'order_items.length',
    },
    {
      label: 'Payment Method',
      key: 'order.payment_method',
    },
    {
      label: 'Payment Status',
      key: 'order.payment_done',
    },
    {
      label: 'Is Delivered',
      key: 'order.is_delivered',
    },
    {
      label: 'Order Placed Data',
      key: 'order.createdAt'
    },
    {
      label: 'Order Updated Data',
      key: 'order.updatedAt'
    },
    {
      label: 'User ID',
      key: 'user.uid',
    },
    {
      label: 'User Name',
      key: 'user.name',
    },
    {
      label: 'User Email',
      key: 'user.email',
    },
    {
      label: 'Registered Phone number',
      key: 'user.phone',
    },
    {
      label: 'H.no',
      key: 'address.hno',
    },
    {
      label: 'Area & Street',
      key: 'address.area_street',
    },
    {
      label: 'City',
      key: 'address.city',
    },
    {
      label: 'Pincode',
      key: 'address.pincode',
    },
    {
      label: 'State',
      key: 'address.state',
    },
    {
      label: 'Address Full Name',
      key: 'address.full_name',
    },
    {
      label: 'Mobile Number',
      key: 'address.mobile',
    },
    {
      label: 'Alternate Mobile Number',
      key: 'address.alternate_mobile',
    },
    {
      label: 'Coupon ID',
      key: 'coupon.id',
    },
  ];

  const csvData = orders.map(order => {
    return {
      'id': order.id,
      'order_status': order.order_status,
      'order_items.length': order.order_items.length,
      'order.payment_method': order.payment_method,
      'order.payment_done': order.payment_done,
      'order.is_delivered': order.is_delivered,
      'order.createdAt': order.createdAt,
      'order.updatedAt': order.updatedAt,
      'user.uid': order.user.uid,
      'user.name': order.user.name,
      'user.email': order.user.email,
      'user.phone': order.user.phone,
      'address.hno': order.address.hno,
      'address.area_street': order.address.area_street,
      'address.city': order.address.city,
      'address.is_home': order.address.is_home,
      'address.pincode': order.address.pincode,
      'address.full_name': order.address.full_name,
      'address.mobile': order.address.mobile,
      'address.alternate_mobile': order.address.alternate_mobile,
      'address.state': order.address.state,
      'coupon.id': order.coupon.id,
    };
  });

  return (
    <div>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="card-body">
          <div className="pagetitle">
            <div className="row">
              <div className="col-lg-10">
                <h1>Orders</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={"/all-product"}>All Orders</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <DataTable
            title="All Orders"
            fixedHeader
            columns={columns}
            data={filteredOrderData.slice(0)}
            pagination
            fixedHeaderScrollHeight='450px'
            highlightOnHover
            subHeader
            subHeaderComponent={
              <div className="search-bar">
                <form className="form-inline">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Order ID, Phone Number or User Name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                      </button>
                      <button className="btn btn-secondary ms-2" onClick={handleResetSearch}>
                        Reset
                      </button>
                    </div>
                    <div className="csv-link">
                      <CSVLink data={csvData} headers={columnsss} filename="orders.csv">
                        <button className="btn btn-primary">Download CSV</button>
                      </CSVLink>
                    </div>
                  </div>
                </form>
              </div>
            }
            subHeaderAlign="left"
          />
        </div>
      </main>
    </div>
  );
};

export default AllOrders;


