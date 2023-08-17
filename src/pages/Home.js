import axios from "axios";
import React, {   useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";


function Home() {
    
    const [data, setdata] = useState([]);
    const Navigate = useNavigate()

    const handleview = (i) => {
        const {id}= i;
       Navigate('/viewblog',{state:{id:id}})
    }

    const filteruserdata = data.filter((item)=>item.userdata === `0${localStorage.getItem('user')}` && item)


    useEffect(() => {
        axios.get("https://blog-server-mzr9.onrender.com/data").then((res) => {
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (

        <div className="container flex justify-center gap-10 flex-wrap py-20">
            {
                filteruserdata.map((item) => {

                    return (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg justify-center" >
                            <img className="w-full" src={item.img}/>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{item.title}</div>
                                <p className="text-gray-700 text-base">{item.subtitle}</p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => handleview(item)}>
                                    Read more
                                </button>
                            </div>
                        </div>
                    )
                })
            }
           
        </div>
    );
}

export default Home;