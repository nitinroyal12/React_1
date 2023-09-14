import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../loader/loader";




function Header() {

    const Navigate = useNavigate()
    const [toggle, settoggle] = useState(false)
    const [data, setdata] = useState([])
    const [toggle1, settoggle1] = useState(true)
    const [modal, setmodal] = useState(false)
    const [pass, setpass] = useState(true)
    const [loading,setloading]=useState(false)
    const [password, setpassword] = useState({
        pass: null,
    })

    const handlelogout = () => {

        localStorage.clear();
        toast("Logout Successful");
        Navigate('/loginregister');
    }
    const getdata = () => {
        axios.get("https://blog-server-mzr9.onrender.com/user").then((res) => {
            setdata(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    const filteruser = data.filter((item) => {
        if (item.mail == localStorage.getItem('mail') && item.id == localStorage.getItem('user')) {
            return item
        }
    })

    const handledelet = (item) => {
        setmodal(true)
        settoggle(false)

    }


    const confirmdelete = (item) => {
        setloading(true)
        if (item.password == password.pass) {
            axios.delete("https://blog-server-mzr9.onrender.com/user/" + item.id).then((res) => {
                localStorage.clear();
                Navigate("/loginregister")
                toast("Account deleted")
                setloading(false)
            }).catch((err) => {
                console.log(err);
            });
        }else{
            toast("Wrong Password")
            setloading(false)
        }

    }

    useEffect(() => {
        getdata()
        setTimeout(()=>{
            setloading(false);
        },3000)
    }, [])

    return (
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>


                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" onClick={() => settoggle1(!toggle1)}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>

                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <Link to="/home" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</Link>
                                    <Link to="/blog" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Blog</Link>
                                    <Link to="/addblog" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Add Blog</Link>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button>


                            <div className="relative ml-3">
                                <div>
                                    <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" onClick={() => settoggle(!toggle)} />
                                    </button>
                                </div>

                                <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${toggle ? "block" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">

                                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0" onClick={() => settoggle(false)}>Your Profile</Link>

                                    <input type="button" className="cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => handlelogout()} value="Sign out" />


                                    <input type="button" className="cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={() => handledelet()} value="Delete Account" />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={`sm:hidden ${toggle1 ? "hidden" : "block"}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 ">

                        <Link to="/home" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page" >Home</Link>
                        <Link to="/blog" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Blog</Link>
                        <Link to="/addblog" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Add Blog</Link>

                    </div>
                </div>
            </nav>




            {/* modal started here  */}

            {modal ? filteruser.map((item) => {
                return (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete account</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">Are you sure you want to Delete your account?</p>
                                                    <p className="py-4"> Your E-MAil : {item.mail}</p>
                                                    <div>

                                                        <div className="relative mt-2 rounded-md shadow-sm">

                                                            <input type={pass ? "password" : "text"} name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter Your Password" onChange={(e) => setpassword({ pass: e.target.value })} />
                                                            <span onClick={() => setpass(!pass)}>{
                                                                pass ? <FontAwesomeIcon className="absolute top-2 right-0  text-xl" icon={faEyeSlash} /> :
                                                                    <FontAwesomeIcon className="absolute top-2 right-0 text-xl" icon={faEye} />
                                                            }
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {loading ? <Loader/>
                                          :
                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => confirmdelete(item)}>Delete</button>
                                        }
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setmodal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : ''
            }
        </>

    );
}

export default Header