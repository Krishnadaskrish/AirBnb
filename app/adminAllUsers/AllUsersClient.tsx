'use client'
import { SafeUser } from "../types";
import Heading from "../components/Heading";
import React from "react";
import Container from "../components/Container";
import ListingAllUsersCard from "../components/listings/ListAllUsers";


interface AllUsersClientProps {
    User : SafeUser [] ;
}



const AllUsersClient:React.FC<AllUsersClientProps> = ({
    User
}) => {
    return ( 
        
<Container>
<Heading
     title="Profile Details"
     
     />
       {User.map((User) => (
  <ListingAllUsersCard key={User.id} data={User} />
))}


</Container>

     );
    }
    
    export default AllUsersClient;