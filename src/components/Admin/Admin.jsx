import React, { useState } from 'react'
import SideBar from './SideBar'
import "./admin.scss"

import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const handleShowHide = () => {
        setCollapsed(!collapsed)
    }


    return (
        <div className='admin-container'>
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>

            <div className="admin-content">
                <div className="admin__header">
                    {
                        collapsed ? (<RiArrowRightDoubleFill onClick={() => handleShowHide()} className='showHide__icon' />) : (<RiArrowLeftDoubleFill onClick={() => handleShowHide()} className='showHide__icon' />)
                    }
                </div>
                <div className="admin__main">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Admin

{/** https://github.com/azouaoui-med/react-pro-sidebar/blob/v0.x/demo/src/Main.js */ }