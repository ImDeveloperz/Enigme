import React, { Suspense, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Users from "@/components/Users";
import { useRouter } from "next/router";
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
      <Users />
    </Layout>
  );
};

export default Docpage;
