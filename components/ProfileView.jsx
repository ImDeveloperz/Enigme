import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.png'
// import { useStateContext } from '../contexts/contextProvider'
import { Link } from 'react-router-dom'
// import axiosClient from '../axios-client'
import { User } from '@nextui-org/react'
import Skeleton from './skeleton/Skeleton'
const ProfileView = ({ id }) => {
  const { user, token, setUser, setToken } = useStateContext();
  const [isLoading, setLoading] = useState(false);
  
  // useEffect(() => {
  //   setLoading(true);
  //   console.log(user)
  //   axiosClient.get('/user')
  //     .then(({ data }) => {
  //       setUser(data)
  //       setLoading(false);
  //       console.log(user)
  //     })
  // }, [])
  return (
    <div className='p-4 flex flex-col gap-10'>
      <div className='flex items-center gap-8 text-sm font-semibold shadow-xl rounded-xl border p-8'>
        {isLoading ? <Skeleton classes="profile-circle"/> :
                 <img src={avatar} alt="" className='w-[12rem] h-[11.5rem]' />
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
           <Link to={'/docs/user/' + user.id}> Modifier Votre Profile</Link>
        </button>
      </div>
    
    </div>
  )
}

export default ProfileView