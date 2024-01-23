'use client'
import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";

const AdminPage = () => {
    const router = useRouter()
    return ( 

        
        

<div className="flex flex-row justify-between">
    


<div className="w-screen p-6 bg-white border border-gray-200 rounded-lg shadow white:bg-white-800 white:border-gray-700 m-5" onClick={()=>router.push('/AdminAllUsers')}>
    
   <Heading title="Total Users"
   subtitle="Listing up the total users that registered in our app"/>
</div>

<div className="w-screen  p-6 bg-white border border-gray-200 rounded-lg shadow white:bg-white-800 white:border-gray-700 m-5" onClick={()=>router.push('/AdminListAllProperties')}>
    
   <Heading
   title="Total Properties"
   subtitle="Listing the total resorts hosted"/>
</div>
<div className=" w-screen p-6 bg-white border border-gray-200 rounded-lg shadow white:bg-white-800 white:border-gray-700 m-5" onClick={()=>router.push('/AdminListAllReservation')}>
    
 <Heading title="Total reservation"
 subtitle="Current updates about the reservation"/>
</div>

</div>



     );
}
 
export default AdminPage;