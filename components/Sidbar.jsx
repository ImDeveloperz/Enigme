import React, { useState } from 'react'
import { RiAccountBoxFill } from 'react-icons/ri'
import { FaCalendar } from 'react-icons/fa'
import { SiFiles } from 'react-icons/si'
import logoLight from '../images/logoLight.png'
// import logoDark from '../images/logoDark.png'
// import { useAtom } from 'jotai/react';
import { Popover, Button, Text, Grid } from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
// import { ThemeSwitcher } from './utils';
// import { useStateContext } from '../utils/contextProvider';
// import axiosClient from '../axios-client';
import {RiUserSearchLine} from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';
import Link from 'next/link'
import Image from 'next/image'
// import AuthUser from './utils/AuthUser';



const Li = ({ item }) => {
  return (
    <li className='text-sm font-semibold '>
      {item}
    </li>
  )
}

export const Administration = ({ role,style}) => {

  const item = "Gestion des utilisateur"
  if (role == 1) {
    return (
      <Link href="/Docpage/Users">
        <div className={`flex gap-4 hover:border-b-4 cursor-pointer  p-2 hover:border-b-indigo-500 items-center justify-start ${style}`} >
          <Li item={item} />
        </div>
      </Link>
    )
  }
  return null;
}
const Sidbar = () => {
  const [count, setCount] = useState(0);
  // const { user, token, setUser, setToken } = useStateContext();
  // const res=AuthUser();
  const [isOpen, setIsOpen] = useState(false);
  // const [curentTheme, setcCrentTheme] = useAtom(theme)
  const listeBar = [{
    Link: "./",
    icon: <SiFiles className='' fontSize={20} />,
    text: "Mes documment"
  }, {
    Link: "/Docpage/uploadFiles",
    icon: <FaCalendar className='cursor-pointer' fontSize={20} />,
    text: "Charger documment"
  }, {
    Link: "/Docpage/dowloadFiles",
    icon: <SiFiles className='' fontSize={20} />,
    text: "Telecharger documment"
  },
  // {
  //   Link: "./Profile",
  //   icon: <RiAccountBoxFill fontSize={24} />,
  //   text: "Consulter mon profile"
  // }
  ];
  const NavbarItems=({item,classProps})=>{
    return(
      <li className={`mx-4 cursor-pointer ${classProps}`}>
        {item}
      </li>
    )
  }
  const [toggleMenu,setToggleMenu]=useState(false); //Hooks
  // const navigate=useNavigate();
  const onLogout = ev => {
    ev.preventDefault()

    // axiosClient.post('/logout')
    //   .then(() => {
    //     setUser({})
    //     setToken(null)
    //   })
  }

  return (
    <nav className='px-6 w-full flex justify-between   max-h-26 items-center  text-black  white-glassmorphism shadow-2xl sticky top-0  '>
      <div className='md:w-[15%] '>
        <Image src={logoLight} alt="" className='w-40 h-18' />
      </div>
      <ul className='md:flex hidden flex-3 flex-row gap-4 text-2xl  justify-center'>
        {listeBar.map((item, index) => {
          return (<Link href={item.Link} >
            <div key={item.text + index} className='flex gap-4 cursor-pointer hover:border-b-4  p-2 hover:border-b-indigo-500 dark:hover:bg-gray-800 items-center justify-start '>

              <Li item={item.text} />
            </div>
          </Link>)
        })}
        <Administration role='1' />
      </ul>
      <div className=''>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <div className="w-20 justify-center flex">
            <CgProfile fontSize={30} className="text-black cursor-pointer" />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: "$10" }}>
            {/* <div className="flex flex-col gap-4">
               <div className='flex flex-col gap-2'>
               <p>{user.name} {user.prenom}</p>
              <p>{user.email}</p>
               </div>
              <button className='flex gap-2 items-center rounded p-2  cursor-pointer hover:bg-slate-200' onClick={()=>{navigate('./user')}}>
                <RiUserSearchLine />
                <p>Consulter mon profile</p>
                </button>
              <div className="flex gap-2 items-center rounded p-2  cursor-pointer hover:bg-slate-200" onClick={onLogout}>
                <MdLogout  />
                <p>Se deconnecter</p>
              </div>
            </div> */}
          </Text>
        </Popover.Content>
      </Popover>
     
      </div>
      <div className=' z-10'>
         {toggleMenu ? <AiOutlineClose className='text-white md:hidden  right-0  cursor-pointer ' onClick={()=>setToggleMenu(false)}/> :
          <HiMenuAlt4  className='text-black md:hidden cursor-pointer w-8 h-6' onClick={()=>setToggleMenu(true)}/>}
          {toggleMenu ?
          <ul className=' font-bold fixed top-0 bg-[#2546BD]  right-0 p-3 w-full h-[30rem] rounded-b-3xl shadow-2xl md:hidden liste-none
            flex flex-col  animate-slide-in items-center gap-6 '>
             <li className='text-xl w-full my-2'>
              <AiOutlineClose  className='absolute right-8 ' onClick={()=>setToggleMenu(false)}/>
             </li>
             {listeBar.map((item, index) => {
          return (<Link href={item.Link} >
            <div key={item.text + index} className='flex gap-4 cursor-pointer hover:border-b-4  p-2 hover:border-b-indigo-500 dark:hover:bg-gray-800 items-center justify-start '>

              <Li item={item.text} />
            </div>
          </Link>)
        })}
               </ul>
             : null}
       </div> 
    </nav>
  )
}

export default Sidbar