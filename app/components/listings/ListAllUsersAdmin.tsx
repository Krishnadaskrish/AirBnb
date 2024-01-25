'use client'

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import UserAvatar from "../UserAvatar";


interface   UserListingProps {
  data : SafeUser ;
  disabled? : boolean;
  actionId? : string; 
  onAction ? : (id : string)=>void
}

const ListingAllUsersAdmin : React.FC <UserListingProps> = ({
  data,
  disabled,
  actionId = '' ,
  onAction
}) => {
  const router = useRouter()
  const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{

    e.stopPropagation()
    if(disabled){
        return ;
    }

      onAction ?.(actionId)


},[onAction,actionId,disabled])
    return ( 
        <div className="min-h-72 white:bg-slate-800 gap-4 flex flex-row items-center justify-center">
        <div
          className="bg-gray-100 white:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform w-full" >
          <div className="flex  items-center gap-11">
            <UserAvatar src={data.image}/>
            <div className="w-fit transition-all transform duration-500">
              <h1 className="text-black-600  font-extrabold">
                {data.name}
              </h1>
              <p className="text-black-400 font-semibold">Mail Id : {data.email}</p>
              <p className="text-black-400 font-semibold">User Id : {data.id}</p>
              <p className="text-black-400">Created At : {data.createdAt}</p>
              <p className="text-black-400">Updated At : {data.updatedAt}</p>
              <a
                className="text-xs text-black-500 dark:text-black-200 group-hover:opacity-100 opacity-0 transform transition-all delay-300 duration-500">
                Updated At: {data.updatedAt}
              </a>
            </div>
          </div>
          <br/>
          <button className="w-20 bg-rose-500 rounded-lg font-semibold text-white " disabled={disabled} onClick={handleCancel}>Delete</button>
        </div>
      </div>

     );
}
 
export default ListingAllUsersAdmin ;