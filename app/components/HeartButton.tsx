'use client'

import { User } from "@prisma/client";
import { SafeUser } from "../types";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId : string ; 
    currentUser : SafeUser | null
}

const HeartButton : React.FC <HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    const hasFavorite = true ;
    const toggleFavorite = ()=>{}
    return ( 
    <div
    onClick={toggleFavorite}
    className="relative cursor-pointer hover:opacity-80 transition ">
        <AiOutlineHeart size={28} className ='fill-white absolute -top[2px] -right[2px]'/>

    </div> 
    );
}
 
export default HeartButton