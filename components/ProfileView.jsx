'use-client'
import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.png'
import { useStateContext } from '../utils/AuthContext';

import axiosClient from '../axios-client'
import { User } from '@nextui-org/react'
import Skeleton from './skeleton/Skeleton'
import Image from 'next/image';
import Link from 'next/link';
const ProfileView = ({ id }) => {
  const { user, token, setUser, setToken } = useStateContext();
  const [isLoading, setLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    setLoading(true);
    console.log(user)
    axiosClient.get('/user/user',token)
      .then(({ data }) => {
        setUser(data.user)
        setLoading(false);
      }).catch(err=> console.log(err))
  }, [])
  console.log(user);
  return (
    <div className='p-4 pt-40 flex h-full flex-col gap-10 bg-[#090913] text-white '>
      <div className='flex items-center gap-8 text-sm font-semibold justify-center shadow-xl rounded-xl border p-8'>
        {isLoading ? <Skeleton classes="profile-circle"/> :
                //  <Image src={user?.image ? user?.image : avatar} alt="profile" className='rounded-[100%] border-2 border-blue-700 w-[10rem] h-[10rem]' width="200" height="200" />
               <div className='w-44 h-44 pt-8 mb-8'>
                  <User rounded size='2xl' color="primary" src={user?.image ? user?.image : avatar}  alt='profile' />
               </div>
        } 
        <div className='flex flex-col gap-4  w-full '>
        {isLoading ? <Skeleton classes="title"/> :
                 <p className='text-2xl'>
                 {`${user?.name} ${user?.prenom}`}
                </p>}
                {isLoading ? <div>
                  <Skeleton classes="title"/>
                  <Skeleton classes="text"/>
                </div> :
                  user?.biographie && (
                    <div className='flex flex-col gap-2'>
                      <p className='text-xl font-bold '>Biographie</p>
                      <p>{user.biographie}</p>
                    </div>
                   )
                  }
            
        </div>
      </div>
      <div className='flex rounded-xl flex-col  gap-4 shadow-xl border w-full p-6'>
        <p className='font-bold text-xl'>A propos du moi</p>
        {isLoading ? <div className='flex flex-col gap-0'>
          <Skeleton classes="text"/>
          <Skeleton classes="text"/>
          <Skeleton classes="text"/>
          <Skeleton classes="text"/>
          <Skeleton classes="text"/>
          <Skeleton classes="text"/>
        </div> : <div className='gap-2 flex flex-col'>
        {user?.birthdate && (<p>Date de naissance : {user.birthdate}</p>)}
        {user?.country && (<p>Pays : {user.country}</p>)}
        {user?.city && (<p>Ville : {user.city}</p>)}
        {user?.email && (<p>Email : {user.email}</p>)}
        {user?.phone && (<p>Téléphone : {user.phone}</p>)}
        {user?.address && (<p>Address : {user.address}</p>)}
        {user?.gender && (<p>Sexe : {user.gender}</p>)}
        </div> }
      </div>
      <div className='w-full flex justify-end'>
      <button
          type="submit"
          className="rounded-md md:w-[15%] w-[25%] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
           <Link href={'/Docpage/profileView/user/' + user?.id_User}> Modifier Votre Profile</Link>
        </button>
      </div>
    </div>
  )
}

export default ProfileView