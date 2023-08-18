import React, { useEffect, useState } from "react";
import './Viewblog.css'
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons'

function Viewblog(){

    const Navigate = useNavigate()
    const location = useLocation()
    const [data,setdata]=useState([]);

    

    const filterblog = data.filter((item)=>item.id === location.state.id || item.id === location.state.view &&  item);

    useEffect(()=>{
        axios.get("https://blog-server-mzr9.onrender.com/data").then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    return(
        <>
        <div className="float-left pt-5 ps-7 sm:pt-10 sm:ps-24 text-3xl" onClick={()=>Navigate("/home")}><FontAwesomeIcon icon={faLeftLong}></FontAwesomeIcon></div>
        <div className="container m-auto  border-gray-400 py-12 flex flex-col justify-center items-center p-2">
            
            {
                filterblog.map((item)=>{
                    return(
                        <>
                        <div className="font-bold text-2xl mb-2 pb-5 text-center py-12 font-mono sm:text-3xl md:text-4xl lg:text-5xl ">{item.title}</div>
            <img className="w-full px-2 md:px-7  lg:px-20" src={item.img} alt="Sunset in the mountains" />

            <p className="text-blue-900  py-10  text-base slab text-center md:text-xl lg:text-2xl">{item.subtitle} </p>

            <p className="  text-base px-10 karla sm:text-xl md:text-2xl lg:text-2xl">{item.about}</p>
                        </>
                    );
                })
            }

 

        </div>

        </>
    );
}

export default Viewblog;