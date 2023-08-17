import React, { useState } from "react";
import mycontext from "./mycontext";

const Myprovider = ({ children }) => {
    const [changedata, setchangedata] = useState(true);
   
    return(
        <mycontext.Provider value={{changedata,setchangedata}}>
            {children}
        </mycontext.Provider>
    )
}

export default Myprovider