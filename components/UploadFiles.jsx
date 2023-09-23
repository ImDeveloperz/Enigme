import React, { useEffect, useState, createRef } from 'react'
import Dropzone from 'react-dropzone';
import upload from "@/images/upload.png"
import { BsFiletypeDocx, BsFiletypeGif, BsFiletypeJpg, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePdf, BsFiletypePng, BsFiletypeSvg, BsFiletypeTxt } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropbox } from 'dropbox';
import Loading from './loading/Loading';
import Image from 'next/image'
import SimpleLoad from './loading/SimpleLoad';
import { useStateContext } from '@/utils/AuthContext';
export const IconFile = ({ type }) => {
    switch (type) {
        case 'png': return (<BsFiletypePng />);
        case 'jpg': return (<BsFiletypeJpg />);
        case 'jpeg': return (<BsFiletypeJpg />);
        case 'svg': return (<BsFiletypeSvg />);
        case 'gif': return (<BsFiletypeGif />);
        case 'mp4': return (<BsFiletypeMp4 />);
        case 'mp3': return (<BsFiletypeMp3 />);
        case 'pdf': return (<BsFiletypePdf />);
        case 'txt': return (<BsFiletypeTxt />);
        case 'docx': return (<BsFiletypeDocx />);
    }
}
const ACCESS_TOKEN = "sl.Be56EeXvtyG33Sdk1VyTZkpNHpW4epyVv8IQwTqTIcUaq_Uj4is0XPJ82ib7BOawox0NXbXUgomVY334VaCSDmBLypwrQzWnWS1U2bDbrSGqrAVLnSRoWnbEHR6TEvmfiem5sKVD";



const UploadFiles = () => {
    const { tokenAccess, setTokenAccess } = useStateContext()


    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

   
    const [type, setType] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [files, setFiles] = useState(null)
    const [notification, setNotification] = useState(null)
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        file.isUploading = true;
        const fileName = file.name
        setType(fileName.split('.').pop())

        setFiles(file)
        console.log(files)

    }
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const files = event.dataTransfer.files[0] ;
        // Do something with the dropped files (e.g., upload, process, etc.)
        setFiles(files)
        const fileName = files.name
        setType(fileName.split('.').pop())
        console.log(files);
    };
    const UploadFile = (file) => {
        const dbx = new Dropbox({ accessToken: tokenAccess });


        if (file) {
            setIsLoading(true)
            dbx.filesUpload({ path: '/' + file.name, contents: file })
                .then(function (response) {
                    console.log(response);
                    toast("Fichier envoyé!!!", {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    setFiles(null)
                    setIsLoading(false)
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        else {
            toast("Veuillez sélectionner un fichier")
        }
    }
    return (
        <div className='bg-[#090913]  text-white flex flex-col gap-10 items-center h-full w-full justify-center'>
            <div className='flex flex-col mt-28 gap-10 items-center p-10 border-dashed border-2 border-blue-400 px-14  rounded-md'>
                <div className='flex flex-col justify-center gap-4 items-center w-full first-letter'
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div></div>
                    <Image src={upload} width='80' height='100' />
                    <header className='text-semibold text-white text-sm'>Déposer Un fichier ou <label className='text-blue-700 cursor-pointer' htmlFor="file-upload">Choisir</label></header>
                    <p className='text-sm font-light '>Supporter les format: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT ..</p>
                    <input type='file' onChange={uploadHandler} id="file-upload" className='hidden rounded-md max-w-[500px] px-6 p-2 text-white bg-blue-700 ' />
                </div>
                <div className='w-full flex items-center justify-center'>
                    {files ? (
                        <div className='flex p-2 px-4 rounded bg-blue-500 items-center justify-between w-[500px] shadow-lg'>
                            <div className='text-xl'>
                                {isLoading ? (<SimpleLoad/>) : <IconFile type={type} />}
                            </div>
                            <p className='py-2 px-4' >{files.name}</p>
                        </div>
                    ) : null}
                </div>

            </div>
            <div className='flex gap-10  font-meduim '>
                <button className='border-white border p-2 px-6 rounded-md  text-white' onClick={()=>{ }}>Crypter</button>
                <button className='p-2 px-6 rounded-md border bg-blue-500 hover:bg-blue-700 border-blue-400' onClick={() => UploadFile(files)}>Envoyer</button>
            </div>
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
    )
}

export default UploadFiles
