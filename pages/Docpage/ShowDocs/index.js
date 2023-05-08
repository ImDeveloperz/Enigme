import React, { useEffect, useState } from "react";
import { Sidbar } from "@/components";
import Users from "@/components/Users";
// import { useStateContext } from "../utils/contextProvider";
import axiosClient from "@/axios-client";
import {ShowDocs} from "@/components";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";

const Docpage = () => {
   
    // const { user, token, setUser,setToken } = useStateContext();
    // const { user } = AuthUser();
    // console.log(token)    
    //   useEffect(() => {
    //     axiosClient.get('/user')
    //       .then(({data}) => {
    //         //  setUser(data)
    //       })
    //   }, [])
    //   if (!token) {
        // return <Navigate to="/signin"/>
    //   }
    return (
        <div className="dark:text-white bg-white dark:bg-black text-black flex  ">
            <div className="flex flex-col w-full ">
                <div className="flex flex-col w-full h-screen overflow-y-scroll ">
                            <Sidbar/>            
                    <div className="">            
                        <ShowDocs />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docpage;
