'use client'

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Avatar from "../Avatar";
import Button from "../Button";

interface   UserListingProps {
  data : SafeUser ;
  disabled? : boolean;
  actionId? : string; 
  onAction ? : (id : string)=>void
}

const ListingAllUsersCard : React.FC <UserListingProps> = ({
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
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8" onClick={()=>router.push(`/AdminAllUsers`)}>
  <div className="flex items-center justify-between pb-6">
    <div>
      <h2 className="font-semibold text-gray-700">{data.name}</h2>
      <span className="text-xs text-gray-500">View accounts of {data.name}</span>
    </div>
    
  </div>
  <div className="overflow-y-hidden rounded-lg border">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-rose-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
            <th className="px-5 py-3">User Id</th>
            <th className="px-5 py-3">Profile picture</th>
            <th className="px-5 py-3">user</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Created at</th>
            <th className="px-5 py-3">Updated at</th>
            <th className="px-5 py-3">Delete User</th>
          </tr>
        </thead>
      </table>
    </div>
   
  </div>
        <tbody className="text-black-500">
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">{data.id}</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <Avatar src={data.image} />
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                
                <div className="ml-3">
                  <p className="whitespace-no-wrap">{data.name}</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">{data.email}</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">{data.createdAt}</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap">{data.updatedAt}</p>
            </td>

            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
             <button className="w-20 bg-rose-500 rounded-lg font-semibold text-white" disabled={disabled} onClick={handleCancel}>delete</button>
            </td>
          </tr>
          
         
          
        </tbody>
</div>

     );
}
 
export default ListingAllUsersCard ;