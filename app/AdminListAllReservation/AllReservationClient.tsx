'use client'
import {  SafeReservations } from "../types"
import Heading from "../components/Heading"
import React, { useCallback, useState } from "react"
import Container from "../components/Container"
import ListingAllReservationCard from "../components/listings/ListingAllReservationCard"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


interface AllListingProps {
    Listing : SafeReservations []
}

const AdminAllReservationClient : React.FC<AllListingProps> = ({
     Listing
}) => {

    const router = useRouter();
    const [deleteId , setDeleteId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setDeleteId(id);
        axios.delete(`api/reservations/${id}`)
        .then(()=>{
           toast.success('cancel reservation')
           router.refresh()
        })
        .catch(()=>{
            toast.error('something went wrong')
        })

        .finally(()=>{
            setDeleteId(id)
        })

    },[])

    
    return ( 
        <Container>
            <Heading
            title="Properties"/>
            {Listing.map((listing)=>(

                <ListingAllReservationCard key={listing.id} data={listing}
                disabled={deleteId === listing.id}
                onAction={onCancel}
                actionId={listing.id}/>
            ))}
        </Container>
        
     );
}
 
export default AdminAllReservationClient;