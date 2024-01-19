import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClients from "./ReservationsClient";import ReservationsClient from "./ReservationsClient";


const ReservationPage = async () =>{

    const currentUser = await getCurrentUser();
     if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                title="Unautharized"
                subtitle="please login"/>
            </ClientOnly>
        )
     }

     const reservation = await getReservations({
        authorId : currentUser.id
     })

     if(reservation.length == 0){
        return(

        <ClientOnly>
            <EmptyState
            title="No reservations yet"
            subtitle="Looks like have no reservation on your property"
            />
        </ClientOnly>
        )
     }

     return (
        <ClientOnly>
            <ReservationsClient
             reservation={reservation}
            currentUser ={currentUser}
            />
        </ClientOnly>
     )

}



export default ReservationPage