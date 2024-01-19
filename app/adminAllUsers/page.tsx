import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";



import AdminAllUsersClient from "./AdminAllUsersClient";



const AllUsersPage = async () =>{

    


     return (
        <ClientOnly>
            <AdminAllUsersClient
             
            
            />
        </ClientOnly>
     )

}



export default AllUsersPage