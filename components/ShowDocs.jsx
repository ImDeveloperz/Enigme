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
import { Dropbox } from 'dropbox';
import axios from 'axios'
import { Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { useStateContext } from '@/utils/AuthContext';
import SimpleLoad from './loading/SimpleLoad';
const clientId = "xr0fdcw09il66bs";
const ShowDocs = () => {
  const { tokenAccess, setTokenAccess } = useStateContext()
  const router = useRouter()
  let pip = 0;
  const [selected, setSelected] = useState(new Set(["Comptes"]));
  // const []
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [isOpen, setIsOpen] = useState(false)
  const [datac, setDatac] = useState([]);
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState("")
  useEffect(() => {
    setLoading(true)
    const apiGet = async () => {
      const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + tokenAccess,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "path": path, // Spécifiez le chemin vers votre dossier
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

      // data.entries.map((item)=>console.log(item))
  
      setLoading(false)
    }
    apiGet()
  }, [pip, path, tokenAccess])

  const apiGet = async () => {
    setLoading(true)

    const res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess,
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
  
    // data.entries.map((item)=>console.log(item))
  
    setLoading(false)
  }
  const dowload = async (name, path) => {
    const res = await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess,
        "Dropbox-API-Arg": JSON.stringify({ "path": "" + path })
      },
    })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(await res.blob());
    link.download = name;

    // Programmatically triggering the download
    link.click();

    URL.revokeObjectURL(link.href);
  }
  const deleete = async (name, path) => {
    const res = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + tokenAccess,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "path": path,

      })
    })
    console.log(res)
    apiGet();
    toast("Le fichier " + name + " Bien Supprimer !!!", {
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

  const retour = () => {
   
}
  const Layout = ({ children }) => {
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
                      <button className='p-2 px-4 rounded-md  bg-blue-700 text-white text-md font-meduim ' onClick={() => Ajouter()}>
                        Ajouter
                      </button>
                    </div>
                  </Text>

                </Popover.Content>
              </Popover>

            </div>
          </div>
          {children}
        </div>

      </div>
    )
  }
  const Ajouter = async () => {
    console.log(clientId)
    var dbx = new Dropbox({ clientId: clientId });
    try {
      const authUrl = await dbx.auth.getAuthenticationUrl('http://localhost:3000/getToken');
      router.push(authUrl);

    } catch (error) {
      console.error('Error generating auth URL:', error);
    }

  }
 
  if (loading) {
    return (
      <Layout>
        <div className='h-[80%]  items-center justify-center flex '>
          <SimpleLoad/>
        </div>
      </Layout>
    )
  }
  else {
    if (datac || path != "") {

      return (
        <Layout>
          <div className='w-full   bg-white  p-4'>

            <Table aria-label="Mes Docs" css={{ height: "auto", minWidth: "100%" }}>
              <Table.Header>
                <Table.Column>NAME</Table.Column>
                <Table.Column>SIZE</Table.Column>
                <Table.Column>Type</Table.Column>
                <Table.Column></Table.Column>
              </Table.Header>
              <Table.Body>
                {path != '' &&(<Table.Row>
                  <Table.Cell >
                    <p className='text-xl font-extrabold cursor-pointer' onClick={()=>{
                      console.log('before',path)
                        if(path.includes("/")){
                          let array= path.split("/")
                          let length=array.length;
                            setPath(array.slice(0,length-2).join("/"))
                        }
                        else{
                          setPath("")
                        }
                        console.log('after',path)
                    }} >
                      ..
                    </p>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>)}
                {
                  datac?.map(file => {
                    if (file['.tag'] == 'file') {
                      return (
                        <Table.Row key={file.name}>
                          <Table.Cell>{IconFile(file.name.split('.').pop())} {file.name}</Table.Cell>
                          <Table.Cell>{file.size}</Table.Cell>
                          <Table.Cell>{file['.tag']}</Table.Cell>
                          <Table.Cell>
                            <div>
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
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )
                    }
                    return (
                      (<Table.Row key={file.name}>
                        <Table.Cell>{IconFile(file.name.split('.').pop())} {file.name}</Table.Cell>
                        <Table.Cell>__</Table.Cell>
                        <Table.Cell>{file['.tag']}</Table.Cell>
                        <Table.Cell>
                          <button onClick={() => setPath(path + file.path_display)}>
                            Consulter
                          </button>
                        </Table.Cell>
                      </Table.Row>)
                    )
                  })
                }
              </Table.Body>

            </Table>
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
        </Layout>
      )
    }
  }
  return (
    <Layout>
      <div className='flex flex-col justify-center items-center h-[80%]  gap-8 '>
        <Image src={vide} className='w-60 h-40' />
        <div className='flex justify-center items-center  flex-col gep-6' >
          <p className='text-md font-light '>Aucun fichier a afficher pour le moment </p>
          <button className='p-2 px-4 bg-blue-700 hover:bg-blue-500 text-md font-meduim text-white rounded-md' onClick={() => Ajouter()}>
            Refresh Token
          </button>
        </div>
      </div>
    </Layout>
  )
}


export default ShowDocs