import React from 'react'
import vector1 from '../../images/vector1.png'
import vector2 from '../../images/vector2.png'
import Image from 'next/image';
 
import { Fade } from 'react-reveal'

const LeftSide = () => {
  return (
    <div className="w-[50%] relative hidden md:flex flex-col text-white bg-[#090913] h-full ">
        <div className=''>
            <Image src={vector2} alt="" />
        </div>
        <div className='flex flex-col items-center gap-20'>
        <Fade left>
        <div className='flex flex-col  gap-4'>
            
            <h1 className='xl:text-[4.2rem] md:text-[3rem] text-bold leading-none '>welcom to our<br/> community</h1>
            <p className=''>clarity and secure gives you more confidence to us.</p>
        </div>
        <div className=''>
            <Fade left>
            <p>
            &quot;Store your favorite files and folders,<br/> share them  with your collaborators,<br/>
                 and work on them from your computer device.&quot;
            </p>
            </Fade>
        </div>
        </Fade>
        </div>
        <div className='flex-end absolute bottom-0 right-0'> 
            <Image src={vector1} alt="" className='w-26 h-20' />
        </div>
    </div>
  )
}

export default LeftSide