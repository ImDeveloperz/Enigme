"use-client"
import React,{Suspense, useEffect} from 'react'
import Link from 'next/link'
import { Text } from '@/utils/Text';
import Image from 'next/image';
 import  home  from '../images/home.png'
import { Canvas } from "@react-three/fiber";
import { useInView } from 'react-intersection-observer';

import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import AOS from 'aos'
const connectUser =()=>{

}
const Home = () => {
  const { ref: headerRef, inView : myElemVisible } = useInView();

  useEffect(()=>{
    AOS.init({duration : 2000})
  },[])
  const commonStyles = "min-h-[70px] w-full sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-semibold text-white";
  return (
    <div className={`flex w-full justify-start ${myElemVisible ? 'view' : 'hidde'} `}  ref={headerRef} >
      <div className='flex md:flex-row flex-col items-start justify-start md:p-6 px-4 ' >
        <div className='flex md:w-[50%] w-full justify-start flex-col  py-6 md:mr-10 md:ml-16' data-aos="fade-left">
         
          <h1 className='text-3xl sm:text-4xl xl:text-5xl text-white  text-gradient py-1'   >
          {Text[0].Home.home_title}
         </h1>
          <p className='text-gray-300 ml-2 text-left mb-2 pb-8 font-light mt-5 xl:w-9/12 text-md md:w-11/12 w-9/12'>
          {Text[0].Home.home_content}
          </p>
         
          <Link href="/SignUpPage" className=' flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546BD] ' >
          <button type='button'
          onClick={connectUser}>
          <p className='text-white text-base font-semibold '>Inscrivez-vous</p>
          </button>
          </Link>
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full '>
              <div className={`rounded-tl-2xl  ${commonStyles}`}>Simplicité</div>
              <div className={`${commonStyles}`}>Télécharger</div>
              <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Crypter</div>
              <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Sécurité</div>
              <div className={`${commonStyles}`}>Envoyer</div>
              <div className={`rounded-br-2xl ${commonStyles}`}>Décrypter</div>
          </div>
        </div>
        <div className=' md:flex-3 flex-1 md:flex hidden relative h-full w-full md:w-[50%] '>
        <Canvas >
            <Suspense fallback={null}>
              <OrbitControls enableZoom={true} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                  color="#2952e3"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas>
        <Image src={home} alt="" className='homeImg'/>
        </div>
        </div>
      </div>
    
  )
}

export default Home