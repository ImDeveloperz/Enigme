'use-client'
import { useStateContext } from '@/utils/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const getToken = () => {
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
    <div>

       clicker ici pour le rediriger vers l'application
        <button onClick={()=>{router.push('http://localhost:3000/Docpage')}}>
            Retour
        </button>
    </div>
  )
}

export default getToken