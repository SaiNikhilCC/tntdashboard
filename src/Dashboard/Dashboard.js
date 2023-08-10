import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import baseUrl from '../Variables';
import { useState } from 'react';
import { useRef } from 'react';
import image_base_url from '../ImageVariable';

const Dashboard = () => {

  const dataFetchedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [users, setUsers] = useState([]);


  const [orderAnalytics, setOrderAnalytics] = useState([]);


  // -----------------------------------------------  Calculating Total Revenue -----------------------------------------------  
  let totalAmount = 0;
  if (orders && orders.length > 0) {
    totalAmount = orders.reduce(
      (accumulator, order) => accumulator + order.total_amount,
      0
    );
  }
  let formattedAmount = totalAmount.toLocaleString('en-IN');
  // -----------------------------------------------  End of Calculating Total Revenue -----------------------------------------------  

  const fetchData = () => {
    try {
      axios.get(baseUrl + '/all-orders/').then(res => {
        setOrders(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };


  const fetchAnalyticsData = () => {
    try {
      axios.get(baseUrl + '/orders-data-for-dashboard/').then(res => {
        setOrderAnalytics(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };



  const fetchTopSelling = () => {
    try {
      axios.get(baseUrl + '/top-selling-products/').then(res => {
        setTopSelling(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUsersData = () => {
    try {
      axios.get(baseUrl + '/all-users/').then(res => {
        setUsers(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let token = localStorage.getItem('admin_token')
    if (token == null) {
      navigate('/')
    }
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
    fetchTopSelling();
    fetchUsersData();
    fetchAnalyticsData();
  })

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item ">The Neon Tribe</li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}
        <section className="section dashboard">
          <div className="row">
            {/* <!-- Left side columns --> */}
            <div className="col-lg-12">
              <div className="row">
                {/* <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">Sales</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6 className='ms-2'>{orders.length}</h6>
                          {/* <span className="text-success small pt-1 fw-bold"></span> <span className="text-muted small pt-2 ps-1">placed so far</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}
                {/* <!-- Revenue Card --> */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title">Revenue</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-rupee"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{formattedAmount}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Revenue Card --> */}
                {/* <!-- Customers Card --> */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">Customers</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6 className='ms-2'>{users.length}</h6>
                          {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Customers Card --> */}
                {/* <!-- Reports --> */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card info-card delivered-card">
                    <div className="card-body">
                      <h5 className="card-title">Delivered</h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-truck"></i>
                        </div>
                        <div className="ps-3">
                          <h6 className='ms-2'>{orderAnalytics.delivered}</h6>
                          {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Reports --> */}
                {/* <!-- Recent Sales --> */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">Recent Sales</h5>
                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">User Number</th>
                            <th scope="col">No.of Products</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Order Placed Date</th>
                            <th scope="col">Status</th>
                            {/* <td><a href="#" className="text-primary">At praesentium minu</a></td> */}
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.slice(0, 5).map((row, index) => (
                              <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.user.name}</td>
                                <td>{row.user.phone}</td>
                                <td>{row.order_items.length}</td>
                                <td>{row.payment_done ? "Done" : "Not Yet"}</td>
                                <td>{row.order_placedAt.slice(0, 10)}</td>
                                <td>
                                  <>
                                    {row.order_status === "1" && <span className='badge bg-info'>Placed</span>}
                                    {row.order_status === "2" && <span className='badge bg-info'>Confirmed</span>}
                                    {row.order_status === "3" && <span className='badge bg-info'>Shipped</span>}
                                    {row.order_status === "4" && <span className='badge bg-info'>On The Way</span>}
                                    {row.order_status === "5" && <span className='badge bg-success'>Delivered</span>}
                                    {row.order_status === "20" && <span className='badge bg-warning'>Request For Cancel</span>}
                                    {row.order_status === "10" && <span className='badge bg-warning'>Request For Return</span>}
                                    {row.order_status === "200" && <span className='badge bg-danger'>Cancelled</span>}
                                    {row.order_status === "100" && <span className='badge bg-danger'>Returned</span>}
                                  </>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- End Recent Sales --> */}
              </div>
            </div>
            {/* <!-- End Left side columns --> */}
            {/* <!-- Right side columns --> */}

            <div className="col-12">
              <div className="card top-selling overflow-auto">
                <div className="card-body pb-0">
                  <h5 className="card-title">Top Selling</h5>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Preview</th>
                        <th scope="col">Product</th>
                        <th scope="col">Code</th>
                        <th scope="col">Category</th>
                        <th scope="col">Sub-Category</th>
                        <th scope="col">Sold</th>
                        <th scope="col">Liked</th>
                        <th scope="col">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSelling && topSelling.slice(-5).reverse().map((row, index) =>
                        <tr key={index}>
                          <th scope="row"><Link to={`/product-details/${row.id}`}><img src={image_base_url + row.thumbnail} alt="" /></Link></th>
                          <td>{row.product_title}</td>
                          <td>{row.sku_code}</td>
                          <td>{row.category.category}</td>
                          <td>{row.sub_category.sub_category}</td>
                          <td>{row.no_of_orders}</td>
                          <td>{row.no_of_wishlists}</td>
                          <td>{row.rating}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!-- End Top Selling --> */}
          </div>
        </section>
      </main>
    </>

  )
}

export default Dashboard





