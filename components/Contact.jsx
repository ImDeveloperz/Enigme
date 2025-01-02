import Image from 'next/image'
import React from 'react'
import contact from '@/images/Contact.png'
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { ref: contactRef, inView : myElemVisible } = useInView();

  return (
    <div id="Contact"  className={`text-white  flex flex-col md:flex-row pt-12 w-full gap-6 items-center ${myElemVisible ? 'view' : 'hidde'}`}  ref={contactRef} >
      <div className='flex flex-col xl:ml-24 justify-center py-10 p-5 md:w-[50%] blue-glassmorphism rounded-xl focus:outline-none gap-4 w-full'>
          <p className='text-4xl font-meduim text-center w-full'>
            Contact Us
          </p>
          <input type="text"  className='p-2 outline-none bg-transparent text-white border-none white-glassmorphism my-2 text-meduim text-sm rounded-sm' placeholder='Name'/>
          <input type="email"  className='p-2 outline-none bg-transparent text-white border-none white-glassmorphism my-2 text-meduim text-sm rounded-sm' placeholder='Gmail' />
          <textarea type="texteria" rows="4" cols="50" className='p-2 outline-none bg-transparent text-white border-none white-glassmorphism my-2 text-meduim text-sm rounded-sm' placeholder='Message'>
          </textarea>
          <button className='flex items-center justify-center text-md font-medium border py-2 rounded-lg hover:bg-blue-700 hover:border-0'>
            Envoyer
          </button>
      </div>
       <div className='md:w-[50%] w-full '>
        <Image alt='contact' src={contact} />
       </div>
    </div>
  )
}

export default Contact