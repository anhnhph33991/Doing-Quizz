import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";

// import React Router:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Home from "./components/Home/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      {" "}
      {/** Bọc app vào router */}
      <Routes>
        <Route path="/" element={<App />}>
          {" "}
          {/* Use Router App bọc tất cả các router còn lại kế thừa header.... */}
          <Route index element={<Home />} />{" "}
          {/* truyền props index thay vì path để / sẽ có index là components home */}
          <Route path="user" element={<User />} />
        </Route>
        <Route path="admin" element={<Admin />} /> {/* Bê admin ra ngoài k bị ảnh hưởng header của app */}
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
