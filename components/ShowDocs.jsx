'use-client'
import { Popover } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { Table } from "@nextui-org/react";
import { useSession, signIn, signOut } from 'next-auth/react';
import axiosClient from '@/axios-client';
import vide from '../images/vide.png';
import Image from 'next/image';
// import { data } from 'autoprefixer';

const accessToken = "sl.Ber6ow-MBkHGpcmmKwbh4oIDbNIHXkvyrHLdXZkINt3VljxtoPk_cjEoZN37aMjBND43HNwSIMCEYpPvKX_e6fh9_nYJdjpDEf5MztPrckBzXVUjctdmYqNyyoCzGsjz8OrZ13DF";
const ShowDocs = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [datac, setDatac] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    const apiGet = async()=>{   
    const res =await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "path": "", // Spécifiez le chemin vers votre dossier
        "recursive": false,
        "include_media_info": false,
        "include_deleted": false,
        "include_has_explicit_shared_members": false,
        "include_mounted_folders": true,
        "limit": 1000 // Limitez le nombre de fichiers à récupérer si nécessaire
      })})
   
    
        const data= await res.json()
        setDatac(data.entries)
        console.log(data.entries)
        // data.entries.map((item)=>console.log(item))
          console.log(datac)
          setLoading(false) 
    }
    apiGet()
  },[])
  
  
  return (
    <div className='w-full  flex h-full '>
      <div className='bg-gray-200 h-full w-[20%] text-white'>
        <div className='flex ml-4 flex-col justify-between h-full '>
          <h1 className='text-black p-4 pt-8'>
            Comptes
          </h1>
          <div className='items-end flex h-full ml-6 pb-4'>
            <button className='p-2 px-4 bg-blue-700  text-white rounded-md flex justify-center items-center ' >
              Ajoute Compte
            </button>
          </div>
        </div>
      </div>
      <div className='w-[80%]'>
        <div className='w-full items-center flex justify-between  bg-gray-200 p-4 shadow-md '>
          <p>Mes documments</p>
          <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
            <Popover.Trigger>
              <button className="bg-blue-700 rounded text-white justify-center flex items-center p-2 px-4">
                Parrametre
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <p>hii</p>
            </Popover.Content>
          </Popover>
        </div>
        <div className='w-full   bg-white  p-4'>
          {loading ? (<div>Loading ...</div>) : (<Table
            aria-label="Example static collection table with multiple selection"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>SIZE</Table.Column>
              <Table.Column>Type</Table.Column>
            </Table.Header>
            <Table.Body>
              {
              datac?.map(file => {
                 return (

                    <Table.Row key={file.name}>
                      <Table.Cell>{file.name}</Table.Cell>
                      <Table.Cell>{file.size}</Table.Cell>
                      <Table.Cell>{file['.tag']}</Table.Cell>
                    </Table.Row>

                  )
                })
              }
            </Table.Body>
            {/* /* ( <div className='flex flex-col justify-center items-center h-full gap-8 mt-20 '>
              <Image src={vide} className='w-60 h-66' />
              <div className='flex justify-center items-center ' >
                 <p className='text-xl font-meduim  '>Aucun fichier a afficher pour le moment  </p> 
              </div>
           </div>)
           }  */ }
          </Table>)}
        </div>
      </div>
    </div>
  )
}

export default ShowDocs