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
            
            <h1 className='xl:text-[2.5rem] md:text-[1.5rem] text-bold leading-none '>Bienvenue dans notre <br/> communauté</h1>
            <p className='text-sm opacity-50 '>
             La clarté et la sécurité vous donnent plus de confiance en nous.
           </p>
        </div>
        <div className='text-sm p-14'>
            <Fade left>
            <p className=' opacity-40 font-extralight'>
            &quot;"Enigme Cloud : la solution de cryptage pour une confidentialité totale sur le cloud.
             Cryptez, synchronisez et sécurisez vos données sensibles
             en un clic sur le cloud.&quot;
            </p>
            </Fade>
        </div>
        </Fade>
        </div>
        <div className='flex-end absolute bottom-0 right-0'> 
            <Image src={vector1} alt="" className='w-56 h-20' />
        </div>
    </div>
  )
}

export default LeftSide