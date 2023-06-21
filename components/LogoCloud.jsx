import Image from 'next/image'
import React from 'react'
import dropbox from '@/images/dropbox.png'
import drive from '@/images/drive.png'
import cloudinary from '@/images/cloudinary.png'
import { useInView } from 'react-intersection-observer'



const LogoCloud = () => {
    const { ref: logoRef, inView : myElemVisible } = useInView();

    return (
        <div className={`flex flex-col items-center gap-16 justify-between mb-20 ${myElemVisible ? 'view' : 'hidde'}`} ref={logoRef}>
            <p className='text-center text-semibold text-white text-4xl'>Comptes Suppoter</p>
              <div className='md:flex gap-6 opacity-60  px-32  w-full items-center justify-between hidden '>
            <div className='flex  gap-6 justify-center items-center flex-col  blue-glassmorphism  p-10 rounded-xl'>
                <div>
                <Image src={dropbox} alt="dropbox" />
                </div>
                <div> 
                    <p className='text-white'>
                    Un service de stockage en ligne et de synchronisation de fichiers
                    qui permet aux utilisateurs de stocker et d'accéder à leurs fichiers depuis différents appareils et endroits. 
                    Il a été lancé en 2007 et a depuis gagné en popularité en tant que solution fiable et conviviale d'hébergement de fichiers.
                    </p>
                </div>
            </div>
            <div className='flex  gap-6 justify-center items-center flex-col blue-glassmorphism   p-10 rounded-xl'>
                <div>
                <Image src={drive} alt="drive" />
                </div>
                <div>
                    <p className='text-white'>
                    un service de stockage en ligne et de partage de fichiers proposé par Google.
                    Il permet aux utilisateurs de stocker, organiser et accéder à leurs fichiers et dossiers 
                    à partir de différents appareils connectés à Internet.
                    </p>
                </div>
           </div>
        </div>
        </div>
    )
}

export default LogoCloud