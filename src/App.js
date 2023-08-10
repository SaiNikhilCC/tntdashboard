import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Authentication/Login';
import Dashboard from "./Dashboard/Dashboard";



import AddProduct from "./Products/AddProduct";
import AllProducts from "./Products/AllProducts";
import ProductDetails from "./Products/ProductDetails"
import EditProduct from "./Products/EditProduct";
import AllOrders from "./Orders/AllOrders";
import AddCategory from "./Category/AddCategory";
import AllCategories from "./Category/AllCategories";
import AddSubCategory from "./SubCategory/AddSubCategory";
import AllSubCategories from "./SubCategory/AllSubCategories";


import AllStories from "./Stories/AllStories";
import AddStory from "./Stories/AddStory";
import EditStories from "./Stories/EditStories";


import AllBanners from "./Banners/AllBanners";
import AddBanner from "./Banners/AddBanner";
import Editbanner from "./Banners/Editbanner";

import ChatsPage from "./Chats/ChatsPage";

import AddCoupons from "./Coupons/AddCoupons";
import AllCoupons from "./Coupons/AllCoupons";
import EditCoupon from "./Coupons/EditCoupon";

import ParticularOrderDetails from "./Orders/ParticularOrderDetails";
import Users from "./Users/Users";
import Chatsui from "./Chats/Chatsui";

// Customizer
import Fonts from "./Customizers/Fonts/Fonts";
import Colors from "./Customizers/Colors/Colors";
import Shapes from "./Customizers/Shapes/Shapes";
import Emojis from "./Customizers/Emojis/Emojis";
import BackgroundImages from "./Customizers/BackgroundImages/BackgroundImages";

// Templates
import AllTemplates from "./Templates/AllTemplates";
import AllCustomizerOrders from "./CustomizerOrders/AllCustomizerOrders";
import ParticularCustomizerOrderDetails from "./CustomizerOrders/ParticularCustomizerOrderDetails";
import Notifications from "./Notifications/Notifications";

//Template Orders
import AllTemplateOrders from "./TemplateOrders/AllTemplateOrders";
import TemplateOrderDetails from "./TemplateOrders/TemplateOrderDetails";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* Products */}
        <Route path="/add-product" element={<AddProduct />}></Route>
        <Route path="/all-product" element={<AllProducts />}></Route>
        <Route path="/product-details/:id" element={<ProductDetails />}></Route>
        <Route path="/edit-product/:id" element={<EditProduct />}></Route>
        {/* Orders */}
        <Route path="/all-orders" element={<AllOrders />}></Route>
        <Route path="/particular-order-details/:id" element={<ParticularOrderDetails />}></Route>
        {/* Categories */}
        <Route path="/add-category" element={<AddCategory />}></Route>
        <Route path="/all-categories" element={<AllCategories />}></Route>
        {/* Sub Categories */}
        <Route path="/add-sub-category" element={<AddSubCategory />}></Route>
        <Route path="/all-sub-categories" element={<AllSubCategories />}></Route>
        {/* Stories */}
        <Route path="/add-story" element={<AddStory />}></Route>
        <Route path="/all-stories" element={<AllStories />}></Route>
        <Route path="/edit-story/:id" element={<EditStories />}></Route>
        {/* Banners */}
        <Route path="/add-banner" element={<AddBanner />}></Route>
        <Route path="/all-banners" element={<AllBanners />}></Route>
        <Route path="/edit-banner/:id" element={<Editbanner />}></Route>
        {/* Chats */}
        <Route path="/chats" element={<ChatsPage />}></Route>
        {/* Coupons */}
        <Route path="/all-coupons" element={<AllCoupons />}></Route>
        <Route path="/add-coupon" element={<AddCoupons />}></Route>
        <Route path="/edit-coupon/:id" element={<EditCoupon />}></Route>
        {/* All users */}
        <Route path="/all-users" element={<Users />}></Route>
        <Route path="/chat" element={<Chatsui />}></Route>
        {/* Customizer */}
        {/* Fonts */}
        <Route path="/fonts" element={<Fonts />}></Route>
        {/* Colors */}
        <Route path="/colors" element={<Colors />}></Route>
        {/* Shapes */}
        <Route path="/shapes" element={<Shapes />}></Route>
        {/* Emojis */}
        <Route path="/emojis" element={<Emojis />}></Route>
        {/* Bckground Images */}
        <Route path="/background-images" element={<BackgroundImages />}></Route>
        {/* Templates */}
        {/* All Templates */}
        <Route path="/all-templates" element={<AllTemplates />}></Route>
        {/* Customizer Orders */}
        <Route path="/all-customizer-orders" element={<AllCustomizerOrders />}></Route>
        <Route path="/particular-cuatomizer-order-details/:id" element={<ParticularCustomizerOrderDetails />}></Route>
        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />}></Route>
        {/* Template Orders */}
        <Route path="/all-template-orders" element={<AllTemplateOrders />}></Route>
        <Route path="/template-order-details/:id" element={<TemplateOrderDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
