import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import useAuth from '../../hooks/useAuth'

import {Outlet, useLocation } from 'react-router-dom'
 


const Layout = () => {
    const location = useLocation();
    const {auth} = useAuth();
    return (
        <>
            {location.pathname!=="/" && <Navbar isUserLoged={ Object.keys(auth).length>0}/>}
            <div id="App">
                <Outlet />
            </div>
            <Footer/>
        </>


        
    )
}

export default Layout