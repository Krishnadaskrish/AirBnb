'use client'
import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/app/hooks/UseRegisterModal";
import LoginModal from "../models/LoginModal";
import useLoginModel from "@/app/hooks/UseLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModel from "@/app/hooks/UseRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps  {
  currentUser ? : SafeUser | null
}
const UserMenu : React.FC <UserMenuProps> = ({
  currentUser
}) => {
    const router = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const RegisterModel = useRegisterModel();
    const loginModal = useLoginModel()
    const rentmodal = useRentModel()

    const ToggleOpen = useCallback(()=>{
      
     setIsOpen ((value)=>!value);
    },[])
    const onRent = useCallback(()=>{
         if(!currentUser){
          return loginModal.onOpen()
         }
         rentmodal.onOpen()
    },[currentUser,loginModal,rentmodal])
    return ( 
        <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div onClick={onRent} className="hidden md:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                airBnb your home
            </div>
            <div onClick={ToggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">

               <AiOutlineMenu/>
               <div className="hidden md:block">
                 <Avatar src={currentUser?.image}/>
               </div>
            </div>
            {isOpen && (
  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
    <div className="flex flex-col cursor-pointer">
      {currentUser ?(
        <>
        <MenuItem
          onClick={()=>router.push('/trips')}
          label="My trips"
        />
        <MenuItem
          onClick={()=>router.push('/favorites')}
          label="My favorites"
        />
        <MenuItem
          onClick={()=>router.push('/reservations')}
          label="My reservations"
        />
        <MenuItem
          onClick={()=>router.push('/properties')}
          label="My Properties"
        />
        <MenuItem
          onClick={rentmodal.onOpen}
          label="Airbnb my home"
        />
        <MenuItem
          onClick={()=>router.push('/account')}
          label="Account"
        />
        <hr/>
        <MenuItem
          onClick={()=>{signOut()}}
          label="Logout"
        />
      </>

      ):(
      <>
        <MenuItem
          onClick={loginModal.onOpen}
          label="Login"
        />
        <MenuItem
          onClick={RegisterModel.onOpen}
          label="Sign Up"
        />
      </>
      )}
    </div>
  </div>
)}

        </div>

        </div>
     );
}
 
export default UserMenu;