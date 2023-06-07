import axiosClient from '@/axios-client'
import { useRouter } from 'next/router'
import React, { useEffect,useState } from 'react'

const Parametres = () => {
    const [comptesType,setComptesType]=useState()
    const router=useRouter()
    useEffect(()=> {
       const fetch = () =>{
        axiosClient.post('/ajouter/selectTypeComptes').then((d)=>{
            setComptesType(d.data.compte);
            console.log('hhg : ',comptesType)
            console.log(d);
        })
       }
       fetch()
       
    },[])
  return (
    <div className='flex w-full h-full flex-col justify-center items-center text-white'>
         <div className='shadow-xl rounded-md bg-[#18181B] w-[60%] py-6 px-10'>
              <div>
                <p className='text-md font-meduim text-center'>Gestion de paramètre des comptes</p>
              </div>
          <div className='flex flex-col items-cente gap-4 px-4 w-full'>
                {comptesType?.map((type)=>{
                   return  (
                      <div className='shadow-2xl rouded-md py-4 px-8 flex justify-between items-center'>
                            <p>
                              {type.typeCompte_name}
                            </p>
                            <button className='py-2 px-4 text-md font-medium text-white bg-blue-700 rounded-md' onClick={()=>router.push('/Docpage/ajouterParametre/'+type.typeCompte_id)}>
                              Consulter parametres
                            </button>
                      </div>
                   )
                })}
          </div>
    </div>
    </div>
  )
}

export default Parametres