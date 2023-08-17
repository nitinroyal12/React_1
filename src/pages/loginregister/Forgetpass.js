import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Forgetpass() {
    
    const [data,setdata]=useState([])
    const [changepass,setchangepass]=useState({
        mail:null
    });
    const otp = ()=>{
        return ( Math.floor(1000+Math.random()*9000))
    }

    
const filtermail = data.filter((item)=>item.mail === changepass.mail && item)
    const handleverify =()=>{
        if(filtermail.length > 0){
            toast("email found")
            
        }else{
            toast("Your Email Not Existing ")
        }
    }
    useEffect(()=>{
        axios.get("http://localhost:4200/user").then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    },[])

    return (
        <div className="relative min-h-screen flex">
            <div className="flex flex-col sm:flex-row items-center md:items-center  sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
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
                <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white ">
                    <div className="max-w-md w-full   space-y-10">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcom Back!
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">Please Enter E-mail to Forget Password</p>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="h-px w-16 bg-gray-200"></span>
                            <span className="text-gray-300 font-normal">or continue with</span>
                            <span className="h-px w-16 bg-gray-200"></span>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="relative">
                                <div className="absolute right-3 mt-4">
                                </div>
                                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>

                                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500 sm:leading-6" type="text" placeholder="mail@gmail.com" onChange={(e)=>setchangepass({mail:e.target.value})}/>
                            </div>

                           
                            <div>
                                <input type="button" className=" text-center w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" value="Verify"  onClick={handleverify}/>


                            </div>
                            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                                <span>Get Back to </span>
                                <Link to="/loginregister" className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300" >Sign
                                    in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Forgetpass;