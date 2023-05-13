'use-client'
import React, { useState } from 'react'
import { Footer, Home, Navbar, Servises, Contact, About, Services2 } from '../components'
// import { useStateContext } from '../contexts/contextProvider';
// import { Navigate } from 'react-router-dom';
import Loading from '../components/loading/Loading';

// import Mouse from '../components/utils/animation/Mouse'
const Homepage = () => {
  // const { user, token, setUser,setToken } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  // if (token) {
  //   return <Navigate to="/docs"/>
  // }

  setTimeout(()=>{
    setIsLoading(false);
  },3000)
   if(isLoading) return (<Loading/>)
   return(
   <main className="w-full bg-[#090913] ">
   <div className=' w-full'>
     <Navbar />
     <Home />
   </div>
   <About/>
  <div className="bg-no-repeat bg-[url('../images/elipse.png')]">
  <Servises />
  <Services2/>
   <Contact />
  </div>
   <Footer />
 </main>
 )
   
  
}

export default Homepage