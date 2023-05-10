'use-client'
import React, { useEffect, useState } from 'react'
import { Radio, Input, Button, Textarea } from "@nextui-org/react";
import { InputSubmit } from './utils/input/Input';
import avatar from '../images/avatar.png'
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useStateContext } from '../contexts/contextProvider';
// import axiosClient from '../axios-client';
// import AuthUser from './utils/AuthUser';



const ProfileEdit = () => {
  const navigate = useNavigate();

  // let { id } = useParams();
  // console.log("id  ", id)

  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  // const { user, setUser } = useStateContext()

  // if (id) {
  //   useEffect(() => {
  //     setLoading(true)
  //     axiosClient.get(`/users/${id}`)
  //       .then(({ data }) => {
  //         setLoading(false)
  //         console.log(data);
  //         setUser(data.data)
  //       })
  //       .catch(() => {
  //         setLoading(false)
  //       })
  //   }, [])
  // }
  // console.log(user.name)
  // const {http,user} = AuthUser();
  // console.log("id user id :  ",user.id)
  const pseudoRef = useRef();
  // const miniBioRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const sexeRef = useRef();
  const TelephoneRef = useRef();
  const villeRef = useRef();
  const adresseRef = useRef();
  const naissanceRef = useRef();
  const bioRef = useRef();
  const paysRef = useRef();
  const [sexe,setSexe]=useState()
  const save = (e) => {
    e.preventDefault();
    
    // collect data
    const data = {
      pseudo: pseudoRef.current.value,
      biographie: bioRef.current.value,
      name: nomRef.current.value,
      prenom: prenomRef.current.value,
      gender: sexeRef.current.value,
      phone: TelephoneRef.current.value,
      city: villeRef.current.value,
      address: adresseRef.current.value,
      birthdate: naissanceRef.current.value,
      country: paysRef.current.value,
    }
    // console.log(sexeRef.current.value)
    // if (user.id) {
      // axiosClient.put(`/users/${user.id}`, data)
      //   .then(() => {
      //     // setNotification('User was successfully updated')
      //     navigate('/docs/user')
      //   })
      //   .catch(err => {
      //     const response = err.response;
      //     if (response && response.status === 422) {
      //       setErrors(response.data.errors)
      //     }
      //   })
      // } else {
      //   axiosClient.post('/users', user)
      //     .then(() => {
      //       setNotification('User was successfully created')
      //       navigate('/users')
      //     })
      //     .catch(err => {
      //       const response = err.response;
      //       if (response && response.status === 422) {
      //         setErrors(response.data.errors)
      //       }
      //     })
    // }

  }
  return (
    <div className='w-full'>
      <div className='p-8 h-screen w-full flex flex-col gap-10 '>
        <div className='w-full  flex gap-10'>
          <div className=''>
            <img src={avatar} alt="" className='w-[12rem] h-[11.5rem] ' />
          </div>
          <div className='flex flex-col w-full gap-4  font-bold text-md'>
            <div className='flex flex-col w-full gap-2 '>
              <p>Pseoudo</p>
              <Input
                type="text"
                bordered
                value={user.name + ' ' + user.prenom}
                placeholder="Pseoudo"
                ref={pseudoRef}
              />
            </div>
            <div className='flex flex-col gap-2 w-full '>
              <p>Mini-biographie</p>
              <Textarea
                className='w-full'
                bordered
                rows={2}
                size='md'
                placeholder="Entrer une mini biographie"
                ref={bioRef}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col font-bold text-md gap-8'>
          <p>A propos de moi</p>
          <div className='flex md:flex-row flex-col  gap-6 w-full'>

            <div className='w-full md:w-[50%] '>
              <Input
                label="Nom *"
                type="text"
                bordered
                placeholder="Nom"
                width='100%'
                ref={nomRef}
              />
            </div>
            <div className='w-full md:w-[50%] '>
              <Input
                label="Prénom *"
                type="text"
                width='100%'
                placeholder='Prenom'
                bordered
                ref={prenomRef}
              />
            </div>

          </div>

          <div className='flex gap-7 md:flex-row flex-col'>
            <div className='w-full md:w-[50%]'>
              <Input
                type="email"
                width='100%'
                disabled
                bordered
                label='Email'
                value={user.email}
                placeholder="Pseoudo"
                ref={pseudoRef}
              />
            </div>
            <div className='w-full md:w-[50%]'>
              <Input
                width="100%"
                label="Date de naissance"
                type="date"
                ref={naissanceRef}
              />
            </div>

          </div>
          <div className='flex gap-7 md:flex-row flex-col w-full'>
            <div className='w-full md:w-[50%] '>
              <Input
                label="Pays"
                type="text"
                width='100%'
                placeholder='Pays'
                bordered
                ref={paysRef}
              />
            </div>
            <div className='w-full md:w-[50%] '>
              <Input
                label="Telephone"
                type="text"
                width='100%'
                placeholder='Telephone'
                bordered
                ref={TelephoneRef}
              />
            </div>
          </div>
          <div className='flex gap-7 md:flex-row flex-col'>
            <div className='w-full md:w-[50%] '>
              <Input
                label="Ville"
                type="text"
                width='100%'
                placeholder='Ville'
                bordered
                ref={villeRef}
              />
            </div>
            <div className='w-full md:w-[50%] '>
              <Input
                label="Adresse"
                type="text"
                width='100%'
                placeholder='Adresse'
                bordered
                ref={adresseRef}
              />
            </div>
          </div>
          <div className='flex md:flex-row flex-col  gap-6 w-full'>

            <div className='w-full md:w-[50%] text-md font-base'>
                
                <input type='radio' value="Femme" name='sexe' ref={sexeRef}/> <span  className='p-2 font-meduim '>Femme</span>
               <input type='radio' value="Homme" name='sexe' ref={sexeRef} />   <span className='p-2 font-meduim'>Homme</span>
            </div>


          </div>

          <div className=" flex items-center justify-end gap-x-6 pb-8">
            <button type="button" onClick={() => { navigate('../') }} className="w-[15%] text-sm font-semibold leading-6 text-gray-900">
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md md:w-[15%] w-[25%] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={save}>
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit;