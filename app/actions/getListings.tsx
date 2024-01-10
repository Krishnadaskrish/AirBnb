import prisma from '@/app/libs/prismadb'
import { decl } from 'postcss'

export default async function getCurrentUser(){
    try {

        const listings = await prisma.listing.findMany({
            orderBy:{
                createdAt : 'desc'
            }

        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
          }));

        return safeListings ;

        
     
        
    } catch (error : any) {
         throw new Error (error)
    }
}