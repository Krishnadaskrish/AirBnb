'use client'
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingAllUsersCard from "../components/listings/ListAllUsers";

interface AdminAllProps {
    
}

const AdminAllUsersClient = () => {
    return ( 
    <Container>
        <Heading
        title="All users"/>
        <ListingAllUsersCard/>
    </Container>
    )
}
 
export default AdminAllUsersClient;