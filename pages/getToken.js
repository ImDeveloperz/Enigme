'use-client'
import { useStateContext } from '@/utils/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const GetToken = () => {
    const { tokenAccess, setTokenAccess } = useStateContext()
    const router = useRouter();
    const getTokeen=()=>{
        const hash = router.asPath.split('#')[1];
  const tokenParams = new URLSearchParams(hash);
  const accessToken = tokenParams.get('access_token');
        console.log(accessToken)
        // const params = new URLSearchParams(url.hash.substr(1));
    //     if (params.has('access_token')) {
    //         const accessToken = params.get('access_token');
    //         console.log('Access Token:', accessToken);
           setTokenAccess(accessToken)
    //        console.log(tokenAccess)
        
    // }
}
    getTokeen();
  return (
    <div className='flex flex-col justify-center items-center '>
        <p className='text-md font-medium text-center'>Votre compte a ete bien Enregistrer</p>
        <button className='p-2 px-4 bg-blue-700 hover:bg-blue-500 text-md font-meduim text-white' onClick={()=>{router.push('http://localhost:3000/Docpage')}}>
            Retour
        </button>
    </div>
  )
}

export default GetToken