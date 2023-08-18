import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../header/Footer";
import Loader2 from "../loader/loader2";
import  loadable from "@loadable/component";
const Home = loadable(() => import("../pages/Home"), {
    fallback: <Loader2 />,
  });
  const Blog = loadable(() => import("../pages/Blog"), {
    fallback: <Loader2 />,
  });
  const Addblog = loadable(() => import("../pages/Addblog"), {
    fallback: <Loader2 />,
  });
  const Profile = loadable(() => import("../pages/Profile"), {
    fallback: <Loader2 />,
  });
  const Viewblog = loadable(() => import("../pages/Viewblog"), {
    fallback: <Loader2 />,
  });



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