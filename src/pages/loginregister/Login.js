import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import Loader from "../../loader/loader";


function Login(prop) {



    const Navigate = useNavigate()
    const [toggle, settoggle] = useState(true)
    const [finduser, setfinduser] = useState([])
    const [loading,setloading]= useState(false)
    const [user, setuser] = useState({
        username: null,
        userpass: null
    });
    const filteruser = finduser.filter((item) => {
        if (item.mail === user.username && item.password === user.userpass) {
            return item;
        }
    })

    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }



    const handlefind = () => {
        setloading(true)
        if (filteruser.length > 0) {
            toast("Login Successful");
            localStorage.setItem('key', guidGenerator());
            localStorage.setItem('mail', filteruser[0].mail);
            localStorage.setItem('user', filteruser[0].id);
            Navigate('/home');
            setloading(false)
            
        } else {
            toast("User Not Found ")
            setloading(false)
        }
    }



    useEffect(() => {
        axios.get("https://blog-server-mzr9.onrender.com/user").then((res) => {
            setfinduser(res.data);
        }).catch((err) => {
            console.log(err);
        });

        setTimeout(()=>{
            setloading(false)
        },5000)

    }, [])

    return (
        <>
       
            <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="relative">
                    <div className="absolute right-3 mt-4">
                    </div>
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">Email</label>

                    <input className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500 sm:leading-6" type="text" placeholder="mail@gmail.com" onChange={(e) => setuser((prev) => ({ ...prev, username: e.target.value }))} />
                </div>
                <div className="mt-8 content-center">
                    <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                        Password
                    </label>
                    <div className="flex relative ">
                        <input className=" w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500" type={toggle ? "password" : "text"} placeholder="Enter your password" onChange={(e) => setuser((prev) => ({ ...prev, userpass: e.target.value }))} />
                        <span onClick={() => settoggle(!toggle)}>{
                            toggle ? <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEyeSlash} /> :
                                <FontAwesomeIcon className="absolute right-3 text-xl" icon={faEye} />
                        }


                        </span>
                    </div>

                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded" />
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgetpassword" className="text-indigo-400 hover:text-blue-500">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <div>
                    {loading ? <Loader/> :<input type="button" className=" text-center w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" value="Sing in" onClick={() => { handlefind() }} />
}

                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                    <span>Don't have an account?</span>
                    <Link className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300" onClick={() => prop.settoggle(false)}>Sign
                        up</Link>
                </p>
            </form>
        </>
    );
};

export default Login;

