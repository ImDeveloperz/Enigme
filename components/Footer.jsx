import Image from 'next/image'
import React from 'react'
import logo from '@/images/logoDark.png'
import twiter from '@/images/twiter.png'
import facbook from '@/images/facbook.png'
import insta from '@/images/insta.png'
import github from '@/images/github.png'
import { Card } from '@nextui-org/react';
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'


const Footer = () => {
  return (
    <div className='pt-10 ' >
      <div className="bg-blue-700 my-7 -rotate-1 hidden   w-full py-2 h-10 flex-items-center justify-center">
        <div className='md:flex gap-8 text-white  font-light hidden text-[14px]'>
          <p>
            All rights reserved
          </p>
          <p>
            Copyright ©2023 All rights reserved
          </p>
          <p>
            Copyright ©2023 All rights reserved
          </p>
          <p>
            Copyright ©2023 All rights reserved
          </p>
          <p>
            Copyright ©2023 All rights reserved
          </p>
          <p>
            Copyright ©2023 All
          </p>
        </div>
      </div>
      <div className='md:flex-row flex-col flex px-6 justify-between items-center md:px-14'>
        <div className='flex  flex-col  p-6 pb-8 justify-between  '>
          <div>
            <Image src={logo} alt='Enigme Cloud' width='200' height='200' />
          </div>
          {/* <div className='text-white text-center flex md:flex-row flex-col gap-4 md:gap-8 '>
          <Link href="#Home">Home</Link>
          <Link href="#About">About us</Link>
          <Link href="#Services">Servises</Link>
          <Link href="#Contact">Contact</Link>
       </div> */}
          <div className='flex text-white items-center justify-center gap-6'>
            <div className='cursor-pointer p-[6px] white-glassmorphism'>
              <FaInstagram className='cursor-pointer' />
            </div>
            <div className='cursor-pointer p-[6px] white-glassmorphism'>
              <FaTwitter className='cursor-pointer' />
            </div>
            <div className='cursor-pointer p-[6px] white-glassmorphism'>
              <FaFacebook className='cursor-pointer' />
            </div>
            <div className='cursor-pointer p-[6px] white-glassmorphism'>
              <FaWhatsapp className='cursor-pointer' />
            </div>
          </div>
        </div>
        <div className=' text-center items-center flex-col flex md:w-[50%] pt-10 w-full p-6'>
          <p className='text-white text-md opacity-50 font-medium '>
            Nous sommes déterminés à vous offrir une expérience utilisateur exceptionnelle. Si vous avez des questions,
            des préoccupations ou des suggestions, n hésitez pas à nous contacter. Notre équipe de support est là pour vous aider.
          </p>
          <p className='text-md font-md text-blue-500' >Merci pour votre Visite</p>
        </div>
      </div>

      {/* <Card.Divider color="primary"/>   
      <div className='p-6'>
    <p className='text-white text-sm font-light text-center'>© Copyright 2022, All Rights Reserved by ClarityUI</p>
     </div> */}
    </div>
  )
}

export default Footer
