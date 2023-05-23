'use-client'
import { Popover, Text } from '@nextui-org/react'
import React, { useState, useEffect, useMemo } from 'react'
import { Table } from "@nextui-org/react";
import { useSession, signIn, signOut } from 'next-auth/react';
import axiosClient from '@/axios-client';
import { ToastContainer, toast } from 'react-toastify';
import { CiMenuKebab } from 'react-icons/ci';
import { IconFile } from './UploadFiles';
import vide from '../images/vide.png';
import Image from 'next/image';

import { Dropdown } from "@nextui-org/react";
// import { data } from 'autoprefixer';

const accessToken = "sl.Be5N0MmhaNOSqJ4sCDhz5tCHbEpWBG6p6Y_viBBjK1Zb-r1hL7ECO5FKQftdqxsctc11QHXwhZiT4VOPqBtBADAB5XrZ-Z9VMo4d3StGSommcjCMeld56aLKugabnGcsXoH7DDr_"
const ShowDocs = () => {
  let pip=0;
  const [selected, setSelected] = useState(new Set(["Comptes"]));
  // const []
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [isOpen, setIsOpen] = useState(false)
  const [datac, setDatac] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const apiGet = async () => {
      const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
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
        })
      })
      const data = await res.json()
      setDatac(data.entries)
      console.log(data.entries)
      // data.entries.map((item)=>console.log(item))
      console.log(datac)
      setLoading(false)
    }
    apiGet()
  }, [pip])


    const apiGet = async () => {
      setLoading(true)
      const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
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
        })
      })
      const data = await res.json()
      setDatac(data.entries)
      console.log(data.entries)
      // data.entries.map((item)=>console.log(item))
      console.log(datac)
      setLoading(false)
    }
  const dowload = async (name, path) => {
    console.log("name : ", name, "path : ", path)
    const res = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
      },
      //   body: JSON.stringify({
      //     "path": path,
      //     "recursive": false,
      //     "include_media_info": false,
      //     "include_deleted": false,
      //     "include_has_explicit_shared_members": false,
      //     "include_mounted_folders": true,
      //     "limit": 1000 // Spécifiez le chemin vers votre dossier  
      // })
    })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(await res.blob());
    link.download = name;

    // Programmatically triggering the download
    link.click();

    // Clean up the object URL after the download
    URL.revokeObjectURL(link.href);
    console.log(res)
  }
  const deleete = async (name,path) => {
    const res = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json"
      },
        body: JSON.stringify({
          "path": path,
          
      })
    })
    console.log(res)
    apiGet();
    toast("Le fichier "+name+" Bien Supprimer !!!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })

  }
  return (
    <div className='w-full  flex h-full '>
      <div className='bg-gray-200 h-full w-[20%] text-white'>
        <div className='flex ml-4 flex-col justify-between h-full '>
          <h1 className='text-black p-4 pt-8'>
            Comptes
          </h1>

        </div>
      </div>
      <div className='w-[80%]'>
        <div className='w-full items-center flex justify-between  bg-gray-200 p-4 shadow-md '>
          <p>Mes documments</p>
          <div className='items-end flex h-full  ml-6 pb-4'>
            <Popover placement='top-left' css={{ w: "800" }}>
              <Popover.Trigger>
                <button className='p-2 px-4 bg-blue-700  text-white rounded-md flex justify-center items-center ' >
                  Ajoute Compte
                </button>
              </Popover.Trigger>
              <Popover.Content>
                <Text css={{ p: "$10" }}>
                  <div className='w-[300px] flex justify-center items-center'>
                    <p className='text-md font-medium  '> Choisir le type du Compte</p>
                  </div>
                  <div className='pt-8 w-[300px] flex flex-col gap-8 justify-center items-center'>
                    <Dropdown>
                      <Dropdown.Button flat>
                        <div className='text-md flex items-center justify-center w-[100px] '>
                          {selectedValue}
                        </div>
                      </Dropdown.Button>
                      <Dropdown.Menu aria-label="Single selection actions"
                        color="primary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selected}
                        onSelectionChange={setSelected}
                      >
                        <Dropdown.Item key="Dropbox">Dropbox</Dropdown.Item>
                        <Dropdown.Item key="Google Drive">Google Drive</Dropdown.Item>
                        {/* <Dropdown.Item key="edit"></Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                    <button className='p-2 px-4 rounded-md  bg-blue-700 text-white text-md font-meduim '>
                      Ajouter
                    </button>
                  </div>
                </Text>

              </Popover.Content>
            </Popover>

          </div>
        </div>
        <div className='w-full   bg-white  p-4'>
          {loading ? (<div>Loading ...</div>) : (<Table
            aria-label="Mes Docs"
            css={{
              height: "auto",
              minWidth: "100%",
            }}
          >
            <Table.Header>
              <Table.Column>NAME</Table.Column>
              <Table.Column>SIZE</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column></Table.Column>
            </Table.Header>
            <Table.Body>
              {
                datac?.map(file => {
                  return (
                    <Table.Row key={file.name}>
                      <Table.Cell>{IconFile(file.name.split('.').pop())} {file.name}</Table.Cell>
                      <Table.Cell>{file.size}</Table.Cell>
                      <Table.Cell>{file['.tag']}</Table.Cell>
                      <Table.Cell>
                        {
                          file['.tag'] == 'file' ?
                            (<div>
                              <Popover placement='bottom-right' css={{ w: "800" }}>
                                <Popover.Trigger>
                                  <div className='cursor-pointer'>
                                    <CiMenuKebab />
                                  </div>
                                </Popover.Trigger>
                                <Popover.Content>
                                  <div className='p-4 px-6  flex flex-col gap-4 text-sm font-meduim'>
                                    <p className='hover:text-blue-700' onClick={() => dowload(file.name, file.path_display)}>
                                      Telecharger
                                    </p>
                                    <p className='hover:text-blue-700' onClick={() => deleete(file.name, file.path_display)}>
                                      Supprimer
                                    </p>
                                  </div>
                                </Popover.Content>
                              </Popover>
                            </div>) : null
                        }
                      </Table.Cell>

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
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
        </div>
      </div>
     
    </div>
  )
}

export default ShowDocs