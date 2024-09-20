import React, { useState } from 'react'
import SideBar from './SideBar'
import "./admin.scss"

import { AiOutlineMenu } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Language } from '../Header/Language';
import { NavDropdown } from 'react-bootstrap';


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
                    <span>
                        {
                            <AiOutlineMenu className='showHide__icon' onClick={() => handleShowHide()} />
                        }
                    </span>

                    <div className='rightside'>
                        <Language />
                        <NavDropdown title="Setting" id='basic-nav-dropdown'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin__main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}

export default Admin