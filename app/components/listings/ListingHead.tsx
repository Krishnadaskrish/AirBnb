'use client'

import useCountries from "@/app/hooks/useCountrySelect";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";

interface ListingHeadProps {
    title : string ;
    locationValue : string ;
    imageSrc : string ;
    id : string ;
    currentUser ? : SafeUser | null
    
}

const ListingHead : React.FC <ListingHeadProps> = ({
title,
imageSrc,
locationValue,
currentUser,
id
}) => {
    const {getByValue} = useCountries() 
    const location = getByValue(locationValue)
    return ( 
        <>

        <Heading
        title={title}
        subtitle={`${location ?.region} , ${location ?.label}`}
        center
        />

        <div className="w-full has-[60vh] overflow-hidden rounded-xl relative">
            <Image alt="image" src={imageSrc} fill className="object-cover w-fill"/>

        </div>

        

        </>
     );
}
 
export default ListingHead;