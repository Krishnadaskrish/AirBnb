import { create } from 'zustand';
import React, { useCallback,useMemo } from "react";
import axios from "axios";
import { SafeUser } from "../types";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLoginModel from './UseLoginModal';


interface IUserfavorite {
    listingId : string,
    currentUser ? : SafeUser | null

}

 
const useFavorite = ({
    listingId ,
    currentUser
}:IUserfavorite)=>{
    const router = useRouter();
    const loginModel = useLoginModel()

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favoriteIds || [] ;
        return list.includes(listingId)
    },[currentUser,listingId])

    const toggleFavorite = useCallback(async (
        e:React.MouseEvent<HTMLDivElement>
    )=>{
         e.stopPropagation();
         
         if(!currentUser){
            return loginModel.onOpen
         }
         try{
            let request ;

            if(hasFavorited){
                request = ()=>axios.delete(`api/favorites/${listingId}`)

                } else{
                      request = ()=> axios.post(`api/favorites/${listingId}`)
                }
                await request();
                router.refresh();
                toast.success('added to favorites')
            }
            catch(error){
                toast.error('something went wrong')

            }
         
    },[listingId,currentUser,loginModel,router,hasFavorited]);
        return {
            hasFavorited,
            toggleFavorite
        }   
}

export default useFavorite


