import React from "react";
import { Link } from "react-router-dom";


function Footer() {
    return (

        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 sticky inset-x-0 bottom-0 ">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex  md:items-center md:justify-center  ">
                <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/home" className="hover:underline">Bloging Website™</Link>. All Rights Reserved.
                </p>

            </div>
        </footer>

    );
}

export default Footer;