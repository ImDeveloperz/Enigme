import React, { useEffect, useState } from "react";
import { Sidbar } from "@/components";
import Users from "@/components/Users";
// import { useStateContext } from "../utils/contextProvider";
import axiosClient from "@/axios-client";
import { ShowDocs } from "@/components";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

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
    <Layout>     
              <ShowDocs />
    </Layout>
  );
};

export default Docpage;
