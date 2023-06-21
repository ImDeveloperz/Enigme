"use-client";
import React, { useEffect, useState } from "react";
import { Radio, Input, Button, Textarea } from "@nextui-org/react";
import { InputSubmit } from "./utils/input/Input";
import avatar from "@/images/avatar.png";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import axiosClient from "@/axios-client";
import { useStateContext } from "@/utils/AuthContext";
import { toast } from "react-toastify";
import { AiOutlineCamera } from "react-icons/ai";
import Image from "next/image";
import SimpleLoad from "./loading/SimpleLoad";
// import { useStateContext } from '../contexts/contextProvider';
// import axiosClient from '../axios-client';
// import AuthUser from './utils/AuthUser';
const ProfileEdit = () => {
  const router = useRouter();
  const { user, setUser } = useStateContext();

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  //   const uploadHandler = (event) => {
  //     const file = event.target.files[0];
  //     if (!file) return;
  //     file.isUploading = true;
  //     const fileName = file.name
  //     setType(fileName.split('.').pop())
  // }
  //   const handleDragLeave = () => {
  //       setIsDragOver(false);
  //   };
  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   setIsDragOver(false);
  //   const files = event.dataTransfer.files[0] ;
  //   // Do something with the dropped files (e.g., upload, process, etc.)
  //   setFiles(files)
  //   const fileName = files.name
  //   setType(fileName.split('.').pop())
  //   console.log(files);
  // };
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const image = useRef();
  
 async function handleOnChange(e) {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };
    console.log(image.current.files[0]);
    reader.readAsDataURL(image.current.files[0]);
  }
   function handleOnSubmit(file) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", "ml_default");

     fetch(
      "https://api.cloudinary.com/v1_1/dbdozvm8s/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then(async (r) => {
      const data = await r.json()
      console.log(data)
      const changeUrl =(res) =>{
        setImageSrc(res)
        console.log(imageSrc)
      }
      const url=data.secure_url      
      console.log(data.secure_url)
      const id = user.id_User;
      axiosClient
        .post("/user/profile", { url, id })
        .then(({ data }) => {
          axiosClient.post("/user/user").then((resp) => {
            setUser(resp.data.user);
            router.back();
            setLoading(false);
            console.log("hhhhhhh : ", resp.data.user);
          });
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });  
       
    });

   
  }
  // let { id } = useParams();
  // console.log("id  ", id)
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const pseudoRef = useRef();
  // const miniBioRef = useRef();
  const nomRef = useRef(user?.name);
  const prenomRef = useRef();
  const sexeRef = useRef();
  const TelephoneRef = useRef();
  const villeRef = useRef();
  const adresseRef = useRef();
  const naissanceRef = useRef();
  const bioRef = useRef();
  const paysRef = useRef();
  const [sexe, setSexe] = useState();
  const save = (e) => {
    e.preventDefault();
    // collect data
    const data = {
      pseudo: pseudoRef.current.value,
      biographie: bioRef.current.value,
      name: nomRef.current.value,
      prenom: prenomRef.current.value,
      gender: sexeRef.current.value,
      phone: TelephoneRef.current.value,
      city: villeRef.current.value,
      address: adresseRef.current.value,
      birthdate: naissanceRef.current.value,
      country: paysRef.current.value,
    };
    axiosClient
      .put(`/user/${user.id_User}`, data)
      .then((res) => {
        handleOnSubmit(image.current.files[0]);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
      
  };
  useEffect(() => {
    const changeImage = () => {
      setImageSrc(user?.image);
    };
    changeImage();
  }, [user]);
  if (!user || loading)
    return (
      <div className='flex h-screen items-center justify-center'>
        <SimpleLoad />
      </div>
    );
  return (
    <div className="w-full pt-32 ">
      <div className="p-8 px-20 h-screen w-full flex flex-col gap-10 ">
        <div className="w-full  flex gap-10 justify-center items-center">
          {/* <Image src={avatar} alt="" className='w-[12rem] h-[11.5rem] ' /> */}
          {/* <input type="file" /> */}
          <div className="border rounded-[100%] flex items-center justify-center  w-32 h-[60%] cursor-pointer">
            <label className="w-full h-full relative" htmlFor="file-upload">
              {/* <AiOutlineCamera className="z-10 absolute w-12 text-gray-600 top-4 left-8 h-16" /> */}
              <Image
                src={imageSrc ? imageSrc : avatar}
                className="rounded-[100%] h-full w-full border-2 border-blue-500 bg-blur"
                width="120"
                alt="profile"
                height="120"
              />
            </label>
            <input
              type="file"
              onChange={handleOnChange}
              ref={image}
              id="file-upload"
              className="hidden rounded-md w-20 px-6 p-2 text-white bg-blue-700 "
            />
          </div>
          <div className="flex flex-col w-full gap-4  font-bold text-md">
            <div className="flex flex-col w-full gap-2 ">
              <p>Pseoudo</p>
              <Input
                type="text"
                bordered
                value={user.name + " " + user.prenom}
                placeholder="Pseoudo"
                ref={pseudoRef}
              />
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <p>Mini-biographie</p>
              <Textarea
                className="w-full"
                bordered
                rows={2}
                size="md"
                placeholder="Entrer une mini biographie"
                ref={bioRef}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col font-bold text-md gap-8">
          <p>A propos de moi</p>
          <div className="flex md:flex-row flex-col  gap-6 w-full">
            <div className="w-full md:w-[50%] ">
              <Input
                label="Nom *"
                type="text"
                bordered
                placeholder="Nom"
                width="100%"
                ref={nomRef}
              />
            </div>
            <div className="w-full md:w-[50%] ">
              <Input
                label="Prénom *"
                type="text"
                width="100%"
                placeholder="Prenom"
                bordered
                ref={prenomRef}
              />
            </div>
          </div>

          <div className="flex gap-7 md:flex-row flex-col">
            <div className="w-full md:w-[50%]">
              <Input
                type="email"
                width="100%"
                disabled
                bordered
                label="Email"
                value={user.email}
                placeholder="Pseoudo"
                ref={pseudoRef}
              />
            </div>
            <div className="w-full md:w-[50%]">
              <Input
                width="100%"
                label="Date de naissance"
                type="date"
                ref={naissanceRef}
              />
            </div>
          </div>
          <div className="flex gap-7 md:flex-row flex-col w-full">
            <div className="w-full md:w-[50%] ">
              <Input
                label="Pays"
                type="text"
                width="100%"
                placeholder="Pays"
                bordered
                ref={paysRef}
              />
            </div>
            <div className="w-full md:w-[50%] ">
              <Input
                label="Telephone"
                type="text"
                width="100%"
                placeholder="Telephone"
                bordered
                ref={TelephoneRef}
              />
            </div>
          </div>
          <div className="flex gap-7 md:flex-row flex-col">
            <div className="w-full md:w-[50%] ">
              <Input
                label="Ville"
                type="text"
                width="100%"
                placeholder="Ville"
                bordered
                ref={villeRef}
              />
            </div>
            <div className="w-full md:w-[50%] ">
              <Input
                label="Adresse"
                type="text"
                width="100%"
                placeholder="Adresse"
                bordered
                ref={adresseRef}
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col  gap-6 w-full">
            <div className="w-full md:w-[50%] text-md font-base">
              <input type="radio" value="Femme" name="sexe" ref={sexeRef} />{" "}
              <span className="p-2 font-meduim ">Femme</span>
              <input
                type="radio"
                value="Homme"
                name="sexe"
                ref={sexeRef}
              />{" "}
              <span className="p-2 font-meduim">Homme</span>
            </div>
          </div>

          <div className=" flex items-center justify-end gap-x-6 pb-8">
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="w-[15%] text-sm font-semibold leading-6 text-gray-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md md:w-[15%] w-[25%] bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={save}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
