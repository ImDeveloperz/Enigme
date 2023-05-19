import React, { useEffect, useState, createRef } from 'react'
import Dropzone from 'react-dropzone';
import { BsFiletypeDocx, BsFiletypeGif, BsFiletypeJpg, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePdf, BsFiletypePng, BsFiletypeSvg, BsFiletypeTxt } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropbox } from 'dropbox';

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
const ACCESS_TOKEN = "sl.Ber6ow-MBkHGpcmmKwbh4oIDbNIHXkvyrHLdXZkINt3VljxtoPk_cjEoZN37aMjBND43HNwSIMCEYpPvKX_e6fh9_nYJdjpDEf5MztPrckBzXVUjctdmYqNyyoCzGsjz8OrZ13DF" ;



const UploadFiles = () => {
    const [type, setType] = useState()
    const [isLoading,setIsLoading] =useState(false)
    const [files, setFiles] = useState(null)
    const [notification,setNotification]=useState(null)
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        file.isUploading = true;
        const fileName = file.name
        setType(fileName.split('.').pop())
       
        setFiles(file)
        console.log(files)

    }
    const UploadFile = (file ) => {
        const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
      setIsLoading(true)

       if(file){
        dbx.filesUpload({path: '/' + file.name, contents: file})
        .then(function(response) {
          console.log(response);
          toast("File Uploaded !!!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
          setFiles(null)
          setIsLoading(false)
        })
        .catch(function(error) {
          console.error(error);
        });
       }
       else{
        toast("Please select a file !!!")
       }
    }
    return (
        <div className=' flex flex-col gap-10 items-center h-full w-full justify-center'>
            <div className='flex flex-col gap-10 items-center p-10 border-dashed border-2 border-blue-400 px-14  rounded-md'>
                <div>
                    <input type='file' onChange={uploadHandler} className=' rounded-md max-w-[500px] px-6 p-2 text-white bg-blue-700 ' />
                </div>
                <div className='w-full flex items-center justify-center'>
                    {files ? (
                        <div className='flex p-2 px-4 bg-gray-200 items-center justify-between w-[500px] shadow-lg'>
                            <div className='text-xl'>
                                {isLoading ? (<div>Loading ...</div>) : <IconFile type={type} />}
                            </div>
                            <p className='py-2 px-4 ' >{files.name}</p>
                        </div>
                    ) : null}
                </div>
                
            </div>
            <div className='flex gap-10  font-meduim '>
                    <button className='bg-blue-500 p-2 px-6 rounded-md text-white'>Crypter</button>
                    <button className='p-2 px-6 rounded-md border border-blue-400' onClick={()=>UploadFile(files)}>Envoyer</button>
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
            theme="dark" />
        </div>
    )
}

export default UploadFiles
