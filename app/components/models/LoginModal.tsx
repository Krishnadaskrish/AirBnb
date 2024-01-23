"use client"
import {signIn} from 'next-auth/react'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FaGoogle } from 'react-icons/fa';

import { useCallback,useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModel from "@/app/hooks/UseRegisterModal";
import useLoginModel from "@/app/hooks/UseLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { useRouter } from 'next/navigation';


const LoginModal = () => {
    const router = useRouter()
    const registerModel = useRegisterModel()
    const loginModal = useLoginModel()
    const [isLoding,setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm <FieldValues>({
        defaultValues : {
           email : '',
           password : '' 
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{

       setIsLoading(true);
       const isAdminLogin = data.email === 'krishnadas@gmail.com' && data.password === 'krish@123#'
       const credentials = isAdminLogin 
       ?{email : 'krishnadas@gmail.com',password :  'krish@123#'}
       : data ;
       signIn('credentials',{
        ...credentials,
        redirect : false
       })
       .then((callback)=>{
        setIsLoading(false);
        if (callback?.ok){
            toast.success('Logged In');

            if (isAdminLogin) {
                router.push('/admin');
                router.refresh()
            loginModal.onClose()

        }else{
            router.push('/');
            router.refresh()
            loginModal.onClose()
        }
    }
        
        if(callback?.error){
            toast.error(callback.error)
        }
       })
       
    }
    const toggle = useCallback(()=>{
        loginModal.onClose();
        registerModel.onOpen();

    },[])
    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading
           title="Welcome Back"
           subtitle="LOgin to Your Account"
           />
           <Input
           id="email"
           label="Email"
           disabled={isLoding}
           register={register}
           errors={errors}
           required
           />
           
            <Input
           id="password"
           label="Password"
           disabled={isLoding}
           register={register}
           errors={errors}
           required
           />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
            outline
            label="Continue with google"
            icon={FaGoogle}
            onClick={()=>signIn('google')}
            />
             <Button
            outline
            label="Continue with github"
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                  <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                       First time using Airbnb
                    </div>
                    <div onClick={toggle} className="text-neutral-500 cursor-pointer hover:underline">
                     Create an account
                    </div>
                  </div>
            </div >

        </div>
    )


    return ( 
       <Modal
       disabled = {isLoding}
       isOpen ={loginModal.isopen}
       title="Login"
       actionLabel="Continue"
       onClose={loginModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body = {bodyContent}
       footer={footerContent}
       />
       
     );
}
 
export default LoginModal;