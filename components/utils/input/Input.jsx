import React, { useEffect,forwardRef } from 'react'
import { useState } from 'react'
import { AiOutlineCheckSquare ,AiFillCheckSquare } from 'react-icons/ai';
// import {Link} from 'react-router-dom';
import Link from 'next/link';


export const Input = forwardRef(function Input({ type, placeholder, icon }, ref) {
    return (
    <div className='relative flex items-center'>
        <input ref={ref} type={type} name={type} className='pl-10 my-2 w-full  p-2 outline-none bg-transparent text-white text-sm border rounded-md  ' placeholder={placeholder} />
        {icon}
    </div>
    )
})
Input.displayName = 'Input';
export const InputCheck =({body})=>{
    const [isCheked,setIsChecked]=useState(false);
  const handleCheck = () => {
     setIsChecked(!isCheked);
  }
    return (
        <div className='flex  items-center gap-2 text-sm check-box  relative'>
            <input type="checkbox" name="remind" id="4" className='hidden ' />
            {isCheked ? <AiFillCheckSquare onClick={handleCheck} className='h-6 w-6 text-blue-500' /> : <AiOutlineCheckSquare onClick={handleCheck} className='h-6 w-6 text-blue-500' />}
            <h1 className='text-black'>{body}</h1>
        </div>
    )
    
}

export const InputSubmit=({placeholder,loading})=>{
    return (
        <div className='py-4'>
            <input disabled={loading} type="submit" value={placeholder} className='w-full p-2 border text-white rounded-md  bg-blue-800'/>
        </div>
    )
}

export const InputHeader=({title,body})  => {
    return(
        <div className='flex  flex-col items-start gap-2'>
             <h1 className='font-bold md:text-2xl sm:text-xl text-lg'>{title} </h1>
             <p className='text-gray-500 text-sm'>{body}</p>
         </div>
    )
}

export const InputFooter = ({fisrtPara,secondPara,span})  => {
    const [isSignin, setIsSignin]=useState(true);
    useEffect(()=>{
        if(span!='Connectez-vous'){
            setIsSignin(false);
        }
        else{
            setIsSignin(true);
        }
    },[span])   
     return (
    <div className='text-sm gap-4 flex flex-col items-center text-gray-500'>
     <p>{fisrtPara} <Link href={isSignin ? '/SignInPage' : '/SignUpPage' } className='text-blue-500 cursor-pointer font-bold'>{span}</Link> </p>
     <Link href="/forgotPassword" className='text-blue-500 font-bold cursor-pointer'>{secondPara}</Link>
    </div>
  )
}

