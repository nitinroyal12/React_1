import React, { useContext, useEffect, useState } from "react";
import './blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import mycontext from "../context/mycontext";


function Blog() {

    const { changedata, setchangedata } = useContext(mycontext)




    const location = useLocation()
    const Navigate = useNavigate()
    const [toggle, settoggle] = useState(true)
    const [data, setdata] = useState([]);
    const [next, setnext] = useState(1);


    const handledelete = (items) => {
        axios.delete("https://blog-server-mzr9.onrender.com/data/" + items.id).then((res) => {
            console.log(res);
            getdata()
        }).catch((err) => {
            console.log(err);
        });
    }

    const d = new Date();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const fulldate = `${date}-${month}-${year}`;



    const handleview = (i) => {
        const { id } = i;

        Navigate('/viewblog', { state: { view: id } })
    }

    const editpost = (item) => {
        

        if (changedata == false) {
            Navigate("/addblog", { state: { check: item } })
        }
    }

    const getdata = () => {
        axios.get("https://blog-server-mzr9.onrender.com/data").then((res) => {
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }
    const filteruserdata = data.filter((item)=>item.userdata === `0${localStorage.getItem('user')}` && item)

    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
   
            <section className="container px-4 mx-auto">
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Post No.
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                              Title
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                subtitle
                                            </th>

                                            <th scope="col" className="relative py-3.5 px-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            filteruserdata?.slice((next * 10) - 10, next * 10)?.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{fulldate}</td>
                                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                            <span className="bg-green-400 text-gray-50 rounded-md p-1">Posted</span>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                            {item.title}
                                                        </td>
                                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{item.subtitle}</td>
                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">

                                                            <button className="text-gray-400 hover:text-black mr-2">
                                                                <FontAwesomeIcon icon={faEye} onClick={() => handleview(item)} />
                                                            </button>
                                                            <button href="#" className="text-gray-400 hover:text-black  mx-2">
                                                                <FontAwesomeIcon icon={faPen} onClick={() =>{setchangedata(false);editpost(item)}} />
                                                            </button>
                                                            <button href="#" className="text-gray-400 hover:text-black  ml-2">
                                                                <FontAwesomeIcon icon={faTrash} onClick={() => handledelete(item)} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <button  className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800" disabled={next == 1 && true} onClick={() => setnext(next - 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            previous
                        </span>
                    </button>

                    <div className="items-center hidden md:flex gap-x-3">
                        <button className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">{next}</button>
                        
                    </div>

                    <button  className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800" disabled={next * 10 < data?.length ? false : true} onClick={() => setnext(next + 1)}>
                        <span>
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </button>
                </div>
            </section>
        </>
    );
}

export default Blog;