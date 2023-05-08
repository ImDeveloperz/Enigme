import React, { Suspense, useEffect, useState } from "react";
import ShowDocs from "@/components/showDocs";
import Loading from "@/components/suspense/Loading";
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
    <Layout >
        <Suspense fallback={<Loading/>} >
      <ShowDocs />
      </Suspense>
    </Layout>
  );
};

export default Docpage;
