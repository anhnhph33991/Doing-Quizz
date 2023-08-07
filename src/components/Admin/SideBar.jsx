import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaGithub } from 'react-icons/fa';
import { TbCandy } from "react-icons/tb";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

import sidebarBg from '../../assets/background-img.jpg';
import 'react-pro-sidebar/dist/css/styles.css';

import { Link } from 'react-router-dom';

const SideBar = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                rtl={rtl}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        LuxChill
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<AiOutlineHome />}
                            suffix={<span className="badge red">New</span>}
                        >
                            Home
                            <Link to="/" />
                        </MenuItem>
                        <MenuItem icon={<AiOutlineUser />}>User <Link to="/user" />
                        </MenuItem>
                        <MenuItem icon={<RiAdminLine />}>Admin <Link to="/admin" /> </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<TbCandy />}
                            suffix={<span className="badge yellow">3</span>}
                            title="KeoKe6789"
                        >
                            <MenuItem>Login</MenuItem>
                            <MenuItem>Signup</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/luxchill/react-basic-redux-day2/tree/hook"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "#adadad" }}
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Soure Code
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar