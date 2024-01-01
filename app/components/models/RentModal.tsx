'use client'
import useRentModel from "@/app/hooks/UseRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import  { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {  FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

import dynamic from "next/dynamic";



enum STEPS {
    CATRGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES =3,
    DESCRIPTION = 4,
    PRICE = 5

}



const RentModal = () => {
    const rentModal = useRentModel()
    const [step,setStep] = useState(STEPS.CATRGORY)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
           errors 
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category : '' ,
            location : null ,
            guestCount : 1,
            roomCount : 1,
            bathroomCount : 1,
            imageSrc : '',
            price : 1,
            description : ''
        }
    });

    const category = watch('category')
    const location = watch('location')
    const Map = useMemo(()=> dynamic(()=>import ("../Map"),{
        ssr : false
    }),[location])
    const setCustomValue =  (id : string , value : any) =>{
        setValue (id , value,{
            shouldValidate : true ,
            shouldDirty : true,
            shouldTouch : true
        })
    } 
    
    const onBck = ()=>{
        setStep((value)=> step -1)
    }

    const onNext = () =>{
        setStep((value)=> step +1)
    }
    const actionLabel = useMemo(()=>{
        if(step === STEPS.PRICE){
            return 'create'
        }

        return 'next'

    },[step])
    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.CATRGORY){
             return undefined
        }
        return 'back'
    },[step])

    let bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Which of this best describes your place ?" subtitle="Pick a category" center/> 
            <div className="grid grid-cols-2 md:grid-cols-2 max-h-[50vh] overflow-auto ">
             {categories.map((item)=>(
                <div key={item.label} className="col-span-1">
                    <CategoryInput 
                    onClick={(category)=> setCustomValue('category',category)}
                    selected = {category === item.label}
                    label={item .label}
                    icon={item.icon}/>
                </div>
             ))}
            </div>
          </div>
          
    )

    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
             <Heading
             title="where is your palce"
             subtitle="Helps gets find you"
             center
             />
             <CountrySelect
             value = {location}
             onChange={(value)=> setCustomValue('location',value)}/>
             <Map/>
            </div>
        )
    }
    
    return ( 
        
          <Modal
          isOpen ={rentModal.isopen}
          onClose={rentModal.onClose}
          onSubmit = {onNext}
          actionLabel= {actionLabel}
          title="airBnb your home"
          secondaryAction={step === STEPS.CATRGORY ? undefined : onBck }
          secondaryActionLabel= {secondaryActionLabel}
          body={bodyContent}/>  
        
     );
}
 
export default RentModal;