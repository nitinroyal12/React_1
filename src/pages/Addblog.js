import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import mycontext from "../context/mycontext";
import Loader from "../loader/loader";



function Addblog() {

    const location = useLocation();
    const Navigate = useNavigate();


    const { changedata, setchangedata } = useContext(mycontext);
    const [toggle, settoggle] = useState(changedata);
    const [blogdata, setblogdata] = useState([]);
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState({
        title: "",
        subtitle: '',
        about: null,
        img: null,
        userdata: null
    })



    const [change, setchange] = useState({
        title: "",
        subtitle: '',
        about: null,
        img: null
    })

    const getdata = () => {
        axios.get("https://blog-server-mzr9.onrender.com/data").then((res) => {
            setblogdata(res.data)
        }).catch((err) => {
            console.log(err);
        });
    }


    const handlepost = () => {
        if (data.title === null) {
            toast("Please Enter Title")
        }
        else if (data.subtitle === null) {
            toast("Please Enter Subtitle")
        }
        else if (data.subtitle.length <= 50) {
            toast("Please Enter Min. 50 Word")
        }
        else if (data.about === null) {
            toast("Please Enter About")
        } else if (data.img === null) {
            toast("Please Upload file")
        }
        else if (data.title != null && data.subtitle != null && data.about != null && data.img != null) {
            setloading(true)
            axios.post("https://blog-server-mzr9.onrender.com/data", data).then((res) => {
                Navigate("/home")
                toast.success("Posted Successful")
                setloading(false)
            }).catch((err) => {
                console.log(err);
                setloading(false)
            });
        }

    }


    const handleedit = () => {
        setloading(true)
        const item = location.state.check
        axios.patch("https://blog-server-mzr9.onrender.com/data/" + location.state.check.id, {
            title: change.title ? change.title : item.title,
            subtitle: change.subtitle ? change.subtitle : item.subtitle,
            about: change.about ? change.about : item.about,
            img: change.img ? change.img : item.img
        }).then((res) => {
            Navigate('/blog')
            setchangedata(true)
            setloading(false)
        }).catch((err) => {
            console.log(err);
            setloading(false)
        })
    };


    useEffect(() => {
        getdata();
        const userid = localStorage.getItem('user')
        data.userdata = `0${userid}`

        setTimeout(() => {
            setloading(false)
        }, 3000)
    }, []);


    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-10 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{toggle ? "Add New post" : "Edit Post"}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Blog Title</label>
                        <div className="mt-2">
                            <input id="title" name="title" type="text"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => toggle ? setdata((prev) => ({ ...prev, title: e.target.value.toUpperCase() })) : setchange((prev) => ({ ...prev, title: e.target.value.toUpperCase() }))} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="subtitle" className="block text-sm font-medium leading-6 text-gray-900">Sub Title</label>

                        </div>
                        <div className="mt-2">
                            <input id="subtitle" name="subtitle" type="text" autoComplete="current-password"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => toggle ? setdata((prev) => ({ ...prev, subtitle: e.target.value })) : setchange((prev) => ({ ...prev, subtitle: e.target.value }))} />
                            <div className="flex justify-between">
                                <p className="mt-3 text-sm leading-6 text-gray-600 text-right">Write 50 Words in Subtitle. </p>
                                <p className="mt-3 text-sm leading-6 text-gray-600 text-right">{(data.subtitle).length + '/1000'}</p>

                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About Post</label>
                        <div className="mt-2">
                            <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => toggle ? setdata((prev) => ({ ...prev, about: e.target.value })) : setchange((prev) => ({ ...prev, about: e.target.value }))}></textarea>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about your post.</p>
                    </div>


                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            {
                                toggle ? <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                                    const reader = new FileReader()
                                    reader.readAsDataURL(e.target.files[0])
                                    reader.onloadend = () => {
                                        setdata((prev) => ({ ...prev, img: reader.result }))
                                    }
                                }
                                }
                                /> :

                                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {
                                        const reader = new FileReader()
                                        reader.readAsDataURL(e.target.files[0])
                                        reader.onloadend = () => {
                                            setchange((prev) => ({ ...prev, img: reader.result }))
                                        }
                                    }
                                    }
                                    />
                            }
                        </label>
                    </div>



                    <div>


                        {toggle ? <>{loading ? <Loader/> :
                            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handlepost()}> Post Blog</button>}
                        </>
                            :
                            <>
                               {loading ? <Loader/> :
                                <input type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handleedit()} value="Edit Post"/>}
                            </>
                        }


                    </div>
                </form>


            </div>
        </div>

    );
}

export default Addblog;

