import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import { exec } from "child_process";
import getFavoriteListing from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";


const ListingPage = async ()=>{

    const listings = await getFavoriteListing()
    const currentUser = await getCurrentUser()
    if(listings.length === 0){
        
        return (
            <ClientOnly>
            <EmptyState
            title="No favorites found"
            subtitle="looks like you have no favorite listing"/>
        </ClientOnly>
    )
}
return(
    <ClientOnly>
        <FavoritesClient
        listings = {listings}
        currentUser = {currentUser}/>
    </ClientOnly>
)
}

export default ListingPage ;