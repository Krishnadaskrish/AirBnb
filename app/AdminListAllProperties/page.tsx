import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import AdminAllListingClient from "./AdminAllListingClient";

// Import statements...


const AdminListingPropertiesPage = async () => {
    const params = {
    
       
    };
  
    try {
      const user = await getListings(params);
  
      if (!user) {
        return (
          <ClientOnly>
            <EmptyState title="Unauthorized" subtitle="Please login" />
          </ClientOnly>
        );
      }
  
      return (
        <ClientOnly>
          <AdminAllListingClient Listing={user} />
        </ClientOnly>
      );
    } catch (error) {
      console.error("Error fetching listings:", error);
      // Handle the error appropriately, e.g., show an error message to the user.
    }
  };
  
  export default AdminListingPropertiesPage;
  