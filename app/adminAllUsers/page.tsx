import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getAllUsers from "../actions/getAllUsers";


import AllUsersClient from "./AllUsersClient";



const currentUserPage = async () =>{

    const user = await getAllUsers();
     if(!user){
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
            <AllUsersClient
             
            User ={user}
            />
        </ClientOnly>
     )

}



export default currentUserPage