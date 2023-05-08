import React from "react";
import Sidbar from "./Sidbar";

const Layout = ({ children }) => {
  return (
    <div className="dark:text-white bg-white dark:bg-black text-black flex  ">
    <div className="flex flex-col w-full ">
        <div className="flex flex-col w-full h-screen overflow-y-scroll ">
                    <Sidbar/>            
            <div className="">            
                {children}
            </div>
        </div>
    </div>
</div>
  );
};

export default Layout;