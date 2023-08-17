import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Register(prop) {

    const [toggle, settoggle] = useState(true);
    const [toggle1, settoggle1] = useState(true);
    const [data,setdata]=useState([])

    const [user, setuser] = useState({
        name: null,
        img:null,
        mail: null,
        phone: null,
        add: null,
        dob: null,
        occupation: null,
        password: null,
        repassword: null
    })

    const filterdata = data.filter((item)=> item.mail === user.mail && item )

    
    const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handlesubmit = () => {
        if (user.name === null) {
            toast("Please Enter Name")
        } else if (user.mail === null) {
            toast("Please Enter E-mail")
        } else if (user.mail != user.mail.match(email)) {
            toast("Please Enter valid  E-mail")
        } else if (user.phone === null) {
            toast("Please Enter Phone No.")
        } else if (user.phone.length != 10) {
            toast("Please Enter Valid Phone No.")
        } else if (user.password === null) {
            toast("Please Enter Password")
        } else if (user.repassword === null) {
            toast("Please Enter Repassword")
        }else if (filterdata.length> 0) {
            toast("You Are Already User")          
        } else if (user.password != user.repassword) {
            toast("Password Does not Match")
        } else if (user.name != null && user.mail != null && user.password != null && user.repassword != null && filterdata.length == 0  ) {
            axios.post("https://blog-server-mzr9.onrender.com/user", user).then((res) => {
                prop.settoggle(true);
                toast("Register Successful")
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(()=>{
        axios.get("https://blog-server-mzr9.onrender.com/user").then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    return (
        <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="relative">

                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Full Name</label>
                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" type="text" placeholder="Enter Your Full Name" onChange={(e) => setuser((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))} />
            </div>
            <div className="relative">

                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>
                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" type="email" placeholder="mail@gmail.com" onChange={(e) => setuser((prev) => ({ ...prev, mail: e.target.value }))} />
            </div>

            <div className="relative">

                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Phone</label>
                <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500" type="Number" placeholder="1234567890" onChange={(e) => setuser((prev) => ({ ...prev, phone: e.target.value }))} />
            </div>

            <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Password
                </label>
                <div className="flex relative">
                    <input className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500" type={toggle ? "password" : "text"} placeholder="Enter your password" onChange={(e) => setuser((prev) => ({ ...prev, password: e.target.value }))} />
                    <span onClick={() => settoggle(!toggle)}>{
                        toggle ? <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEyeSlash} /> :
                            <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEye} />
                    }
                    </span>
                </div>

            </div>

            <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Re Password
                </label>
                <div className="flex relative">
                    <input className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500" type={toggle1 ? "password" : "text"} placeholder="Re Enter your password" onChange={(e) => setuser((prev) => ({ ...prev, repassword: e.target.value }))} />
                    <span onClick={() => settoggle1(!toggle1)}>{
                        toggle1 ? <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEyeSlash} /> :
                            <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEye} />
                    }
                    </span>
                </div>

            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                    <label for="remember_me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

            </div>
            <div>
                <input type="button" className="w-full text-center flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={handlesubmit} value="Register" />


            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>You have an account?</span>
                <Link  className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300" onClick={() => prop.settoggle(true)}>Sign
                    in</Link>
            </p>
        </form>
    );
};

export default Register;