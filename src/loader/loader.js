import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="flex align-middle justify-center">
            <TailSpin
                height="20"
                width="20"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                visible={true}
            />
        </div>
    );
}

export default Loader;