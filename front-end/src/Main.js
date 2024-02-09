import React from 'react';
import SideBar from './pages/SideBar'
import Header from './pages/Header'
import { Outlet } from 'react-router-dom'


const Main = () => {
    return (
        <div>
            <Header />
            <SideBar />
            <Outlet />
        </div>
    )
}

export default Main