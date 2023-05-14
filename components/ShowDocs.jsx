import { Popover } from '@nextui-org/react'
import React, { useState,useEffect } from 'react'
import { Table } from "@nextui-org/react";
import { useSession,signIn,signOut } from 'next-auth/react';
import axiosClient from '@/axios-client';
const ShowDocs = () => {
  const [isOpen, setIsOpen] = useState(false)
    const [folders, setFolders] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const response = await axiosClient.get('/dropbox','/');
       console.log(response.data);
      }
      fetchData();
    }, []);
  
  const {data : session}=useSession()
  console.log(session)
  return (
    <div className='w-full  flex h-full '>
    <div className='bg-gray-200 h-full w-[20%] text-white'>
      <div className='flex ml-4 flex-col justify-between h-full '>
        <h1 className='text-black p-4 pt-8'>
          Comptes
        </h1>
        <div className='items-end flex h-full ml-6 pb-4'>
          <button className='p-2 px-4 bg-blue-700  text-white rounded-md flex justify-center items-center '  onClick={() => signIn()}>
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
      <div className='w-full   bg-white shadow-md  p-4'>
        <Table
          aria-label="Example static collection table with multiple selection"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          selectionMode="multiple"
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>ROLE</Table.Column>
            <Table.Column>STATUS</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
              <Table.Cell>Technical Lead</Table.Cell>
              <Table.Cell>Paused</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
              <Table.Cell>Senior Developer</Table.Cell>
              <Table.Cell>Active</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
              <Table.Cell>Community Manager</Table.Cell>
              <Table.Cell>Vacation</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

      </div>
    </div>
  </div>
  )
}

export default ShowDocs