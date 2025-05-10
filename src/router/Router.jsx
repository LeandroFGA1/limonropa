import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from "../pages/Home";
import Markert from '../pages/Markert';
import PageCard from '../pages/PageCard';
import CheckOut from '../pages/CheckOut';
import CheckOutNew from '../pages/CheckOutNew';
import Access from '../pages/Access';
import AboutUs from '../pages/AboutUs';
import Profile from '../pages/Profile';
import Contact from '../pages/Contact';
import MarkertCategories from '../pages/MarkertCategories';
import MarketBrands from '../pages/MarkertBrands';
import Services from '../pages/Services';
import AboutUss from '../pages/AboutUss';
import ClientOrderPage from '../pages/ClientOrderPage';
const Router = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Routes>
            <Route path='/' index element={<Home />} />
            <Route path='/store' element={<Markert />} />
            <Route path='/store/categories' element={<MarkertCategories/>}/>
            <Route path='/store/brands' element={<MarketBrands/>}/>
            <Route path='/product/:name' element={<PageCard />} />
            <Route path='/checkOut' element={<CheckOut />} />
            <Route path='/access' element={<Access />} />
            {/* <Route path='/aboutUs' element={<AboutUs />} /> */}
            <Route path='/aboutUs' element={<AboutUss />} />
            <Route path='/access/profile' element={<Profile/>}/>
            <Route path="/contact" element={<Contact/>}/>
            
            <Route path='/services' element={<Services/>}/>
        </Routes>
    );
}

export default Router;
