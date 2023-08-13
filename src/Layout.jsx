import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import App from "./App";
import { ToastContainer } from 'react-toastify';

const Layout = (props) => {
    return (
        <>
            {/** Bọc app vào router */}
            <Routes>
                <Route path="/" element={<App />}>
                    {" "}
                    {/* Use Router App bọc tất cả các router còn lại kế thừa header.... */}
                    <Route index element={<Home />} />
                    {/* truyền props index thay vì path để / sẽ có index là components home */}
                    <Route path="user" element={<User />} />
                </Route>

                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manageusers" element={<ManageUser />} />
                </Route>
                {/* Bê admin ra ngoài k bị ảnh hưởng header của app */}

                <Route path="/login" element={<Login />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Layout