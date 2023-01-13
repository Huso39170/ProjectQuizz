import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {Outlet, useLocation } from 'react-router-dom'
 

const Layout = () => {
    const location = useLocation();
    return (
        <>
            {location.pathname!=="/" && <Navbar/>}
            <div id="App">
                <Outlet />
            </div>
            <Footer/>
        </>


        
    )
}

export default Layout