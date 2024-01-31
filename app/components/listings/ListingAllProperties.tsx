
import Avatar from "../Avatar";
import React, { useCallback } from "react";
import { SafeListing } from "@/app/types";

interface AdminListingProps {
    data: SafeListing;
    disabled? : boolean;
    actionId? : string; 
    onAction ? : (id : string)=>void
}

const AdminListingCard: React.FC<AdminListingProps> = ({
     data ,disabled,actionId = '' ,onAction
    }) => {

        const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>)=>{

            e.stopPropagation()
            if(disabled){
                return ;
            }
    
              onAction ?.(actionId)
    
    
        },[onAction,actionId,disabled])

    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className="text-black-500">
                            <tr className="bg-rose-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                <th className="px-5 py-3" colSpan={5}>{data.title}</th>
                            </tr>
                            <tr>
                                
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <Avatar src={data.imageSrc} />
                                        </div>
                                        <div className="ml-3">
                                            <p className="whitespace-no-wrap">Titile: {data.title}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">Category: {data.category}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                    <p className="whitespace-no-wrap">Created at: {data.locationValue}</p>
                                </td>
                                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                  <button className="w-20 bg-rose-500 rounded-lg font-semibold text-white" disabled={disabled} onClick={handleCancel} >delete</button>
                                 </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminListingCard;
