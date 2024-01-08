import prisma from '@/app/libs/prismadb'
import { decl } from 'postcss'

export default async function getCurrentUser(){
    try {

        const Listing = await prisma.listing.findMany({
            orderBy:{
                createdAt : 'desc'
            }

        })

        return Listing

        
     
        
    } catch (error : any) {
         throw new Error (error)
    }
}