'use client'
import useRentModel from "@/app/hooks/UseRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import  { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";

import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




enum STEPS {
    CATRGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES =3,
    DESCRIPTION = 4,
    PRICE = 5

}



const RentModal = () => {
    const router = useRouter()
    const rentModal = useRentModel()
    const [step,setStep] = useState(STEPS.CATRGORY)
    const [isLoading,setIsLoading] = useState(false)
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
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc') 
    
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
        ssr: false 
      }), [location]);

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
    
    const onSubmit : SubmitHandler <FieldValues> = (data)=>{
        if (step !== STEPS.PRICE){
            return onNext()
        }
        setIsLoading (true)
        axios.post('/api/listings' ,data)
        .then(()=>{
            toast.success ('Listing Created !')
        router.refresh() 
        reset()
        setStep(STEPS.CATRGORY)
        rentModal.onClose();
     })

     .catch(()=>{
        toast.error('somthing wrong')
     }).finally(()=>{
        setIsLoading(false)
     })

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
            <Heading title="Which of this best describes your place ?" subtitle = "Pick a category" center/> 
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
             <Map
             center={location?.latlng}/>
            </div>
        )
    }

    if (step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="share some basic about "
                subtitle="share some place"
                center/>
                <Counter
                title="Guest"
                subtitle="How many guest do you allow "
                value={guestCount}
                onChange={(value)=>setCustomValue('guestCount' , value)}/>
                <hr/>
                  <Counter
                title="Rooms"
                subtitle="How many rooms do you have  "
                value={roomCount}
                onChange={(value)=>setCustomValue('roomCount' , value)}/>
                <hr/>
                  <Counter
                title="Bathrooms"
                subtitle="How many Bathroom do you have "
                value={bathroomCount}
                onChange={(value)=>setCustomValue('bathroomCount' , value)}/>

            </div>
        )
    }

    if (step === STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                title="Add a photo of your place "
                subtitle="show guest what your palce looks like "
                center />
                <ImageUpload
                value={imageSrc}
                onChange={(value)=> setCustomValue('imageSrc',value)}/>
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8 ">
                <Heading
                title="How would you describe your place"
                subtitle="short and sweet works best"
                center/>
                <Input
                id="title"
                label = "Title"
                disabled = {isLoading}
                register={register}
                errors={errors}
                required/>
                <hr/>
                <Input
                id="description"
                label = "Description"
                disabled = {isLoading}
                register={register}
                errors={errors}
                required/>
                
            </div>
        )
    }

    if (step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Now set ypur price"
                subtitle="How much will you charge per night"
                center/>

                <Input 
                id = "price"
                label="price"
                formatPrice
                type="number"
                disabled = {isLoading}
                register={register}
                errors={errors}
                required/>

            </div>
        )
    }
    
    return ( 
        
          <Modal
          isOpen ={rentModal.isopen}
          onClose={rentModal.onClose}
          onSubmit = {handleSubmit(onSubmit)}
          actionLabel= {actionLabel}
          title="airBnb your home"
          secondaryAction={step === STEPS.CATRGORY ? undefined : onBck }
          secondaryActionLabel= {secondaryActionLabel}
          body={bodyContent}/>  
        
     );
}
 
export default RentModal ;