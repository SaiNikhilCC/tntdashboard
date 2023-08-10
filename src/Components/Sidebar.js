import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {



    return (
        < aside id="sidebar" className="sidebar" >
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link" id="dashboard" to={"/dashboard"}>
                        <i className="bi bi-grid"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>
                {/* <!-- End Dashboard Nav --> */}

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#components-nav" id="products" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i><span>Products</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addproduct" to={"/add-product"}>
                                <i className="bi bi-circle"></i><span>Add Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allproducts" to={"/all-product"}>
                                <i className="bi bi-circle"></i><span>All Products</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#stories-nav" id='stories' data-bs-toggle="collapse" href="#">
                        <i className="bi bi-bar-chart"></i><span>Stories</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="stories-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addstory" to={"/add-story"}>
                                <i className="bi bi-circle"></i><span>Add Story</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allstory" to={"/all-stories"}>
                                <i className="bi bi-circle"></i><span>All Stories</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#banners-nav" id='banners' data-bs-toggle="collapse" href="#">
                        <i className="bi bi-flag"></i><span>Banners</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="banners-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addbanner" to={"/add-banner"}>
                                <i className="bi bi-circle"></i><span>Add Banner</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allbanners" to={"/all-banners"}>
                                <i className="bi bi-circle"></i><span>All Banners</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" id="orders" data-bs-target="#orders-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i><span>Orders</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="orders-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="allorders" to={"/all-orders"}>
                                <i className="bi bi-circle"></i><span>All Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allcustomizerorders" to={"/all-customizer-orders"}>
                                <i className="bi bi-circle"></i><span>All Customizer Orders</span>
                            </Link>
                        </li>

                        <li>
                            <Link id="alltemplateorders" to={"/all-template-orders"}>
                                <i className="bi bi-circle"></i><span>All Template Orders</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" id="category" data-bs-target="#cat-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-layout-text-window-reverse"></i><span>Categories</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="cat-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addcategory" to="/add-category">
                                <i className="bi bi-circle"></i><span>Add Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allcategories" to={"/all-categories"}>
                                <i className="bi bi-circle"></i><span>All Categories</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" id="subcategory" data-bs-target="#sub-cat-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-layout-text-window-reverse"></i><span>Sub-Categories</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="sub-cat-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addsubcategory" to="/add-sub-category">
                                <i className="bi bi-circle"></i><span>Add Sub Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allsubcategories" to={"/all-sub-categories"}>
                                <i className="bi bi-circle"></i><span>All Sub Categories</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" id="coupons" data-bs-target="#coupons-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-ticket-detailed"></i><span>Coupons</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="coupons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="addcoupon" to={"/add-coupon"}>
                                <i className="bi bi-circle"></i><span>Add Coupon</span>
                            </Link>
                        </li>
                        <li>
                            <Link id="allcoupons" to="/all-coupons">
                                <i className="bi bi-circle"></i><span>All Coupons</span>
                            </Link>
                        </li>
                    </ul>
                </li>


                <li className="nav-item">
                    <a className="nav-link collapsed" id="users" data-bs-target="#users-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i><span>Users</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="users-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="allusers" to={"/all-users"}>
                                <i className="bi bi-circle"></i><span>All Users</span>
                            </Link>
                        </li>
                    </ul>
                </li>



                



                <li className="nav-item">
                    <a className="nav-link collapsed" id="customs" data-bs-target="#customs-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i><span>Customizer</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="customs-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="fonts" to={"/fonts"}>
                                <i className="bi bi-circle"></i><span>Fonts</span>
                            </Link>
                        </li>
                    
                        <li>
                            <Link id="colors" to={"/colors"}>
                                <i className="bi bi-circle"></i><span>Colors</span>
                            </Link>
                        </li>
                    
                        <li>
                            <Link id="shapes" to={"/shapes"}>
                                <i className="bi bi-circle"></i><span>Shapes</span>
                            </Link>
                        </li>
                    
                        <li>
                            <Link id="emojis" to={"/emojis"}>
                                <i className="bi bi-circle"></i><span>Emojis</span>
                            </Link>
                        </li>

                        <li>
                            <Link id="background_images" to={"/background-images"}>
                                <i className="bi bi-circle"></i><span>Background Images</span>
                            </Link>
                        </li>
                    </ul>


                </li>

                <li className="nav-item">
                    <a className="nav-link collapsed" id="templates" data-bs-target="#templates-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i><span>Templates</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="templates-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link id="alltemplates" to={"/all-templates"}>
                                <i className="bi bi-circle"></i><span>All Templates</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                
                <li className="nav-item">
                    <Link className="nav-link collapsed" id="chats" to={"/chat"}>
                    <i class="bi bi-chat"></i>
                        <span>Chats</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" id="notifications" to={"/notifications"}>
                    <i class="bi bi-bell"></i>
                        <span>Notifications</span>
                    </Link>
                </li>

                

                

                {/* <!-- End Charts Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-gem"></i><span>Icons</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <a href="icons-bootstrap.html">
                                <i className="bi bi-circle"></i><span>Bootstrap Icons</span>
                            </a>
                        </li>
                        <li>
                            <a href="icons-remix.html">
                                <i className="bi bi-circle"></i><span>Remix Icons</span>
                            </a>
                        </li>
                        <li>
                            <a href="icons-boxicons.html">
                                <i className="bi bi-circle"></i><span>Boxicons</span>
                            </a>
                        </li>
                    </ul>
                </li> */}

                {/* <!-- End Icons Nav --> */}

                {/* <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="users-profile.html">
                        <i className="bi bi-person"></i>
                        <span>Profile</span>
                    </a>
                </li> */}

                {/* <!-- End Profile Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-faq.html">
                        <i className="bi bi-question-circle"></i>
                        <span>F.A.Q</span>
                    </a>
                </li> */}

                {/* <!-- End F.A.Q Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-contact.html">
                        <i className="bi bi-envelope"></i>
                        <span>Contact</span>
                    </a>
                </li> */}

                {/* <!-- End Contact Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-register.html">
                        <i className="bi bi-card-list"></i>
                        <span>Register</span>
                    </a>
                </li> */}

                {/* <!-- End Register Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-login.html">
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>Login</span>
                    </a>
                </li> */}

                {/* <!-- End Login Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-error-404.html">
                        <i className="bi bi-dash-circle"></i>
                        <span>Error 404</span>
                    </a>
                </li> */}

                {/* <!-- End Error 404 Page Nav --> */}

                {/* <li className="nav-item">
                    <a className="nav-link collapsed" href="pages-blank.html">
                        <i className="bi bi-file-earmark"></i>
                        <span>Blank</span>
                    </a>
                </li> */}



                {/* <!-- End Blank Page Nav --> */}

            </ul>

        </aside >
    );
};

export default Sidebar;



