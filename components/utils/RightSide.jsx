import React, { useState, useRef } from "react";
import { InputHeader, InputFooter, InputSubmit } from "./input/Input.jsx";
import { Checkbox, Input, Button } from "@nextui-org/react";
import { useStateContext } from "@/utils/AuthContext.js";
import axiosClient from "@/axios-client.js";
import * as Yup from 'yup'
import  {useRouter}  from "next/router";
import { setCookie } from 'cookies-next';


const error="text-red-500 font-base text-[14px] "
export const SignUp = () => {
  const router = useRouter()
  const { setUser, setToken,token } = useStateContext()
  console.log('token :',token)
  // if(token) router.push('http://localhost:3000/Docpage')
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
          if(user.role==0){
            setCookie('role', 'user');
            setCookie('statue', 'active');
          }else{
            setCookie('role', 'admin');
          }
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
        <InputHeader body="Sécuriser vos fichiers dans le cloud " title="Créer Votre Compte" />

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
            label="Mot de passe"
            type="password"
            ref={passwordref}
          />
        {errors?.password && <div className={`${error}`}>{errors.password}</div>}
          <Input
            label="Confirmez le mot de passe"
            type="password"
            ref={confirmref}

          />
           {errors?.confirmPassword && (
          <div className={`${error}`} >{errors.confirmPassword}</div>
        )}

          <Checkbox size="sm" defaultSelected>Se souvenir de moi</Checkbox>

          <InputSubmit placeholder="S'inscrire" />
        </form>
      </div>
      <InputFooter fisrtPara="Vous avez un compte ?" secondPara="" span="Connectez-vous" />
    </div>
   )

}
export const SignIn = () => {
  const router = useRouter()
  const { setUser, setToken,token,user } = useStateContext()
  console.log('token :',token)
  // if(token) router.push('http://localhost:3000/Docpage')
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
          console.log("role",user.role)
          if(user.role==0){
          
            setCookie('role', 'user');
            setCookie('statue', 'active');
            router.push('/Docpage');
          }else{
            setCookie('role', 'admin');
            router.push('/Docpage/ajouterParametre');
          }
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
      <div className='lg:w-[60%] md:w-[80%]  w-[90%]  rounded-lg px-14 p-6 pt-10 justify-start flex flex-col gap-6 text-black shadow-lg shadow-black'>
        <InputHeader body="Sécuriser vos fichiers dans le cloud" title="Consulter Votre compte" />
        <form onSubmit={login} action="" method="post" className='flex flex-col gap-4 w-[100%] '>
          {errorM && <div className={`${error}`}>{errorM}</div>}
          <Input
            label="Email"
            type="text"
            ref={emailref}
          />
           {errors?.email && <div className={`${error}`}>{errors.email}</div>}
          <Input
            label="Mot de passe"
            type="password"
            ref={passwordref}
          />
          {errors?.password && <div className={`${error}`}>{errors.password}</div>}
          <Checkbox size="sm" defaultSelected>Se souvenir de moi</Checkbox>
          <InputSubmit placeholder="Connecter" />
        </form>
      </div>
      <InputFooter fisrtPara="Vous n’avez pas de compte ?" span="S'insrire" secondPara="Mot de passe oublier ?" />
    </div>
  )
   
}
