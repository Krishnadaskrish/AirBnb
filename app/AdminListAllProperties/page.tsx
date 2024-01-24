import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import AdminAllListingClient from "./AdminAllListingClient";

// Import statements...


const AdminListingPropertiesPage = async () => {
    const params = {
    
       
    };
  
    try {
      const listing = await getListings(params);
  
      if (!listing) {
        return (
          <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
          </ClientOnly>
        );
      }
  
      return (    
        <ClientOnly>
          <AdminAllListingClient Listing={listing} />
        </ClientOnly>
      );
    } catch (error) {
      console.error("Error fetching listings:", error);
      // Handle the error appropriately, e.g., show an error message to the user.
    }
  };
  
  export default AdminListingPropertiesPage;
  