import React, { useState, useRef } from "react";
import { InputHeader, InputFooter, InputSubmit } from "./input/Input.jsx";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { useStateContext } from "@/utils/AuthContext.js";
import axiosClient from "@/axios-client.js";
import * as Yup from 'yup'
import  {useRouter}  from "next/router";


const error="text-red-500 font-base text-[14px] "
export const SignUp = () => {
  const router = useRouter()
  const schema = Yup.object().shape({
    name: Yup.string().required('saisie votre nom'),
    prenom: Yup.string().required('saisie votre prenom'),
    email: Yup.string().email('email invalide').required('saisie votre email'),
    password: Yup.string()
      .min(8, 'mode pase doit avoir au moin 8 caractere ')
      .required('saisie votre mode passe'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "votre password n'est pas confirmer")
      .required("votre password n'est pas confirmer"),
  });
  const { setUser, setToken } = useStateContext()
  // const navigate = useNavigate();
  const prenomref = useRef()
  const confirmref = useRef()
  const nomref = useRef()
  const emailref = useRef()
  const passwordref = useRef()
  const [errors, setErrors] = useState({})
  const [errorM, setError] = useState()

  const handleRegistre = async (e) => {
    e.preventDefault();
    const payload = {
      name: nomref.current.value,
      prenom: prenomref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value,
      confirmPassword: confirmref.current.value
    }
      try {
        await schema.validate(payload, { abortEarly: false });
        // Submit the form if validation succeeds
        axiosClient.post('/auth/register', payload).then(({ data }) => {
         if(data.message){
          setError(data.message);
         }
         else{
          setToken(data.token)
          console.log(data)
          setUser(data.user)
          console.log(data)
          router.push('/Docpage');
          setError("");
         }
         setErrors({})
        }).catch(err => {
          console.log(err)
          const response = err.response;
          if (response && response.status == 422) {
            setErrors(response.data.errors);
          }
        });
        
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          // Update the errors state with validation errors
          const newErrors = {};
          err.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          
          setErrors(newErrors);
          console.log(errors);
        }
      }

  }
  return (
    <div className='w-full flex flex-col gap-4 justify-center items-center h-[90vh]    '>
      <div className='lg:w-[60%] md:w-[80%]  w-[90%]  rounded-lg px-14 p-6 pt-10 justify-start flex flex-col gap-4   text-black shadow-lg shadow-black'>
        <InputHeader body="Created for developers by developers" title="Create your account" />

        <form onSubmit={handleRegistre} action="" method="post" className='flex flex-col gap-2 w-[100%] '>
          <div className="flex gap-4 w-full ">
            <div className="w-[50%]">
            <Input
              label="Nom"
              type="text"
              ref={nomref}
            />
             {errors?.name && <div className={`${error}`}>{errors.name}</div>}
            </div>
           <div className="w-[50%]">
           <Input
              label="Prenom"
              type="text"
              ref={prenomref}
            />
            {errors?.prenom && <div className={`${error}`}>{errors.prenom}</div>}
           </div>
          </div>
          

          <Input
            label="Email"
            type="text"
            ref={emailref}
          />
        {errors?.email && <div className={`${error}`}>{errors.email}</div>}
        {errorM && <div className={`${error}`}>{errorM}</div>}
          <Input
            label="Password"
            type="password"
            ref={passwordref}
          />
        {errors?.password && <div className={`${error}`}>{errors.password}</div>}
          <Input
            label="Comfermer votre password"
            type="password"
            ref={confirmref}

          />
           {errors?.confirmPassword && (
          <div className={`${error}`} >{errors.confirmPassword}</div>
        )}

          <Checkbox size="sm" defaultSelected>Remember Me</Checkbox>

          <InputSubmit placeholder="Creer compte" />
        </form>
      </div>
      <InputFooter fisrtPara="Already have an acoount ?" secondPara="" span="Sign in" />
    </div>
  )
}
export const SignIn = () => {
  const router = useRouter();
  const { setUser, setToken } = useStateContext()
  const emailref = useRef()
  const passwordref = useRef()
  const [errors, setErrors] = useState({
    name: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorM, setError] = useState('')
  const schema = Yup.object().shape({
    email: Yup.string().email('email invalide').required('saisie votre email'),
    password: Yup.string()
      .min(8, 'mode pase doit avoir au moin 8 caractere ')
      .required('saisie votre mode passe'),
  });
  const login = async (e) => {
    e.preventDefault();
    const payload = {
      email: emailref.current.value,
      password: passwordref.current.value,
    }
    try {
      await schema.validate(payload, { abortEarly: false });
      // Submit the form if validation succeeds
      axiosClient.post('/auth/login', payload).then(({ data }) => {
        setError('')
        if(!data.message)
        {
          setUser(data.user);
          setToken(data.token);
          router.push('/Docpage');
        }
        setError(data.message)
      }).catch(err => {
        console.log(err)
        const response = err.response;
        if (response && response.status == 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
            console.log(response.data.errors)
          }
          else {
            setErrors({ email: [response.data.message] })
          }
        }
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Update the errors state with validation errors
        
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
   
  }
  return (
    <div className='w-full flex flex-col gap-6 justify-center items-center h-[90vh]    '>
      <div className='lg:w-[60%] md:w-[80%]  w-[90%]  rounded-lg px-14 p-6 pt-10 justify-start flex flex-col gap-6   text-black shadow-lg shadow-black'>
        <InputHeader body="Created for developers by developers" title="Consulter Votre compte" />
        <form onSubmit={login} action="" method="post" className='flex flex-col gap-4 w-[100%] '>
          {errorM && <div className={`${error}`}>{errorM}</div>}
          <Input
            label="Email"
            type="text"
            ref={emailref}
          />
           {errors?.email && <div className={`${error}`}>{errors.email}</div>}
          <Input
            label="Mode passe"
            type="password"
            ref={passwordref}
          />
          {errors?.password && <div className={`${error}`}>{errors.password}</div>}
          <Checkbox size="sm" defaultSelected>Remember Me</Checkbox>
          <InputSubmit placeholder="Login" />
        </form>
      </div>
      <InputFooter fisrtPara="vous etes nouveau ?" span="S'insrire" secondPara="mode passe oublier ?" />
    </div>
  )
}
