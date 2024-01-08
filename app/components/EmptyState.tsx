'use client' ;
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
        title ? : string;
        subtitle ? : string ;
        showReset ? : boolean ;

}


const EmptyState : React.FC <EmptyState> = ({
           title = "No Exact Matches",
           subtitle = "Try changing or removeing some of your filter ",
           showReset 
})  => {
    const router = useRouter()
    return ( 
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
         <Heading
         title={title}
         subtitle={subtitle}
         center/>
         <div className="w-48 mt-4  ">
            {showReset && (
                <Button
                outline
                label="Remove all filter"
                onClick={()=>router.push('/')}/>
            )}

    
         </div>
         
        </div>
     );
}
 
export default EmptyState;