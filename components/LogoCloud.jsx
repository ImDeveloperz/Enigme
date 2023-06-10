import Image from 'next/image'
import React from 'react'
import dropbox from '@/images/dropbox.png'
import drive from '@/images/drive.png'
import cloudinary from '@/images/cloudinary.png'



const LogoCloud = () => {
    return (
        <div className='flex flex-col items-center gap-16 justify-between'>
            <p className='text-center text-semibold text-white text-3xl'>Comptes Suppoter</p>
              <div className='md:flex gap-6 px-32  w-full items-center justify-between hidden '>
            <div className='flex  justify-center items-center flex-col  blue-glassmorphism text-gradient p-10 rounded-xl'>
                <div>
                <Image src={dropbox} alt="dropbox" />
                </div>
                <div>
                    <p>
                    Un service de stockage en ligne et de synchronisation de fichiers
                    qui permet aux utilisateurs de stocker et d'accéder à leurs fichiers depuis différents appareils et endroits. 
                    Il a été lancé en 2007 et a depuis gagné en popularité en tant que solution fiable et conviviale d'hébergement de fichiers.
                    </p>
                </div>
            </div>
            <div className='flex justify-center items-center flex-col blue-glassmorphism text-gradient bg-white p-10 rounded-xl'>
                <div>
                <Image src={drive} alt="drive" />
                </div>
                <div>
                    <p>
                    un service de stockage en ligne et de partage de fichiers proposé par Google.
                    Il permet aux utilisateurs de stocker, organiser et accéder à leurs fichiers et dossiers 
                    à partir de différents appareils connectés à Internet.
                    </p>
                </div>
           </div>
            <div className='flex justify-center items-center flex-col blue-glassmorphism text-gradient bg-white p-10 rounded-xl'>
                <div>
                <Image src={cloudinary} alt="cloudinary" />
                </div>
                <p>
                Une plateforme de gestion et de livraison d'images et de vidéos basée sur le cloud.
                     Elle fournit aux développeurs et aux entreprises les outils nécessaires pour stocker,
                     manipuler, optimiser et livrer efficacement du contenu multimédia sur le web et les applications mobiles.
                </p>
            </div>
        </div>
        </div>
    )
}

export default LogoCloud