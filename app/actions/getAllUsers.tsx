import { getServerSession } from "next-auth";
import prisma from '@/app/libs/prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export async function getSession() {
    return await getServerSession(authOptions) 
}

export default async function getAllUsers() {
       try {
        const session = await getSession();
        if(!session?.user?.email){
            return null
        }
        const AllUsers = await prisma.user.findMany()
         

        
        return [AllUsers]

       } catch (error : any) {
           return null
       }
}