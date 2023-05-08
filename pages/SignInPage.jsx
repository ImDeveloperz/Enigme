import React, { useEffect } from 'react'
import { LeftSide} from '../components/utils'
import { SignIn } from '../components/utils/RightSide'
// import {BrowserRouter as Router,Routes,Route, useNavigate, Navigate} from 'react-router-dom'
// import { useStateContext } from '../contexts/contextProvider'
 

const Signpage = () => {
  // const navigate =useNavigate()
  // const {token}=useStateContext()
  // console.log(token)

//   if (token) {
//     return <Navigate to="/docs"/>
//  }
  return (
    <div className=' flex w-full h-screen'>
     <LeftSide/>
       <div className='w-full md:w-[70%] h-screen pt-10 bg-white text-black' >
          <SignIn/>
       </div>
    </div>
  )
}

export default Signpage