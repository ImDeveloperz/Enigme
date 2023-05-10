import React from "react";
import Sidbar from "./Sidbar";

const Layout = ({ children }) => {
  return (
    <div className="dark:text-white bg-white dark:bg-black text-black flex  ">
    <div className="flex flex-col w-full h-screen ">
        <div className="flex flex-col w-full h-full ">
                    <Sidbar/>            
            <div className="h-full">            
                {children}
            </div>
        </div>
    </div>
</div>
  );
};

export default Layout;