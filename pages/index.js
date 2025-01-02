'use-client'
import React, { useState } from 'react'
import { Footer, Home, Navbar, Servises, Contact, About, Services2 } from '../components'
import Loading from '../components/loading/Loading';
import About1 from '@/components/About1';
import LogoCloud from '@/components/LogoCloud';
import { Fade, Reveal } from 'react-reveal';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';

const Homepage = () => {
  const { ref: homeRef, inView : myElemVisible } = useInView();
  const [isLoading, setIsLoading] = useState(true);
  
   setTimeout(()=>{
    setIsLoading(false);
   },3000)
   if(isLoading) return (<Loading/>)
   return(
   <main className="w-full bg-[#090913] ">
   <div className=' w-full' id="Home" ref={homeRef} >
     {/* <button className={`rounded-[100%] w-20 h-20 flex items-center justify-center  blue-glassmorphism right-4 hover:bg-blue-700 hover:-translate-y-2 bottom-4 fixed ${myElemVisible && 'opacity-0'}`}>
     <a href='#Home'> <AiOutlineArrowUp className='text-white h-10 w-10'/></a>
     </button>
     */}
     <Navbar />
       <Home  />
   </div>
    <About/>
     <LogoCloud/>
  <div className="">
  <Servises />
   <Contact />
  </div>
   <Footer />
 </main>
 )
}

export default Homepage