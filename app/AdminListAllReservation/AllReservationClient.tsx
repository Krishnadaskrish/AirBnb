'use client'
import {  SafeReservations } from "../types"
import AdminListingCard from "../components/listings/ListingAllProperties"
import Heading from "../components/Heading"
import React from "react"
import Container from "../components/Container"
import ListingAllReservationCard from "../components/listings/ListingAllReservationCard"


interface AllListingProps {
    Listing : SafeReservations []
}

const AdminAllReservationClient : React.FC<AllListingProps> = ({
    Listing
}) => {
    return ( 
        <Container>
            <Heading
            title="Properties"/>
            {Listing.map((listing)=>(

                <ListingAllReservationCard key={listing.id} data={listing}/>
            ))}
        </Container>
        
     );
}
 
export default AdminAllReservationClient;