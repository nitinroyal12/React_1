import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Addblog from "../pages/Addblog";
import Profile from "../pages/Profile";
import Viewblog from "../pages/Viewblog";
import Header from "../header/Header";
import Footer from "../header/Footer";

function Privateroute() {
    return (

        <>
         <Header />
            <Routes>
                <Route index path="/home" element={<Home />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/addblog" element={<Addblog />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/viewblog" element={<Viewblog />} />
                <Route exact path="*" element={<Home />} />
            </Routes>
            <Footer />
        </>
           
       


    )
}

export default Privateroute;