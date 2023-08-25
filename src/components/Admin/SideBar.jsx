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
import { DiReact } from "react-icons/di";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbDashboard } from "react-icons/tb";


import sidebarBg from '../../assets/background-img.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = (props) => {
    const { image, collapsed, rtl, toggled, handleToggleSidebar } = props
    const navigate = useNavigate()
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
                        <DiReact size={'3em'} color={"00bfff"} />
                        <span onClick={() => navigate('/')} style={{cursor: "pointer"}}>LuxChill</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<TbDashboard />}
                            suffix={<span className="badge red">New</span>}
                        >
                            Bảng Điều Kiển
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<MdOutlineManageAccounts />}
                            suffix={<span className="badge yellow">3</span>}
                            title="Quản Lí"
                        >
                            <MenuItem>
                                Quản Lý User
                                <Link to="/admin/manageusers" />
                            </MenuItem>
                            <MenuItem>
                                Quản Lý Bài Quizz
                                <Link to="/admin/managequizzes" />
                            </MenuItem>
                            <MenuItem>
                                Quản Lý Câu Hỏi
                                <Link to="/admin/managequestion" />
                            </MenuItem>
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
                        >
                            <span><FaGithub size={'1.2rem'} style={{ marginBottom: "2px" }} /></span>
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Source Code
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar
