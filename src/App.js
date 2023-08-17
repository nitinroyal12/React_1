import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Loginregister from "./pages/loginregister/Loginregister";
import Privateroute from "./route/Privateroute";
import { Fragment, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Forgetpass from "./pages/loginregister/Forgetpass";
import Myprovider from "./context/Myprovider";





function App() {

  const location = useLocation();
  const navigate = useNavigate();


  const gotoLogin = () => {
    return (
      <Routes>
        <Route exact path="/loginregister" element={<Loginregister />} />
        <Route exact path="/forgetpassword" element={<Forgetpass />} />
      </Routes>
    );
  };



  useEffect(() => {

    if (!localStorage.getItem("key")) {
      navigate("/loginregister")
    } else if (localStorage.getItem("key")) {
       if(location.pathname === "" || location.pathname === "/"){
        navigate("/home")
       }else if(location.pathname === "/blog"){
        navigate("/blog")
       }else if(location.pathname === "/addblog"){
        navigate("/addblog")
       }else if(location.pathname === "/profile"){
        navigate("/profile")
       }else if(location.pathname === "/viewblog"){
        navigate("/home")
       }
    }

    else if (location.pathname === "" || location.pathname === "/") {
      navigate("/loginregister");
    }
  }, []);





  return (
    <>
      <Myprovider>
        <Fragment>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {
            location.pathname === "" ||
              location.pathname === "/loginregister" ||
              location.pathname === "/forgetpassword" ||
              location.pathname === "/" ? (
              gotoLogin()
            ) :
              <>
                <Privateroute />
              </>
          }
        </Fragment>
      </Myprovider>
    </>
  );
}

export default App;
