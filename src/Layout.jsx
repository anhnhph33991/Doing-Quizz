import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Home from "./components/Home/Home";
import Dashboard from "./components/Admin/Content/Dashboard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import App from "./App";
import { ToastContainer } from 'react-toastify';
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import page404 from "./assets/404_page.jpg"
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Question from "./components/Admin/Content/Question/Question";

// 404
const NotFound = () => {
    return (
        <div>
            <img src={page404} alt="404.Not found data with your current URL" className="vh-100 vw-100"/>
        </div>
    )
}


const Layout = (props) => {
    return (
        <>
            {/** Bọc app vào router */}
            <Routes>
                {/* Use Router App bọc tất cả các router còn lại kế thừa header.... */}
                <Route path="/" element={<App />}>
                    {/* truyền props index thay vì path để / sẽ có index là components home */}
                    <Route index element={<Home />} />
                    <Route path="user" element={<ListQuiz />} />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                {/* Bê admin ra ngoài k bị ảnh hưởng header của app */}
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="manageusers" element={<ManageUser />} />
                    <Route path="managequizzes" element={<ManageQuiz />} />
                    <Route path="managequestion" element={<Question />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/** Khi vào đường link k trùng ở trên sẽ auto vào components này */}
                <Route path="*" element={<NotFound />} />
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