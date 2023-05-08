import React, { Suspense, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Layout from "@/components/Layout";
import Profile from "@/components/Profile";
import Loading from "@/components/suspense/Loading";
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
    <Layout className="">
      <Suspense fallback={<Loading/>} >
      <Profile />
      </Suspense>
    </Layout>
  );
};

export default Docpage;
