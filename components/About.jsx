import React from 'react'
import ab1 from '../images/ab1.png'
import ab2 from '../images/ab2.png'
import ab3 from '../images/ab3.png'
import ab4 from '../images/ab4.png'
import ab5 from '../images/ab5.png'
import ab6 from '../images/ab6.png'
import ab7 from '../images/ab7.png'
import ab8 from '../images/ab8.png'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image';
// import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div className='py-36 w-full  items-center ' id="About">
      {/* <p className='text-7xl Font-bold pb-20 text-white '>About <span className='text-blue-600'>Us</span></p> */}
      <div className='flex md:flex-row flex-col    px-4 '>
        <div className='md:w-[50%] flex w-full  relative  '>
          <Image src={ab3} alt="" className=' h-52 right-10  -top-14 absolute ' />
          <Image src={ab1} alt="" className='w-full md:w-[90%] ' />
          <Image src={ab2} alt="" className=' absolute left-16 aboutImg h-18 w-8' />
          <Image src={ab5} alt="" className='w-6 h-6 -top-6 aboutImg51 absolute ' />
          <Image src={ab5} alt="" className='w-6 h-6 -top-10 aboutImg5 left-80  absolute ' />
          <Image src={ab6} alt="" className='w-10 h-10 top-12 right-28 aboutImg6 absolute ' />
          <Image src={ab7} alt="" className='w-12 h-10  right-60 aboutImg7 absolute ' />
          <Image src={ab8} alt="" className='w-12 h-10  right-48 -top-6 aboutImg8 absolute ' />

        </div>
        <div className='flex gap-4 md:w-[50%] w-full  flex-col py-6  md:mr-10'>
          <h2 className='text-3xl sm:text-4xl xl:text-5xl text-white  text-gradient py-1'>Lorem  ipsum  <br /> consequat dolor  elitsed
            sit</h2>
          <p className='text-gray-300 text-left font-light mt-5 xl:w-9/12 text-base md:w-11/12 w-9/12'>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit,
            sed do eiusmod tempor incididunt
            ut l abore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat</p>
          <Link href='/SignInPage' className='flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546BD] ' >
            <button type='button'>
              <p className='text-white text-base font-semibold '>Sign Up</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About