import React, { useState,useEffect } from 'react'
import { RiAccountBoxFill } from 'react-icons/ri'
import { FaCalendar } from 'react-icons/fa'
import { SiFiles } from 'react-icons/si'
import logoDark from '../images/logoDark.png'
import { Popover, Button, Text, Grid, User } from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { AuthContext, useStateContext } from '../utils/AuthContext';
import axiosClient from '../axios-client';
import {RiUserSearchLine} from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import SignUpPage from '@/pages/SignUpPage'

import { deleteCookie } from 'cookies-next';


const Li = ({ item,active }) => {
  return (
    <li className={`text-sm font-semibold p-2 hover:border-blue-500 hover:border-b-2 ${active && 'border-b-2 border-white'}`}>
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
          <Li item={item}/>
        </div>
      </Link>
    )
  }
  return null;
}
const Sidbar = () => {
  const router=useRouter()
  const [count, setCount] = useState(0);
  const { user, token, setUser, setToken } = useStateContext();
  // get the user with the token
  useEffect(() => {
    axiosClient.get('/user/user',token)
      .then(({ data }) => {
        setUser(data.user)
      }).catch(err=> console.log(err))
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const listeBar = [{
    Link: "http://localhost:3000/Docpage",
    icon: <SiFiles className='' fontSize={20} />,
    text: "Mes documents",
    location:"/Docpage",
    role:0
  }, {
    Link: "http://localhost:3000/Docpage/uploadFiles",
    icon: <FaCalendar className='cursor-pointer' fontSize={20} />,
    text: "charger documents",
    location:"/Docpage/uploadFiles",
    role:0
  }, {
    Link: "http://localhost:3000/Docpage/ajouterParametre",
    icon: <SiFiles className='' fontSize={20} />,
    text: "Gérer paramètre compte",
    location:"/Docpage/ajouterParametre",
    role:1
  },
  {
    Link: "http://localhost:3000/Docpage/Users",
    icon: <SiFiles className='' fontSize={20} />,
    text: "Gestion des utilisateurs",
    location:"/Docpage/Users",
    role:1 
  },
  {
    Link: "http://localhost:3000/Docpage/Profile",
    icon: <RiAccountBoxFill fontSize={24} />,
    text: "Consulter mon profil",
    location:"/Docpage/Profile",
    role: 2
  }
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
  const location = useRouter();
  console.log('location :',location.pathname)
  const onLogout = ev => {
    ev.preventDefault()
      deleteCookie('role');
      router.push('/SignInPage')
    // axiosClient.post('/logout')
    //   .then(() => {
    //     setUser({})
    //     setToken(null)
    //   })
  }

  return (
    <nav className='z-[1000] px-6 w-full flex justify-between items-center fixed text-white  blue-glassmorphism shadow-2xl  '>
      <div className='md:w-[15%] '>
        <Image src={logoDark} alt="" className='w-40 h-18' />
      </div>
       <ul className='md:flex hidden  flex-row gap-4 text-2xl  justify-center '>
        {listeBar.map((item, index) => {

        if(item.role==user.role || item.role==2){
          return (<Link key={item.Link} href={item.Link} >
            <div key={item.text + index} className='flex gap-4 cursor-pointer p-2 hover:border-b-indigo-500 dark:hover:bg-gray-800 items-center justify-start '>
              <Li item={item.text} active={location.pathname==item.location} />
            </div>
          </Link>)
          }
          else return null
        })}
      </ul>
      <div className='px-4'>
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <div className="w-20 justify-center flex items-center">
            {/* <p className='text-md font-medium'>{user.name + ' '+user.prenom}</p> */}
           {
            user?.image ? <User rounded size='lg' color="primary" src={user?.image}  alt='profile' />
           : <CgProfile fontSize={30} className="text-white cursor-pointer" />
           }
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Text css={{ p: "$10" }}>
            <div className="flex flex-col gap-4">
               <div className='flex flex-col gap-2'>
               <p>{user?.name} {user?.prenom}</p>
              <p>{user?.email}</p>
               </div>
              {/* <button className='flex gap-2 items-center rounded p-2  cursor-pointer hover:bg-slate-200' onClick={()=>{router.push('/Docpage/profileView')}}>
                <RiUserSearchLine />
                <p>Consulter mon profile</p>
                </button> */}
              <div className="flex gap-2 items-center rounded p-2 cursor-pointer hover:bg-slate-200" onClick={onLogout}>
                <MdLogout  />
                <p>Se deconnecter</p>
              </div>
            </div>
          </Text>
        </Popover.Content>
      </Popover>
      </div>
      <div className=' md:hidden '>
         {toggleMenu ? <AiOutlineClose className='text-white md:hidden  right-0  cursor-pointer ' onClick={()=>setToggleMenu(false)}/> :
          <HiMenuAlt4  className='text-black md:hidden cursor-pointer w-8 h-6' onClick={()=>setToggleMenu(true)}/>}
          {toggleMenu ?
          <ul className=' font-bold fixed top-0 bg-[#2546BD] z-10 right-0 p-3 w-full h-[30rem] rounded-b-3xl shadow-2xl md:hidden liste-none
            flex flex-col   items-center gap-6 '>
             <li className='text-xl w-full my-2'>
              <AiOutlineClose  className='absolute right-8 ' onClick={()=>setToggleMenu(false)}/>
             </li>
             {listeBar.map((item, index) => {
              if(item.role==user.role || item.role==2){
          return (<Link key={item.Link} href={item.Link} >
            <div key={item.text + index} className='flex gap-4 cursor-pointer hover:border-b-4  p-2 hover:border-b-indigo-500 dark:hover:bg-gray-800 items-center justify-start '>
              <Li item={item.text} />
            </div>
          </Link>)
          }else{ 
            return null
            }
        })}
               </ul>
             : null}
       </div> 
    </nav>
  )
}

export default Sidbar