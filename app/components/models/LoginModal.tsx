"use client"
import {signIn} from 'next-auth/react'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { useCallback,useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useRegisterModel from "@/app/hooks/UseRegisterModal";
import useLoginModel from "@/app/hooks/UseLoginModal";
import { error } from "console";
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
       signIn('credentials',{
        ...data,
        redirect : false
       })
       .then((callback)=>{
        setIsLoading(false);
        if (callback?.ok){
            toast.success('Logged In')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error){
            toast.error(callback.error)
        }
       })
       
    }
    const bodyContent = (
        <div className="flex  flex-col gap-4">
           <Heading
           title="Welcome Back"
           subtitle="LOgin to Your Account"
           center/>
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
            icon={FcGoogle}
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
                       Already Have An Account
                    </div>
                    <div onClick={registerModel.onClose} className="text-neutral-500 cursor-pointer hover:underline">
                       Log in
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