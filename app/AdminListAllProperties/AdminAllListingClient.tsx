'use client'
import { SafeListing } from "../types"
import AdminListingCard from "../components/listings/ListingAllProperties"
import Heading from "../components/Heading"
import React from "react"
import Container from "../components/Container"


interface AllListingProps {
    Listing : SafeListing []
}

const AdminAllListingClient : React.FC<AllListingProps> = ({
    Listing
}) => {
    return ( 
        <Container>
            <Heading
            title="Properties"/>
            {Listing.map((listing)=>(

                <AdminListingCard key={listing.id} data={listing}/>
            ))}
        </Container>
        
     );
}
 
export default AdminAllListingClient;