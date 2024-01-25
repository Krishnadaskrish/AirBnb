"use client" ;
import Image from "next/image";import React from "react";

interface AvatarProps  {
    src? : string | null | undefined
}
const UserAvatar : React.FC<AvatarProps> = ({
    src
}) => {
    return ( 
        <Image className="rounded-full" height="60" width= "60" alt="Avatar" src= {src ||"/images/placeholder.jpg"}/>
     );
}
 
export default UserAvatar;