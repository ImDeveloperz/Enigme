import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import elipse from '../images/elipse.png'
import { Text } from '@/utils/Text';
import { useInView } from "react-intersection-observer";

export const ServiceCard = ({ color, title, icon, subtitle }) => (

  <div className="flex md:flex-row flex-col justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl" id="Services">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white opacity-50 text-sm md:w-9/14">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () =>{ 
  const { ref: serviceRef, inView : myElemVisible } = useInView();

return (
  <div className={`flex w-full justify-center items-center gradient-bg-services px-14 ${myElemVisible ? 'view' : 'hidde'}`} ref={serviceRef}>
    <div className="flex md:flex-row flex-col items-center bg-bottom  justify-between md:p-10  px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          {Text[0].Service.service_title} 
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
        Avec Enigme Cloud, vous pouvez protéger vos fichiers en bénéficiant d un niveau de sécurité élevé. Notre App assure une sauvegarde confidentielle, vous permettant de sécuriser vos données avant de les partager sur le cloud ou de protéger celles déjà présentes.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCard
          color="bg-[#2952E3]"
          title={Text[0].Service.service_item1_title}
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle={Text[0].Service.service_item1_content} 
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title={Text[0].Service.service_item2_title}
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle={Text[0].Service.service_item2_content}
        />
        <ServiceCard
          color="bg-[#F84550]"
          title={Text[0].Service.service_item3_title}
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle={Text[0].Service.service_item3_content}
        />
      </div>
    </div>
  </div>
);
}

export default Services;