import React, { useState } from "react";
import './loginregister.css'
import Login from "./Login";
import Register from "./Register";
import Forgetpass from "./Forgetpass";


function Loginregister(prop) {

    const [toggle, settoggle] = useState(true)

   

    return (


        <div className="relative min-h-screen flex">
            <div className="flex flex-col  sm:flex-row items-center md:items-center  sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                <div className="sm:w-1/2 xl:w-2/5 h-full hidden md:flex flex-auto items-center justify-start p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative" style={{ backgroundImage: " url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80)" }}>
                    <div className="absolute bg-gradient-to-b from-blue-900 to-gray-900 opacity-75 inset-0 z-0"></div>
                    <div className="absolute triangle  min-h-screen right-0 w-16" ></div>
                    
                    <img src="https://jasper-pimstorage-skullcandy.s3.us-west-1.amazonaws.com/bd2253a9671dac36a95faf821b52e78935050140be1718ce001f6aace45cf25c.png" className="h-96 absolute right-5 mr-5" />
                    <div className="w-full  max-w-md z-10">
                        <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Reference site about Lorem Ipsum..</div>
                        <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> What is Lorem Ipsum Lorem Ipsum is simply dummy
                            text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it
                            has?</div>
                    </div>

                    <ul className="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
                    <div className="max-w-md w-full   space-y-10">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcom Back!
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">{toggle ? "Please sign in to your account" : "Please sign up to your account"}</p>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-gray-200"></span>
                            <span className="text-gray-300 font-normal">or continue with</span>
                            <span className="h-px w-16 bg-gray-200"></span>
                        </div>
                        {
                            toggle ? <Login settoggle={settoggle} transfer={prop.settoggle} />: <Register settoggle={settoggle}/> 
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loginregister;