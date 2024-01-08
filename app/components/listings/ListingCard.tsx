'use client'
import useRentModel from "@/app/hooks/UseRentModal";
import useCountries from "@/app/hooks/useCountrySelect";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { Value } from "@prisma/client/runtime/library";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import {format} from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingCardProps {
    data  : Listing;
    resevation ? : Reservation;
    onAction ? : (id : string )=> void ;
    disabled ? : boolean ;
    actionLabel ? :string ;
    actionId ? : string ;
    user ? : SafeUser | null

}
const ListingCard : React.FC <ListingCardProps> = ({
    data ,
    resevation,
    onAction,
    disabled,
    actionLabel,
    actionId = '' ,
    user
    
}) => {

    const router = useRouter()
    const {getByValue} = useCountries()
    const location = getByValue(data.locationValue)
    const handleCancel = useCallback(
        (e :React.MouseEvent <HTMLButtonElement>)=>{

            e.stopPropagation()
            
            if (disabled){
                return ;
            }

            onAction?.(actionId)



        },[onAction,actionId,disabled])

        const price = useMemo(()=>{

            if(resevation){
                return resevation.totalPrice
            }
            return data.price

        },[resevation,data.price])

        const reservationDate = useMemo (()=>{
               if (!resevation){
                return null ;
               }

               const start = new Date (resevation.startDate)
               const endDate = new Date(resevation.endDate)

               return `${format(start,'PP')} - ${format(endDate,'PP')}`
        },[resevation])

    return ( 
        <div 
        onClick={()=>router.push(`/listing/${data.id}`)}
         className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative rounded-xl overflow-hidden">
                    <Image fill alt="Listing" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition"/>
                    <div className="absolute top-3 right-3">
                        <HeartButton
                        listingId = {data.id}
                        currentUser = {currentUser}/>
                    </div>

                </div>

            </div>

        </div>
     );
}
 
export default ListingCard;