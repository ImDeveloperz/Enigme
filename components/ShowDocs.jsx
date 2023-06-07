'use-client'
import { Input, Popover } from '@nextui-org/react'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Table } from "@nextui-org/react";
import axiosClient from '@/axios-client';
import { ToastContainer, toast } from 'react-toastify';
import { CiMenuKebab } from 'react-icons/ci';
import { IconFile } from './UploadFiles';
import vide from '../images/vide.png';
import Image from 'next/image';
import { Dropbox } from 'dropbox';
import { Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router';
import { useStateContext } from '@/utils/AuthContext';
import SimpleLoad from './loading/SimpleLoad';
import { BsDropbox } from 'react-icons/bs';
import { DiGoogleDrive } from 'react-icons/di';
import { deleete, dowload } from './helper/functions';
import { decryptFile, processFile } from './helper/cryptage';

const clientId = "xr0fdcw09il66bs";

const ShowDocs = () => {
  const { tokenAccess, user } = useStateContext()
  const nomref = useRef()
  const [comptes, setComptes] = useState([]);
  useEffect(() => {
    const getComptes = async () => {
      const userId = user?.id_User
      try {
        const { data } = await axiosClient.post('/ajouter/selectComptes', userId);
        if (data.compte) {
          setComptes(data.compte);
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 422) {
          console.log(error.response);
        }
      }
    }
    getComptes()
  }, [user])
  const router = useRouter()
  let pip = 0;
  const [selected, setSelected] = useState(new Set(["Comptes"]));
  // const []
  const [selectedC, setSelectedC] = useState(new Set(["crptage"]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const typeCryptage = useMemo(
    () => Array.from(selectedC).join(", ").replaceAll("_", " "),
    [selectedC]
  );
  const [datac, setDatac] = useState([]);
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false)
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
          "path": "" + path, // Spécifiez le chemin vers votre dossier
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
        "path": "" + path, // Spécifiez le chemin vers votre dossier
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
    setLoading(false)
  }

  const Layout = ({ children }) => {
    return (
      <div className='w-full  flex h-full'>
        <div className='bg-gray-200 h-full w-[20%] text-white'>
          <div className='flex items-center flex-col gap-8 h-full '>
            <h1 className='text-black p-4 pt-8'>
              Comptes
            </h1>
            <div className='border rounded-lg flex flex-col gap-4'>
              {comptes?.map((compte) => {
                return (
                  <div className='flex gap-6 px-4 py-2 rounded-lg hover:bg-slate-400 text-black items-center justify-center'>
                    <p>{compte.nomCompte}</p>
                    {compte.typeCompte_id == 0 ? <BsDropbox /> : <DiGoogleDrive />}
                  </div>
                )
              })}

            </div>
          </div>
        </div>
        <div className='w-[80%]'>
          <div className='w-full items-center flex justify-between  bg-gray-200 p-4 shadow-md '>
            <p>Mes documments</p>
            <div className='items-end flex h-full  ml-6 pb-4 relative'>

              <button className={`p-2 px-4 bg-blue-700  text-white rounded-md flex justify-center items-center ${active ? 'hidden' : 'flex'}`} onClick={() => {

                setActive(true)
              }}>
                Ajoute Compte
              </button>
              <div className={` ${active ? 'flex flex-col z-[1000] rounded-xl p-10 absolute top-0 right-0 bg-white shadow-lg' : 'hidden'}`}>
                <div className='w-[300px] flex justify-center flex-col items-center'>
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
                  <div className='w-[300px] flex justify-center flex-col items-center'>
                    <p className='text-md font-medium  '> Choisir le type du Cryptage</p>
                  </div>
                  <Dropdown>
                    <Dropdown.Button flat>
                      <div className='text-md flex items-center justify-center w-[100px] '>
                        {typeCryptage}
                      </div>
                    </Dropdown.Button>
                    <Dropdown.Menu aria-label="Single selection actions"
                      color="primary"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedC}
                      onSelectionChange={setSelectedC}
                    >
                      <Dropdown.Item key="AES">AES</Dropdown.Item>
                      <Dropdown.Item key="Blowfish">Blowfish</Dropdown.Item>
                      {/* <Dropdown.Item key="edit"></Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Input
                    label="Nom"
                    type="text"
                    ref={nomref}
                  />
                  <div className='flex gap-6'>
                    <button className='p-2 px-4 rounded-md  border-blue-700 border text-black text-md font-meduim' onClick={() => {
                      setActive(false)
                    }}>
                      Annuler
                    </button>
                    <button className='p-2 px-4 rounded-md  bg-blue-700 text-white text-md font-meduim ' onClick={() => {
                      setActive(false)
                      Ajouter()
                    }}>
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>

      </div >
    )
  }
  const [crypte,setCrypte]=useState('crypter')
  const Ajouter = async () => {
    const nom = nomref.current.value
    let typeCompte = 0;
    if (selectedValue == "Google Drive") typeCompte = 1;
    let typeCrypte = 0;
    if (typeCryptage == "Blowfish") typeCrypte = 1;
    const userId = user.id_User
    axiosClient.post('/ajouter/ajouterCompte', { nom, typeCompte, typeCrypte, userId }).then(({ data }) => {
      setComptes(data.compte)
    }).catch(err => {
      console.log(err)
      const response = err.response;
      if (response && response.status == 422) {
        console.log(response)
      }
    });
    var dbx = new Dropbox({ clientId: clientId });
    try {
      const authUrl = await dbx.auth.getAuthenticationUrl('http://localhost:3000/getToken', 'code');
      router.push(authUrl);

    } catch (error) {
      console.error('Error generating auth URL:', error);
    }
  }
  if (loading) {
    return (
      <Layout>
        <div className='h-[80%]  items-center justify-center flex '>
          <SimpleLoad />
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
                {path != '' && (<Table.Row>
                  <Table.Cell >
                    <p className='text-xl font-extrabold cursor-pointer' onClick={() => {
                      if (path.includes("/")) {
                        let array = path.split("/")
                        let length = array.length;
                        setPath(array.slice(0, length - 1).join("/"))
                      }
                      else {
                        setPath("")
                      }
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
                                    <p className='hover:text-blue-700 cursor-pointer' onClick={() => {
                                      dowload(file.name, file.path_display, tokenAccess)

                                    }}>
                                      Telecharger
                                    </p>
                                    <p className='hover:text-blue-700 cursor-pointer' onClick={() => {
                                      deleete(file.name, file.path_display, tokenAccess)
                                      setTimeout(()=>{ apiGet()},3000)
                                    }
                                    }>
                                      Supprimer
                                    </p>
                                    <p className='hover:text-blue-700 cursor-pointer' onClick={() => {
                                      if(crypte!='crypter'){
                                        decryptFile(file.name, file.path_display, tokenAccess)
                                        setCrypte('crypter')
                                      }else{
                                        processFile(file.name, file.path_display, tokenAccess)
                                        setCrypte('decrypter')
                                      }
                                      
                                     setTimeout(()=>{ apiGet()},15000)
                                    }} >
                                      {crypte}
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
                          <button onClick={() => {
                            setPath(file.path_display)
                            console.log('path', path)
                          }}>

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