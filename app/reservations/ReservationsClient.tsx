'use client'
import {toast} from "react-hot-toast"
import axios from "axios";
import React, { useCallback,useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservations,SafeUser } from "../types";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
    reservation : SafeReservations [] ;
    currentUser ?: SafeUser | null ;
}

const ReservationsClient : React.FC<ReservationsClientProps> = ({
    reservation,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id : string)=>{
          setDeletingId (id)
          axios.delete(`/api/reservations/${id}`)
          .then(()=>{
            toast.success('Reservation cancelled')
            router.refresh()
          })
          .catch(()=>{
            toast.error('something went wrong')
          })
          .finally(()=>{
            setDeletingId('')
          })

    },[])
    return ( 
        <Container>
            <Heading
            title="Reservation"
            subtitle="Booking on your properties"
            center/>

            <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
            {reservation.map((reservation)=>(
                <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled ={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}/>
            ))}
            </div>
        </Container>
     );
}
 
export default ReservationsClient;