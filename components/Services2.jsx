import React from 'react'
import service from '../images/service.png'
const Services2 = () => {
  const ServiceCard = ({title, subtitle ,subtitle1,style }) => (
    <div className={`flex animate-pulse flex-row justify-center items-center white-glassmorphism p-3  cursor-pointer hover:shadow-xl ${style}`}> 
      <div className="md:ml-2 flex flex-col flex-1">
        <h3 className="mt-2 text-white text-lg">{title}</h3>
        <p className="mt-1 text-white text-sm md:w-9/12">
          {subtitle} <br/> {subtitle1}
        </p>
      </div>
    </div>
  );
  return (
    <div className='service2 blue-glassmorphism w-full md:flex-row flex-col items-center   flex relative '>
        <div className='flex md:w-[20%%] md:h-full gap-[0.3rem] md:gap-[33%]  absolute md:left-0 md:ml-16 md:flex-col'>
            {/* <ServiceCard title="Services" subtitle1="hhhhhhhhhhhh" subtitle="hhhhhhhhhhhhhhhhhhHHh"/>
            <ServiceCard title="Services" subtitle1="hhhhhhhhhhhh" subtitle="hhhhhhhhhhhhhhhhhhHHh" /> */}
        </div>
        <div className='md:w-[60%] flex w-full items-center justify-center md:absolute top-0 left-64'>
            {/* <img src={service} alt="" className='md:w-full w-[90%] h-[40rem]' /> */}
        </div>
        <div className='flex md:w-[20%%] md:h-full gap-[0.3rem] md:gap-[33%]  bottom-0 absolute md:right-0 md:mr-16 md:flex-col'>
            {/* <ServiceCard style=" absolute" title="Services" subtitle1="hhhhhhhhhhhh" subtitle="hhhhhhhhhhhhhhhhhhHHh" /> */}
            {/* <ServiceCard style="-bottom-8 left-16 absolute " title="Services" subtitle1="hhhhhhhhhhhh" subtitle="hhhhhhhhhhhhhhhhhhHHh" /> */}
        </div>
    </div>
  )
}

export default Services2