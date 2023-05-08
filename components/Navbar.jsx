import React, { useState } from 'react'
import logoLight from '../images/logoLight.png';
import logoDark from '../images/logoDark.png';
import {HiMenuAlt4} from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai";
import Image from 'next/image';
 
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router'

const NavbarItems=({item,classProps})=>{
  return(
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {item}
    </li>
  )
}
const Navbar = () => {
  const router = useRouter()
  const [toggleMenu,setToggleMenu]=useState(false); //Hooks
  return (
    <nav className='w-full sm:sticky sm:top-0 flex text-white  justify-between p-4 md:px-20 items-center blue-glassmorphism '>
       <div className='  justify-center items-center flex-1'>
           <Image src={logoDark} alt="logo"  className='w-[10rem] h-30 cursor-pointer'/> 
       </div>
       <ul className='text-white hidden justify-between md:flex liste-none gap-10 flex-row items-center '>
            <div className='md:flex hidden liste-none '>
            {["Home","About","Services","Contact"].map((item,index) => (
              <NavbarItems key={item +index} item={item}/>
           ))}
            </div>
           <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546BD] ' onClick={()=>{navigate('/signin')}}>
            Login
           </li>
       </ul>
       <div className='flex relative flex-start  z-50 h-full'>
         {toggleMenu ? <AiOutlineClose className='text-white md:hidden  right-0  cursor-pointer ' onClick={()=>setToggleMenu(false)}/> :
          <HiMenuAlt4  className='text-white md:hidden cursor-pointer w-8 h-6' onClick={()=>setToggleMenu(true)}/>}
          {toggleMenu ?
          <ul className=' font-bold fixed top-0 bg-[#2546BD]  right-0 p-3 w-full h-[30rem] rounded-b-3xl shadow-2xl md:hidden liste-none
            flex flex-col   text-white animate-slide-in items-center gap-6 '>
             <li className='text-xl w-full my-2'>
              <AiOutlineClose  className='absolute right-8 ' onClick={()=>setToggleMenu(false)}/>
             </li>
             {["Home","About","Services","Contacts"].map((item,index) => (
              <NavbarItems key={item +index} item={item} classProps='my-2 text-lg hover:text-[#2952E3]'/>
           ))}
          </ul>
             : null}
       </div>
    </nav>
  )
}

export default Navbar