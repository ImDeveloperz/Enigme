import Image from 'next/image'
import React from 'react'
import logo from '@/images/logoDark.png'
import twiter from '@/images/twiter.png'
import facbook from '@/images/facbook.png'
import insta from '@/images/insta.png'
import github from '@/images/github.png'
import { Card } from '@nextui-org/react';
import Link from 'next/link'


const Footer = () => {
  return (
   <div>
     <div className='flex md:flex-row flex-col  p-6 items-center justify-center gap-10 md:gap-60'>
        <div>
           <Image src={logo} alt='Enigme Cloud' width='200' height='200'/>
        </div>
        <div className='text-white text-center flex md:flex-row flex-col gap-4 md:gap-8 '>
           <Link href="#Home">Home</Link>
           <Link href="#About">About us</Link>
           <Link href="#Services">Servises</Link>
           <Link href="#Contact">Contact</Link>
        </div>
        <div className='flex gap-4'>
          <Image src={twiter} alt='Twiter' width='30' height='16' />
          <Image src={insta} alt='insta' width='30' height='16' />
          <Image src={facbook} alt='facbook' width='30' height='16' />
          <Image src={github} alt='github' width='30' height='16' />
        </div>
    </div>
    <Card.Divider color="primary"/>   
      <div className='p-6'>
    <p className='text-white text-sm font-light text-center'>© Copyright 2022, All Rights Reserved by ClarityUI</p>
     </div>
   </div>
  )
}

export default Footer