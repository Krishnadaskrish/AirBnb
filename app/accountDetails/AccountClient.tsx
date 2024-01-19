'use client'
import { SafeUser } from "../types";
import Heading from "../components/Heading";
import React from "react";
import Container from "../components/Container";
import ListinguserCard from "../components/listings/ListinguserCard";


interface AccountClientProps {
    currentUser : SafeUser [] ;
}



const AccountClient:React.FC<AccountClientProps> = ({
    currentUser
}) => {
    return ( 
        
<Container>
<Heading
     title="Profile Details"
     
     />
       {currentUser.map((currentUser) => (
  <ListinguserCard key={currentUser.id} data={currentUser} />
))}


</Container>

     );
    }
    
    export default AccountClient;