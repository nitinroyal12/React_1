import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faEnvelope, faBriefcase, faCalendar, faPhone, faPen, faHandLizard } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";



function Profile() {
  

    const [data, setdata] = useState([])

    const [toggle, settoggel] = useState(true)

    const [profile, setprofile] = useState({
        name: null,
        img: null,
        add: null,
        dob: null,
        occupation: null,
    })
    
    const data12 = data.filter((item)=> localStorage.getItem('mail') === item.mail && item);


    const handlesave = (i) => {
        axios.patch("https://blog-server-mzr9.onrender.com/user/" + i.id, {
            name: profile.name ? profile.name : i.name,
            img: profile.img ? profile.img : i.img,
            add: profile.add ? profile.add : i.add,
            dob: profile.dob ? profile.dob : i.dob,
            occupation: profile.occupation ? profile.occupation : i.occupation,
        }).then((res) => {
            settoggel(true)

        }).catch((err) => {
            console.log(err);
        })
    }


    useEffect(() => {
        axios.get(" https://blog-server-mzr9.onrender.com/user").then((res) => {
            setdata(res.data)
        }).catch((err) => {
            console.log(err);
        })
        
    }, [])
    return (
        <>
            <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover" style={{ backgroundImage: "url('https://source.unsplash.com/1L71sPT5XKc')" }}>

                <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-20 lg:my-0">


                    <div id="profile"
                        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">


                        {
                            data12.map((item) => {
                                return (
                                    <div className="p-4 md:p-12 text-center lg:text-left">

                                        <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${item.img ? item.img : "https://source.unsplash.com/MP0IUfwrn0A"})` }}></div>
                                        <div className="block text-right">
                                            <FontAwesomeIcon className="pr-10 text-green-700" icon={faPen} onClick={() => settoggel(!toggle)} />

                                        </div>
                                        <h1 className="text-3xl font-bold pt-8 lg:pt-0">{item.name}</h1>
                                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                                        <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start  "> <FontAwesomeIcon className="pr-4 text-green-700" icon={faEnvelope} /> {item.mail}</p>
                                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><FontAwesomeIcon className="pr-4 text-green-700" icon={faGlobe} /> Your Location - {item.add}</p>
                                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><FontAwesomeIcon className="pr-4 text-green-700" icon={faBriefcase} title=" ex - occupation : clothes seller" /> Your Occupation -{item.occupation}</p>
                                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><FontAwesomeIcon className="pr-4 text-green-700" icon={faCalendar} /> Your DOB -{item.dob}</p>
                                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"><FontAwesomeIcon className="pr-4 text-green-700" icon={faPhone} /> Your Phone - {item.phone}</p>
                                        <p className="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>

                                        <div className="pt-12 pb-8">
                                            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                                                Get In Touch
                                            </button>
                                        </div>


                                    </div>
                                )
                            })
                        }

                    </div>


                    <div className="w-full lg:w-2/5">

                       {
                        data12.map((item)=>{
                            return(
                                <img src={item.img ? item.img : "https://source.unsplash.com/MP0IUfwrn0A"}
                                className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"  />
                            )
                        })
                       }


                    </div>





                </div>


            </div>

            {/* modal */}

            <div className={`relative  z-10 ${toggle ? "hidden" : "block"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                           {
                            data12.map((item)=>{
                                return(
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-center text-2xl font-sans font-bold">Edit Profile</h3>
    
                                    <div>
                                        <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input id="Name" name="Name" type="text" defaultValue={item.name ? item.name : ''} required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setprofile((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))} />
                                        </div>
                                    </div>
    
                                    <div>
                                        <label htmlFor="Location" className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                                        <div className="mt-2">
                                            <input id="Location" name="Location" type="text" defaultValue={item.add ? item.add : ''} required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setprofile((prev) => ({ ...prev, add: e.target.value }))} />
                                        </div>
                                    </div>
    
                                    <div>
                                        <label htmlFor="Occupation" className="block text-sm font-medium leading-6 text-gray-900">Occupation</label>
                                        <div className="mt-2">
                                            <input id="Occupation" name="Occupation" type="text" defaultValue={item.occupation ? item.occupation : ''} required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setprofile((prev) => ({ ...prev, occupation: e.target.value }))} />
                                        </div>
                                    </div>
    
                                    <div>
                                        <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">DOB</label>
                                        <div className="mt-2">
                                            <input id="dob" name="dob" type="date" defaultValue={item.dob ? item.dob : ''} required className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => setprofile((prev) => ({ ...prev, dob: e.target.value }))} />
                                        </div>
                                    </div>
    
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e) => {
                                            const reader = new FileReader()
                                            reader.readAsDataURL(e.target.files[0])
                                            reader.onloadend = () => {
                                                setprofile((prev) => ({ ...prev, img: reader.result }))
                                            }
                                        }
                                        } />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG or JPG  .</p>
                                    </div>
    
    
    
    
                                </div>
                                );
                            })
                           }
                            {
                                data12.map((item) => {
                                    return (
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" onClick={() => handlesave(item)}>save</button>
                                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => settoggel(true)}>Cancel</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>



        </>




    );
}

export default Profile;