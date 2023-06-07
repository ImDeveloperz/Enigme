import React, { Suspense, useEffect, useState } from "react";
// import axiosClient from "../../axios-client";
import Layout from "@/components/Layout";
import Profile from "@/components/Profile";
import Loading from "@/components/suspense/Loading";
const Docpage = () => {
  return (
    <Layout className="">
      <Suspense fallback={<Loading/>} >
      <Profile />
      </Suspense>
    </Layout>
  );
};

export default Docpage;
