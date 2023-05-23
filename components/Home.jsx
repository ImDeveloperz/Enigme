import React,{Suspense} from 'react'
import Link from 'next/link'
// import { Fade } from 'react-reveal'
import Image from 'next/image';
 import  home  from '../images/home.png'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
const connectUser =()=>{

}
const Home = () => {
  const commonStyles = "min-h-[70px] w-full sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-semibold text-white";
  return (
    <div className='flex w-full justify-start ' id="Home" >
      <div className='flex md:flex-row flex-col items-start justify-start md:p-6 px-4'>
        <div className='flex md:w-[50%] w-full justify-start flex-col py-6 md:mr-10'>
         
          <h1 className='text-3xl sm:text-4xl xl:text-5xl text-white  text-gradient py-1'>
          Un accès simple  et sécurisé à votre contenu UUUU</h1>
          <p className='text-gray-300 text-left font-light mt-5 xl:w-9/12 text-base md:w-11/12 w-9/12'>
          Stockez vos fichiers et dossiers que vous préférez, partagez-les avec vos collaborateurs, et travaillez dessus depuis votre appareil  ordinateur .
          </p>
         
          <Link href="/SignUpPage" className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546BD] ' >
          <button type='button'
          onClick={connectUser}>
          <p className='text-white text-base font-semibold '>Sign Up</p>
          </button>
          </Link>
          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
              <div className={`rounded-tl-2xl  ${commonStyles}`}>Security</div>
              <div className={`${commonStyles}`}>Cloud</div>
              <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Security</div>
              <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Security</div>
              <div className={`${commonStyles}`}>Security</div>
              <div className={`rounded-br-2xl ${commonStyles}`}>Security</div>
          </div>
        </div>
        <div className=' md:flex-3 flex-1 relative h-full w-full md:w-[50%] '>
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