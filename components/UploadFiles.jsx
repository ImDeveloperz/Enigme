import React, { useEffect, useState,createRef } from 'react'
import Dropzone from 'react-dropzone';
import { BsFiletypeDocx, BsFiletypeGif, BsFiletypeJpg, BsFiletypeMp3, BsFiletypeMp4, BsFiletypePdf, BsFiletypePng, BsFiletypeSvg, BsFiletypeTxt } from 'react-icons/bs';

export const IconFile = ({type}) =>{
    switch(type){
        case 'png': return (<BsFiletypePng/>);
        case 'jpg': return (<BsFiletypeJpg/>);
        case 'jpeg': return (<BsFiletypeJpg/>);
        case 'svg': return (<BsFiletypeSvg/>);
        case 'gif': return (<BsFiletypeGif/>);
        case 'mp4': return (<BsFiletypeMp4/>);
        case 'mp3': return (<BsFiletypeMp3/>);
        case 'pdf': return (<BsFiletypePdf/>);   
        case 'txt': return (<BsFiletypeTxt/>);  
        case 'docx': return (<BsFiletypeDocx/>);  
    }
}
const UploadFiles = () => {
    const [type,setType]=useState()
    const [files, setFiles] = useState(null)
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        const fileName=file.name
       setType(fileName.split('.').pop())
       
        setFiles(file)
         console.log(files)
        // upload file
        // const formData = new FormData();
        // formData.append(
        //     file.name,
        //     file,
        //     file.name
        // )


      
    }

    return (
        <div className=' flex flex-col gap-10 items-center h-full w-full justify-center'>
            <div className='flex flex-col gap-10 items-center p-10 border-dashed border-2 border-blue-400 px-14  rounded-md'>
            <div> 
                <input type='file' onChange={uploadHandler}  className=' rounded-md max-w-[500px] px-6 p-2 text-white bg-blue-700 ' />
            </div>
            <div className='w-full flex items-center justify-center'>
                {files ?  (
                    <div className='flex p-2 px-4 bg-gray-200 items-center justify-between w-[500px] shadow-lg'>
                       <div className='text-xl'>
                       <IconFile type={type}/>
                       </div>
                        <p className='py-2 px-4 ' >{files.name}</p>
                    </div>
                ) : null }
            </div>
        <div className='flex gap-10  font-meduim '>
            <button className='bg-blue-500 p-2 px-6 rounded-md text-white'>Crypter</button>
            <button className='p-2 px-6 rounded-md border border-blue-400'>Envoyer</button>
        </div>
        </div>
            </div>
    )
}

export default UploadFiles
