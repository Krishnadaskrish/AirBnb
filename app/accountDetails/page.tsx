import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";



import AccountClient from "./AccountClient";
import getCurrentUserDetails from "../actions/getCurrentUserDetails";


const currentUserPage = async () =>{

    const currentUser = await getCurrentUserDetails();
     if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="Unautharized"
                subtitle="please login"/>
            </ClientOnly>
        )
     }


     return (
        <ClientOnly>
            <AccountClient
             
            currentUser ={currentUser}
            />
        </ClientOnly>
     )

}



export default currentUserPage