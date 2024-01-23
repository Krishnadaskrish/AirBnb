'use client'
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";

const AccountPage = () => {
    const router = useRouter()
    return ( 

        
        



<div className="max-w-sm p-6 bg-white border  border-gray-200 rounded-lg shadow white:bg-white-800 white:border-gray-700 ms-6" onClick={()=>router.push('/accountDetails')}>
    
   <Heading title="Personal info"
   subtitle="Provide personal details and how we can reach you"/>
</div>


     );
}
 
export default AccountPage;