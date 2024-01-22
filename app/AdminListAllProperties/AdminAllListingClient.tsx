'use client'
import { SafeListing } from "../types"
import AdminListingCard from "../components/listings/ListingAllProperties"
import Heading from "../components/Heading"
import React, { useCallback, useState } from "react"
import Container from "../components/Container"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"



interface AllListingProps {
    Listing : SafeListing []
}

const AdminAllListingClient : React.FC<AllListingProps> = ({
    Listing
}) => {

      const router = useRouter()
      const [deleteId,setDeleteId] = useState('')
      const onCancel = useCallback((id : string)=>{
        setDeleteId (id);
        axios.delete(`api/AdProperties/${id}`)
        .then(()=>{
            toast.success('delete property')
            router.refresh()
        })
        .catch(()=>{
            toast.error('somthing wrong')
        })

        .finally(()=>{
            setDeleteId(id)
        })

      },[])

    return ( 
        <Container>
            <Heading
            title=" total Properties"/>
            {Listing.map((listing)=>(

                <AdminListingCard key={listing.id} data={listing}
                disabled={deleteId === listing.id}
                onAction={onCancel}
                actionId={listing.id}/>
            ))}
        </Container>
        
     );
}
 
export default AdminAllListingClient;