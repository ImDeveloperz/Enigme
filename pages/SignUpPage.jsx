import React from 'react'
import { SignUp } from '../components/utils/RightSide'
import { LeftSide } from '../components/utils'
const SignUpPage = () => {
  return (
    <div className=' flex w-full h-screen'>
     <LeftSide/>
       <div className='w-full md:w-[70%] h-screen pt-10 bg-white text-black' >
  
          <SignUp/>
       </div>
    </div>
  )
}

export default SignUpPage