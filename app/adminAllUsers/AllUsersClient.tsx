'use client'
import { SafeUser } from "../types";
import Heading from "../components/Heading";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import ListingAllUsersCard from "../components/listings/ListAllUsers";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingAllUsersAdmin from "../components/listings/ListAllUsersAdmin";


interface AllUsersClientProps {
    User : SafeUser [] ;
}



const AllUsersClient:React.FC<AllUsersClientProps> = ({
    User
}) => {

      const router = useRouter()
      const [deleteId, setDeleteId] = useState('')
      const onCancel = useCallback((id:string)=>{
        setDeleteId(id);
       axios.delete(`api/AdUsers/${id}`)
       .then(()=>{
        toast.success('removed user succsfully')
        router.refresh()
       })
       .catch(()=>{
        toast.error('something wrong')
       })
       .finally(()=>{
        setDeleteId(id)
       })

      },[])
    
    return ( 
        
<Container>
<Heading
     title="Profile Details"
     
     />
       {User.map((User) => (
  <ListingAllUsersAdmin key={User.id} data={User}
  disabled = {deleteId === User.id} onAction={onCancel} actionId={User.id} />
))}


</Container>

     );
    }
    
    export default AllUsersClient;